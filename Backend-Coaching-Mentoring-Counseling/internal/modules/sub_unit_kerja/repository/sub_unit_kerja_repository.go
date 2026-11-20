package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	subdomain "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/domain"
	unitdomain "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
)

type SubUnitKerjaRepository struct {
	db *database.DB
}

func NewSubUnitKerjaRepository(db *database.DB) *SubUnitKerjaRepository {
	return &SubUnitKerjaRepository{db: db}
}

func (r *SubUnitKerjaRepository) FindAll(ctx context.Context, filter subdomain.SubUnitKerjaFilter) ([]subdomain.SubUnitKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&subdomain.SubUnitKerja{})

	if cleanUnit := strings.TrimSpace(filter.UnitKerjaID); cleanUnit != "" && cleanUnit != "all" {
		dbQuery = dbQuery.Where("unit_kerja_id = ? OR unit_kerja_nama ILIKE ?", cleanUnit, "%"+cleanUnit+"%")
	}

	if cleanSatker := strings.TrimSpace(filter.SatuanKerjaID); cleanSatker != "" && cleanSatker != "all" {
		dbQuery = dbQuery.Where("satuan_kerja_id = ? OR satuan_kerja_nama ILIKE ?", cleanSatker, "%"+cleanSatker+"%")
	}

	if cleanQuery := strings.TrimSpace(filter.Query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"kode ILIKE ? OR nama ILIKE ? OR unit_kerja_nama ILIKE ? OR satuan_kerja_nama ILIKE ?",
			likePattern, likePattern, likePattern, likePattern,
		)
	}

	var list []subdomain.SubUnitKerja
	// Urutkan berdasarkan kode ASC secara eksplisit sesuai kebutuhan
	if err := dbQuery.Order("kode ASC, nama ASC").Find(&list).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch sub unit kerja: %w", err)
	}

	// Calculate employee counts per sub unit kerja from SIK
	type countPegawai struct {
		SubUnitKerja string
		Total        int64
	}
	var pCounts []countPegawai
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("sub_unit_kerja, COUNT(*) as total").
		Where("sub_unit_kerja IS NOT NULL AND sub_unit_kerja != ''").
		Group("sub_unit_kerja").
		Scan(&pCounts)

	pegawaiCountMap := make(map[string]int64)
	for _, c := range pCounts {
		pegawaiCountMap[strings.ToLower(strings.TrimSpace(c.SubUnitKerja))] = c.Total
	}

	for i := range list {
		normName := strings.ToLower(strings.TrimSpace(list[i].Nama))
		list[i].TotalPegawai = pegawaiCountMap[normName]
	}

	return list, nil
}

func (r *SubUnitKerjaRepository) FindByID(ctx context.Context, id string) (*subdomain.SubUnitKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var item subdomain.SubUnitKerja
	cleanID := strings.TrimSpace(id)
	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? OR kode ILIKE ? OR nama ILIKE ?", cleanID, cleanID, cleanID).
		First(&item)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("sub unit kerja not found")
		}
		return nil, fmt.Errorf("failed to find sub unit kerja: %w", result.Error)
	}

	// Count pegawai
	var total int64
	r.db.GormDB.WithContext(ctxTimeout).
		Model(&sikdomain.Pegawai{}).
		Where("sub_unit_kerja ILIKE ?", "%"+item.Nama+"%").
		Count(&total)
	item.TotalPegawai = total

	return &item, nil
}

func (r *SubUnitKerjaRepository) FindByUnitKerja(ctx context.Context, unitKerjaID string) ([]subdomain.SubUnitKerja, error) {
	return r.FindAll(ctx, subdomain.SubUnitKerjaFilter{UnitKerjaID: unitKerjaID})
}

func (r *SubUnitKerjaRepository) GetPegawaiBySubUnitKerja(ctx context.Context, subUnitNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).
		Model(&sikdomain.Pegawai{}).
		Where("sub_unit_kerja ILIKE ?", "%"+strings.TrimSpace(subUnitNama)+"%")

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where("nip ILIKE ? OR nama ILIKE ? OR jabatan ILIKE ?", likePattern, likePattern, likePattern)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count pegawai in sub unit kerja: %w", err)
	}

	var list []sikdomain.Pegawai
	if err := dbQuery.Order("nama ASC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch pegawai in sub unit kerja: %w", err)
	}

	return list, total, nil
}

func (r *SubUnitKerjaRepository) SyncFromSIK(ctx context.Context) error {
	ctxTimeout, cancel := context.WithTimeout(ctx, 90*time.Second)
	defer cancel()

	type distinctRecord struct {
		SubUnitKerja     string
		SubUnitKerjaKode string
		UnitKerja        string
		SatuanKerja      string
	}

	var records []distinctRecord
	if err := r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("sub_unit_kerja, sub_unit_kerja_kode, MAX(unit_kerja) as unit_kerja, MAX(satuan_kerja) as satuan_kerja").
		Where("sub_unit_kerja IS NOT NULL AND sub_unit_kerja != ''").
		Group("sub_unit_kerja, sub_unit_kerja_kode").
		Scan(&records).Error; err != nil {
		return fmt.Errorf("failed to query distinct sub unit kerja from sik: %w", err)
	}

	for _, rec := range records {
		cleanSub := strings.TrimSpace(rec.SubUnitKerja)
		cleanKode := strings.TrimSpace(rec.SubUnitKerjaKode)
		cleanUnit := strings.TrimSpace(rec.UnitKerja)
		if cleanSub == "" || cleanUnit == "" {
			continue
		}

		// 1. Try matching parentUnit by office code prefix if cleanKode is a 15-digit SIK code
		var parentUnit unitdomain.UnitKerja
		if len(cleanKode) == 15 {
			parentOfficeKode := cleanKode[:6] + "000000000"
			_ = r.db.GormDB.WithContext(ctxTimeout).
				Where("kode = ? OR id = ?", parentOfficeKode, parentOfficeKode).
				First(&parentUnit)
		}

		// 2. If not found by code, try by exact name or substring
		if parentUnit.ID == "" {
			_ = r.db.GormDB.WithContext(ctxTimeout).
				Where("LOWER(nama) = LOWER(?) OR nama ILIKE ?", cleanUnit, "%"+cleanUnit+"%").
				First(&parentUnit)
		}

		// 3. If still not found, search with keywords (e.g. "Aparatur", "Darat", "Laut", "Udara")
		if parentUnit.ID == "" {
			words := strings.Fields(cleanUnit)
			for _, w := range words {
				if len(w) >= 6 {
					_ = r.db.GormDB.WithContext(ctxTimeout).
						Where("nama ILIKE ?", "%"+w+"%").
						First(&parentUnit)
					if parentUnit.ID != "" {
						break
					}
				}
			}
		}

		if parentUnit.ID == "" {
			continue
		}

		finalKode := cleanKode
		if finalKode == "" {
			slugSub := strings.ToLower(strings.ReplaceAll(cleanSub, " ", "_"))
			slugSub = strings.ReplaceAll(slugSub, ".", "")
			slugSub = strings.ReplaceAll(slugSub, "-", "_")
			if len(slugSub) > 20 {
				slugSub = slugSub[:20]
			}
			finalKode = fmt.Sprintf("%s-%s", parentUnit.Kode, strings.ToUpper(slugSub))
		}
		if len(finalKode) > 95 {
			finalKode = finalKode[:95]
		}

		finalID := strings.ToLower(finalKode)

		item := subdomain.SubUnitKerja{
			ID:              finalID,
			Kode:            finalKode,
			Nama:            cleanSub,
			UnitKerjaID:     parentUnit.ID,
			UnitKerjaNama:   parentUnit.Nama,
			SatuanKerjaID:   parentUnit.SatuanKerjaID,
			SatuanKerjaNama: parentUnit.SatuanKerjaNama,
		}

		_ = r.db.GormDB.WithContext(ctxTimeout).Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "id"}},
			DoUpdates: clause.AssignmentColumns([]string{"kode", "nama", "unit_kerja_id", "unit_kerja_nama", "satuan_kerja_id", "satuan_kerja_nama", "updated_at"}),
		}).Create(&item)
	}

	return nil
}

