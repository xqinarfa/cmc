package domain

import (
	"context"
	"time"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
)

// UnitKerja represents functional/office units in Kemenhub (e.g. Pusbang SDM Aparatur Perhubungan, BPTD, Balai, Biro).
type UnitKerja struct {
	ID              string    `json:"id" gorm:"column:id;primaryKey"`
	Kode            string    `json:"kode" gorm:"column:kode;not null;unique"`
	Nama            string    `json:"nama" gorm:"column:nama;not null"`
	SatuanKerjaID   string    `json:"satuan_kerja_id" gorm:"column:satuan_kerja_id;not null"`
	SatuanKerjaNama string    `json:"satuan_kerja_nama" gorm:"column:satuan_kerja_nama;not null"`
	Eselon          string    `json:"eselon,omitempty" gorm:"column:eselon"`
	Lokasi          string    `json:"lokasi,omitempty" gorm:"column:lokasi"`
	Alamat          string    `json:"alamat,omitempty" gorm:"column:alamat"`
	TotalSubUnitKerja int64   `json:"total_sub_unit_kerja" gorm:"-"`
	TotalPegawai    int64     `json:"total_pegawai" gorm:"-"`
	CreatedAt       time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt       time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime"`
}

// TableName sets table name for GORM.
func (UnitKerja) TableName() string {
	return "ref_unit_kerja"
}

// UnitKerjaRepository defines storage contracts for Unit Kerja.
type UnitKerjaRepository interface {
	FindAll(ctx context.Context, satkerID string, query string) ([]UnitKerja, error)
	FindByID(ctx context.Context, id string) (*UnitKerja, error)
	FindByNama(ctx context.Context, nama string) (*UnitKerja, error)
	FindBySatuanKerja(ctx context.Context, satkerID string) ([]UnitKerja, error)
	GetPegawaiByUnitKerja(ctx context.Context, unitKerjaNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

// UnitKerjaUsecase defines business contracts for Unit Kerja.
type UnitKerjaUsecase interface {
	ListUnitKerja(ctx context.Context, satkerID string, query string) ([]UnitKerja, error)
	GetUnitKerja(ctx context.Context, id string) (*UnitKerja, error)
	GetPegawaiByUnitKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error)
	SyncFromSIK(ctx context.Context) error
}

