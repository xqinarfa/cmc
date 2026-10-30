package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"

	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type UserRepository struct {
	db *database.DB
}

func NewUserRepository(db *database.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(ctx context.Context, user *userdomain.User) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Create(user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return sharederrors.ErrUserAlreadyExists
		}
		return fmt.Errorf("failed to create user in db: %w", result.Error)
	}
	return nil
}

func (r *UserRepository) FindByID(ctx context.Context, id uuid.UUID) (*userdomain.User, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var user userdomain.User
	result := r.db.GormDB.WithContext(ctxTimeout).Where("id = ? AND deleted_at IS NULL", id).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to find user by id: %w", result.Error)
	}
	return &user, nil
}

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (*userdomain.User, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var user userdomain.User
	result := r.db.GormDB.WithContext(ctxTimeout).Where("email = ? AND deleted_at IS NULL", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to find user by email: %w", result.Error)
	}
	return &user, nil
}

func (r *UserRepository) FindByNIP(ctx context.Context, nip string) (*userdomain.User, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var user userdomain.User
	result := r.db.GormDB.WithContext(ctxTimeout).Where("nip = ? AND deleted_at IS NULL", nip).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to find user by nip: %w", result.Error)
	}
	return &user, nil
}


func (r *UserRepository) Update(ctx context.Context, user *userdomain.User) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Save(user)
	if result.Error != nil {
		return fmt.Errorf("failed to update user: %w", result.Error)
	}
	return nil
}

func (r *UserRepository) Delete(ctx context.Context, id uuid.UUID) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Delete(&userdomain.User{}, id)
	if result.Error != nil {
		return fmt.Errorf("failed to delete user: %w", result.Error)
	}
	return nil
}

func (r *UserRepository) ListByRole(ctx context.Context, role userdomain.Role) ([]userdomain.User, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var users []userdomain.User
	query := r.db.GormDB.WithContext(ctxTimeout).Where("is_active = true AND deleted_at IS NULL")
	if role != "" {
		query = query.Where("role = ?", role)
	} else {
		query = query.Where("role IN ('coach', 'mentor', 'counselor')")
	}

	result := query.Order("full_name asc").Find(&users)
	if result.Error != nil {
		return nil, fmt.Errorf("failed to list users by role: %w", result.Error)
	}
	return users, nil
}
