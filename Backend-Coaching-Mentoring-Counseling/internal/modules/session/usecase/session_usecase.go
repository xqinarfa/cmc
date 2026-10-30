package usecase

import (
	"context"
	"crypto/rand"
	"fmt"
	"log/slog"
	"math/big"
	"strings"
	"time"

	"github.com/google/uuid"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type sessionUsecase struct {
	sessionRepo    sessiondomain.SessionRepository
	userRepo       userdomain.UserRepository
	eventPublisher authdomain.EventPublisher
}

func NewSessionUsecase(
	sessionRepo sessiondomain.SessionRepository,
	userRepo userdomain.UserRepository,
	eventPublisher authdomain.EventPublisher,
) sessiondomain.SessionUsecase {
	return &sessionUsecase{
		sessionRepo:    sessionRepo,
		userRepo:       userRepo,
		eventPublisher: eventPublisher,
	}
}

func generateToken() string {
	const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	b1 := make([]byte, 4)
	b2 := make([]byte, 4)
	for i := range b1 {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		b1[i] = charset[num.Int64()]
	}
	for i := range b2 {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		b2[i] = charset[num.Int64()]
	}
	return fmt.Sprintf("CMC-%s-%s", string(b1), string(b2))
}

func (u *sessionUsecase) BookSession(ctx context.Context, clientID uuid.UUID, input sessiondomain.BookSessionInput) (*sessiondomain.Session, error) {
	client, err := u.userRepo.FindByID(ctx, clientID)
	if err != nil {
		return nil, sharederrors.ErrUserNotFound
	}
	if client.Role != userdomain.RoleClient && client.Role != userdomain.RoleAdmin {
		return nil, sharederrors.ErrForbidden
	}

	practitioner, err := u.userRepo.FindByID(ctx, input.PractitionerID)
	if err != nil {
		return nil, sharederrors.ErrPractitionerNotFound
	}

	switch input.Type {
	case sessiondomain.TypeCoaching:
		if practitioner.Role != userdomain.RoleCoach && practitioner.Role != userdomain.RoleAdmin {
			return nil, sharederrors.ErrPractitionerNotFound
		}
	case sessiondomain.TypeMentoring:
		if practitioner.Role != userdomain.RoleMentor && practitioner.Role != userdomain.RoleAdmin {
			return nil, sharederrors.ErrPractitionerNotFound
		}
	case sessiondomain.TypeCounseling:
		if practitioner.Role != userdomain.RoleCounselor && practitioner.Role != userdomain.RoleAdmin {
			return nil, sharederrors.ErrPractitionerNotFound
		}
	}

	scheduledAt := time.Now().Add(72 * time.Hour)
	if input.ScheduledAt != nil && !input.ScheduledAt.IsZero() {
		scheduledAt = *input.ScheduledAt
	}

	duration := input.DurationMinutes
	if duration <= 0 {
		duration = 60
	}

	sessionFormat := input.SessionFormat
	if sessionFormat == "" {
		sessionFormat = "1-on-1"
	}

	topic := input.Topic
	if topic == "" {
		topic = input.Title
	}

	session := &sessiondomain.Session{
		ID:              uuid.New(),
		ClientID:        clientID,
		PractitionerID:  input.PractitionerID,
		Type:            input.Type,
		Status:          sessiondomain.StatusPending,
		Title:           input.Title,
		Topic:           topic,
		Objective:       input.Objective,
		SessionFormat:   sessionFormat,
		Token:           generateToken(),
		CurrentJP:       0,
		TargetJP:        6,
		Notes:           input.Notes,
		ScheduledAt:     scheduledAt,
		DurationMinutes: duration,
	}

	if err := u.sessionRepo.Create(ctx, session); err != nil {
		return nil, err
	}

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":        uuid.New(),
			"session_id":      session.ID,
			"client_id":       session.ClientID,
			"practitioner_id": session.PractitionerID,
			"type":            session.Type,
			"token":           session.Token,
			"scheduled_at":    session.ScheduledAt,
			"timestamp":       time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.booked", evt)
	}

	return session, nil
}

func (u *sessionUsecase) GetSession(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) (*sessiondomain.Session, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	if role != userdomain.RoleAdmin {
		if session.ClientID != currentUserID && session.PractitionerID != currentUserID {
			return nil, sharederrors.ErrForbidden
		}
	}

	return session, nil
}

func (u *sessionUsecase) ListUserSessions(ctx context.Context, currentUserID uuid.UUID, role userdomain.Role) ([]sessiondomain.Session, error) {
	switch role {
	case userdomain.RoleClient:
		return u.sessionRepo.FindByClientID(ctx, currentUserID)
	case userdomain.RoleCoach, userdomain.RoleMentor, userdomain.RoleCounselor:
		return u.sessionRepo.FindByPractitionerID(ctx, currentUserID)
	case userdomain.RoleAdmin:
		return u.sessionRepo.FindByClientID(ctx, currentUserID)
	default:
		return nil, sharederrors.ErrForbidden
	}
}

func (u *sessionUsecase) UpdateStatus(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input sessiondomain.UpdateSessionStatusInput) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if role != userdomain.RoleAdmin {
		if session.ClientID != currentUserID && session.PractitionerID != currentUserID {
			return sharederrors.ErrForbidden
		}
	}

	if err := u.sessionRepo.UpdateStatus(ctx, sessionID, input.Status, input.Notes); err != nil {
		return err
	}

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":   uuid.New(),
			"session_id": sessionID,
			"status":     input.Status,
			"updated_by": currentUserID,
			"timestamp":  time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.status_updated", evt)
	}

	return nil
}

func (u *sessionUsecase) AddMeeting(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input sessiondomain.AddMeetingInput) (*sessiondomain.Meeting, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	if role != userdomain.RoleAdmin && session.ClientID != currentUserID && session.PractitionerID != currentUserID {
		return nil, sharederrors.ErrForbidden
	}

	meetingType := input.MeetingType
	switch strings.ToLower(meetingType) {
	case "online", "daring":
		meetingType = "Daring"
	case "offline", "luring":
		meetingType = "Luring"
	case "hybrid":
		meetingType = "Hybrid"
	default:
		meetingType = "Luring"
	}

	jp := input.JPCollected
	if jp <= 0 {
		jp = 2
	}

	meeting := &sessiondomain.Meeting{
		ID:            uuid.New(),
		SessionID:     sessionID,
		Title:         input.Title,
		ScheduledDate: input.ScheduledDate,
		MeetingType:   meetingType,
		Location:      input.Location,
		Summary:       input.Summary,
		JPCollected:   jp,
		Status:        "draft",
	}

	if err := u.sessionRepo.AddMeeting(ctx, meeting); err != nil {
		return nil, err
	}

	return meeting, nil
}

func (u *sessionUsecase) DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if role != userdomain.RoleAdmin && session.ClientID != currentUserID && session.PractitionerID != currentUserID {
		return sharederrors.ErrForbidden
	}

	return u.sessionRepo.DeleteMeeting(ctx, sessionID, meetingID)
}

func (u *sessionUsecase) ResendNotification(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if session.ClientID != currentUserID {
		return sharederrors.ErrForbidden
	}

	slog.Info("Notification reminder resent", "session_id", sessionID, "practitioner_id", session.PractitionerID)

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":        uuid.New(),
			"session_id":      sessionID,
			"practitioner_id": session.PractitionerID,
			"client_id":       currentUserID,
			"timestamp":       time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.reminder_sent", evt)
	}

	return nil
}
