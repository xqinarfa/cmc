package security_test

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/kalanara/cmc-backend/internal/config"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/security"
)

func TestJWTService(t *testing.T) {
	cfg := config.JWTConfig{
		SecretKey:            "super-test-secret-key-at-least-32-bytes-long",
		AccessTokenDuration:  15 * time.Minute,
		RefreshTokenDuration: 7 * 24 * time.Hour,
		Issuer:               "test-issuer",
	}

	jwtService := security.NewJWTService(cfg)

	user := &userdomain.User{
		ID:       uuid.New(),
		Email:    "coach@example.com",
		FullName: "Coach Andi",
		Role:     userdomain.RoleCoach,
		IsActive: true,
	}

	tokens, err := jwtService.GenerateTokenPair(user)
	if err != nil {
		t.Fatalf("expected no error generating tokens, got: %v", err)
	}

	if tokens.AccessToken == "" || tokens.RefreshToken == "" {
		t.Fatal("tokens should not be empty")
	}

	claims, err := jwtService.ValidateToken(tokens.AccessToken)
	if err != nil {
		t.Fatalf("expected valid access token, got error: %v", err)
	}

	if claims.UserID != user.ID {
		t.Errorf("expected user ID %v, got %v", user.ID, claims.UserID)
	}
	if claims.Role != userdomain.RoleCoach {
		t.Errorf("expected role coach, got %v", claims.Role)
	}
	if claims.Email != user.Email {
		t.Errorf("expected email %v, got %v", user.Email, claims.Email)
	}

	_, err = jwtService.ValidateToken("invalid.jwt.token")
	if err == nil {
		t.Fatal("expected error on invalid token, got nil")
	}
}
