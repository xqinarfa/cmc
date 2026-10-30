package middleware

import (
	"log/slog"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kalanara/cmc-backend/internal/platform/metrics"
)

func StructuredLogger() gin.HandlerFunc {
	promMetrics := metrics.GetMetrics()

	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		rawQuery := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		statusCode := c.Writer.Status()
		clientIP := c.ClientIP()
		method := c.Request.Method
		reqID, _ := c.Get("RequestID")
		reqIDStr, _ := reqID.(string)

		if rawQuery != "" {
			path = path + "?" + rawQuery
		}

		promMetrics.HTTPRequestsTotal.WithLabelValues(method, c.FullPath(), strconv.Itoa(statusCode)).Inc()
		promMetrics.HTTPRequestDuration.WithLabelValues(method, c.FullPath()).Observe(latency.Seconds())

		logLevel := slog.LevelInfo
		if statusCode >= 500 {
			logLevel = slog.LevelError
		} else if statusCode >= 400 {
			logLevel = slog.LevelWarn
		}

		slog.Log(c.Request.Context(), logLevel, "HTTP Request",
			slog.String("request_id", reqIDStr),
			slog.String("method", method),
			slog.String("path", path),
			slog.Int("status", statusCode),
			slog.Duration("latency", latency),
			slog.String("client_ip", clientIP),
			slog.String("user_agent", c.Request.UserAgent()),
		)
	}
}
