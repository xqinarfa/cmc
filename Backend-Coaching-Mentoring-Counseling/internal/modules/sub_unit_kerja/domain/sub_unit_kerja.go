package domain

import (
	"context"
	"time"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
)

// SubUnitKerja represents operational sub-units under a Unit Kerja (e.g. Subbagian, Seksi, Subbidang, Bagian).
type SubUnitKerja struct {
	ID              string    `json:"id" gorm:"column:id;primaryKey"`
	Kode            string    `json:"kode" gorm:"column:kode;not null;unique"`
	Nama            string    `json:"nama" gorm:"column:nama;not null"`
	UnitKerjaID     string    `json:"unit_kerja_id" gorm:"column:unit_kerja_id;not null"`
	UnitKerjaNama   string    `json:"unit_kerja_nama" gorm:"column:unit_kerja_nama;not null"`
	SatuanKerjaID   string    `json:"satuan_kerja_id,omitempty" gorm:"column:satuan_kerja_id"`
	SatuanKerjaNama string    `json:"satuan_kerja_nama,omitempty" gorm:"column:satuan_kerja_nama"`
	Deskripsi       string    `json:"deskripsi,omitempty" gorm:"column:deskripsi"`
	TotalPegawai    int64     `json:"total_pegawai" gorm:"-"`
	CreatedAt       time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt       time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime"`
}

// TableName sets table name for GORM.
func (SubUnitKerja) TableName() string {
	return "ref_sub_unit_kerja"
}

// SubUnitKerjaFilter defines filter criteria for querying Sub Unit Kerja.
type SubUnitKerjaFilter struct {
	UnitKerjaID   string `json:"unit_kerja_id"`
	SatuanKerjaID string `json:"satuan_kerja_id"`
	Query         string `json:"query"`
}

// SubUnitKerjaRepository defines storage contracts for Sub Unit Kerja.
type SubUnitKerjaRepository interface {
	FindAll(ctx context.Context, filter SubUnitKerjaFilter) ([]SubUnitKerja, error)
	FindByID(ctx context.Context, id string) (*SubUnitKerja, error)
	FindByUnitKerja(ctx context.Context, unitKerjaID string) ([]SubUnitKerja, error)
	GetPegawaiBySubUnitKerja(ctx context.Context, subUnitNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

// SubUnitKerjaUsecase defines business contracts for Sub Unit Kerja.
type SubUnitKerjaUsecase interface {
	ListSubUnitKerja(ctx context.Context, filter SubUnitKerjaFilter) ([]SubUnitKerja, error)
	GetSubUnitKerja(ctx context.Context, id string) (*SubUnitKerja, error)
	GetPegawaiBySubUnitKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

