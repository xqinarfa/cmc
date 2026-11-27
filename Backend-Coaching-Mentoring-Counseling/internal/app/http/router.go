package http

import (
	"net/http/pprof"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	"github.com/kalanara/cmc-backend/internal/config"
	authdelivery "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/http"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	healthdelivery "github.com/kalanara/cmc-backend/internal/modules/health/delivery/http"
	satkerdelivery "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/delivery/http"
	sessiondelivery "github.com/kalanara/cmc-backend/internal/modules/session/delivery/http"
	sikdelivery "github.com/kalanara/cmc-backend/internal/modules/sik/delivery/http"
	subdelivery "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/delivery/http"
	unitdelivery "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/delivery/http"
	userdelivery "github.com/kalanara/cmc-backend/internal/modules/user/delivery/http"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/middleware"

	_ "github.com/kalanara/cmc-backend/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type RouterConfig struct {
	Config             *config.Config
	JWTService         authdomain.JWTService
	BlacklistRepo      authdomain.TokenBlacklistRepository
	HealthHandler      *healthdelivery.HealthHandler
	AuthHandler        *authdelivery.AuthHandler
	UserHandler        *userdelivery.UserHandler
	SessionHandler     *sessiondelivery.SessionHandler
	SIKHandler         *sikdelivery.SIKHandler
	SatuanKerjaHandler *satkerdelivery.SatuanKerjaHandler
	UnitKerjaHandler   *unitdelivery.UnitKerjaHandler
	SubUnitKerjaHandler *subdelivery.SubUnitKerjaHandler
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

		// Module SIK (Public search, lookup by NIP, sync, reset-password & referensi)
		if cfg.SIKHandler != nil {
			sikGroup := v1Group.Group("/sik")
			{
				sikGroup.GET("/pegawai/:nip", cfg.SIKHandler.GetByNIP)
				sikGroup.GET("/pegawai/:nip/role", cfg.SIKHandler.GetRoleByNIP)
				sikGroup.POST("/pegawai/:nip/role", middleware.OptionalAuth(cfg.JWTService, cfg.BlacklistRepo), cfg.SIKHandler.UpdateRoleByNIP)
				sikGroup.PUT("/pegawai/:nip/role", middleware.OptionalAuth(cfg.JWTService, cfg.BlacklistRepo), cfg.SIKHandler.UpdateRoleByNIP)
				sikGroup.POST("/pegawai/:nip/reset-password", middleware.OptionalAuth(cfg.JWTService, cfg.BlacklistRepo), cfg.SIKHandler.ResetPassword)
				sikGroup.POST("/reset-password", middleware.OptionalAuth(cfg.JWTService, cfg.BlacklistRepo), cfg.SIKHandler.ResetPassword)
				sikGroup.GET("/pegawai", cfg.SIKHandler.ListOrSearch)
				sikGroup.GET("/referensi", cfg.SIKHandler.GetReferensi)
				sikGroup.POST("/sync", cfg.SIKHandler.SyncMaster)
				sikGroup.GET("/sync-history", cfg.SIKHandler.ListSyncHistory)
				sikGroup.GET("/sync-history/:id", cfg.SIKHandler.GetSyncHistoryDetail)
			}
		}

		// Module Satuan Kerja
		if cfg.SatuanKerjaHandler != nil {
			satkerGroup := v1Group.Group("/satuan-kerja")
			{
				satkerGroup.GET("", cfg.SatuanKerjaHandler.List)
				satkerGroup.GET("/:id", cfg.SatuanKerjaHandler.GetByID)
				satkerGroup.GET("/:id/pegawai", cfg.SatuanKerjaHandler.GetPegawai)
				satkerGroup.POST("/sync-sik", cfg.SatuanKerjaHandler.Sync)
			}
		}

		// Module Unit Kerja
		if cfg.UnitKerjaHandler != nil {
			unitGroup := v1Group.Group("/unit-kerja")
			{
				unitGroup.GET("", cfg.UnitKerjaHandler.List)
				unitGroup.GET("/:id", cfg.UnitKerjaHandler.GetByID)
				unitGroup.GET("/:id/pegawai", cfg.UnitKerjaHandler.GetPegawai)
				unitGroup.POST("/sync-sik", cfg.UnitKerjaHandler.Sync)
			}
		}

		// Module Sub Unit Kerja
		if cfg.SubUnitKerjaHandler != nil {
			subGroup := v1Group.Group("/sub-unit-kerja")
			{
				subGroup.GET("", cfg.SubUnitKerjaHandler.List)
				subGroup.GET("/:id", cfg.SubUnitKerjaHandler.GetByID)
				subGroup.GET("/:id/pegawai", cfg.SubUnitKerjaHandler.GetPegawai)
				subGroup.POST("/sync-sik", cfg.SubUnitKerjaHandler.Sync)
			}
		}

		// User SIK Synchronization (supports both authenticated user sync and public/system master sync)
		if cfg.UserHandler != nil {
			v1Group.POST("/users/sync-sik", middleware.OptionalAuth(cfg.JWTService, cfg.BlacklistRepo), cfg.UserHandler.SyncSIK)
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

			// Module SIK (Protected: get logged-in user SIK data)
			if cfg.SIKHandler != nil {
				authenticated.GET("/sik/me", cfg.SIKHandler.Me)
			}

			// Backward compatibility alias for /api/v1/auth/me
			authenticated.GET("/auth/me", cfg.UserHandler.Me)

			// Module Session
			sessionsGroup := authenticated.Group("/sessions")
			{
				sessionsGroup.POST("", middleware.RequireRoles(userdomain.RolePegawai, userdomain.RoleAdmin, userdomain.RoleSuperAdmin), cfg.SessionHandler.BookSession)
				sessionsGroup.GET("", cfg.SessionHandler.ListSessions)
				sessionsGroup.GET("/:id", cfg.SessionHandler.GetSession)
				sessionsGroup.PATCH("/:id/status", cfg.SessionHandler.UpdateStatus)
				sessionsGroup.POST("/:id/meetings", cfg.SessionHandler.AddMeeting)
				sessionsGroup.PUT("/:id/meetings/:meetingId", cfg.SessionHandler.UpdateMeeting)
				sessionsGroup.PATCH("/:id/meetings/:meetingId", cfg.SessionHandler.UpdateMeeting)
				sessionsGroup.DELETE("/:id/meetings/:meetingId", cfg.SessionHandler.DeleteMeeting)
				sessionsGroup.POST("/:id/resend-notification", cfg.SessionHandler.ResendNotification)

				// Child: session_peserta
				sessionsGroup.GET("/:id/peserta", cfg.SessionHandler.ListPeserta)
				sessionsGroup.POST("/:id/peserta", cfg.SessionHandler.AddPeserta)

				// Child: session_pertemuan
				sessionsGroup.GET("/:id/pertemuan", cfg.SessionHandler.ListPertemuan)
				sessionsGroup.GET("/:id/pertemuan/:pertemuanId/catatan", cfg.SessionHandler.ListCatatanPertemuan)

				// Child: session_pertemuan_peserta_catatan
				sessionsGroup.POST("/:id/catatan", cfg.SessionHandler.SaveCatatanPertemuan)
			}
		}
	}

	return router
}
