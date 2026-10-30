package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
)

type SessionType string

const (
	TypeCoaching   SessionType = "coaching"
	TypeMentoring  SessionType = "mentoring"
	TypeCounseling SessionType = "counseling"
)

type SessionStatus string

const (
	StatusPending   SessionStatus = "pending"
	StatusConfirmed SessionStatus = "confirmed"
	StatusCompleted SessionStatus = "completed"
	StatusCancelled SessionStatus = "cancelled"
	StatusRejected  SessionStatus = "rejected" // dikembalikan / perlu revisi
)

// Meeting represents individual meeting items within a coaching/mentoring session
type Meeting struct {
	ID            uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	SessionID     uuid.UUID `json:"session_id" gorm:"type:uuid;not null;index"`
	MeetingNumber int       `json:"meeting_number" gorm:"not null"`
	Title         string    `json:"title" gorm:"type:varchar(255);not null"`
	ScheduledDate string    `json:"scheduled_date" gorm:"type:varchar(100)"`
	MeetingType   string    `json:"meeting_type" gorm:"type:varchar(50);default:'Luring'"`
	Location      string    `json:"location" gorm:"type:varchar(255)"`
	Summary       string    `json:"summary" gorm:"type:text"`
	JPCollected   int       `json:"jp_collected" gorm:"column:jp_collected;default:2"`
	Status        string    `json:"status" gorm:"type:varchar(50);default:'draft'"`
	CreatedAt     time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type Session struct {
	ID              uuid.UUID        `json:"id" gorm:"type:uuid;primaryKey"`
	ClientID        uuid.UUID        `json:"client_id" gorm:"type:uuid;not null;index"`
	Client          *userdomain.User `json:"client,omitempty" gorm:"foreignKey:ClientID"`
	PractitionerID  uuid.UUID        `json:"practitioner_id" gorm:"type:uuid;not null;index"`
	Practitioner    *userdomain.User `json:"practitioner,omitempty" gorm:"foreignKey:PractitionerID"`
	Type            SessionType      `json:"type" gorm:"type:varchar(50);not null;index"`
	Status          SessionStatus    `json:"status" gorm:"type:varchar(50);not null;default:'pending';index"`
	Title           string           `json:"title" gorm:"type:varchar(255);not null"`
	Topic           string           `json:"topic,omitempty" gorm:"type:varchar(255)"`
	Objective       string           `json:"objective,omitempty" gorm:"type:text"`
	SessionFormat   string           `json:"session_format,omitempty" gorm:"type:varchar(50);default:'1-on-1'"`
	Token           string           `json:"token,omitempty" gorm:"type:varchar(50);index"`
	CurrentJP       int              `json:"current_jp" gorm:"column:current_jp;default:0"`
	TargetJP        int              `json:"target_jp" gorm:"column:target_jp;default:6"`
	ProgressNote    string           `json:"progress_note,omitempty" gorm:"type:varchar(255)"`
	AlertType       string           `json:"alert_type,omitempty" gorm:"type:varchar(20)"`
	AlertText       string           `json:"alert_text,omitempty" gorm:"type:text"`
	AlertAuthor     string           `json:"alert_author,omitempty" gorm:"type:varchar(255)"`
	Notes           string           `json:"notes,omitempty" gorm:"type:text"`
	ScheduledAt     time.Time        `json:"scheduled_at" gorm:"not null;index"`
	DurationMinutes int              `json:"duration_minutes" gorm:"not null;default:60"`
	MeetingURL      string           `json:"meeting_url,omitempty" gorm:"type:varchar(512)"`
	Meetings        []Meeting        `json:"meetings,omitempty" gorm:"foreignKey:SessionID"`
	CreatedAt       time.Time        `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt       time.Time        `json:"updated_at" gorm:"autoUpdateTime"`
}

type BookSessionInput struct {
	PractitionerID  uuid.UUID   `json:"practitioner_id" validate:"required"`
	Type            SessionType `json:"type" validate:"required,oneof=coaching mentoring counseling"`
	Title           string      `json:"title" validate:"required,min=3,max=255"`
	Topic           string      `json:"topic" validate:"omitempty,max=255"`
	Objective       string      `json:"objective" validate:"omitempty,max=1000"`
	SessionFormat   string      `json:"session_format" validate:"omitempty,oneof=1-on-1 1-on-group"`
	Notes           string      `json:"notes" validate:"omitempty,max=1000"`
	ScheduledAt     *time.Time  `json:"scheduled_at"`
	DurationMinutes int         `json:"duration_minutes" validate:"omitempty,min=15,max=240"`
}

type UpdateSessionStatusInput struct {
	Status SessionStatus `json:"status" validate:"required,oneof=pending confirmed completed cancelled rejected"`
	Notes  string        `json:"notes" validate:"omitempty,max=1000"`
}

type AddMeetingInput struct {
	Title         string `json:"title" validate:"required,min=3,max=255"`
	ScheduledDate string `json:"scheduled_date" validate:"omitempty,max=100"`
	MeetingType   string `json:"meeting_type" validate:"omitempty,oneof=Luring Daring Hybrid online offline hybrid luring daring"`
	Location      string `json:"location" validate:"omitempty,max=255"`
	Summary       string `json:"summary" validate:"omitempty,max=1000"`
	JPCollected   int    `json:"jp_collected" validate:"omitempty,min=1,max=10"`
}

type SessionRepository interface {
	Create(ctx context.Context, session *Session) error
	FindByID(ctx context.Context, id uuid.UUID) (*Session, error)
	FindByClientID(ctx context.Context, clientID uuid.UUID) ([]Session, error)
	FindByPractitionerID(ctx context.Context, practitionerID uuid.UUID) ([]Session, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status SessionStatus, notes string) error
	AddMeeting(ctx context.Context, meeting *Meeting) error
	DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) error
}

type SessionUsecase interface {
	BookSession(ctx context.Context, clientID uuid.UUID, input BookSessionInput) (*Session, error)
	GetSession(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) (*Session, error)
	ListUserSessions(ctx context.Context, currentUserID uuid.UUID, role userdomain.Role) ([]Session, error)
	UpdateStatus(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input UpdateSessionStatusInput) error
	AddMeeting(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input AddMeetingInput) (*Meeting, error)
	DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) error
	ResendNotification(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID) error
}
