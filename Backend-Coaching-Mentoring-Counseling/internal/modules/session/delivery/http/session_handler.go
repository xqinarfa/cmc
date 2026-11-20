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

// UpdateMeeting godoc
// @Summary      Update Meeting
// @Description  Update details of an existing meeting in a session
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        id         path string                            true "Session UUID"
// @Param        meetingId  path string                            true "Meeting UUID"
// @Param        request    body sessiondomain.UpdateMeetingInput  true "Meeting Payload"
// @Success      200  {object}  map[string]interface{} "Meeting updated successfully"
// @Router       /api/v1/sessions/{id}/meetings/{meetingId} [put]
func (h *SessionHandler) UpdateMeeting(c *gin.Context) {
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

	meetingIDParam := c.Param("meetingId")
	meetingID, err := uuid.Parse(meetingIDParam)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Meeting ID must be a valid UUID", nil)
		return
	}

	var input sessiondomain.UpdateMeetingInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	meeting, err := h.sessionUsecase.UpdateMeeting(c.Request.Context(), sessionID, meetingID, userID, role, input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Meeting updated successfully", meeting)
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

// ListPeserta godoc
// @Summary      List Session Participants (session_peserta)
// @Description  Get all participants enrolled in a session
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id   path string true "Session UUID"
// @Success      200  {object}  map[string]interface{}
// @Router       /api/v1/sessions/{id}/peserta [get]
func (h *SessionHandler) ListPeserta(c *gin.Context) {
	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	list, err := h.sessionUsecase.ListPeserta(c.Request.Context(), sessionID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Peserta retrieved successfully", list)
}

// AddPeserta godoc
// @Summary      Add Participant to Session (session_peserta)
// @Description  Enrolls an employee into a group session
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        id       path string                     true "Session UUID"
// @Param        request  body sessiondomain.PesertaInput true "Peserta Payload"
// @Success      201  {object}  map[string]interface{}
// @Router       /api/v1/sessions/{id}/peserta [post]
func (h *SessionHandler) AddPeserta(c *gin.Context) {
	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	var input sessiondomain.PesertaInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	peserta, err := h.sessionUsecase.AddPeserta(c.Request.Context(), sessionID, input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusCreated, "Peserta added successfully", peserta)
}

// ListPertemuan godoc
// @Summary      List Session Meetings (session_pertemuan)
// @Description  Get list of all meetings/agenda in a session
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id   path string true "Session UUID"
// @Success      200  {object}  map[string]interface{}
// @Router       /api/v1/sessions/{id}/pertemuan [get]
func (h *SessionHandler) ListPertemuan(c *gin.Context) {
	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	list, err := h.sessionUsecase.ListPertemuan(c.Request.Context(), sessionID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Pertemuan retrieved successfully", list)
}

// SaveCatatanPertemuan godoc
// @Summary      Save Meeting Notes per Participant (session_pertemuan_peserta_catatan)
// @Description  Record participant discussion notes, reflections, action plans, and claim JP
// @Tags         sessions
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Param        id       path string                                     true "Session UUID"
// @Param        request  body sessiondomain.CatatPertemuanPesertaInput    true "Catatan Payload"
// @Success      200  {object}  map[string]interface{}
// @Router       /api/v1/sessions/{id}/catatan [post]
func (h *SessionHandler) SaveCatatanPertemuan(c *gin.Context) {
	sessionID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid session UUID", nil)
		return
	}

	var input sessiondomain.CatatPertemuanPesertaInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	// Auto-fill NIP and Nama from token context if not passed or empty
	if strings.TrimSpace(input.NIP) == "" {
		if nipVal, exists := c.Get("UserNIP"); exists {
			input.NIP = nipVal.(string)
		}
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	catatan, err := h.sessionUsecase.SaveCatatanPertemuan(c.Request.Context(), sessionID, input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Catatan pertemuan berhasil disimpan", catatan)
}

// ListCatatanPertemuan godoc
// @Summary      List Meeting Notes by Pertemuan ID
// @Description  Get participant notes for a specific meeting
// @Tags         sessions
// @Produce      json
// @Security     BearerAuth
// @Param        id           path string true "Session UUID"
// @Param        pertemuanId  path string true "Pertemuan UUID"
// @Success      200  {object}  map[string]interface{}
// @Router       /api/v1/sessions/{id}/pertemuan/{pertemuanId}/catatan [get]
func (h *SessionHandler) ListCatatanPertemuan(c *gin.Context) {
	pertemuanID, err := uuid.Parse(c.Param("pertemuanId"))
	if err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_ID", "Invalid pertemuan UUID", nil)
		return
	}

	list, err := h.sessionUsecase.ListCatatanPertemuan(c.Request.Context(), pertemuanID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Catatan pertemuan retrieved successfully", list)
}
