package unit_test

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"go.uber.org/mock/gomock"

	"github.com/kalanara/cmc-backend/internal/config"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	authusecase "github.com/kalanara/cmc-backend/internal/modules/auth/usecase"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/test/mocks"
)

type AuthUsecaseTestSuite struct {
	suite.Suite
	ctrl           *gomock.Controller
	mockUserRepo   *mocks.MockUserRepository
	mockBlacklist  *mocks.MockTokenBlacklistRepository
	mockPassword   *mocks.MockPasswordHasher
	mockJWT        *mocks.MockJWTService
	usecase        authdomain.AuthUsecase
}

func (s *AuthUsecaseTestSuite) SetupTest() {
	s.ctrl = gomock.NewController(s.T())
	s.mockUserRepo = mocks.NewMockUserRepository(s.ctrl)
	s.mockBlacklist = mocks.NewMockTokenBlacklistRepository(s.ctrl)
	s.mockPassword = mocks.NewMockPasswordHasher(s.ctrl)
	s.mockJWT = mocks.NewMockJWTService(s.ctrl)

	s.usecase = authusecase.NewAuthUsecase(
		s.mockUserRepo,
		s.mockBlacklist,
		s.mockPassword,
		s.mockJWT,
		nil,
		config.SSOConfig{EnableSSO: true},
	)
}

func (s *AuthUsecaseTestSuite) TearDownTest() {
	s.ctrl.Finish()
}

func (s *AuthUsecaseTestSuite) TestRegister_Success() {
	ctx := context.Background()
	input := authdomain.RegisterInput{
		Email:    "coach.ahmad@example.com",
		Password: "Password123!",
		FullName: "Ahmad Coach",
		Role:     userdomain.RoleCoach,
		Phone:    "+628111222333",
	}

	hashedPassword := "$2a$12$hashedstring"
	expectedTokens := &authdomain.TokenPair{
		AccessToken:      "mock.access.token",
		RefreshToken:     "mock.refresh.token",
		AccessExpiresAt:  time.Now().Add(15 * time.Minute),
		RefreshExpiresAt: time.Now().Add(7 * 24 * time.Hour),
		TokenType:        "Bearer",
	}

	s.mockUserRepo.EXPECT().
		FindByEmail(ctx, input.Email).
		Return(nil, sharederrors.ErrUserNotFound)

	s.mockPassword.EXPECT().
		HashPassword(input.Password).
		Return(hashedPassword, nil)

	s.mockUserRepo.EXPECT().
		Create(ctx, gomock.AssignableToTypeOf(&userdomain.User{})).
		Return(nil)

	s.mockJWT.EXPECT().
		GenerateTokenPair(gomock.AssignableToTypeOf(&userdomain.User{})).
		Return(expectedTokens, nil)

	res, err := s.usecase.Register(ctx, input)

	require.NoError(s.T(), err)
	assert.NotNil(s.T(), res)
	assert.Equal(s.T(), input.Email, res.User.Email)
	assert.Equal(s.T(), expectedTokens.AccessToken, res.Tokens.AccessToken)
}

func (s *AuthUsecaseTestSuite) TestRegister_UserAlreadyExists() {
	ctx := context.Background()
	input := authdomain.RegisterInput{
		Email:    "existing@example.com",
		Password: "Password123!",
		FullName: "Existing User",
		Role:     userdomain.RoleClient,
	}

	existingUser := &userdomain.User{
		ID:    uuid.New(),
		Email: input.Email,
	}

	s.mockUserRepo.EXPECT().
		FindByEmail(ctx, input.Email).
		Return(existingUser, nil)

	res, err := s.usecase.Register(ctx, input)

	require.Error(s.T(), err)
	assert.Nil(s.T(), res)
	assert.Equal(s.T(), sharederrors.ErrUserAlreadyExists, err)
}

func (s *AuthUsecaseTestSuite) TestLogin_Success() {
	ctx := context.Background()
	input := authdomain.LoginInput{
		Email:    "client@example.com",
		Password: "Password123!",
	}

	user := &userdomain.User{
		ID:           uuid.New(),
		Email:        input.Email,
		PasswordHash: "$2a$12$hashed",
		FullName:     "Client Budi",
		Role:         userdomain.RoleClient,
		IsActive:     true,
	}

	tokens := &authdomain.TokenPair{
		AccessToken:  "valid.access.token",
		RefreshToken: "valid.refresh.token",
		TokenType:    "Bearer",
	}

	s.mockUserRepo.EXPECT().
		FindByEmail(ctx, input.Email).
		Return(user, nil)

	s.mockPassword.EXPECT().
		CheckPassword(input.Password, user.PasswordHash).
		Return(true)

	s.mockJWT.EXPECT().
		GenerateTokenPair(user).
		Return(tokens, nil)

	res, err := s.usecase.Login(ctx, input)

	require.NoError(s.T(), err)
	assert.NotNil(s.T(), res)
	assert.Equal(s.T(), user.Email, res.User.Email)
	assert.Equal(s.T(), tokens.AccessToken, res.Tokens.AccessToken)
}

func (s *AuthUsecaseTestSuite) TestLogin_InvalidPassword() {
	ctx := context.Background()
	input := authdomain.LoginInput{
		Email:    "client@example.com",
		Password: "WrongPassword!",
	}

	user := &userdomain.User{
		ID:           uuid.New(),
		Email:        input.Email,
		PasswordHash: "$2a$12$hashed",
		IsActive:     true,
	}

	s.mockUserRepo.EXPECT().
		FindByEmail(ctx, input.Email).
		Return(user, nil)

	s.mockPassword.EXPECT().
		CheckPassword(input.Password, user.PasswordHash).
		Return(false)

	res, err := s.usecase.Login(ctx, input)

	require.Error(s.T(), err)
	assert.Nil(s.T(), res)
	assert.Equal(s.T(), sharederrors.ErrInvalidCredentials, err)
}

func TestAuthUsecaseTestSuite(t *testing.T) {
	suite.Run(t, new(AuthUsecaseTestSuite))
}
