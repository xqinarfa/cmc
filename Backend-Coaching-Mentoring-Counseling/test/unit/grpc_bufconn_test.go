package unit_test

import (
	"context"
	"net"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/test/bufconn"

	authgrpc "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc"
	authv1 "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc/proto/auth/v1"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/test/mocks"
)

const bufSize = 1024 * 1024

func setupInMemGRPCServer(t *testing.T, handler *authgrpc.AuthGRPCHandler) (*grpc.ClientConn, func()) {
	lis := bufconn.Listen(bufSize)
	s := grpc.NewServer()
	authv1.RegisterAuthServiceServer(s, handler)

	go func() {
		if err := s.Serve(lis); err != nil && err != grpc.ErrServerStopped {
			t.Logf("Server exited with error: %v", err)
		}
	}()

	dialer := func(context.Context, string) (net.Conn, error) {
		return lis.Dial()
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, "bufnet",
		grpc.WithContextDialer(dialer),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	require.NoError(t, err)

	cleanup := func() {
		conn.Close()
		s.Stop()
		lis.Close()
	}

	return conn, cleanup
}

func TestGRPC_VerifyToken_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockJWT := mocks.NewMockJWTService(ctrl)
	mockUserUsecase := mocks.NewMockUserUsecase(ctrl)
	handler := authgrpc.NewAuthGRPCHandler(mockJWT, mockUserUsecase)

	conn, cleanup := setupInMemGRPCServer(t, handler)
	defer cleanup()

	client := authv1.NewAuthServiceClient(conn)

	userID := uuid.New()
	mockJWT.EXPECT().
		ValidateToken("valid.jwt.token").
		Return(&authdomain.JWTClaims{
			UserID: userID,
			Email:  "coach@example.com",
			Role:   userdomain.RoleCoach,
		}, nil)

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	resp, err := client.VerifyToken(ctx, &authv1.VerifyTokenRequest{
		Token: "valid.jwt.token",
	})

	require.NoError(t, err)
	assert.True(t, resp.Valid)
	assert.Equal(t, userID.String(), resp.UserId)
	assert.Equal(t, "coach@example.com", resp.Email)
	assert.Equal(t, "coach", resp.Role)
}

func TestGRPC_VerifyToken_Invalid(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockJWT := mocks.NewMockJWTService(ctrl)
	mockUserUsecase := mocks.NewMockUserUsecase(ctrl)
	handler := authgrpc.NewAuthGRPCHandler(mockJWT, mockUserUsecase)

	conn, cleanup := setupInMemGRPCServer(t, handler)
	defer cleanup()

	client := authv1.NewAuthServiceClient(conn)

	mockJWT.EXPECT().
		ValidateToken("invalid.token").
		Return(nil, sharederrors.ErrInvalidToken)

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	resp, err := client.VerifyToken(ctx, &authv1.VerifyTokenRequest{
		Token: "invalid.token",
	})

	require.NoError(t, err)
	assert.False(t, resp.Valid)
	assert.NotEmpty(t, resp.ErrorMessage)
}

func TestGRPC_GetUserInfo_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockJWT := mocks.NewMockJWTService(ctrl)
	mockUserUsecase := mocks.NewMockUserUsecase(ctrl)
	handler := authgrpc.NewAuthGRPCHandler(mockJWT, mockUserUsecase)

	conn, cleanup := setupInMemGRPCServer(t, handler)
	defer cleanup()

	client := authv1.NewAuthServiceClient(conn)

	userID := uuid.New()
	mockUserUsecase.EXPECT().
		GetProfile(gomock.Any(), userID).
		Return(&userdomain.UserResponse{
			ID:       userID,
			Email:    "mentor@example.com",
			FullName: "Mentor Budi",
			Role:     userdomain.RoleMentor,
			Phone:    "+62812345678",
			IsActive: true,
		}, nil)

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	resp, err := client.GetUserInfo(ctx, &authv1.GetUserInfoRequest{
		UserId: userID.String(),
	})

	require.NoError(t, err)
	assert.Equal(t, userID.String(), resp.Id)
	assert.Equal(t, "mentor@example.com", resp.Email)
	assert.Equal(t, "Mentor Budi", resp.FullName)
	assert.Equal(t, "mentor", resp.Role)
	assert.True(t, resp.IsActive)
}
