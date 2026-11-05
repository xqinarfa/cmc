package unit_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	sessiondelivery "github.com/kalanara/cmc-backend/internal/modules/session/delivery/http"
	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/pkg/validator"
	"github.com/kalanara/cmc-backend/test/mocks"
)

func setupSessionTestRouter(handler *sessiondelivery.SessionHandler, currentUserID uuid.UUID, role userdomain.Role) *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.New()

	router.Use(func(c *gin.Context) {
		if currentUserID != uuid.Nil {
			c.Set("UserID", currentUserID)
			c.Set("UserRole", role)
		}
		c.Next()
	})

	api := router.Group("/api/v1/sessions")
	{
		api.POST("", handler.BookSession)
		api.GET("", handler.ListSessions)
		api.GET("/:id", handler.GetSession)
		api.PATCH("/:id/status", handler.UpdateStatus)
		api.POST("/:id/meetings", handler.AddMeeting)
		api.DELETE("/:id/meetings/:meetingId", handler.DeleteMeeting)
	}

	return router
}

func TestHTTPHandler_ListSessions_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	sessions := []sessiondomain.Session{
		{
			ID:          uuid.New(),
			ClientID:    userID,
			Title:       "Mentoring Manajemen Karir",
			Type:        sessiondomain.TypeMentoring,
			Status:      sessiondomain.StatusPending,
			Token:       "CMC-1234-5678",
			ScheduledAt: time.Now().Add(24 * time.Hour),
		},
	}

	mockUsecase.EXPECT().
		ListUserSessions(gomock.Any(), userID, userdomain.RoleClient).
		Return(sessions, nil)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/sessions?status=pending", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusOK, w.Code)
	var resp map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &resp)
	require.NoError(t, err)
	assert.True(t, resp["success"].(bool))
	assert.Contains(t, w.Body.String(), "Mentoring Manajemen Karir")
}

func TestHTTPHandler_ListSessions_Unauthorized(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	// No user context set
	router := setupSessionTestRouter(handler, uuid.Nil, "")

	req := httptest.NewRequest(http.MethodGet, "/api/v1/sessions", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestHTTPHandler_GetSession_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	session := &sessiondomain.Session{
		ID:        sessionID,
		ClientID:  userID,
		Title:     "Coaching Kepemimpinan Pelayanan",
		Type:      sessiondomain.TypeCoaching,
		Status:    sessiondomain.StatusConfirmed,
		CurrentJP: 2,
		TargetJP:  6,
	}

	mockUsecase.EXPECT().
		GetSession(gomock.Any(), sessionID, userID, userdomain.RoleClient).
		Return(session, nil)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/sessions/"+sessionID.String(), nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Coaching Kepemimpinan Pelayanan")
}

func TestHTTPHandler_GetSession_InvalidUUID(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/sessions/invalid-uuid-string", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "INVALID_ID")
}

func TestHTTPHandler_BookSession_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	practitionerID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	input := sessiondomain.BookSessionInput{
		PractitionerID:  practitionerID,
		Type:            sessiondomain.TypeCoaching,
		Title:           "Coaching Efektivitas Kerja",
		Topic:           "Manajemen Waktu",
		Objective:       "Meningkatkan produktivitas kerja",
		SessionFormat:   "1-on-1",
		DurationMinutes: 60,
	}

	mockUsecase.EXPECT().
		BookSession(gomock.Any(), userID, gomock.Any()).
		Return(&sessiondomain.Session{
			ID:             uuid.New(),
			ClientID:       userID,
			PractitionerID: practitionerID,
			Title:          input.Title,
			Type:           input.Type,
			Status:         sessiondomain.StatusPending,
			Token:          "CMC-ABCD-1234",
		}, nil)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/sessions", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusCreated, w.Code)
	assert.Contains(t, w.Body.String(), "Session booked successfully")
	assert.Contains(t, w.Body.String(), "CMC-ABCD-1234")
}

func TestHTTPHandler_BookSession_ValidationFailed(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	// Missing title and type
	invalidInput := map[string]interface{}{
		"title": "A", // min 3 required
	}

	body, _ := json.Marshal(invalidInput)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/sessions", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusUnprocessableEntity, w.Code)
	assert.Contains(t, w.Body.String(), "VALIDATION_FAILED")
}

func TestHTTPHandler_AddMeeting_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleCoach)

	input := sessiondomain.AddMeetingInput{
		Title:         "Pertemuan Refleksi Strategis",
		MeetingType:   "Luring",
		Location:      "Ruang Rapat BPSDM",
		Summary:       "Diskusi pemetaan tujuan program",
		JPCollected:   2,
		ScheduledDate: "10 Feb 2026",
	}

	mockUsecase.EXPECT().
		AddMeeting(gomock.Any(), sessionID, userID, userdomain.RoleCoach, gomock.Any()).
		Return(&sessiondomain.Meeting{
			ID:            uuid.New(),
			SessionID:     sessionID,
			MeetingNumber: 1,
			Title:         input.Title,
			MeetingType:   "Luring",
			JPCollected:   2,
			Status:        "draft",
		}, nil)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/sessions/"+sessionID.String()+"/meetings", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusCreated, w.Code)
	assert.Contains(t, w.Body.String(), "Meeting added successfully")
}

func TestHTTPHandler_AddMeeting_ValidationFailed(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleCoach)

	// Invalid MeetingType (e.g. "Telepati" which is not oneof Luring Daring Hybrid...)
	invalidInput := sessiondomain.AddMeetingInput{
		Title:       "Pertemuan 1",
		MeetingType: "Telepati",
	}

	body, _ := json.Marshal(invalidInput)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/sessions/"+sessionID.String()+"/meetings", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusUnprocessableEntity, w.Code)
	assert.Contains(t, w.Body.String(), "VALIDATION_FAILED")
}

func TestHTTPHandler_UpdateStatus_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleCoach)

	input := sessiondomain.UpdateSessionStatusInput{
		Status: sessiondomain.StatusConfirmed,
		Notes:  "Sesi disetujui untuk dilaksanakan",
	}

	mockUsecase.EXPECT().
		UpdateStatus(gomock.Any(), sessionID, userID, userdomain.RoleCoach, input).
		Return(nil)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPatch, "/api/v1/sessions/"+sessionID.String()+"/status", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Session status updated successfully")
}

func TestHTTPHandler_DeleteMeeting_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	meetingID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleCoach)

	mockUsecase.EXPECT().
		DeleteMeeting(gomock.Any(), sessionID, meetingID, userID, userdomain.RoleCoach).
		Return(nil)

	url := "/api/v1/sessions/" + sessionID.String() + "/meetings/" + meetingID.String()
	req := httptest.NewRequest(http.MethodDelete, url, nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Meeting deleted successfully")
}

func TestHTTPHandler_GetSession_NotFound(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockSessionUsecase(ctrl)
	customValidator := validator.New()
	handler := sessiondelivery.NewSessionHandler(mockUsecase, customValidator)

	userID := uuid.New()
	sessionID := uuid.New()
	router := setupSessionTestRouter(handler, userID, userdomain.RoleClient)

	mockUsecase.EXPECT().
		GetSession(gomock.Any(), sessionID, userID, userdomain.RoleClient).
		Return(nil, sharederrors.ErrSessionNotFound)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/sessions/"+sessionID.String(), nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusNotFound, w.Code)
}

