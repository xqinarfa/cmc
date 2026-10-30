package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
	"github.com/kalanara/cmc-backend/pkg/validator"
)

type SessionHandler struct {
	sessionUsecase sessiondomain.SessionUsecase
	validator      *validator.CustomValidator
}

func NewSessionHandler(sessionUsecase sessiondomain.SessionUsecase, validator *validator.CustomValidator) *SessionHandler {
	return &SessionHandler{
		sessionUsecase: sessionUsecase,
		validator:      validator,
	}
}

// BookSession godoc
// @Summary      Book a new Coaching / Mentoring / Counseling Session
// @Description  Create a new session, auto-generates pairing token (CMC-XXXX-XXXX)
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        request body sessiondomain.BookSessionInput true "Session Booking Payload"
// @Success      201  {object}  map[string]interface{} "Session booked successfully"
// @Failure      400  {object}  map[string]interface{} "Validation failed"
// @Failure      401  {object}  map[string]interface{} "Unauthorized"
// @Router       /api/v1/sessions [post]
func (h *SessionHandler) BookSession(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)

	var input sessiondomain.BookSessionInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	session, err := h.sessionUsecase.BookSession(c.Request.Context(), userID, input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusCreated, "Session booked successfully", session)
}

// GetSession godoc
// @Summary      Get Session Detail by ID
// @Description  Retrieves session details, practitioner, client, and all meetings
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id   path      string  true  "Session UUID"
// @Success      200  {object}  map[string]interface{} "Session details retrieved"
// @Failure      400  {object}  map[string]interface{} "Invalid ID"
// @Failure      404  {object}  map[string]interface{} "Session not found"
// @Router       /api/v1/sessions/{id} [get]
func (h *SessionHandler) GetSession(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)
	roleVal, _ := c.Get("UserRole")
	role := roleVal.(userdomain.Role)

	idParam := c.Param("id")
	sessionID, err := uuid.Parse(idParam)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Session ID must be a valid UUID", nil)
		return
	}

	session, err := h.sessionUsecase.GetSession(c.Request.Context(), sessionID, userID, role)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Session details retrieved", session)
}

// ListSessions godoc
// @Summary      List User Sessions
// @Description  Retrieves list of sessions for current authenticated user with optional filter & search
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        status query string false "Filter by status: pending, confirmed, completed, rejected, cancelled"
// @Param        type   query string false "Filter by type: coaching, mentoring, counseling"
// @Param        search query string false "Search query by title or topic"
// @Success      200  {object}  map[string]interface{} "Sessions retrieved successfully"
// @Router       /api/v1/sessions [get]
func (h *SessionHandler) ListSessions(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)
	roleVal, _ := c.Get("UserRole")
	role := roleVal.(userdomain.Role)

	sessions, err := h.sessionUsecase.ListUserSessions(c.Request.Context(), userID, role)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	statusFilter := strings.ToLower(strings.TrimSpace(c.Query("status")))
	typeFilter := strings.ToLower(strings.TrimSpace(c.Query("type")))
	search := strings.ToLower(strings.TrimSpace(c.Query("search")))

	if statusFilter != "" || typeFilter != "" || search != "" {
		filtered := make([]sessiondomain.Session, 0, len(sessions))
		for _, s := range sessions {
			if statusFilter != "" && strings.ToLower(string(s.Status)) != statusFilter {
				continue
			}
			if typeFilter != "" && strings.ToLower(string(s.Type)) != typeFilter {
				continue
			}
			if search != "" {
				titleMatch := strings.Contains(strings.ToLower(s.Title), search)
				topicMatch := strings.Contains(strings.ToLower(s.Topic), search)
				tokenMatch := strings.Contains(strings.ToLower(s.Token), search)
				if !titleMatch && !topicMatch && !tokenMatch {
					continue
				}
			}
			filtered = append(filtered, s)
		}
		sessions = filtered
	}

	response.JSON(c, http.StatusOK, "Sessions retrieved successfully", sessions)
}

// UpdateStatus godoc
// @Summary      Update Session Status
// @Description  Change session status (pending, confirmed, completed, cancelled, rejected)
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        id      path string                                  true "Session UUID"
// @Param        request body sessiondomain.UpdateSessionStatusInput true "Status Payload"
// @Success      200  {object}  map[string]interface{} "Status updated successfully"
// @Router       /api/v1/sessions/{id}/status [patch]
func (h *SessionHandler) UpdateStatus(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)
	roleVal, _ := c.Get("UserRole")
	role := roleVal.(userdomain.Role)

	idParam := c.Param("id")
	sessionID, err := uuid.Parse(idParam)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Session ID must be a valid UUID", nil)
		return
	}

	var input sessiondomain.UpdateSessionStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	if err := h.sessionUsecase.UpdateStatus(c.Request.Context(), sessionID, userID, role, input); err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Session status updated successfully", nil)
}

// AddMeeting godoc
// @Summary      Add Meeting to Session
// @Description  Append an individual meeting record (Pertemuan) into a session
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        id      path string                         true "Session UUID"
// @Param        request body sessiondomain.AddMeetingInput  true "Meeting Payload"
// @Success      201  {object}  map[string]interface{} "Meeting added successfully"
// @Router       /api/v1/sessions/{id}/meetings [post]
func (h *SessionHandler) AddMeeting(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)
	roleVal, _ := c.Get("UserRole")
	role := roleVal.(userdomain.Role)

	idParam := c.Param("id")
	sessionID, err := uuid.Parse(idParam)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Session ID must be a valid UUID", nil)
		return
	}

	var input sessiondomain.AddMeetingInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	meeting, err := h.sessionUsecase.AddMeeting(c.Request.Context(), sessionID, userID, role, input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusCreated, "Meeting added successfully", meeting)
}

// DeleteMeeting godoc
// @Summary      Delete Meeting Draft
// @Description  Removes a meeting draft from a session
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id         path string true "Session UUID"
// @Param        meetingId  path string true "Meeting UUID"
// @Success      200  {object}  map[string]interface{} "Meeting deleted successfully"
// @Router       /api/v1/sessions/{id}/meetings/{meetingId} [delete]
func (h *SessionHandler) DeleteMeeting(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)
	roleVal, _ := c.Get("UserRole")
	role := roleVal.(userdomain.Role)

	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	meetingID, err := uuid.Parse(c.Param("meetingId"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid meeting UUID", nil)
		return
	}

	if err := h.sessionUsecase.DeleteMeeting(c.Request.Context(), sessionID, meetingID, userID, role); err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Meeting deleted successfully", nil)
}

// ResendNotification godoc
// @Summary      Resend Session Notification
// @Description  Sends an immediate notification reminder to Coach / Mentor
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id   path string true "Session UUID"
// @Success      200  {object}  map[string]interface{} "Reminder sent successfully"
// @Router       /api/v1/sessions/{id}/resend-notification [post]
func (h *SessionHandler) ResendNotification(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}
	userID := userIDVal.(uuid.UUID)

	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	if err := h.sessionUsecase.ResendNotification(c.Request.Context(), sessionID, userID); err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Notification reminder sent successfully", nil)
}
