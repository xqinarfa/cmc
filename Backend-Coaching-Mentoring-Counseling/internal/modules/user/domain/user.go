package domain

import (
	"context"
	"encoding/json"
	"strings"
	"time"

	"github.com/google/uuid"
)

// Role represents user authorization roles in Coaching, Mentoring & Counseling system.
type Role string

const (
	RoleSuperAdmin Role = "super_admin"
	RoleAdmin      Role = "admin"
	RolePegawai    Role = "pegawai"

	// Backward-compatibility aliases for legacy roles
	RoleClient    Role = "client"
	RoleCoach     Role = "coach"
	RoleMentor    Role = "mentor"
	RoleCounselor Role = "counselor"
)

var AllRoles = []Role{
	RoleSuperAdmin,
	RoleAdmin,
	RolePegawai,
}

func (r Role) IsValid() bool {
	switch r.Normalize() {
	case RoleSuperAdmin, RoleAdmin, RolePegawai:
		return true
	default:
		return false
	}
}

func (r Role) Normalize() Role {
	switch strings.ToLower(strings.TrimSpace(string(r))) {
	case "super_admin", "superadmin", "super admin":
		return RoleSuperAdmin
	case "admin":
		return RoleAdmin
	case "pegawai", "client":
		return RolePegawai
	default:
		return r
	}
}

// IsAdmin returns true if role is either admin or super_admin.
func (r Role) IsAdmin() bool {
	norm := r.Normalize()
	return norm == RoleAdmin || norm == RoleSuperAdmin
}

// IsSuperAdmin returns true if role is super_admin.
func (r Role) IsSuperAdmin() bool {
	return r.Normalize() == RoleSuperAdmin
}

// IsPegawai returns true if role is pegawai.
func (r Role) IsPegawai() bool {
	return r.Normalize() == RolePegawai
}

func (r Role) String() string {
	return string(r)
}

// User represents the core user account in the system, synchronized with SIK Kemenhub data.
type User struct {
	ID                     uuid.UUID  `json:"id" gorm:"type:uuid;primaryKey"`
	NIP                    string     `json:"nip,omitempty" gorm:"column:nip;type:varchar(50);index"`
	Email                  string     `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	PasswordHash           string     `json:"-" gorm:"type:varchar(255);not null"`
	FullName               string     `json:"full_name" gorm:"type:varchar(255);not null"`
	Role                   Role       `json:"role" gorm:"type:varchar(50);not null;index"`
	Phone                  string     `json:"phone" gorm:"type:varchar(50)"`
	AvatarURL              string     `json:"avatar_url" gorm:"type:varchar(512)"`
	Provider               string     `json:"provider" gorm:"type:varchar(50);default:'LOCAL'"`
	IsActive               bool       `json:"is_active" gorm:"type:boolean;default:true"`
	GelarDepan             string     `json:"gelar_depan,omitempty" gorm:"column:gelar_depan;type:varchar(50)"`
	GelarBelakang          string     `json:"gelar_belakang,omitempty" gorm:"column:gelar_belakang;type:varchar(50)"`
	TempatLahir            string     `json:"tempat_lahir,omitempty" gorm:"column:tempat_lahir;type:varchar(100)"`
	TanggalLahir           string     `json:"tanggal_lahir,omitempty" gorm:"column:tanggal_lahir;type:varchar(50)"`
	JenisKelamin           string     `json:"jenis_kelamin,omitempty" gorm:"column:jenis_kelamin;type:varchar(20)"`
	Agama                  string     `json:"agama,omitempty" gorm:"column:agama;type:varchar(50)"`
	Jabatan                string     `json:"jabatan,omitempty" gorm:"column:jabatan;type:varchar(255)"`
	JenisJabatan           string     `json:"jenis_jabatan,omitempty" gorm:"column:jenis_jabatan;type:varchar(100)"`
	PangkatGolongan        string     `json:"pangkat_golongan,omitempty" gorm:"column:pangkat_golongan;type:varchar(100)"`
	UnitKerja              string     `json:"unit_kerja,omitempty" gorm:"column:unit_kerja;type:varchar(255)"`
	SubUnitKerja           string     `json:"sub_unit_kerja,omitempty" gorm:"column:sub_unit_kerja;type:varchar(255)"`
	SubUnitKerjaKode       string     `json:"sub_unit_kerja_kode,omitempty" gorm:"column:sub_unit_kerja_kode;type:varchar(100)"`
	SatuanKerja            string     `json:"satuan_kerja,omitempty" gorm:"column:satuan_kerja;type:varchar(255)"`
	InstansiInduk          string     `json:"instansi_induk,omitempty" gorm:"column:instansi_induk;type:varchar(255);default:'Kementerian Perhubungan'"`
	Eselon                 string     `json:"eselon,omitempty" gorm:"column:eselon;type:varchar(50)"`
	StatusKepegawaian      string     `json:"status_kepegawaian,omitempty" gorm:"column:status_kepegawaian;type:varchar(50);default:'PNS'"`
	PendidikanTerakhir     string     `json:"pendidikan_terakhir,omitempty" gorm:"column:pendidikan_terakhir;type:varchar(255)"`
	AtasanLangsungNIP      string     `json:"atasan_langsung_nip,omitempty" gorm:"column:atasan_langsung_nip;type:varchar(50)"`
	AtasanLangsungNama     string     `json:"atasan_langsung_nama,omitempty" gorm:"column:atasan_langsung_nama;type:varchar(255)"`
	AtasanLangsungJabatan  string     `json:"atasan_langsung_jabatan,omitempty" gorm:"column:atasan_langsung_jabatan;type:varchar(255)"`
	MasaKerjaTahun         int        `json:"masa_kerja_tahun" gorm:"column:masa_kerja_tahun;default:0"`
	MasaKerjaBulan         int        `json:"masa_kerja_bulan" gorm:"column:masa_kerja_bulan;default:0"`
	SIKSyncedAt            *time.Time `json:"sik_synced_at,omitempty" gorm:"column:sik_synced_at"`
	SIKData                string     `json:"sik_data,omitempty" gorm:"column:sik_data;type:jsonb"`
	CreatedAt              time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt              time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt              *time.Time `json:"deleted_at,omitempty" gorm:"index"`
}

// UserResponse represents safe user data returned in API responses with full SIK attributes.
type UserResponse struct {
	ID                     uuid.UUID   `json:"id"`
	NIP                    string      `json:"nip,omitempty"`
	Email                  string      `json:"email"`
	FullName               string      `json:"full_name"`
	Role                   Role        `json:"role"`
	Phone                  string      `json:"phone,omitempty"`
	AvatarURL              string      `json:"avatar_url,omitempty"`
	Provider               string      `json:"provider,omitempty"`
	IsActive               bool        `json:"is_active"`
	GelarDepan             string      `json:"gelar_depan,omitempty"`
	GelarBelakang          string      `json:"gelar_belakang,omitempty"`
	NamaLengkapGelar       string      `json:"nama_lengkap_gelar,omitempty"`
	TempatLahir            string      `json:"tempat_lahir,omitempty"`
	TanggalLahir           string      `json:"tanggal_lahir,omitempty"`
	JenisKelamin           string      `json:"jenis_kelamin,omitempty"`
	Agama                  string      `json:"agama,omitempty"`
	Jabatan                string      `json:"jabatan,omitempty"`
	JenisJabatan           string      `json:"jenis_jabatan,omitempty"`
	PangkatGolongan        string      `json:"pangkat_golongan,omitempty"`
	UnitKerja              string      `json:"unit_kerja,omitempty"`
	SubUnitKerja           string      `json:"sub_unit_kerja,omitempty"`
	SubUnitKerjaKode       string      `json:"sub_unit_kerja_kode,omitempty"`
	SatuanKerja            string      `json:"satuan_kerja,omitempty"`
	InstansiInduk          string      `json:"instansi_induk,omitempty"`
	Eselon                 string      `json:"eselon,omitempty"`
	StatusKepegawaian      string      `json:"status_kepegawaian,omitempty"`
	PendidikanTerakhir     string      `json:"pendidikan_terakhir,omitempty"`
	AtasanLangsungNIP      string      `json:"atasan_langsung_nip,omitempty"`
	AtasanLangsungNama     string      `json:"atasan_langsung_nama,omitempty"`
	AtasanLangsungJabatan  string      `json:"atasan_langsung_jabatan,omitempty"`
	MasaKerjaTahun         int         `json:"masa_kerja_tahun"`
	MasaKerjaBulan         int         `json:"masa_kerja_bulan"`
	SIKSyncedAt            *time.Time  `json:"sik_synced_at,omitempty"`
	SIKData                interface{} `json:"sik_data,omitempty"`
	CreatedAt              time.Time   `json:"created_at"`
}

func (u *User) FormatNamaLengkap() string {
	var parts []string
	if strings.TrimSpace(u.GelarDepan) != "" {
		parts = append(parts, strings.TrimSpace(u.GelarDepan))
	}
	parts = append(parts, strings.TrimSpace(u.FullName))
	res := strings.Join(parts, " ")
	if strings.TrimSpace(u.GelarBelakang) != "" {
		res = res + ", " + strings.TrimSpace(u.GelarBelakang)
	}
	return res
}

func (u *User) ToResponse() *UserResponse {
	var parsedSIKData interface{}
	if u.SIKData != "" {
		_ = json.Unmarshal([]byte(u.SIKData), &parsedSIKData)
	}

	return &UserResponse{
		ID:                    u.ID,
		NIP:                   u.NIP,
		Email:                 u.Email,
		FullName:              u.FullName,
		Role:                  u.Role,
		Phone:                 u.Phone,
		AvatarURL:             u.AvatarURL,
		Provider:              u.Provider,
		IsActive:              u.IsActive,
		GelarDepan:            u.GelarDepan,
		GelarBelakang:         u.GelarBelakang,
		NamaLengkapGelar:      u.FormatNamaLengkap(),
		TempatLahir:           u.TempatLahir,
		TanggalLahir:          u.TanggalLahir,
		JenisKelamin:          u.JenisKelamin,
		Agama:                 u.Agama,
		Jabatan:               u.Jabatan,
		JenisJabatan:          u.JenisJabatan,
		PangkatGolongan:       u.PangkatGolongan,
		UnitKerja:             u.UnitKerja,
		SubUnitKerja:          u.SubUnitKerja,
		SubUnitKerjaKode:      u.SubUnitKerjaKode,
		SatuanKerja:           u.SatuanKerja,
		InstansiInduk:         u.InstansiInduk,
		Eselon:                u.Eselon,
		StatusKepegawaian:     u.StatusKepegawaian,
		PendidikanTerakhir:    u.PendidikanTerakhir,
		AtasanLangsungNIP:     u.AtasanLangsungNIP,
		AtasanLangsungNama:    u.AtasanLangsungNama,
		AtasanLangsungJabatan: u.AtasanLangsungJabatan,
		MasaKerjaTahun:        u.MasaKerjaTahun,
		MasaKerjaBulan:        u.MasaKerjaBulan,
		SIKSyncedAt:           u.SIKSyncedAt,
		SIKData:               parsedSIKData,
		CreatedAt:             u.CreatedAt,
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
	CountAdminsByUnitKerja(ctx context.Context, unitKerja string) (int64, error)
	FindRolesByNIPs(ctx context.Context, nips []string) (map[string]Role, error)
}

// UserUsecase defines business logic contracts for user module.
type UserUsecase interface {
	GetProfile(ctx context.Context, userID uuid.UUID) (*UserResponse, error)
	ListPractitioners(ctx context.Context, role Role) ([]UserResponse, error)
	SyncSIK(ctx context.Context, userID uuid.UUID) (*UserResponse, error)
}
