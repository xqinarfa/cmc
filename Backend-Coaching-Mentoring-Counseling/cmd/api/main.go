package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	appgrpc "github.com/kalanara/cmc-backend/internal/app/grpc"
	apphttp "github.com/kalanara/cmc-backend/internal/app/http"
	"github.com/kalanara/cmc-backend/internal/config"
	authdelivery "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/http"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	authgrpc "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc"
	authrepo "github.com/kalanara/cmc-backend/internal/modules/auth/repository"
	authusecase "github.com/kalanara/cmc-backend/internal/modules/auth/usecase"
	healthdelivery "github.com/kalanara/cmc-backend/internal/modules/health/delivery/http"
	satkerdelivery "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/delivery/http"
	satkerrepo "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/repository"
	satkerusecase "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/usecase"
	sessiondelivery "github.com/kalanara/cmc-backend/internal/modules/session/delivery/http"
	sessionrepo "github.com/kalanara/cmc-backend/internal/modules/session/repository"
	sessionusecase "github.com/kalanara/cmc-backend/internal/modules/session/usecase"
	sikdelivery "github.com/kalanara/cmc-backend/internal/modules/sik/delivery/http"
	sikrepo "github.com/kalanara/cmc-backend/internal/modules/sik/repository"
	sikusecase "github.com/kalanara/cmc-backend/internal/modules/sik/usecase"
	subdelivery "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/delivery/http"
	subrepo "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/repository"
	subusecase "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/usecase"
	unitdelivery "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/delivery/http"
	unitrepo "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/repository"
	unitusecase "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/usecase"
	userdelivery "github.com/kalanara/cmc-backend/internal/modules/user/delivery/http"
	userrepo "github.com/kalanara/cmc-backend/internal/modules/user/repository"
	userusecase "github.com/kalanara/cmc-backend/internal/modules/user/usecase"
	platformdb "github.com/kalanara/cmc-backend/internal/platform/database"
	platformlogger "github.com/kalanara/cmc-backend/internal/platform/logger"
	platformmetrics "github.com/kalanara/cmc-backend/internal/platform/metrics"
	platformminio "github.com/kalanara/cmc-backend/internal/platform/minio"
	platformnats "github.com/kalanara/cmc-backend/internal/platform/nats"
	platformredis "github.com/kalanara/cmc-backend/internal/platform/redis"
	platformsecurity "github.com/kalanara/cmc-backend/internal/platform/security"
	"github.com/kalanara/cmc-backend/pkg/validator"
)

// @title           Coaching, Mentoring & Counseling API
// @version         2.0
// @description     Enterprise Backend Service for Coaching, Mentoring & Counseling (CMC) Kementerian Perhubungan RI.
// @termsOfService  https://bpsdm.kemenhub.go.id/terms

// @contact.name    Tim Pengembang CMC Kemenhub
// @contact.url     https://bpsdm.kemenhub.go.id
// @contact.email   layanan.cmc@dephub.go.id

// @license.name    Proprietary
// @license.url     https://bpsdm.kemenhub.go.id

// @host      localhost:8080
// @BasePath  /
// @schemes   http https

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and the JWT token.

func main() {
	// 1. Load strongly-typed environment config
	cfg, err := config.Load()
	if err != nil {
		fmt.Fprintf(os.Stderr, "FATAL: Failed to load application configuration: %v\n", err)
		os.Exit(1)
	}

	// 2. Initialize structured logging (slog)
	appLogger := platformlogger.InitLogger(cfg.App)
	appLogger.Info("Starting Coaching, Mentoring & Counseling Backend API (Modular Architecture)",
		"version", "2.0.0",
		"env", cfg.App.Environment,
		"http_port", cfg.HTTP.Port,
		"grpc_port", cfg.GRPC.Port,
	)

	// 3. Initialize Prometheus Metrics
	_ = platformmetrics.InitMetrics()

	// 4. Platform: Database (PostgreSQL + GORM)
	db, err := platformdb.NewDB(cfg.Database)
	if err != nil {
		appLogger.Error("Failed to initialize PostgreSQL connection", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	// 5. Platform: Redis
	redisClient, err := platformredis.NewClient(cfg.Redis)
	if err != nil {
		appLogger.Warn("Redis connection failed (caching/blacklist may be degraded)", "error", err)
	} else {
		defer redisClient.Close()
	}

	// 6. Platform: NATS JetStream
	natsClient, err := platformnats.NewClient(cfg.NATS)
	if err != nil {
		appLogger.Warn("NATS connection failed (event streaming may be degraded)", "error", err)
	} else {
		defer natsClient.Close()
	}

	// 7. Platform: MinIO S3 Object Storage
	minioClient, err := platformminio.NewClient(cfg.MinIO)
	if err != nil {
		appLogger.Warn("MinIO client initialization failed (object storage degraded)", "error", err)
	}

	// 8. Platform: Security & Validator
	passwordHasher := platformsecurity.NewPasswordHasher(12)
	jwtService := platformsecurity.NewJWTService(cfg.JWT)
	customValidator := validator.New()

	// 9. Module: SIK SOAP Client & References
	sikSoapClient := sikrepo.NewSOAPClient(cfg.SIK.BaseURL, cfg.SIK.Username, cfg.SIK.Password)

	// 10. Module: Satuan Kerja, Unit Kerja, & Sub Unit Kerja
	satkerRepository := satkerrepo.NewSatuanKerjaRepository(db)
	satkerUsecaseInstance := satkerusecase.NewSatuanKerjaUsecase(satkerRepository)
	satkerHandler := satkerdelivery.NewSatuanKerjaHandler(satkerUsecaseInstance)

	unitKerjaRepository := unitrepo.NewUnitKerjaRepository(db, sikSoapClient)
	unitKerjaUsecaseInstance := unitusecase.NewUnitKerjaUsecase(unitKerjaRepository)
	unitKerjaHandler := unitdelivery.NewUnitKerjaHandler(unitKerjaUsecaseInstance)

	subUnitKerjaRepository := subrepo.NewSubUnitKerjaRepository(db)
	subUnitKerjaUsecaseInstance := subusecase.NewSubUnitKerjaUsecase(subUnitKerjaRepository)
	subUnitKerjaHandler := subdelivery.NewSubUnitKerjaHandler(subUnitKerjaUsecaseInstance)

	// 11. Module: SIK (Sistem Informasi Kepegawaian)
	sikRepository := sikrepo.NewSIKRepository(db)
	sikUsecaseInstance := sikusecase.NewSIKUsecase(sikRepository, cfg.SIK, unitKerjaRepository)

	// 11. Module: User
	userRepository := userrepo.NewUserRepository(db)
	userUsecaseInstance := userusecase.NewUserUsecase(userRepository, sikRepository)
	userHandler := userdelivery.NewUserHandler(userUsecaseInstance, sikUsecaseInstance)
	sikHandler := sikdelivery.NewSIKHandler(sikUsecaseInstance, userRepository, passwordHasher)

	// 12. Module: Auth
	var blacklistRepository authdomain.TokenBlacklistRepository
	if redisClient != nil {
		blacklistRepository = authrepo.NewTokenBlacklistRepository(redisClient)
	}
	var eventPublisher authdomain.EventPublisher
	if natsClient != nil {
		eventPublisher = natsClient
	}
	authUsecaseInstance := authusecase.NewAuthUsecase(userRepository, blacklistRepository, passwordHasher, jwtService, eventPublisher, cfg.SSO, sikRepository)
	authHandler := authdelivery.NewAuthHandler(authUsecaseInstance, customValidator)

	// 13. Module: Session
	sessionRepository := sessionrepo.NewSessionRepository(db)
	sessionUsecaseInstance := sessionusecase.NewSessionUsecase(sessionRepository, userRepository, natsClient)
	sessionHandler := sessiondelivery.NewSessionHandler(sessionUsecaseInstance, customValidator)

	// 14. Module: Health
	healthHandler := healthdelivery.NewHealthHandler(db, redisClient, natsClient, minioClient)

	// 15. Mount Application HTTP Router
	router := apphttp.SetupRouter(&apphttp.RouterConfig{
		Config:             cfg,
		JWTService:         jwtService,
		BlacklistRepo:      blacklistRepository,
		HealthHandler:      healthHandler,
		AuthHandler:        authHandler,
		UserHandler:        userHandler,
		SessionHandler:     sessionHandler,
		SIKHandler:         sikHandler,
		SatuanKerjaHandler:  satkerHandler,
		UnitKerjaHandler:    unitKerjaHandler,
		SubUnitKerjaHandler: subUnitKerjaHandler,
	})

	httpServer := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.HTTP.Port),
		Handler:      router,
		ReadTimeout:  cfg.HTTP.ReadTimeout,
		WriteTimeout: cfg.HTTP.WriteTimeout,
		IdleTimeout:  cfg.HTTP.IdleTimeout,
	}

	// 14. Mount Application gRPC Server
	authGRPCHandler := authgrpc.NewAuthGRPCHandler(jwtService, userUsecaseInstance)
	grpcServer, err := appgrpc.NewServer(cfg.GRPC, authGRPCHandler)
	if err != nil {
		appLogger.Error("Failed to initialize gRPC server", "error", err)
		os.Exit(1)
	}

	// 15. Start Servers concurrently in background goroutines
	go func() {
		appLogger.Info("HTTP server running", "address", httpServer.Addr)
		if err := httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			appLogger.Error("HTTP server failed unexpectedly", "error", err)
			os.Exit(1)
		}
	}()

	go func() {
		if err := grpcServer.Start(); err != nil {
			appLogger.Error("gRPC server failed unexpectedly", "error", err)
		}
	}()

	// 16. Graceful Shutdown orchestration
	shutdownSignal := make(chan os.Signal, 1)
	signal.Notify(shutdownSignal, os.Interrupt, syscall.SIGTERM, syscall.SIGINT)

	sig := <-shutdownSignal
	appLogger.Info("Shutdown signal received, starting graceful termination...", "signal", sig.String())

	shutdownCtx, cancel := context.WithTimeout(context.Background(), cfg.HTTP.ShutdownTimeout)
	defer cancel()

	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		appLogger.Error("HTTP server forced to terminate", "error", err)
	} else {
		appLogger.Info("HTTP server stopped gracefully")
	}

	grpcServer.GracefulStop()
	appLogger.Info("All services drained and shutdown completed successfully.")
}
