package security_test

import (
	"testing"

	"github.com/kalanara/cmc-backend/internal/platform/security"
)

func TestPasswordHasher(t *testing.T) {
	hasher := security.NewPasswordHasher(10)
	plainPassword := "SecretP@ssw0rd!"

	hashed, err := hasher.HashPassword(plainPassword)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if hashed == "" || hashed == plainPassword {
		t.Fatal("hashed password must not be empty or plain text")
	}

	if !hasher.CheckPassword(plainPassword, hashed) {
		t.Fatal("expected password check to succeed for valid password")
	}

	if hasher.CheckPassword("WrongPassword!", hashed) {
		t.Fatal("expected password check to fail for incorrect password")
	}
}
