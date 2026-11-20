package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	satkerdomain "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/domain"
	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
)

type SatuanKerjaRepository struct {
	db *database.DB
}

func NewSatuanKerjaRepository(db *database.DB) *SatuanKerjaRepository {
	return &SatuanKerjaRepository{db: db}
}

func (r *SatuanKerjaRepository) FindAll(ctx context.Context, query string) ([]satkerdomain.SatuanKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&satkerdomain.SatuanKerja{})

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where("kode ILIKE ? OR nama ILIKE ? OR singkatan ILIKE ?", likePattern, likePattern, likePattern)
	}

	var list []satkerdomain.SatuanKerja
	if err := dbQuery.Order("kode ASC, nama ASC").Find(&list).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch satuan kerja: %w", err)
	}

	// Calculate employee counts per satker from SIK
	type countPegawai struct {
		SatuanKerja string
		Total       int64
	}
	var pCounts []countPegawai
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("satuan_kerja, COUNT(*) as total").
		Group("satuan_kerja").
		Scan(&pCounts)

	pegawaiCountMap := make(map[string]int64)
	for _, c := range pCounts {
		pegawaiCountMap[strings.ToLower(strings.TrimSpace(c.SatuanKerja))] = c.Total
	}

	// Calculate unit kerja count per satker
	type countUnit struct {
		SatuanKerjaID string
		Total         int64
	}
	var uCounts []countUnit
	r.db.GormDB.WithContext(ctxTimeout).
		Table("ref_unit_kerja").
		Select("satuan_kerja_id, COUNT(*) as total").
		Group("satuan_kerja_id").
		Scan(&uCounts)

	unitCountMap := make(map[string]int64)
	for _, c := range uCounts {
		unitCountMap[strings.ToLower(strings.TrimSpace(c.SatuanKerjaID))] = c.Total
	}

	for i := range list {
		normName := strings.ToLower(strings.TrimSpace(list[i].Nama))
		normID := strings.ToLower(strings.TrimSpace(list[i].ID))

		list[i].TotalPegawai = pegawaiCountMap[normName]
		list[i].TotalUnitKerja = unitCountMap[normID]
	}

	return list, nil
}

func (r *SatuanKerjaRepository) FindByID(ctx context.Context, id string) (*satkerdomain.SatuanKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var item satkerdomain.SatuanKerja
	cleanID := strings.TrimSpace(id)
	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? OR kode ILIKE ? OR nama ILIKE ?", cleanID, cleanID, cleanID).
		First(&item)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("satuan kerja not found")
		}
		return nil, fmt.Errorf("failed to find satuan kerja: %w", result.Error)
	}

	// Count pegawai
	var totalPegawai int64
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Where("satuan_kerja ILIKE ?", item.Nama).
		Count(&totalPegawai)
	item.TotalPegawai = totalPegawai

	// Count unit kerja
	var totalUnit int64
	r.db.GormDB.WithContext(ctxTimeout).
		Table("ref_unit_kerja").
		Where("satuan_kerja_id = ?", item.ID).
		Count(&totalUnit)
	item.TotalUnitKerja = totalUnit

	return &item, nil
}

func (r *SatuanKerjaRepository) FindByNama(ctx context.Context, nama string) (*satkerdomain.SatuanKerja, error) {
	return r.FindByID(ctx, nama)
}

func (r *SatuanKerjaRepository) GetPegawaiBySatuanKerja(ctx context.Context, satkerNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{})

	if cleanSatker := strings.TrimSpace(satkerNama); cleanSatker != "" {
		dbQuery = dbQuery.Where("satuan_kerja ILIKE ?", "%"+cleanSatker+"%")
	}

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"nip ILIKE ? OR nama ILIKE ? OR jabatan ILIKE ? OR unit_kerja ILIKE ?",
			likePattern, likePattern, likePattern, likePattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count pegawai by satuan kerja: %w", err)
	}

	var list []sikdomain.Pegawai
	if err := dbQuery.Order("nama ASC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch pegawai by satuan kerja: %w", err)
	}

	return list, total, nil
}

func (r *SatuanKerjaRepository) SyncFromSIK(ctx context.Context) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	type satkerDef struct {
		ID        string
		Kode      string
		Nama      string
		Singkatan string
	}

	canonicalSatkers := []satkerDef{
		{ID: "setjen", Kode: "001", Nama: "Sekretariat Jenderal", Singkatan: "SETJEN"},
		{ID: "itjen", Kode: "002", Nama: "Inspektorat Jenderal", Singkatan: "ITJEN"},
		{ID: "hubdat", Kode: "003", Nama: "Ditjen Perhubungan Darat", Singkatan: "HUBDAT"},
		{ID: "hubla", Kode: "004", Nama: "Ditjen Perhubungan Laut", Singkatan: "HUBLA"},
		{ID: "hubud", Kode: "005", Nama: "Ditjen Perhubungan Udara", Singkatan: "HUBUD"},
		{ID: "djka", Kode: "006", Nama: "Ditjen Perkeretaapian", Singkatan: "DJKA"},
		{ID: "bkt", Kode: "007", Nama: "Badan Kebijakan Transportasi", Singkatan: "BKT"},
		{ID: "bpsdm", Kode: "008", Nama: "Badan Pengembangan Sumber Daya Manusia Perhubungan", Singkatan: "BPSDM"},
		{ID: "bptj", Kode: "009", Nama: "Badan Pengelola Transportasi Jabodetabek", Singkatan: "BPTJ"},
		{ID: "djitm", Kode: "018", Nama: "Ditjen Integrasi Transportasi dan Multimoda", Singkatan: "DJITM"},
	}

	for _, s := range canonicalSatkers {
		item := satkerdomain.SatuanKerja{
			ID:            s.ID,
			Kode:          s.Kode,
			Nama:          s.Nama,
			Singkatan:     s.Singkatan,
			InstansiInduk: "Kementerian Perhubungan",
		}

		if err := r.db.GormDB.WithContext(ctxTimeout).Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "id"}},
			DoUpdates: clause.AssignmentColumns([]string{"kode", "nama", "singkatan", "instansi_induk", "updated_at"}),
		}).Create(&item).Error; err != nil {
			// If conflict on kode, update by kode
			_ = r.db.GormDB.WithContext(ctxTimeout).Model(&satkerdomain.SatuanKerja{}).
				Where("kode = ? OR id = ?", s.Kode, s.ID).
				Updates(map[string]interface{}{
					"kode":           s.Kode,
					"nama":           s.Nama,
					"singkatan":      s.Singkatan,
					"instansi_induk": "Kementerian Perhubungan",
				})
		}
	}

	return nil
}

