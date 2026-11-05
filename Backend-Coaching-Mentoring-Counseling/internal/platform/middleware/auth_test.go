package middleware_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/middleware"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/test/mocks"
)

func TestAuthMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Missing Authorization Header", func(t *testing.T) {
		router := gin.New()
		router.Use(middleware.Auth(nil, nil))
		router.GET("/protected", func(c *gin.Context) {
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusUnauthorized, w.Code)
		assert.Contains(t, w.Body.String(), "UNAUTHORIZED")
	})

	t.Run("Malformed Authorization Header", func(t *testing.T) {
		router := gin.New()
		router.Use(middleware.Auth(nil, nil))
		router.GET("/protected", func(c *gin.Context) {
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.Header.Set("Authorization", "Basic 123456")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusUnauthorized, w.Code)
		assert.Contains(t, w.Body.String(), "INVALID_TOKEN_FORMAT")
	})

	t.Run("Invalid JWT Token", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockJWT := mocks.NewMockJWTService(ctrl)
		mockJWT.EXPECT().ValidateToken("badtoken").Return(nil, sharederrors.ErrInvalidToken)

		router := gin.New()
		router.Use(middleware.Auth(mockJWT, nil))
		router.GET("/protected", func(c *gin.Context) {
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.Header.Set("Authorization", "Bearer badtoken")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusUnauthorized, w.Code)
	})

	t.Run("Valid Token Sets Context", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		userID := uuid.New()
		mockClaims := &authdomain.JWTClaims{
			UserID:   userID,
			Email:    "user@dephub.go.id",
			Role:     userdomain.RoleClient,
			FullName: "Test User",
		}

		mockJWT := mocks.NewMockJWTService(ctrl)
		mockJWT.EXPECT().ValidateToken("validtoken").Return(mockClaims, nil)

		router := gin.New()
		router.Use(middleware.Auth(mockJWT, nil))
		router.GET("/protected", func(c *gin.Context) {
			val, _ := c.Get(middleware.ContextKeyUserID)
			assert.Equal(t, userID, val)
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.Header.Set("Authorization", "Bearer validtoken")
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusOK, w.Code)
	})
}

func TestRequireRolesMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Allowed Role Passes", func(t *testing.T) {
		router := gin.New()
		router.Use(func(c *gin.Context) {
			c.Set(middleware.ContextKeyRole, userdomain.RoleCoach)
			c.Next()
		})
		router.Use(middleware.RequireRoles(userdomain.RoleCoach, userdomain.RoleAdmin))
		router.GET("/coach-only", func(c *gin.Context) {
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/coach-only", nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("Disallowed Role Returns Forbidden", func(t *testing.T) {
		router := gin.New()
		router.Use(func(c *gin.Context) {
			c.Set(middleware.ContextKeyRole, userdomain.RoleClient)
			c.Next()
		})
		router.Use(middleware.RequireRoles(userdomain.RoleCoach))
		router.GET("/coach-only", func(c *gin.Context) {
			c.Status(http.StatusOK)
		})

		req := httptest.NewRequest(http.MethodGet, "/coach-only", nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		require.Equal(t, http.StatusForbidden, w.Code)
		assert.Contains(t, w.Body.String(), "FORBIDDEN")
	})
}
