package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// Role represents user authorization roles in Coaching, Mentoring & Counseling system.
type Role string

const (
	RoleAdmin     Role = "admin"
	RoleCoach     Role = "coach"
	RoleMentor    Role = "mentor"
	RoleCounselor Role = "counselor"
	RoleClient    Role = "client"
)

var AllRoles = []Role{
	RoleAdmin,
	RoleCoach,
	RoleMentor,
	RoleCounselor,
	RoleClient,
}

func (r Role) IsValid() bool {
	switch r {
	case RoleAdmin, RoleCoach, RoleMentor, RoleCounselor, RoleClient:
		return true
	default:
		return false
	}
}

func (r Role) String() string {
	return string(r)
}

// User represents the core user account in the system.
type User struct {
	ID           uuid.UUID  `json:"id" gorm:"type:uuid;primaryKey"`
	NIP          string     `json:"nip,omitempty" gorm:"column:nip;type:varchar(50);index"`
	Email        string     `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	PasswordHash string     `json:"-" gorm:"type:varchar(255);not null"`
	FullName     string     `json:"full_name" gorm:"type:varchar(255);not null"`
	Role         Role       `json:"role" gorm:"type:varchar(50);not null;index"`
	Phone        string     `json:"phone" gorm:"type:varchar(50)"`
	AvatarURL    string     `json:"avatar_url" gorm:"type:varchar(512)"`
	Provider     string     `json:"provider" gorm:"type:varchar(50);default:'LOCAL'"`
	IsActive     bool       `json:"is_active" gorm:"type:boolean;default:true"`
	CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt    *time.Time `json:"deleted_at,omitempty" gorm:"index"`
}

// UserResponse represents safe user data returned in API responses.
type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	NIP       string    `json:"nip,omitempty"`
	Email     string    `json:"email"`
	FullName  string    `json:"full_name"`
	Role      Role      `json:"role"`
	Phone     string    `json:"phone,omitempty"`
	AvatarURL string    `json:"avatar_url,omitempty"`
	Provider  string    `json:"provider,omitempty"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}

func (u *User) ToResponse() *UserResponse {
	return &UserResponse{
		ID:        u.ID,
		NIP:       u.NIP,
		Email:     u.Email,
		FullName:  u.FullName,
		Role:      u.Role,
		Phone:     u.Phone,
		AvatarURL: u.AvatarURL,
		Provider:  u.Provider,
		IsActive:  u.IsActive,
		CreatedAt: u.CreatedAt,
	}
}

// UserRepository defines database contracts for user module.
type UserRepository interface {
	Create(ctx context.Context, user *User) error
	FindByID(ctx context.Context, id uuid.UUID) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	FindByNIP(ctx context.Context, nip string) (*User, error)
	Update(ctx context.Context, user *User) error
	Delete(ctx context.Context, id uuid.UUID) error
	ListByRole(ctx context.Context, role Role) ([]User, error)
}

// UserUsecase defines business logic contracts for user module.
type UserUsecase interface {
	GetProfile(ctx context.Context, userID uuid.UUID) (*UserResponse, error)
	ListPractitioners(ctx context.Context, role Role) ([]UserResponse, error)
}
