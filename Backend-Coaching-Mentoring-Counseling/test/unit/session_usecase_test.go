package unit_test

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	sessionusecase "github.com/kalanara/cmc-backend/internal/modules/session/usecase"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/test/mocks"
)

func TestSessionUsecase_BookSession_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	clientID := uuid.New()
	practitionerID := uuid.New()

	client := &userdomain.User{
		ID:   clientID,
		Role: userdomain.RoleClient,
	}

	practitioner := &userdomain.User{
		ID:   practitionerID,
		Role: userdomain.RoleCoach,
	}

	mockUserRepo.EXPECT().FindByID(ctx, clientID).Return(client, nil)
	mockUserRepo.EXPECT().FindByID(ctx, practitionerID).Return(practitioner, nil)
	mockSessionRepo.EXPECT().Create(ctx, gomock.Any()).DoAndReturn(func(ctx context.Context, session *sessiondomain.Session) error {
		assert.Equal(t, clientID, session.ClientID)
		assert.Equal(t, practitionerID, session.PractitionerID)
		assert.Equal(t, sessiondomain.TypeCoaching, session.Type)
		assert.Equal(t, sessiondomain.StatusPending, session.Status)
		assert.NotEmpty(t, session.Token)
		assert.True(t, len(session.Token) > 5)
		return nil
	})

	input := sessiondomain.BookSessionInput{
		PractitionerID: practitionerID,
		Type:           sessiondomain.TypeCoaching,
		Title:          "Akselerasi Kinerja 2026",
		Topic:          "Kinerja",
		Objective:      "Pencapaian KPI",
	}

	session, err := usecase.BookSession(ctx, clientID, input)
	require.NoError(t, err)
	require.NotNil(t, session)
	assert.Equal(t, "Akselerasi Kinerja 2026", session.Title)
}

func TestSessionUsecase_BookSession_ClientNotFound(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	clientID := uuid.New()

	mockUserRepo.EXPECT().FindByID(ctx, clientID).Return(nil, sharederrors.ErrUserNotFound)

	input := sessiondomain.BookSessionInput{
		PractitionerID: uuid.New(),
		Type:           sessiondomain.TypeCoaching,
		Title:          "Akselerasi Kinerja",
	}

	_, err := usecase.BookSession(ctx, clientID, input)
	require.Error(t, err)
	assert.Equal(t, sharederrors.ErrUserNotFound, err)
}

func TestSessionUsecase_BookSession_PractitionerRoleMismatch(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	clientID := uuid.New()
	practitionerID := uuid.New()

	client := &userdomain.User{ID: clientID, Role: userdomain.RoleClient}
	// User is a coach, but request is for mentoring
	practitioner := &userdomain.User{ID: practitionerID, Role: userdomain.RoleCoach}

	mockUserRepo.EXPECT().FindByID(ctx, clientID).Return(client, nil)
	mockUserRepo.EXPECT().FindByID(ctx, practitionerID).Return(practitioner, nil)

	input := sessiondomain.BookSessionInput{
		PractitionerID: practitionerID,
		Type:           sessiondomain.TypeMentoring, // requires RoleMentor
		Title:          "Mentoring Karier",
	}

	_, err := usecase.BookSession(ctx, clientID, input)
	require.Error(t, err)
	assert.Equal(t, sharederrors.ErrPractitionerNotFound, err)
}

func TestSessionUsecase_GetSession_Forbidden(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	sessionID := uuid.New()
	clientID := uuid.New()
	practitionerID := uuid.New()
	unrelatedUserID := uuid.New()

	session := &sessiondomain.Session{
		ID:             sessionID,
		ClientID:       clientID,
		PractitionerID: practitionerID,
	}

	mockSessionRepo.EXPECT().FindByID(ctx, sessionID).Return(session, nil)

	// An unrelated client attempts to view the session
	_, err := usecase.GetSession(ctx, sessionID, unrelatedUserID, userdomain.RoleClient)
	require.Error(t, err)
	assert.Equal(t, sharederrors.ErrForbidden, err)
}

func TestSessionUsecase_AddMeeting_NormalizesMeetingType(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	sessionID := uuid.New()
	coachID := uuid.New()

	session := &sessiondomain.Session{
		ID:             sessionID,
		PractitionerID: coachID,
	}

	mockSessionRepo.EXPECT().FindByID(ctx, sessionID).Return(session, nil)
	mockSessionRepo.EXPECT().AddMeeting(ctx, gomock.Any()).DoAndReturn(func(ctx context.Context, m *sessiondomain.Meeting) error {
		// "offline" should be normalized to "Luring"
		assert.Equal(t, "Luring", m.MeetingType)
		assert.Equal(t, 2, m.JPCollected)
		assert.Equal(t, "draft", m.Status)
		return nil
	})

	input := sessiondomain.AddMeetingInput{
		Title:       "Pertemuan Tatap Muka",
		MeetingType: "offline",
	}

	meeting, err := usecase.AddMeeting(ctx, sessionID, coachID, userdomain.RoleCoach, input)
	require.NoError(t, err)
	require.NotNil(t, meeting)
	assert.Equal(t, "Luring", meeting.MeetingType)
}

func TestSessionUsecase_UpdateStatus_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	sessionID := uuid.New()
	coachID := uuid.New()

	session := &sessiondomain.Session{
		ID:             sessionID,
		PractitionerID: coachID,
		Status:         sessiondomain.StatusPending,
	}

	mockSessionRepo.EXPECT().FindByID(ctx, sessionID).Return(session, nil)
	mockSessionRepo.EXPECT().UpdateStatus(ctx, sessionID, sessiondomain.StatusConfirmed, "Disetujui").Return(nil)

	input := sessiondomain.UpdateSessionStatusInput{
		Status: sessiondomain.StatusConfirmed,
		Notes:  "Disetujui",
	}

	err := usecase.UpdateStatus(ctx, sessionID, coachID, userdomain.RoleCoach, input)
	require.NoError(t, err)
}

func TestSessionUsecase_ResendNotification_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	sessionID := uuid.New()
	clientID := uuid.New()
	coachID := uuid.New()

	session := &sessiondomain.Session{
		ID:             sessionID,
		ClientID:       clientID,
		PractitionerID: coachID,
		Status:         sessiondomain.StatusPending,
	}

	mockSessionRepo.EXPECT().FindByID(ctx, sessionID).Return(session, nil)

	err := usecase.ResendNotification(ctx, sessionID, clientID)
	require.NoError(t, err)
}

func TestSessionUsecase_ListUserSessions_ClientAndCoach(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockSessionRepo := mocks.NewMockSessionRepository(ctrl)
	mockUserRepo := mocks.NewMockUserRepository(ctrl)
	usecase := sessionusecase.NewSessionUsecase(mockSessionRepo, mockUserRepo, nil)

	ctx := context.Background()
	userID := uuid.New()

	mockSessionRepo.EXPECT().FindByClientID(ctx, userID).Return([]sessiondomain.Session{{Title: "Client Session"}}, nil)
	sessionsClient, err := usecase.ListUserSessions(ctx, userID, userdomain.RoleClient)
	require.NoError(t, err)
	assert.Len(t, sessionsClient, 1)

	mockSessionRepo.EXPECT().FindByPractitionerID(ctx, userID).Return([]sessiondomain.Session{{Title: "Coach Session"}}, nil)
	sessionsCoach, err := usecase.ListUserSessions(ctx, userID, userdomain.RoleCoach)
	require.NoError(t, err)
	assert.Len(t, sessionsCoach, 1)
}
