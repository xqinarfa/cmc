package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type UserHandler struct {
	userUsecase userdomain.UserUsecase
	sikUsecase  sikdomain.SIKUsecase
}

func NewUserHandler(userUsecase userdomain.UserUsecase, optionalSIKUsecase ...sikdomain.SIKUsecase) *UserHandler {
	var sikUsecase sikdomain.SIKUsecase
	if len(optionalSIKUsecase) > 0 {
		sikUsecase = optionalSIKUsecase[0]
	}
	return &UserHandler{
		userUsecase: userUsecase,
		sikUsecase:  sikUsecase,
	}
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

// SyncSIK forces a synchronization of the authenticated user's profile with SIK master data,
// or performs master/unit-based SIK synchronization if called without user context or with unit filters.
func (h *UserHandler) SyncSIK(c *gin.Context) {
	var req sikdomain.SIKSyncRequest
	_ = c.ShouldBindJSON(&req)

	userIDVal, exists := c.Get("UserID")
	if !exists || len(req.UnitKerjaIDs) > 0 || len(req.UnitKerjaNames) > 0 {
		// If user is unauthenticated or unit filters are provided, sync master/unit SIK data via SIK usecase
		if h.sikUsecase != nil {
			var result *sikdomain.SIKSyncResult
			var err error
			if len(req.UnitKerjaIDs) > 0 || len(req.UnitKerjaNames) > 0 {
				if len(req.UnitKerjaIDs) > 5 || len(req.UnitKerjaNames) > 5 {
					response.Error(c, http.StatusBadRequest, "MAX_UNITS_EXCEEDED", "Maksimal 5 kantor untuk disinkronkan secara bersamaan", nil)
					return
				}
				result, err = h.sikUsecase.SyncUnits(c.Request.Context(), req.UnitKerjaIDs, req.UnitKerjaNames)
			} else {
				result, err = h.sikUsecase.SyncMaster(c.Request.Context())
			}

			if err != nil {
				response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", gin.H{"status": "ok"})
				return
			}
			response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", result)
			return
		}
		response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", gin.H{"status": "ok"})
		return
	}

	userID, ok := userIDVal.(uuid.UUID)
	if !ok {
		// Fallback to master sync
		if h.sikUsecase != nil {
			result, _ := h.sikUsecase.SyncMaster(c.Request.Context())
			response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", result)
			return
		}
		response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", gin.H{"status": "ok"})
		return
	}

	profile, err := h.userUsecase.SyncSIK(c.Request.Context(), userID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Profil berhasil disinkronisasi dengan data SIK Kemenhub", profile)
}

// ListPractitioners lists practitioners filtered by role (super_admin, admin, pegawai).
// If role is omitted, returns all practitioners/pegawai.
func (h *UserHandler) ListPractitioners(c *gin.Context) {
	roleStr := c.Query("role")
	var role userdomain.Role
	if roleStr != "" {
		role = userdomain.Role(roleStr).Normalize()
		if !role.IsValid() {
			response.Error(c, http.StatusBadRequest, "INVALID_ROLE", "Role must be one of: super_admin, admin, pegawai", nil)
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
