package usecase

import (
	"context"

	"github.com/google/uuid"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
)

type userUsecase struct {
	userRepo userdomain.UserRepository
}

func NewUserUsecase(userRepo userdomain.UserRepository) userdomain.UserUsecase {
	return &userUsecase{userRepo: userRepo}
}

func (u *userUsecase) GetProfile(ctx context.Context, userID uuid.UUID) (*userdomain.UserResponse, error) {
	user, err := u.userRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	return user.ToResponse(), nil
}

func (u *userUsecase) ListPractitioners(ctx context.Context, role userdomain.Role) ([]userdomain.UserResponse, error) {
	users, err := u.userRepo.ListByRole(ctx, role)
	if err != nil {
		return nil, err
	}

	responses := make([]userdomain.UserResponse, len(users))
	for i, usr := range users {
		responses[i] = *usr.ToResponse()
	}
	return responses, nil
}
