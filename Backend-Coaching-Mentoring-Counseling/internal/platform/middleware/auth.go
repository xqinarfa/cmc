package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

const (
	ContextKeyClaims = "JWTClaims"
	ContextKeyUserID = "UserID"
	ContextKeyRole   = "UserRole"
)

func Auth(jwtService authdomain.JWTService, blacklistRepo authdomain.TokenBlacklistRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Authorization header is required", nil)
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			response.Error(c, http.StatusUnauthorized, "INVALID_TOKEN_FORMAT", "Authorization header must be Bearer <token>", nil)
			c.Abort()
			return
		}

		tokenString := parts[1]
		claims, err := jwtService.ValidateToken(tokenString)
		if err != nil {
			response.HandleDomainError(c, err)
			c.Abort()
			return
		}

		if blacklistRepo != nil && claims.ID != "" {
			isBlacklisted, err := blacklistRepo.IsTokenBlacklisted(c.Request.Context(), claims.ID)
			if err == nil && isBlacklisted {
				response.Error(c, http.StatusUnauthorized, "TOKEN_REVOKED", "Token has been revoked or logged out", nil)
				c.Abort()
				return
			}
		}

		c.Set(ContextKeyClaims, claims)
		c.Set(ContextKeyUserID, claims.UserID)
		c.Set(ContextKeyRole, claims.Role)

		c.Next()
	}
}

func RequireRoles(allowedRoles ...userdomain.Role) gin.HandlerFunc {
	roleMap := make(map[userdomain.Role]bool, len(allowedRoles))
	for _, r := range allowedRoles {
		roleMap[r] = true
	}

	return func(c *gin.Context) {
		roleVal, exists := c.Get(ContextKeyRole)
		if !exists {
			response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "User identity not found in request context", nil)
			c.Abort()
			return
		}

		userRole, ok := roleVal.(userdomain.Role)
		if !ok || !roleMap[userRole] {
			response.Error(c, http.StatusForbidden, "FORBIDDEN", "You do not have the required role to access this resource", nil)
			c.Abort()
			return
		}

		c.Next()
	}
}
