package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	sikrepo "github.com/kalanara/cmc-backend/internal/modules/sik/repository"
	unitdomain "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
)

type UnitKerjaRepository struct {
	db         *database.DB
	soapClient *sikrepo.SOAPClient
}

func NewUnitKerjaRepository(db *database.DB, soapClient *sikrepo.SOAPClient) *UnitKerjaRepository {
	return &UnitKerjaRepository{db: db, soapClient: soapClient}
}

func (r *UnitKerjaRepository) FindAll(ctx context.Context, satkerID string, query string) ([]unitdomain.UnitKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&unitdomain.UnitKerja{})

	if cleanSatker := strings.TrimSpace(satkerID); cleanSatker != "" && cleanSatker != "all" {
		dbQuery = dbQuery.Where("satuan_kerja_id = ? OR satuan_kerja_nama ILIKE ?", cleanSatker, "%"+cleanSatker+"%")
	}

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"kode ILIKE ? OR nama ILIKE ? OR lokasi ILIKE ? OR satuan_kerja_nama ILIKE ?",
			likePattern, likePattern, likePattern, likePattern,
		)
	}

	var list []unitdomain.UnitKerja
	// Urutkan berdasarkan kode ASC secara eksplisit sesuai kebutuhan
	if err := dbQuery.Order("kode ASC, nama ASC").Find(&list).Error; err != nil {
		return nil, fmt.Errorf("failed to fetch unit kerja: %w", err)
	}

	// Calculate employee counts per unit kerja from SIK
	type countPegawai struct {
		UnitKerja string
		Total     int64
	}
	var pCounts []countPegawai
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("unit_kerja, COUNT(*) as total").
		Group("unit_kerja").
		Scan(&pCounts)

	pegawaiCountMap := make(map[string]int64)
	for _, c := range pCounts {
		pegawaiCountMap[strings.ToLower(strings.TrimSpace(c.UnitKerja))] = c.Total
	}

	// Calculate sub unit kerja counts per unit kerja
	type countSubUnit struct {
		UnitKerjaID string
		Total       int64
	}
	var subCounts []countSubUnit
	r.db.GormDB.WithContext(ctxTimeout).
		Table("ref_sub_unit_kerja").
		Select("unit_kerja_id, COUNT(*) as total").
		Group("unit_kerja_id").
		Scan(&subCounts)

	subUnitCountMap := make(map[string]int64)
	for _, s := range subCounts {
		subUnitCountMap[strings.ToLower(strings.TrimSpace(s.UnitKerjaID))] = s.Total
	}

	for i := range list {
		normName := strings.ToLower(strings.TrimSpace(list[i].Nama))
		normID := strings.ToLower(strings.TrimSpace(list[i].ID))

		list[i].TotalPegawai = pegawaiCountMap[normName]
		list[i].TotalSubUnitKerja = subUnitCountMap[normID]
	}

	return list, nil
}

func (r *UnitKerjaRepository) FindByID(ctx context.Context, id string) (*unitdomain.UnitKerja, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var item unitdomain.UnitKerja
	cleanID := strings.TrimSpace(id)
	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? OR kode ILIKE ? OR nama ILIKE ?", cleanID, cleanID, cleanID).
		First(&item)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("unit kerja not found")
		}
		return nil, fmt.Errorf("failed to find unit kerja: %w", result.Error)
	}

	// Count pegawai
	var totalPegawai int64
	r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Where("unit_kerja ILIKE ?", item.Nama).
		Count(&totalPegawai)
	item.TotalPegawai = totalPegawai

	return &item, nil
}

func (r *UnitKerjaRepository) FindByNama(ctx context.Context, nama string) (*unitdomain.UnitKerja, error) {
	return r.FindByID(ctx, nama)
}

func (r *UnitKerjaRepository) FindBySatuanKerja(ctx context.Context, satkerID string) ([]unitdomain.UnitKerja, error) {
	return r.FindAll(ctx, satkerID, "")
}

func (r *UnitKerjaRepository) GetPegawaiByUnitKerja(ctx context.Context, unitKerjaNama string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	dbQuery := r.db.GormDB.WithContext(ctxTimeout).Model(&sikdomain.Pegawai{})

	if cleanUnit := strings.TrimSpace(unitKerjaNama); cleanUnit != "" {
		dbQuery = dbQuery.Where("unit_kerja ILIKE ?", "%"+cleanUnit+"%")
	}

	if cleanQuery := strings.TrimSpace(query); cleanQuery != "" {
		likePattern := "%" + cleanQuery + "%"
		dbQuery = dbQuery.Where(
			"nip ILIKE ? OR nama ILIKE ? OR jabatan ILIKE ? OR pangkat ILIKE ?",
			likePattern, likePattern, likePattern, likePattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count pegawai by unit kerja: %w", err)
	}

	var list []sikdomain.Pegawai
	if err := dbQuery.Order("nama ASC").Limit(limit).Offset(offset).Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to fetch pegawai by unit kerja: %w", err)
	}

	return list, total, nil
}

func (r *UnitKerjaRepository) SyncFromSIK(ctx context.Context) error {
	ctxTimeout, cancel := context.WithTimeout(ctx, 90*time.Second)
	defer cancel()

	satkerMap := map[string]struct {
		ID   string
		Nama string
	}{
		"001": {ID: "setjen", Nama: "Sekretariat Jenderal"},
		"002": {ID: "itjen", Nama: "Inspektorat Jenderal"},
		"003": {ID: "hubdat", Nama: "Ditjen Perhubungan Darat"},
		"004": {ID: "hubla", Nama: "Ditjen Perhubungan Laut"},
		"005": {ID: "hubud", Nama: "Ditjen Perhubungan Udara"},
		"006": {ID: "djka", Nama: "Ditjen Perkeretaapian"},
		"007": {ID: "bkt", Nama: "Badan Kebijakan Transportasi"},
		"008": {ID: "bpsdm", Nama: "Badan Pengembangan Sumber Daya Manusia Perhubungan"},
		"009": {ID: "bptj", Nama: "Badan Pengelola Transportasi Jabodetabek"},
		"018": {ID: "djitm", Nama: "Ditjen Integrasi Transportasi dan Multimoda"},
	}

	// 1. If SOAP Client is configured, query official kantor list across all Satuan Kerja concurrently
	if r.soapClient != nil {
		satkerCodes := []string{"001", "002", "003", "004", "005", "006", "007", "008", "009", "018"}
		type satkerResult struct {
			sCode   string
			kantors []sikrepo.SOAPItemKantor
		}

		resultsChan := make(chan satkerResult, len(satkerCodes))
		var wg sync.WaitGroup

		for _, sCode := range satkerCodes {
			wg.Add(1)
			go func(code string) {
				defer wg.Done()
				kantors, err := r.soapClient.GetListDataKantor(ctxTimeout, code)
				if err == nil && len(kantors) > 0 {
					resultsChan <- satkerResult{sCode: code, kantors: kantors}
				}
			}(sCode)
		}

		wg.Wait()
		close(resultsChan)

		for res := range resultsChan {
			sInfo, hasInfo := satkerMap[res.sCode]
			if !hasInfo {
				sInfo = satkerMap["008"]
			}

			for _, k := range res.kantors {
				cleanKode := strings.TrimSpace(k.KodeKantor)
				cleanNama := strings.TrimSpace(k.NamaKantor)
				if cleanKode == "" || cleanNama == "" {
					continue
				}

				// Check if there is an existing unit kerja by code, id, or case-insensitive name
				var existing unitdomain.UnitKerja
				findErr := r.db.GormDB.WithContext(ctxTimeout).
					Where("kode = ? OR id = ? OR LOWER(nama) = LOWER(?)", cleanKode, cleanKode, cleanNama).
					First(&existing).Error

				if findErr == nil && existing.ID != "" {
					_ = r.db.GormDB.WithContext(ctxTimeout).Model(&unitdomain.UnitKerja{}).
						Where("id = ?", existing.ID).
						Updates(map[string]interface{}{
							"kode":              cleanKode,
							"nama":              cleanNama,
							"satuan_kerja_id":   sInfo.ID,
							"satuan_kerja_nama": sInfo.Nama,
							"eselon":            k.Jenis,
							"lokasi":            k.Alamat,
							"alamat":            k.Alamat,
						})
				} else {
					item := unitdomain.UnitKerja{
						ID:              cleanKode,
						Kode:            cleanKode,
						Nama:            cleanNama,
						SatuanKerjaID:   sInfo.ID,
						SatuanKerjaNama: sInfo.Nama,
						Eselon:          k.Jenis,
						Lokasi:          k.Alamat,
						Alamat:          k.Alamat,
					}
					_ = r.db.GormDB.WithContext(ctxTimeout).Clauses(clause.OnConflict{
						Columns:   []clause.Column{{Name: "id"}},
						DoUpdates: clause.AssignmentColumns([]string{"kode", "nama", "satuan_kerja_id", "satuan_kerja_nama", "eselon", "lokasi", "alamat", "updated_at"}),
					}).Create(&item)
				}
			}
		}
	}

	// 2. Also ensure any distinct unit kerja found in sik_pegawai is present
	type UnitGroup struct {
		UnitKerja   string
		SatuanKerja string
		Lokasi      string
		Eselon      string
	}

	var distinctUnits []UnitGroup
	if err := r.db.GormDB.WithContext(ctxTimeout).
		Table("sik_pegawai").
		Select("unit_kerja, satuan_kerja, MAX(lokasi_kerja) as lokasi, MAX(eselon) as eselon").
		Where("unit_kerja IS NOT NULL AND unit_kerja != ''").
		Group("unit_kerja, satuan_kerja").
		Scan(&distinctUnits).Error; err == nil {
		for _, u := range distinctUnits {
			cleanUnit := strings.TrimSpace(u.UnitKerja)
			cleanSatker := strings.TrimSpace(u.SatuanKerja)
			if cleanUnit == "" {
				continue
			}

			// Check if already in ref_unit_kerja
			var count int64
			r.db.GormDB.WithContext(ctxTimeout).
				Model(&unitdomain.UnitKerja{}).
				Where("LOWER(nama) = LOWER(?)", cleanUnit).
				Count(&count)
			if count > 0 {
				continue
			}

			// Resolve satker ID
			targetSatkerID := "bpsdm"
			targetSatkerNama := "Badan Pengembangan Sumber Daya Manusia Perhubungan"
			lowerSatker := strings.ToLower(cleanSatker)
			if strings.Contains(lowerSatker, "darat") || strings.Contains(lowerSatker, "hubdat") {
				targetSatkerID = "hubdat"
				targetSatkerNama = "Ditjen Perhubungan Darat"
			} else if strings.Contains(lowerSatker, "laut") || strings.Contains(lowerSatker, "hubla") {
				targetSatkerID = "hubla"
				targetSatkerNama = "Ditjen Perhubungan Laut"
			} else if strings.Contains(lowerSatker, "udara") || strings.Contains(lowerSatker, "hubud") {
				targetSatkerID = "hubud"
				targetSatkerNama = "Ditjen Perhubungan Udara"
			} else if strings.Contains(lowerSatker, "setjen") || strings.Contains(lowerSatker, "sekretariat") {
				targetSatkerID = "setjen"
				targetSatkerNama = "Sekretariat Jenderal"
			}

			unitID := strings.ToLower(strings.ReplaceAll(cleanUnit, " ", "_"))
			unitID = strings.ReplaceAll(unitID, ".", "")
			unitID = strings.ReplaceAll(unitID, "-", "_")
			if len(unitID) > 90 {
				unitID = unitID[:90]
			}

			unitKode := strings.ToUpper(unitID)
			if len(unitKode) > 45 {
				unitKode = unitKode[:45]
			}

			item := unitdomain.UnitKerja{
				ID:              unitID,
				Kode:            unitKode,
				Nama:            cleanUnit,
				SatuanKerjaID:   targetSatkerID,
				SatuanKerjaNama: targetSatkerNama,
				Eselon:          u.Eselon,
				Lokasi:          u.Lokasi,
			}

			_ = r.db.GormDB.WithContext(ctxTimeout).Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "id"}},
				DoUpdates: clause.AssignmentColumns([]string{"kode", "nama", "satuan_kerja_id", "satuan_kerja_nama", "eselon", "lokasi", "updated_at"}),
			}).Create(&item)
		}
	}

	return nil
}

