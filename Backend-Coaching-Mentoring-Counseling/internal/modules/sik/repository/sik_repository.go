package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type SIKRepository struct {
	db *database.DB
}

func NewSIKRepository(db *database.DB) *SIKRepository {
	return &SIKRepository{db: db}
}

func (r *SIKRepository) FindByNIP(ctx context.Context, nip string) (*sikdomain.Pegawai, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var pegawai sikdomain.Pegawai
	cleanNIP := strings.TrimSpace(nip)
	result := r.db.GormDB.WithContext(ctxTimeout).Where("nip = ?", cleanNIP).First(&pegawai)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrPegawaiNotFound
		}
		return nil, fmt.Errorf("failed to find pegawai by nip: %w", result.Error)
	}

	return &pegawai, nil
}

func (r *SIKRepository) FindAll(ctx context.Context, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if limit <= 0 || limit > 500 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{})

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"nip ILIKE ? OR nama ILIKE ? OR jabatan ILIKE ? OR unit_kerja ILIKE ? OR sub_unit_kerja ILIKE ? OR satuan_kerja ILIKE ?",
			likePattern, likePattern, likePattern, likePattern, likePattern, likePattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count pegawai: %w", err)
	}

	var list []sikdomain.Pegawai
	if err := dbQuery.Order("nama ASC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch pegawai list: %w", err)
	}

	return list, total, nil
}

func (r *SIKRepository) FindByUnitKerja(ctx context.Context, unitKerja string) ([]sikdomain.Pegawai, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sikdomain.Pegawai
	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("unit_kerja ILIKE ?", "%"+strings.TrimSpace(unitKerja)+"%").
		Order("nama ASC").
		Find(&list)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to find pegawai by unit kerja: %w", result.Error)
	}

	return list, nil
}

func (r *SIKRepository) FilterPegawai(ctx context.Context, filter sikdomain.PegawaiFilter, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if limit <= 0 || limit > 500 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{})

	if cleanQuery := strings.TrimSpace(filter.Query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"nip ILIKE ? OR nama ILIKE ? OR jabatan ILIKE ? OR unit_kerja ILIKE ? OR sub_unit_kerja ILIKE ? OR satuan_kerja ILIKE ?",
			likePattern, likePattern, likePattern, likePattern, likePattern, likePattern,
		)
	}

	if cleanUnit := strings.TrimSpace(filter.UnitKerja); cleanUnit != "" && cleanUnit != "all" {
		dbQuery = dbQuery.Where("unit_kerja ILIKE ?", "%"+cleanUnit+"%")
	}

	if cleanSubUnit := strings.TrimSpace(filter.SubUnitKerja); cleanSubUnit != "" && cleanSubUnit != "all" {
		dbQuery = dbQuery.Where("sub_unit_kerja ILIKE ?", "%"+cleanSubUnit+"%")
	}

	if cleanSatker := strings.TrimSpace(filter.SatuanKerja); cleanSatker != "" && cleanSatker != "all" {
		dbQuery = dbQuery.Where("satuan_kerja ILIKE ?", "%"+cleanSatker+"%")
	}

	if cleanEselon := strings.TrimSpace(filter.Eselon); cleanEselon != "" && cleanEselon != "all" {
		dbQuery = dbQuery.Where("eselon ILIKE ?", "%"+cleanEselon+"%")
	}

	if cleanStatus := strings.TrimSpace(filter.StatusKepegawaian); cleanStatus != "" && cleanStatus != "all" {
		if strings.EqualFold(cleanStatus, "NON_PNS") {
			dbQuery = dbQuery.Where("status_kepegawaian NOT IN ('PNS', 'PPPK')")
		} else {
			dbQuery = dbQuery.Where("status_kepegawaian ILIKE ?", "%"+cleanStatus+"%")
		}
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count filtered pegawai: %w", err)
	}

	var list []sikdomain.Pegawai
	if err := dbQuery.Order("nama ASC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch filtered pegawai list: %w", err)
	}

	return list, total, nil
}

func (r *SIKRepository) FindBySatuanKerja(ctx context.Context, satuanKerja string) ([]sikdomain.Pegawai, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sikdomain.Pegawai
	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("satuan_kerja ILIKE ?", "%"+strings.TrimSpace(satuanKerja)+"%").
		Order("nama ASC").
		Find(&list)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to find pegawai by satuan kerja: %w", result.Error)
	}

	return list, nil
}

func (r *SIKRepository) GetReferensi(ctx context.Context) (*sikdomain.SIKReferensi, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var res sikdomain.SIKReferensi

	// Eselon aggregation
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("eselon as nama, COUNT(*) as total").
		Where("eselon IS NOT NULL AND eselon != ''").
		Group("eselon").
		Order("total DESC").
		Scan(&res.Eselon)

	// Satuan Kerja aggregation
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("satuan_kerja as nama, COUNT(*) as total").
		Where("satuan_kerja IS NOT NULL AND satuan_kerja != ''").
		Group("satuan_kerja").
		Order("total DESC").
		Scan(&res.SatuanKerja)

	// Unit Kerja aggregation
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("unit_kerja as nama, MAX(satuan_kerja) as satuan_kerja, COUNT(*) as total").
		Where("unit_kerja IS NOT NULL AND unit_kerja != ''").
		Group("unit_kerja").
		Order("total DESC").
		Scan(&res.UnitKerja)

	// Sub Unit Kerja aggregation
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("sub_unit_kerja as nama, MAX(sub_unit_kerja_kode) as kode, MAX(unit_kerja) as unit_kerja, MAX(satuan_kerja) as satuan_kerja, COUNT(*) as total").
		Where("sub_unit_kerja IS NOT NULL AND sub_unit_kerja != ''").
		Group("sub_unit_kerja").
		Order("kode ASC, total DESC").
		Scan(&res.SubUnitKerja)

	return &res, nil
}

func (r *SIKRepository) Save(ctx context.Context, pegawai *sikdomain.Pegawai) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Clauses(clause.OnConflict{
		UpdateAll: true,
	}).Save(pegawai)

	if result.Error != nil {
		return fmt.Errorf("failed to upsert pegawai: %w", result.Error)
	}

	return nil
}

func (r *SIKRepository) Count(ctx context.Context) (int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var total int64
	if err := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{}).Count(&total).Error; err != nil {
		return 0, fmt.Errorf("failed to count pegawai in sik_pegawai: %w", err)
	}
	return total, nil
}

func (r *SIKRepository) CountByUnitKerja(ctx context.Context, unitKerja string) (int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var total int64
	cleanUnit := strings.TrimSpace(unitKerja)
	query := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{})
	if cleanUnit != "" {
		query = query.Where("unit_kerja ILIKE ?", "%"+cleanUnit+"%")
	}
	if err := query.Count(&total).Error; err != nil {
		return 0, fmt.Errorf("failed to count pegawai by unit kerja: %w", err)
	}
	return total, nil
}

// SaveWithAudit performs upsert and identifies whether the record was an INSERT, UPDATE, or UNCHANGED.
func (r *SIKRepository) SaveWithAudit(ctx context.Context, pegawai *sikdomain.Pegawai) (string, []string, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var existing sikdomain.Pegawai
	err := r.db.GormDB.WithContext(ctxTimeout).Where("nip = ?", pegawai.NIP).First(&existing).Error
	if err != nil {
		// Not found -> INSERT
		if saveErr := r.Save(ctx, pegawai); saveErr != nil {
			return "", nil, saveErr
		}
		return "INSERT", nil, nil
	}

	// Compare fields to detect changes
	var changedFields []string
	if strings.TrimSpace(existing.Jabatan) != strings.TrimSpace(pegawai.Jabatan) {
		changedFields = append(changedFields, "jabatan")
	}
	if strings.TrimSpace(existing.Pangkat) != strings.TrimSpace(pegawai.Pangkat) {
		changedFields = append(changedFields, "pangkat")
	}
	if strings.TrimSpace(existing.GolonganRuang) != strings.TrimSpace(pegawai.GolonganRuang) {
		changedFields = append(changedFields, "golongan_ruang")
	}
	if strings.TrimSpace(existing.UnitKerja) != strings.TrimSpace(pegawai.UnitKerja) {
		changedFields = append(changedFields, "unit_kerja")
	}
	if strings.TrimSpace(existing.SubUnitKerja) != strings.TrimSpace(pegawai.SubUnitKerja) {
		changedFields = append(changedFields, "sub_unit_kerja")
	}
	if strings.TrimSpace(existing.SubUnitKerjaKode) != strings.TrimSpace(pegawai.SubUnitKerjaKode) {
		changedFields = append(changedFields, "sub_unit_kerja_kode")
	}
	if strings.TrimSpace(existing.StatusKepegawaian) != strings.TrimSpace(pegawai.StatusKepegawaian) {
		changedFields = append(changedFields, "status_kepegawaian")
	}
	if strings.TrimSpace(existing.EmailDinas) != strings.TrimSpace(pegawai.EmailDinas) {
		changedFields = append(changedFields, "email_dinas")
	}
	if strings.TrimSpace(existing.NoHP) != strings.TrimSpace(pegawai.NoHP) {
		changedFields = append(changedFields, "no_hp")
	}
	if strings.TrimSpace(existing.Eselon) != strings.TrimSpace(pegawai.Eselon) {
		changedFields = append(changedFields, "eselon")
	}

	if len(changedFields) > 0 {
		if saveErr := r.Save(ctx, pegawai); saveErr != nil {
			return "", nil, saveErr
		}
		return "UPDATE", changedFields, nil
	}

	return "UNCHANGED", nil, nil
}

// SaveSyncHistory inserts a sync history run into sik_sync_history table.
func (r *SIKRepository) SaveSyncHistory(ctx context.Context, history *sikdomain.SIKSyncHistory) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if err := r.db.GormDB.WithContext(ctxTimeout).Create(history).Error; err != nil {
		return fmt.Errorf("failed to save sik sync history: %w", err)
	}
	return nil
}

// FindSyncHistories retrieves paginated sync runs ordered by created_at DESC.
func (r *SIKRepository) FindSyncHistories(ctx context.Context, limit, offset int, status string) ([]sikdomain.SIKSyncHistory, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	query := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.SIKSyncHistory{})
	if cleanStatus := strings.TrimSpace(status); cleanStatus != "" && cleanStatus != "all" {
		query = query.Where("status = ?", cleanStatus)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count sync history: %w", err)
	}

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	var list []sikdomain.SIKSyncHistory
	if err := query.Order("created_at DESC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch sync histories: %w", err)
	}

	return list, total, nil
}

// FindSyncHistoryByID retrieves a single sync run by its ID.
func (r *SIKRepository) FindSyncHistoryByID(ctx context.Context, id string) (*sikdomain.SIKSyncHistory, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var item sikdomain.SIKSyncHistory
	if err := r.db.GormDB.WithContext(ctxTimeout).Where("id = ?", id).First(&item).Error; err != nil {
		return nil, fmt.Errorf("sync history not found: %w", err)
	}

	return &item, nil
}



