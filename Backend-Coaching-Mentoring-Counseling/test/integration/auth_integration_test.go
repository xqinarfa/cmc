package integration_test

import (
	"context"
	"strconv"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"

	"github.com/kalanara/cmc-backend/internal/config"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	authusecase "github.com/kalanara/cmc-backend/internal/modules/auth/usecase"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	userrepo "github.com/kalanara/cmc-backend/internal/modules/user/repository"
	userusecase "github.com/kalanara/cmc-backend/internal/modules/user/usecase"
	platformdb "github.com/kalanara/cmc-backend/internal/platform/database"
	platformsecurity "github.com/kalanara/cmc-backend/internal/platform/security"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

func TestAuthUsecase_Integration(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}

	ctx := context.Background()

	req := testcontainers.ContainerRequest{
		Image:        "postgres:16-alpine",
		ExposedPorts: []string{"5432/tcp"},
		Env: map[string]string{
			"POSTGRES_USER":     "test_user",
			"POSTGRES_PASSWORD": "test_password",
			"POSTGRES_DB":       "test_cmc_db",
		},
		WaitingFor: wait.ForListeningPort("5432/tcp").WithStartupTimeout(60 * time.Second),
	}

	pgContainer, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		t.Skipf("Docker daemon not reachable for testcontainers: %v", err)
		return
	}
	defer func() {
		_ = pgContainer.Terminate(ctx)
	}()

	host, err := pgContainer.Host(ctx)
	if err != nil {
		t.Fatalf("failed to get container host: %v", err)
	}

	port, err := pgContainer.MappedPort(ctx, "5432")
	if err != nil {
		t.Fatalf("failed to get mapped port: %v", err)
	}

	portNum, _ := strconv.Atoi(port.Port())
	if portNum == 0 {
		portNum = 5432
	}

	dbCfg := config.DatabaseConfig{
		Host:               host,
		Port:               portNum,
		User:               "test_user",
		Password:           "test_password",
		Name:               "test_cmc_db",
		SSLMode:            "disable",
		MaxOpenConns:       5,
		MaxIdleConns:       2,
		ConnMaxLifetime:    5 * time.Minute,
		ConnMaxIdleTime:    1 * time.Minute,
		QueryTimeout:       5 * time.Second,
		AutoMigrateEnabled: true,
	}

	db, err := platformdb.NewDB(dbCfg)
	if err != nil {
		t.Fatalf("failed to connect to test postgres container: %v", err)
	}
	defer db.Close()

	// Ensure users table exists for integration test
	_ = db.GormDB.AutoMigrate(&userdomain.User{})

	userRepository := userrepo.NewUserRepository(db)
	passwordHasher := platformsecurity.NewPasswordHasher(10)
	jwtService := platformsecurity.NewJWTService(config.JWTConfig{
		SecretKey:            "test-integration-jwt-secret-key-32chars",
		AccessTokenDuration:  15 * time.Minute,
		RefreshTokenDuration: 7 * 24 * time.Hour,
		Issuer:               "test",
	})

	authUsecaseInstance := authusecase.NewAuthUsecase(userRepository, nil, passwordHasher, jwtService, nil, config.SSOConfig{})
	userUsecaseInstance := userusecase.NewUserUsecase(userRepository)

	// 1. Test Registration
	regInput := authdomain.RegisterInput{
		Email:    "mentor.budi@example.com",
		Password: "SecurePassword123!",
		FullName: "Budi Mentor",
		Role:     userdomain.RoleMentor,
		Phone:    "+628123456789",
	}

	authRes, err := authUsecaseInstance.Register(ctx, regInput)
	if err != nil {
		t.Fatalf("expected successful registration, got: %v", err)
	}

	if authRes.User.Email != regInput.Email {
		t.Errorf("expected email %s, got %s", regInput.Email, authRes.User.Email)
	}
	if authRes.Tokens.AccessToken == "" {
		t.Fatal("expected access token to be present")
	}

	// 2. Test Duplicate Registration (should fail with ErrUserAlreadyExists)
	_, err = authUsecaseInstance.Register(ctx, regInput)
	if err != sharederrors.ErrUserAlreadyExists {
		t.Fatalf("expected ErrUserAlreadyExists, got: %v", err)
	}

	// 3. Test Login
	loginRes, err := authUsecaseInstance.Login(ctx, authdomain.LoginInput{
		Email:    regInput.Email,
		Password: regInput.Password,
	})
	if err != nil {
		t.Fatalf("expected successful login, got: %v", err)
	}
	if loginRes.User.ID != authRes.User.ID {
		t.Errorf("expected user ID %v, got %v", authRes.User.ID, loginRes.User.ID)
	}

	// 4. Test Invalid Login
	_, err = authUsecaseInstance.Login(ctx, authdomain.LoginInput{
		Email:    regInput.Email,
		Password: "WrongPassword!",
	})
	if err != sharederrors.ErrInvalidCredentials {
		t.Fatalf("expected ErrInvalidCredentials, got: %v", err)
	}

	// 5. Test Get Profile
	profile, err := userUsecaseInstance.GetProfile(ctx, authRes.User.ID)
	if err != nil {
		t.Fatalf("expected profile retrieval success, got: %v", err)
	}
	if profile.FullName != regInput.FullName {
		t.Errorf("expected full name %s, got %s", regInput.FullName, profile.FullName)
	}

	// 6. Test Non-existent Profile
	_, err = userUsecaseInstance.GetProfile(ctx, uuid.New())
	if err != sharederrors.ErrUserNotFound {
		t.Fatalf("expected ErrUserNotFound, got: %v", err)
	}
}
