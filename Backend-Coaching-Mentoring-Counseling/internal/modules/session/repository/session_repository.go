package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"

	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type SessionRepository struct {
	db *database.DB
}

func NewSessionRepository(db *database.DB) *SessionRepository {
	return &SessionRepository{db: db}
}

func (r *SessionRepository) Create(ctx context.Context, session *sessiondomain.Session) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Create(session)
	if result.Error != nil {
		return fmt.Errorf("failed to create session: %w", result.Error)
	}
	return nil
}

func (r *SessionRepository) FindByID(ctx context.Context, id uuid.UUID) (*sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var session sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("id = ?", id).
		First(&session)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrSessionNotFound
		}
		return nil, fmt.Errorf("failed to find session: %w", result.Error)
	}
	return &session, nil
}

func (r *SessionRepository) FindByClientID(ctx context.Context, clientID uuid.UUID) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("client_id = ?", clientID).
		Order("created_at desc").
		Find(&sessions)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to list client sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) FindByPractitionerID(ctx context.Context, practitionerID uuid.UUID) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("practitioner_id = ?", practitionerID).
		Order("created_at desc").
		Find(&sessions)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to list practitioner sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status sessiondomain.SessionStatus, notes string) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	updates := map[string]interface{}{
		"status": status,
	}
	if notes != "" {
		updates["notes"] = notes
	}

	result := r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Session{}).
		Where("id = ?", id).
		Updates(updates)

	if result.Error != nil {
		return fmt.Errorf("failed to update session status: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return sharederrors.ErrSessionNotFound
	}
	return nil
}

func (r *SessionRepository) AddMeeting(ctx context.Context, meeting *sessiondomain.Meeting) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	// Get max meeting number if not set
	if meeting.MeetingNumber <= 0 {
		var maxNumber int
		_ = r.db.GormDB.WithContext(ctxTimeout).
			Model(&sessiondomain.Meeting{}).
			Where("session_id = ?", meeting.SessionID).
			Select("COALESCE(MAX(meeting_number), 0)").
			Scan(&maxNumber)
		meeting.MeetingNumber = maxNumber + 1
	}

	if err := r.db.GormDB.WithContext(ctxTimeout).Create(meeting).Error; err != nil {
		return fmt.Errorf("failed to add meeting: %w", err)
	}

	// Update session current_jp based on completed meetings
	var totalJP int
	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Meeting{}).
		Where("session_id = ? AND status = 'lengkap'", meeting.SessionID).
		Select("COALESCE(SUM(jp_collected), 0)").
		Scan(&totalJP)

	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Session{}).
		Where("id = ?", meeting.SessionID).
		Update("current_jp", totalJP)

	return nil
}

func (r *SessionRepository) DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? AND session_id = ?", meetingID, sessionID).
		Delete(&sessiondomain.Meeting{})

	if result.Error != nil {
		return fmt.Errorf("failed to delete meeting: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return errors.New("meeting not found")
	}

	// Update session current_jp
	var totalJP int
	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Meeting{}).
		Where("session_id = ? AND status = 'lengkap'", sessionID).
		Select("COALESCE(SUM(jp_collected), 0)").
		Scan(&totalJP)

	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Session{}).
		Where("id = ?", sessionID).
		Update("current_jp", totalJP)

	return nil
}
