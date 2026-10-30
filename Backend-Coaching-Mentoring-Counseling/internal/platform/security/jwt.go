package security

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/kalanara/cmc-backend/internal/config"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type JWTService struct {
	cfg config.JWTConfig
}

func NewJWTService(cfg config.JWTConfig) *JWTService {
	return &JWTService{cfg: cfg}
}

func (j *JWTService) GenerateTokenPair(user *userdomain.User) (*authdomain.TokenPair, error) {
	now := time.Now().UTC()
	accessExpiry := now.Add(j.cfg.AccessTokenDuration)
	refreshExpiry := now.Add(j.cfg.RefreshTokenDuration)

	accessClaims := authdomain.JWTClaims{
		UserID:   user.ID,
		Email:    user.Email,
		Role:     user.Role,
		FullName: user.FullName,
		RegisteredClaims: jwt.RegisteredClaims{
			ID:        uuid.New().String(),
			Subject:   user.ID.String(),
			Issuer:    j.cfg.Issuer,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(accessExpiry),
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessString, err := accessToken.SignedString([]byte(j.cfg.SecretKey))
	if err != nil {
		return nil, fmt.Errorf("failed to sign access token: %w", err)
	}

	refreshClaims := authdomain.JWTClaims{
		UserID: user.ID,
		Email:  user.Email,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ID:        uuid.New().String(),
			Subject:   user.ID.String(),
			Issuer:    j.cfg.Issuer,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(refreshExpiry),
		},
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshString, err := refreshToken.SignedString([]byte(j.cfg.SecretKey))
	if err != nil {
		return nil, fmt.Errorf("failed to sign refresh token: %w", err)
	}

	return &authdomain.TokenPair{
		AccessToken:      accessString,
		RefreshToken:     refreshString,
		AccessExpiresAt:  accessExpiry,
		RefreshExpiresAt: refreshExpiry,
		TokenType:        "Bearer",
	}, nil
}

func (j *JWTService) ValidateToken(tokenString string) (*authdomain.JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &authdomain.JWTClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(j.cfg.SecretKey), nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, sharederrors.ErrTokenExpired
		}
		return nil, sharederrors.ErrInvalidToken
	}

	claims, ok := token.Claims.(*authdomain.JWTClaims)
	if !ok || !token.Valid {
		return nil, sharederrors.ErrInvalidToken
	}

	return claims, nil
}
