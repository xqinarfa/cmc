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

// SessionPeserta represents child session_peserta
type SessionPeserta struct {
	ID            uuid.UUID  `json:"id" gorm:"type:uuid;primaryKey"`
	SessionID     uuid.UUID  `json:"session_id" gorm:"column:session_id;type:uuid;not null;index"`
	UserID        *uuid.UUID `json:"user_id,omitempty" gorm:"column:user_id;type:uuid;index"`
	NIP           string     `json:"nip" gorm:"column:nip;type:varchar(50);not null;index"`
	Nama          string     `json:"nama" gorm:"column:nama;type:varchar(255);not null"`
	Email         string     `json:"email,omitempty" gorm:"column:email;type:varchar(255)"`
	Jabatan       string     `json:"jabatan,omitempty" gorm:"column:jabatan;type:varchar(255)"`
	UnitKerja     string     `json:"unit_kerja,omitempty" gorm:"column:unit_kerja;type:varchar(255)"`
	SatuanKerja   string     `json:"satuan_kerja,omitempty" gorm:"column:satuan_kerja;type:varchar(255)"`
	RoleInSession string     `json:"role_in_session" gorm:"column:role_in_session;type:varchar(50);default:'peserta'"` // 'utama', 'anggota'
	CurrentJP     int        `json:"current_jp" gorm:"column:current_jp;default:0"`
	TargetJP      int        `json:"target_jp" gorm:"column:target_jp;default:6"`
	Status        string     `json:"status" gorm:"column:status;type:varchar(50);default:'active'"`
	CreatedAt     time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

func (SessionPeserta) TableName() string {
	return "session_peserta"
}

// SessionPertemuanPesertaCatatan represents child session_pertemuan_peserta_catatan
type SessionPertemuanPesertaCatatan struct {
	ID                    uuid.UUID  `json:"id" gorm:"type:uuid;primaryKey"`
	SessionID             uuid.UUID  `json:"session_id" gorm:"column:session_id;type:uuid;not null;index"`
	SessionPertemuanID    uuid.UUID  `json:"session_pertemuan_id" gorm:"column:session_pertemuan_id;type:uuid;not null;index"`
	SessionPesertaID      *uuid.UUID `json:"session_peserta_id,omitempty" gorm:"column:session_peserta_id;type:uuid;index"`
	NIP                   string     `json:"nip" gorm:"column:nip;type:varchar(50);not null;index"`
	Nama                  string     `json:"nama" gorm:"column:nama;type:varchar(255);not null"`
	Tujuan                string     `json:"tujuan,omitempty" gorm:"column:tujuan;type:text"`
	IdentifikasiKebutuhan string     `json:"identifikasi_kebutuhan,omitempty" gorm:"column:identifikasi_kebutuhan;type:text"`
	AreaPengembangan      string     `json:"area_pengembangan,omitempty" gorm:"column:area_pengembangan;type:text"`
	Pembahasan            string     `json:"pembahasan,omitempty" gorm:"column:pembahasan;type:text"`
	KesepakatanSolusi     string     `json:"kesepakatan_solusi,omitempty" gorm:"column:kesepakatan_solusi;type:text"`
	UmpanBalik            string     `json:"umpan_balik,omitempty" gorm:"column:umpan_balik;type:text"`
	RencanaTindakLanjut   string     `json:"rencana_tindak_lanjut,omitempty" gorm:"column:rencana_tindak_lanjut;type:text"`
	TargetWaktu           string     `json:"target_waktu,omitempty" gorm:"column:target_waktu;type:varchar(100)"`
	ActionLearningFiles   string     `json:"action_learning_files,omitempty" gorm:"column:action_learning_files;type:text"`
	BuktiFotoFiles        string     `json:"bukti_foto_files,omitempty" gorm:"column:bukti_foto_files;type:text"`
	JPCollected           int        `json:"jp_collected" gorm:"column:jp_collected;default:2"`
	Status                string     `json:"status" gorm:"column:status;type:varchar(50);default:'completed'"` // 'draft', 'pending', 'completed', 'verified'
	VerifiedByNIP         string     `json:"verified_by_nip,omitempty" gorm:"column:verified_by_nip;type:varchar(50)"`
	VerifiedByNama        string     `json:"verified_by_nama,omitempty" gorm:"column:verified_by_nama;type:varchar(255)"`
	VerifiedAt            *time.Time `json:"verified_at,omitempty" gorm:"column:verified_at"`
	CatatanVerifikasi     string     `json:"catatan_verifikasi,omitempty" gorm:"column:catatan_verifikasi;type:text"`
	CreatedAt             time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt             time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

func (SessionPertemuanPesertaCatatan) TableName() string {
	return "session_pertemuan_peserta_catatan"
}

// SessionPertemuan represents child session_pertemuan
type SessionPertemuan struct {
	ID            uuid.UUID                        `json:"id" gorm:"type:uuid;primaryKey"`
	SessionID     uuid.UUID                        `json:"session_id" gorm:"type:uuid;not null;index"`
	MeetingNumber int                              `json:"meeting_number" gorm:"not null"`
	Title         string                           `json:"title" gorm:"type:varchar(255);not null"`
	ScheduledDate string                           `json:"scheduled_date" gorm:"type:varchar(100)"`
	MeetingType   string                           `json:"meeting_type" gorm:"type:varchar(50);default:'Luring'"`
	Location      string                           `json:"location" gorm:"type:varchar(255)"`
	Status        string                           `json:"status" gorm:"type:varchar(50);default:'scheduled'"`
	CatatanList   []SessionPertemuanPesertaCatatan `json:"catatan_list,omitempty" gorm:"foreignKey:SessionPertemuanID"`
	CreatedAt     time.Time                        `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time                        `json:"updated_at" gorm:"autoUpdateTime"`
}

func (SessionPertemuan) TableName() string {
	return "session_pertemuan"
}

// Meeting represents individual meeting items within a coaching/mentoring session (retained for backward compatibility)
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
	ID              uuid.UUID          `json:"id" gorm:"type:uuid;primaryKey"`
	ClientID        uuid.UUID          `json:"client_id" gorm:"type:uuid;not null;index"`
	Client          *userdomain.User   `json:"client,omitempty" gorm:"foreignKey:ClientID"`
	PractitionerID  uuid.UUID          `json:"practitioner_id" gorm:"type:uuid;not null;index"`
	Practitioner    *userdomain.User   `json:"practitioner,omitempty" gorm:"foreignKey:PractitionerID"`
	Type            SessionType        `json:"type" gorm:"type:varchar(50);not null;index"`
	Status          SessionStatus      `json:"status" gorm:"type:varchar(50);not null;default:'pending';index"`
	Title           string             `json:"title" gorm:"type:varchar(255);not null"`
	Topic           string             `json:"topic,omitempty" gorm:"type:varchar(255)"`
	Objective       string             `json:"objective,omitempty" gorm:"type:text"`
	SessionFormat   string             `json:"session_format,omitempty" gorm:"type:varchar(50);default:'1-on-1'"`
	Token           string             `json:"token,omitempty" gorm:"type:varchar(50);index"`
	CurrentJP       int                `json:"current_jp" gorm:"column:current_jp;default:0"`
	TargetJP        int                `json:"target_jp" gorm:"column:target_jp;default:6"`
	ProgressNote    string             `json:"progress_note,omitempty" gorm:"type:varchar(255)"`
	AlertType       string             `json:"alert_type,omitempty" gorm:"type:varchar(20)"`
	AlertText       string             `json:"alert_text,omitempty" gorm:"type:text"`
	AlertAuthor     string             `json:"alert_author,omitempty" gorm:"type:varchar(255)"`
	Notes           string             `json:"notes,omitempty" gorm:"type:text"`
	AtasanNIP       string             `json:"atasan_nip,omitempty" gorm:"column:atasan_nip;type:varchar(50);index"`
	AtasanNama      string             `json:"atasan_nama,omitempty" gorm:"column:atasan_nama;type:varchar(255)"`
	AtasanJabatan   string             `json:"atasan_jabatan,omitempty" gorm:"column:atasan_jabatan;type:varchar(255)"`
	ScheduledAt     time.Time          `json:"scheduled_at" gorm:"not null;index"`
	DurationMinutes int                `json:"duration_minutes" gorm:"not null;default:60"`
	MeetingURL      string             `json:"meeting_url,omitempty" gorm:"type:varchar(512)"`
	PesertaList     []SessionPeserta   `json:"peserta_list,omitempty" gorm:"foreignKey:SessionID"`
	PertemuanList   []SessionPertemuan `json:"pertemuan_list,omitempty" gorm:"foreignKey:SessionID"`
	Meetings        []Meeting          `json:"meetings,omitempty" gorm:"foreignKey:SessionID"`
	CreatedAt       time.Time          `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt       time.Time          `json:"updated_at" gorm:"autoUpdateTime"`
}

type PesertaInput struct {
	NIP           string `json:"nip" validate:"required"`
	Nama          string `json:"nama" validate:"required"`
	Email         string `json:"email,omitempty"`
	Jabatan       string `json:"jabatan,omitempty"`
	UnitKerja     string `json:"unit_kerja,omitempty"`
	SatuanKerja   string `json:"satuan_kerja,omitempty"`
	RoleInSession string `json:"role_in_session,omitempty"` // 'utama', 'anggota'
}

type BookSessionInput struct {
	PractitionerID  *uuid.UUID     `json:"practitioner_id,omitempty" validate:"omitempty"`
	PractitionerNIP string         `json:"practitioner_nip,omitempty" validate:"omitempty"`
	Type            SessionType    `json:"type" validate:"required,oneof=coaching mentoring counseling"`
	Title           string         `json:"title" validate:"required,min=3,max=255"`
	Topic           string         `json:"topic" validate:"omitempty,max=255"`
	Objective       string         `json:"objective" validate:"omitempty,max=1000"`
	SessionFormat   string         `json:"session_format" validate:"omitempty,oneof=1-on-1 1-on-group"`
	ClientNIP       string         `json:"client_nip,omitempty" validate:"omitempty"`
	AtasanNIP       string         `json:"atasan_nip,omitempty" validate:"omitempty"`
	AtasanNama      string         `json:"atasan_nama,omitempty" validate:"omitempty"`
	AtasanJabatan   string         `json:"atasan_jabatan,omitempty" validate:"omitempty"`
	Notes           string         `json:"notes" validate:"omitempty,max=1000"`
	ScheduledAt     *time.Time     `json:"scheduled_at"`
	DurationMinutes int            `json:"duration_minutes" validate:"omitempty,min=15,max=240"`
	Peserta         []PesertaInput `json:"peserta,omitempty"`
}

type UpdateSessionStatusInput struct {
	Status SessionStatus `json:"status" validate:"required,oneof=pending confirmed completed cancelled rejected"`
	Notes  string        `json:"notes" validate:"omitempty,max=1000"`
}

type AddMeetingInput struct {
	MeetingNumber int    `json:"meeting_number" validate:"omitempty"`
	Title         string `json:"title" validate:"required,min=3,max=255"`
	ScheduledDate string `json:"scheduled_date" validate:"omitempty,max=100"`
	MeetingType   string `json:"meeting_type" validate:"omitempty,oneof=Luring Daring Hybrid online offline hybrid luring daring"`
	Location      string `json:"location" validate:"omitempty,max=255"`
	Summary       string `json:"summary" validate:"omitempty,max=5000"`
	JPCollected   int    `json:"jp_collected" validate:"omitempty,min=1,max=10"`
	Status        string `json:"status" validate:"omitempty,oneof=draft completed pending lengkap scheduled ongoing"`
}

type UpdateMeetingInput struct {
	Title         string `json:"title" validate:"omitempty,min=3,max=255"`
	ScheduledDate string `json:"scheduled_date" validate:"omitempty,max=100"`
	MeetingType   string `json:"meeting_type" validate:"omitempty,oneof=Luring Daring Hybrid online offline hybrid luring daring"`
	Location      string `json:"location" validate:"omitempty,max=255"`
	Summary       string `json:"summary" validate:"omitempty,max=5000"`
	JPCollected   int    `json:"jp_collected" validate:"omitempty,min=1,max=10"`
	Status        string `json:"status" validate:"omitempty,oneof=draft completed pending lengkap scheduled ongoing"`
}

// CatatPertemuanPesertaInput represents the input when an employee records notes for a meeting
type CatatPertemuanPesertaInput struct {
	SessionPertemuanID    uuid.UUID `json:"session_pertemuan_id,omitempty"`
	PertemuanKe           int       `json:"pertemuan_ke,omitempty"`
	NIP                   string    `json:"nip" validate:"required"`
	Nama                  string    `json:"nama" validate:"required"`
	Tanggal               string    `json:"tanggal,omitempty"`
	Waktu                 string    `json:"waktu,omitempty"`
	Moda                  string    `json:"moda,omitempty"`
	Lokasi                string    `json:"lokasi,omitempty"`
	Tujuan                string    `json:"tujuan,omitempty"`
	IdentifikasiKebutuhan string    `json:"identifikasi_kebutuhan,omitempty"`
	AreaPengembangan      string    `json:"area_pengembangan,omitempty"`
	Pembahasan            string    `json:"pembahasan" validate:"required"`
	KesepakatanSolusi     string    `json:"kesepakatan_solusi,omitempty"`
	UmpanBalik            string    `json:"umpan_balik,omitempty"`
	RencanaTindakLanjut   string    `json:"rencana_tindak_lanjut,omitempty"`
	TargetWaktu           string    `json:"target_waktu,omitempty"`
	ActionLearningFiles   string    `json:"action_learning_files,omitempty"`
	BuktiFotoFiles        string    `json:"bukti_foto_files,omitempty"`
	JPCollected           int       `json:"jp_collected,omitempty"`
	Status                string    `json:"status,omitempty"`
}

type SessionRepository interface {
	Create(ctx context.Context, session *Session) error
	FindByID(ctx context.Context, id uuid.UUID) (*Session, error)
	FindByClientID(ctx context.Context, clientID uuid.UUID) ([]Session, error)
	FindByPractitionerID(ctx context.Context, practitionerID uuid.UUID) ([]Session, error)
	FindByInvolvement(ctx context.Context, userID uuid.UUID, nip string) ([]Session, error)
	FindAll(ctx context.Context) ([]Session, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status SessionStatus, notes string) error

	// Meetings
	AddMeeting(ctx context.Context, meeting *Meeting) error
	UpdateMeeting(ctx context.Context, meeting *Meeting) error
	FindMeetingByID(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) (*Meeting, error)
	DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) error

	// Session Peserta
	AddPeserta(ctx context.Context, peserta *SessionPeserta) error
	ListPeserta(ctx context.Context, sessionID uuid.UUID) ([]SessionPeserta, error)
	DeletePeserta(ctx context.Context, sessionID uuid.UUID, pesertaID uuid.UUID) error

	// Session Pertemuan
	AddPertemuan(ctx context.Context, pertemuan *SessionPertemuan) error
	UpdatePertemuan(ctx context.Context, pertemuan *SessionPertemuan) error
	FindPertemuanByID(ctx context.Context, sessionID uuid.UUID, pertemuanID uuid.UUID) (*SessionPertemuan, error)
	ListPertemuan(ctx context.Context, sessionID uuid.UUID) ([]SessionPertemuan, error)

	// Session Pertemuan Peserta Catatan
	SaveCatatanPertemuan(ctx context.Context, catatan *SessionPertemuanPesertaCatatan) error
	ListCatatanByPertemuan(ctx context.Context, pertemuanID uuid.UUID) ([]SessionPertemuanPesertaCatatan, error)
	ListCatatanBySession(ctx context.Context, sessionID uuid.UUID) ([]SessionPertemuanPesertaCatatan, error)
}

type SessionUsecase interface {
	BookSession(ctx context.Context, clientID uuid.UUID, input BookSessionInput) (*Session, error)
	GetSession(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) (*Session, error)
	ListUserSessions(ctx context.Context, currentUserID uuid.UUID, role userdomain.Role) ([]Session, error)
	UpdateStatus(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input UpdateSessionStatusInput) error

	// Meetings
	AddMeeting(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input AddMeetingInput) (*Meeting, error)
	UpdateMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input UpdateMeetingInput) (*Meeting, error)
	DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) error

	// Children methods
	ListPeserta(ctx context.Context, sessionID uuid.UUID) ([]SessionPeserta, error)
	AddPeserta(ctx context.Context, sessionID uuid.UUID, input PesertaInput) (*SessionPeserta, error)
	ListPertemuan(ctx context.Context, sessionID uuid.UUID) ([]SessionPertemuan, error)
	SaveCatatanPertemuan(ctx context.Context, sessionID uuid.UUID, input CatatPertemuanPesertaInput) (*SessionPertemuanPesertaCatatan, error)
	ListCatatanPertemuan(ctx context.Context, pertemuanID uuid.UUID) ([]SessionPertemuanPesertaCatatan, error)

	ResendNotification(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID) error
}
