package middleware

import (
	"log/slog"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/kalanara/cmc-backend/pkg/response"
)

func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				reqID, _ := c.Get("RequestID")
				reqIDStr, _ := reqID.(string)

				slog.Error("HTTP panic recovered",
					slog.Any("error", r),
					slog.String("request_id", reqIDStr),
					slog.String("stack", string(debug.Stack())),
				)

				response.Error(c, http.StatusInternalServerError, "INTERNAL_SERVER_ERROR", "A critical error occurred while processing the request", nil)
				c.Abort()
			}
		}()
		c.Next()
	}
}
