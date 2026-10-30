package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type UserHandler struct {
	userUsecase userdomain.UserUsecase
}

func NewUserHandler(userUsecase userdomain.UserUsecase) *UserHandler {
	return &UserHandler{userUsecase: userUsecase}
}

// Me retrieves the authenticated user's profile.
func (h *UserHandler) Me(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}

	userID, ok := userIDVal.(uuid.UUID)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Invalid user id", nil)
		return
	}

	profile, err := h.userUsecase.GetProfile(c.Request.Context(), userID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "User profile retrieved", profile)
}

// ListPractitioners lists practitioners filtered by role (coach, mentor, counselor).
// If role is omitted, returns all coaches, mentors, and counselors.
func (h *UserHandler) ListPractitioners(c *gin.Context) {
	roleStr := c.Query("role")
	var role userdomain.Role
	if roleStr != "" {
		role = userdomain.Role(roleStr)
		if !role.IsValid() {
			response.Error(c, http.StatusBadRequest, "INVALID_ROLE", "Role must be one of: coach, mentor, counselor", nil)
			return
		}
	}

	practitioners, err := h.userUsecase.ListPractitioners(c.Request.Context(), role)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Practitioners retrieved", practitioners)
}
