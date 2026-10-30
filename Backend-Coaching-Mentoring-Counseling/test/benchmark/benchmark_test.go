package benchmark_test

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"golang.org/x/time/rate"

	"github.com/kalanara/cmc-backend/internal/config"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/security"
)

func BenchmarkPasswordHasher_Hash(b *testing.B) {
	hasher := security.NewPasswordHasher(10)
	password := "BenchmarkPassword123!"

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = hasher.HashPassword(password)
	}
}

func BenchmarkPasswordHasher_Check(b *testing.B) {
	hasher := security.NewPasswordHasher(10)
	password := "BenchmarkPassword123!"
	hashed, _ := hasher.HashPassword(password)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = hasher.CheckPassword(password, hashed)
	}
}

func BenchmarkJWTService_Generate(b *testing.B) {
	cfg := config.JWTConfig{
		SecretKey:            "super-secret-benchmark-key-32-bytes",
		AccessTokenDuration:  15 * time.Minute,
		RefreshTokenDuration: 7 * 24 * time.Hour,
		Issuer:               "benchmark",
	}
	jwtService := security.NewJWTService(cfg)
	user := &userdomain.User{
		ID:       uuid.New(),
		Email:    "bench@example.com",
		FullName: "Benchmark User",
		Role:     userdomain.RoleCoach,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = jwtService.GenerateTokenPair(user)
	}
}

func BenchmarkJWTService_Validate(b *testing.B) {
	cfg := config.JWTConfig{
		SecretKey:            "super-secret-benchmark-key-32-bytes",
		AccessTokenDuration:  15 * time.Minute,
		RefreshTokenDuration: 7 * 24 * time.Hour,
		Issuer:               "benchmark",
	}
	jwtService := security.NewJWTService(cfg)
	user := &userdomain.User{
		ID:       uuid.New(),
		Email:    "bench@example.com",
		FullName: "Benchmark User",
		Role:     userdomain.RoleCoach,
	}
	tokens, _ := jwtService.GenerateTokenPair(user)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = jwtService.ValidateToken(tokens.AccessToken)
	}
}

func BenchmarkRateLimiter_Allow(b *testing.B) {
	limiter := rate.NewLimiter(rate.Limit(1000), 100)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = limiter.Allow()
	}
}
