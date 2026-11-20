package domain

import (
	"context"
	"time"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
)

// SatuanKerja represents high-level organization/agency units in Kemenhub (e.g. BPSDM Perhubungan, Ditjen Hubdat, Setjen).
type SatuanKerja struct {
	ID             string    `json:"id" gorm:"column:id;primaryKey"`
	Kode           string    `json:"kode" gorm:"column:kode;not null;unique"`
	Nama           string    `json:"nama" gorm:"column:nama;not null"`
	Singkatan      string    `json:"singkatan,omitempty" gorm:"column:singkatan"`
	InstansiInduk  string    `json:"instansi_induk" gorm:"column:instansi_induk;default:'Kementerian Perhubungan'"`
	Alamat         string    `json:"alamat,omitempty" gorm:"column:alamat"`
	Telepon        string    `json:"telepon,omitempty" gorm:"column:telepon"`
	TotalUnitKerja int64     `json:"total_unit_kerja" gorm:"-"`
	TotalPegawai   int64     `json:"total_pegawai" gorm:"-"`
	CreatedAt      time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt      time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime"`
}

// TableName sets table name for GORM.
func (SatuanKerja) TableName() string {
	return "ref_satuan_kerja"
}

// SatuanKerjaRepository defines storage contracts for Satuan Kerja.
type SatuanKerjaRepository interface {
	FindAll(ctx context.Context, query string) ([]SatuanKerja, error)
	FindByID(ctx context.Context, id string) (*SatuanKerja, error)
	FindByNama(ctx context.Context, nama string) (*SatuanKerja, error)
	GetPegawaiBySatuanKerja(ctx context.Context, satkerNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

// SatuanKerjaUsecase defines business contracts for Satuan Kerja.
type SatuanKerjaUsecase interface {
	ListSatuanKerja(ctx context.Context, query string) ([]SatuanKerja, error)
	GetSatuanKerja(ctx context.Context, id string) (*SatuanKerja, error)
	GetPegawaiBySatuanKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

