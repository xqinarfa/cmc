package http

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	platformdb "github.com/kalanara/cmc-backend/internal/platform/database"
	platformminio "github.com/kalanara/cmc-backend/internal/platform/minio"
	platformnats "github.com/kalanara/cmc-backend/internal/platform/nats"
	platformredis "github.com/kalanara/cmc-backend/internal/platform/redis"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type HealthHandler struct {
	db    *platformdb.DB
	redis *platformredis.Client
	nats  *platformnats.Client
	minio *platformminio.Client
}

func NewHealthHandler(
	db *platformdb.DB,
	redis *platformredis.Client,
	nats *platformnats.Client,
	minio *platformminio.Client,
) *HealthHandler {
	return &HealthHandler{
		db:    db,
		redis: redis,
		nats:  nats,
		minio: minio,
	}
}

func (h *HealthHandler) Healthz(c *gin.Context) {
	response.JSON(c, http.StatusOK, "Service is alive", gin.H{
		"status": "UP",
		"time":   time.Now().UTC(),
	})
}

func (h *HealthHandler) Readyz(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Second)
	defer cancel()

	checks := make(map[string]string)
	allHealthy := true

	if h.db != nil {
		if err := h.db.Ping(ctx); err != nil {
			checks["postgres"] = "DOWN: " + err.Error()
			allHealthy = false
		} else {
			checks["postgres"] = "UP"
		}
	} else {
		checks["postgres"] = "UNCONFIGURED"
	}

	if h.redis != nil {
		if err := h.redis.Ping(ctx); err != nil {
			checks["redis"] = "DOWN: " + err.Error()
			allHealthy = false
		} else {
			checks["redis"] = "UP"
		}
	} else {
		checks["redis"] = "UNCONFIGURED"
	}

	if h.nats != nil {
		if err := h.nats.Ping(); err != nil {
			checks["nats"] = "DOWN: " + err.Error()
			allHealthy = false
		} else {
			checks["nats"] = "UP"
		}
	} else {
		checks["nats"] = "UNCONFIGURED"
	}

	if h.minio != nil {
		if err := h.minio.Ping(ctx); err != nil {
			checks["minio"] = "DOWN: " + err.Error()
			allHealthy = false
		} else {
			checks["minio"] = "UP"
		}
	} else {
		checks["minio"] = "UNCONFIGURED"
	}

	status := http.StatusOK
	if !allHealthy {
		status = http.StatusServiceUnavailable
	}

	c.JSON(status, gin.H{
		"ready":      allHealthy,
		"components": checks,
		"time":       time.Now().UTC(),
	})
}
