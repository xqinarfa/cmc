package middleware_test

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kalanara/cmc-backend/internal/config"
	"github.com/kalanara/cmc-backend/internal/platform/middleware"
)

func TestRateLimiter(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := config.RateLimitConfig{
		Enabled:  true,
		Requests: 2,
		Window:   1 * time.Minute,
		Burst:    2,
	}

	router := gin.New()
	router.Use(middleware.RateLimiter(cfg))
	router.GET("/test", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	req1 := httptest.NewRequest(http.MethodGet, "/test", nil)
	w1 := httptest.NewRecorder()
	router.ServeHTTP(w1, req1)
	if w1.Code != http.StatusOK {
		t.Fatalf("expected request 1 to return 200, got %d", w1.Code)
	}

	req2 := httptest.NewRequest(http.MethodGet, "/test", nil)
	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)
	if w2.Code != http.StatusOK {
		t.Fatalf("expected request 2 to return 200, got %d", w2.Code)
	}

	req3 := httptest.NewRequest(http.MethodGet, "/test", nil)
	w3 := httptest.NewRecorder()
	router.ServeHTTP(w3, req3)
	if w3.Code != http.StatusTooManyRequests {
		t.Fatalf("expected request 3 to be rate-limited (429), got %d", w3.Code)
	}
}
