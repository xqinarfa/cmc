package http

import (
	"net/http/pprof"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/kalanara/cmc-backend/internal/config"
	authdelivery "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/http"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	healthdelivery "github.com/kalanara/cmc-backend/internal/modules/health/delivery/http"
	sessiondelivery "github.com/kalanara/cmc-backend/internal/modules/session/delivery/http"
	userdelivery "github.com/kalanara/cmc-backend/internal/modules/user/delivery/http"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/middleware"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "github.com/kalanara/cmc-backend/docs"
)

type RouterConfig struct {
	Config         *config.Config
	JWTService     authdomain.JWTService
	BlacklistRepo  authdomain.TokenBlacklistRepository
	HealthHandler  *healthdelivery.HealthHandler
	AuthHandler    *authdelivery.AuthHandler
	UserHandler    *userdelivery.UserHandler
	SessionHandler *sessiondelivery.SessionHandler
}

func SetupRouter(cfg *RouterConfig) *gin.Engine {
	if cfg.Config.App.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	// Global Middlewares
	router.Use(middleware.RequestID())
	router.Use(middleware.StructuredLogger())
	router.Use(middleware.Recovery())
	router.Use(middleware.CORS(cfg.Config.HTTP.CORSOrigins))
	router.Use(middleware.RateLimiter(cfg.Config.RateLimit))
	router.Use(middleware.Timeout(cfg.Config.HTTP.ContextTimeout))

	// Health Check Probes
	router.GET("/healthz", cfg.HealthHandler.Healthz)
	router.GET("/readyz", cfg.HealthHandler.Readyz)

	// EduHub SSO Entry Points (sesuai Panduan SSO hal. 3)
	// EduHub akan redirect ke: https://domain-mitra.go.id/api/sso?token=...
	// atau: https://domain-mitra.go.id/sso?token=...
	router.GET("/api/sso", cfg.AuthHandler.LoginEduhub)
	router.GET("/sso", cfg.AuthHandler.LoginEduhub)

	// Prometheus Metrics Endpoint
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	// Go pprof Profiling endpoints
	pprofGroup := router.Group("/debug/pprof")
	{
		pprofGroup.GET("/", gin.WrapF(pprof.Index))
		pprofGroup.GET("/cmdline", gin.WrapF(pprof.Cmdline))
		pprofGroup.GET("/profile", gin.WrapF(pprof.Profile))
		pprofGroup.POST("/symbol", gin.WrapF(pprof.Symbol))
		pprofGroup.GET("/symbol", gin.WrapF(pprof.Symbol))
		pprofGroup.GET("/trace", gin.WrapF(pprof.Trace))
		pprofGroup.GET("/allocs", gin.WrapH(pprof.Handler("allocs")))
		pprofGroup.GET("/block", gin.WrapH(pprof.Handler("block")))
		pprofGroup.GET("/goroutine", gin.WrapH(pprof.Handler("goroutine")))
		pprofGroup.GET("/heap", gin.WrapH(pprof.Handler("heap")))
		pprofGroup.GET("/mutex", gin.WrapH(pprof.Handler("mutex")))
		pprofGroup.GET("/threadcreate", gin.WrapH(pprof.Handler("threadcreate")))
	}

	// Swagger Documentation UI
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Direct /auth alias routes (compatible with KMS API contract)
	directAuthGroup := router.Group("/auth")
	{
		directAuthGroup.POST("/register", cfg.AuthHandler.Register)
		directAuthGroup.POST("/login", cfg.AuthHandler.Login)
		directAuthGroup.POST("/refresh", cfg.AuthHandler.RefreshToken)
		directAuthGroup.POST("/sso", cfg.AuthHandler.LoginSSO)
		directAuthGroup.GET("/sso", cfg.AuthHandler.LoginEduhub)
		directAuthGroup.GET("/sso/url", cfg.AuthHandler.GetSSOURL)
		directAuthGroup.GET("/google", cfg.AuthHandler.RedirectGoogle)
		directAuthGroup.GET("/google/callback", cfg.AuthHandler.GoogleCallback)
		directAuthGroup.POST("/google", cfg.AuthHandler.LoginGoogle)
	}

	// API v1 Routes grouped by modules
	v1Group := router.Group("/api/v1")
	{
		// Module Auth (Public)
		authGroup := v1Group.Group("/auth")
		{
			authGroup.POST("/register", cfg.AuthHandler.Register)
			authGroup.POST("/login", cfg.AuthHandler.Login)
			authGroup.POST("/refresh", cfg.AuthHandler.RefreshToken)
			authGroup.POST("/sso", cfg.AuthHandler.LoginSSO)
			authGroup.GET("/sso", cfg.AuthHandler.LoginEduhub)
			authGroup.GET("/sso/url", cfg.AuthHandler.GetSSOURL)
			authGroup.GET("/google", cfg.AuthHandler.RedirectGoogle)
			authGroup.GET("/google/callback", cfg.AuthHandler.GoogleCallback)
			authGroup.POST("/google", cfg.AuthHandler.LoginGoogle)
		}

		// Authenticated Routes
		authMiddleware := middleware.Auth(cfg.JWTService, cfg.BlacklistRepo)
		authenticated := v1Group.Group("")
		authenticated.Use(authMiddleware)
		{
			// Module Auth (Protected)
			authenticated.POST("/auth/logout", cfg.AuthHandler.Logout)

			// Module User
			userGroup := authenticated.Group("/users")
			{
				userGroup.GET("/me", cfg.UserHandler.Me)
				userGroup.GET("/practitioners", cfg.UserHandler.ListPractitioners)
			}

			// Backward compatibility alias for /api/v1/auth/me
			authenticated.GET("/auth/me", cfg.UserHandler.Me)

			// Module Session
			sessionsGroup := authenticated.Group("/sessions")
			{
				sessionsGroup.POST("", middleware.RequireRoles(userdomain.RoleClient, userdomain.RoleAdmin), cfg.SessionHandler.BookSession)
				sessionsGroup.GET("", cfg.SessionHandler.ListSessions)
				sessionsGroup.GET("/:id", cfg.SessionHandler.GetSession)
				sessionsGroup.PATCH("/:id/status", cfg.SessionHandler.UpdateStatus)
				sessionsGroup.POST("/:id/meetings", cfg.SessionHandler.AddMeeting)
				sessionsGroup.DELETE("/:id/meetings/:meetingId", cfg.SessionHandler.DeleteMeeting)
				sessionsGroup.POST("/:id/resend-notification", cfg.SessionHandler.ResendNotification)
			}
		}
	}

	return router
}
