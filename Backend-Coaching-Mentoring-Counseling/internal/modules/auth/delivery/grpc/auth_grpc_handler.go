package grpc

import (
	"context"

	"github.com/google/uuid"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	authv1 "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc/proto/auth/v1"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AuthGRPCHandler struct {
	authv1.UnimplementedAuthServiceServer
	jwtService  authdomain.JWTService
	userUsecase userdomain.UserUsecase
}

func NewAuthGRPCHandler(jwtService authdomain.JWTService, userUsecase userdomain.UserUsecase) *AuthGRPCHandler {
	return &AuthGRPCHandler{
		jwtService:  jwtService,
		userUsecase: userUsecase,
	}
}

func (h *AuthGRPCHandler) VerifyToken(ctx context.Context, req *authv1.VerifyTokenRequest) (*authv1.VerifyTokenResponse, error) {
	if req.Token == "" {
		return &authv1.VerifyTokenResponse{
			Valid:        false,
			ErrorMessage: "token is required",
		}, nil
	}

	claims, err := h.jwtService.ValidateToken(req.Token)
	if err != nil {
		return &authv1.VerifyTokenResponse{
			Valid:        false,
			ErrorMessage: err.Error(),
		}, nil
	}

	return &authv1.VerifyTokenResponse{
		Valid:  true,
		UserId: claims.UserID.String(),
		Email:  claims.Email,
		Role:   string(claims.Role),
	}, nil
}

func (h *AuthGRPCHandler) GetUserInfo(ctx context.Context, req *authv1.GetUserInfoRequest) (*authv1.GetUserInfoResponse, error) {
	userID, err := uuid.Parse(req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid user id: %v", err)
	}

	user, err := h.userUsecase.GetProfile(ctx, userID)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "user not found: %v", err)
	}

	return &authv1.GetUserInfoResponse{
		Id:       user.ID.String(),
		Email:    user.Email,
		FullName: user.FullName,
		Role:     string(user.Role),
		Phone:    user.Phone,
		IsActive: user.IsActive,
	}, nil
}
