package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"

	"github.com/kalanara/cmc-backend/internal/config"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type clientLimiter struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

type IPRateLimiter struct {
	mu      sync.RWMutex
	clients map[string]*clientLimiter
	r       rate.Limit
	b       int
}

func NewIPRateLimiter(r rate.Limit, b int) *IPRateLimiter {
	limiter := &IPRateLimiter{
		clients: make(map[string]*clientLimiter),
		r:       r,
		b:       b,
	}

	go limiter.cleanupStaleClients()

	return limiter
}

func (i *IPRateLimiter) getClient(ip string) *rate.Limiter {
	i.mu.Lock()
	defer i.mu.Unlock()

	client, exists := i.clients[ip]
	if !exists {
		lim := rate.NewLimiter(i.r, i.b)
		i.clients[ip] = &clientLimiter{limiter: lim, lastSeen: time.Now()}
		return lim
	}

	client.lastSeen = time.Now()
	return client.limiter
}

func (i *IPRateLimiter) cleanupStaleClients() {
	for {
		time.Sleep(3 * time.Minute)
		i.mu.Lock()
		for ip, client := range i.clients {
			if time.Since(client.lastSeen) > 5*time.Minute {
				delete(i.clients, ip)
			}
		}
		i.mu.Unlock()
	}
}

func RateLimiter(cfg config.RateLimitConfig) gin.HandlerFunc {
	if !cfg.Enabled {
		return func(c *gin.Context) {
			c.Next()
		}
	}

	limit := rate.Every(cfg.Window / time.Duration(cfg.Requests))
	ipLimiter := NewIPRateLimiter(limit, cfg.Burst)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		limiter := ipLimiter.getClient(ip)

		if !limiter.Allow() {
			response.Error(c, http.StatusTooManyRequests, "RATE_LIMIT_EXCEEDED", "Too many requests, please slow down and retry", nil)
			c.Abort()
			return
		}

		c.Next()
	}
}
