package usecase

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"strings"
	"sync"
	"time"

	"github.com/kalanara/cmc-backend/internal/config"
	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	sikrepo "github.com/kalanara/cmc-backend/internal/modules/sik/repository"
	unitdomain "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type sikUsecase struct {
	sikRepo    sikdomain.SIKRepository
	unitRepo   unitdomain.UnitKerjaRepository
	sikCfg     config.SIKConfig
	soapClient *sikrepo.SOAPClient
}

func NewSIKUsecase(sikRepo sikdomain.SIKRepository, sikCfg config.SIKConfig, optionalUnitRepo ...unitdomain.UnitKerjaRepository) sikdomain.SIKUsecase {
	var unitRepo unitdomain.UnitKerjaRepository
	if len(optionalUnitRepo) > 0 {
		unitRepo = optionalUnitRepo[0]
	}
	slog.Info("Initializing SIK Usecase",
		"base_url", sikCfg.BaseURL,
		"username", sikCfg.Username,
		"password_len", len(sikCfg.Password),
	)

	return &sikUsecase{
		sikRepo:    sikRepo,
		unitRepo:   unitRepo,
		sikCfg:     sikCfg,
		soapClient: sikrepo.NewSOAPClient(sikCfg.BaseURL, sikCfg.Username, sikCfg.Password),
	}
}

func (u *sikUsecase) GetPegawaiByNIP(ctx context.Context, nip string) (*sikdomain.Pegawai, error) {
	cleanNIP := strings.TrimSpace(nip)
	if cleanNIP == "" {
		return nil, sharederrors.ErrBadRequest
	}

	pegawai, err := u.sikRepo.FindByNIP(ctx, cleanNIP)
	if err == nil && pegawai != nil {
		return pegawai, nil
	}

	// If not found locally, attempt to fetch from SIK SOAP directly
	if u.soapClient != nil {
		raw, errSOAP := u.soapClient.GetPegawaiByNIP(ctx, cleanNIP)
		if errSOAP == nil && raw != nil {
			p := u.mapSOAPToPegawai(*raw)
			_ = u.sikRepo.Save(ctx, &p)
			return &p, nil
		}
	}

	return nil, sharederrors.ErrPegawaiNotFound
}

func (u *sikUsecase) SearchPegawai(ctx context.Context, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	return u.sikRepo.FindAll(ctx, query, limit, offset)
}

func (u *sikUsecase) FilterPegawai(ctx context.Context, filter sikdomain.PegawaiFilter, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	return u.sikRepo.FilterPegawai(ctx, filter, limit, offset)
}

func (u *sikUsecase) ListPegawaiByUnit(ctx context.Context, unitKerja string) ([]sikdomain.Pegawai, error) {
	cleanUnit := strings.TrimSpace(unitKerja)
	if cleanUnit == "" {
		return nil, sharederrors.ErrBadRequest
	}
	return u.sikRepo.FindByUnitKerja(ctx, cleanUnit)
}

func (u *sikUsecase) ListPegawaiBySatker(ctx context.Context, satuanKerja string) ([]sikdomain.Pegawai, error) {
	cleanSatker := strings.TrimSpace(satuanKerja)
	if cleanSatker == "" {
		return nil, sharederrors.ErrBadRequest
	}
	return u.sikRepo.FindBySatuanKerja(ctx, cleanSatker)
}

func (u *sikUsecase) GetReferensi(ctx context.Context) (*sikdomain.SIKReferensi, error) {
	return u.sikRepo.GetReferensi(ctx)
}

// resolveKantorInfo resolves an identifier or name into an official SIK (kode_kantor, nama_kantor).
func (u *sikUsecase) resolveKantorInfo(ctx context.Context, input string) (kodeKantor string, namaKantor string) {
	trimmed := strings.TrimSpace(input)
	lower := strings.ToLower(trimmed)

	// If it's already a 15-character code
	if len(trimmed) == 15 && strings.HasPrefix(trimmed, "008") {
		switch trimmed {
		case "008006000000000":
			return trimmed, "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"
		case "008001000000000":
			return trimmed, "Sekretariat Badan Pengembangan Sumber Daya Manusia Perhubungan"
		case "008002000000000":
			return trimmed, "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat"
		case "008003000000000":
			return trimmed, "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut"
		case "008004000000000":
			return trimmed, "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara"
		case "008007000000000":
			return trimmed, "Politeknik Penerbangan Indonesia Curug"
		default:
			return trimmed, ""
		}
	}

	// Common predefined map for BPSDM
	switch {
	case strings.Contains(lower, "aparatur") || strings.Contains(lower, "pusbang-aparatur"):
		return "008006000000000", "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"
	case strings.Contains(lower, "darat") || strings.Contains(lower, "pusbang-darat"):
		return "008002000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat"
	case strings.Contains(lower, "laut") || strings.Contains(lower, "pusbang-laut"):
		return "008003000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut"
	case strings.Contains(lower, "udara") || strings.Contains(lower, "pusbang-udara"):
		return "008004000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara"
	case strings.Contains(lower, "sekretariat") || strings.Contains(lower, "kepegawaian-tu-bpsdm"):
		return "008001000000000", "Sekretariat Badan Pengembangan Sumber Daya Manusia Perhubungan"
	case strings.Contains(lower, "curug") || strings.Contains(lower, "politeknik penerbangan"):
		return "008007000000000", "Politeknik Penerbangan Indonesia Curug"
	}

	// Try dynamic lookup from SIK get_list_data_kantor
	if u.soapClient != nil {
		kantorList, err := u.soapClient.GetListDataKantor(ctx, "008")
		if err == nil {
			for _, k := range kantorList {
				if strings.EqualFold(k.KodeKantor, trimmed) ||
					strings.EqualFold(k.NamaKantor, trimmed) ||
					strings.Contains(strings.ToLower(k.NamaKantor), lower) {
					return k.KodeKantor, k.NamaKantor
				}
			}
		}
	}

	// Fallback to Pusbang Aparatur
	return "008006000000000", "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"
}

func (u *sikUsecase) mapSOAPToPegawai(item sikrepo.SOAPItemPegawai) sikdomain.Pegawai {
	p := sikdomain.Pegawai{
		NIP:                strings.TrimSpace(item.NIP),
		Nama:               strings.TrimSpace(item.Nama),
		TanggalLahir:       strings.TrimSpace(item.TanggalLahir),
		TempatLahir:        strings.TrimSpace(item.TempatLahir),
		JenisKelamin:       strings.TrimSpace(item.JenisKelamin),
		UnitKerja:          strings.TrimSpace(item.Kantor),
		SubUnitKerja:       strings.TrimSpace(item.Subkantor),
		SubUnitKerjaKode:   strings.TrimSpace(item.KodeSubkantor),
		SatuanKerja:        strings.TrimSpace(item.Unit),
		Pangkat:            strings.TrimSpace(item.Pangkat),
		GolonganRuang:      strings.TrimSpace(item.Golongan),
		Eselon:             strings.TrimSpace(item.Eselon),
		EmailDinas:         strings.TrimSpace(item.Email),
		NoHP:               strings.TrimSpace(item.Telepon),
		PendidikanTerakhir: strings.TrimSpace(item.PendidikanTerakhir),
		FotoURL:            strings.TrimSpace(item.Foto),
		InstansiInduk:      "Kementerian Perhubungan",
	}

	if p.NIP == "" {
		p.NIP = strings.TrimSpace(item.NIK)
	}

	if item.JabatanStruktural != "" {
		p.Jabatan = strings.TrimSpace(item.JabatanStruktural)
		p.JenisJabatan = "Struktural"
	} else if item.JabatanFungsional != "" {
		p.Jabatan = strings.TrimSpace(item.JabatanFungsional)
		p.JenisJabatan = "Fungsional"
	} else {
		p.Jabatan = "Pelaksana"
		p.JenisJabatan = "Pelaksana"
	}

	jp := strings.ToLower(strings.TrimSpace(item.JenisPegawai))
	if jp == "pns" {
		p.StatusKepegawaian = "PNS"
	} else if strings.Contains(jp, "pppk") {
		p.StatusKepegawaian = "PPPK"
	} else {
		p.StatusKepegawaian = "NON_PNS"
	}

	return p
}

func (u *sikUsecase) syncSingleKantor(ctx context.Context, kodeKantor, namaKantor string) (int64, error) {
	if u.soapClient == nil {
		return 0, fmt.Errorf("soap client not configured")
	}

	rawItems, err := u.soapClient.GetPegawaiPerKantor(ctx, kodeKantor, namaKantor)
	if err != nil {
		return 0, fmt.Errorf("failed to fetch pegawai from sik soap: %w", err)
	}

	var savedCount int64
	for _, item := range rawItems {
		nip := strings.TrimSpace(item.NIP)
		nik := strings.TrimSpace(item.NIK)
		if nip == "" && nik == "" {
			continue
		}

		p := u.mapSOAPToPegawai(item)
		if p.UnitKerja == "" && namaKantor != "" {
			p.UnitKerja = namaKantor
		}
		if p.SatuanKerja == "" && strings.HasPrefix(kodeKantor, "008") {
			p.SatuanKerja = "Badan Pengembangan Sumber Daya Manusia Perhubungan"
		}

		if err := u.sikRepo.Save(ctx, &p); err == nil {
			savedCount++
		} else {
			slog.Warn("Failed to save SIK pegawai into DB", "nip", p.NIP, "nama", p.Nama, "error", err)
		}
	}

	// Trigger reference table sync if repository is available
	if u.unitRepo != nil {
		_ = u.unitRepo.SyncFromSIK(ctx)
	}

	slog.Info("SIK SOAP office sync completed",
		"kode_kantor", kodeKantor,
		"nama_kantor", namaKantor,
		"received_items", len(rawItems),
		"saved_count", savedCount,
	)

	return savedCount, nil
}

// SyncMaster synchronizes Pusbang SDM Aparatur Perhubungan master employee data from SIK SOAP.
func (u *sikUsecase) SyncMaster(ctx context.Context) (*sikdomain.SIKSyncResult, error) {
	kodeKantor := "008006000000000"
	namaKantor := "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"

	savedCount, err := u.syncSingleKantor(ctx, kodeKantor, namaKantor)
	if err != nil {
		slog.Error("Failed to sync master SIK", "error", err)
		return nil, err
	}

	totalInDB, _ := u.sikRepo.Count(ctx)

	return &sikdomain.SIKSyncResult{
		TotalPegawai: totalInDB,
		Source:       fmt.Sprintf("SIK Kemenhub SOAP (%s)", u.sikCfg.Username),
		SyncedAt:     time.Now(),
		Message:      fmt.Sprintf("Master data pegawai berhasil disinkronkan dari SIK (%d pegawai tersinkron)", savedCount),
		Units: []sikdomain.UnitSyncResult{
			{
				UnitKerjaID:   "pusbang-aparatur",
				UnitKerjaNama: namaKantor,
				TotalPegawai:  savedCount,
				Success:       true,
				Message:       fmt.Sprintf("%d pegawai berhasil disinkronkan dari SIK", savedCount),
			},
		},
	}, nil
}

// SyncUnits synchronizes up to 5 offices concurrently from SIK SOAP.
func (u *sikUsecase) SyncUnits(ctx context.Context, unitIDs []string, unitNames []string) (*sikdomain.SIKSyncResult, error) {
	// Deduplicate targets
	seen := make(map[string]bool)
	var rawTargets []string

	for _, id := range unitIDs {
		trimmed := strings.TrimSpace(id)
		if trimmed != "" && !seen[strings.ToLower(trimmed)] {
			seen[strings.ToLower(trimmed)] = true
			rawTargets = append(rawTargets, trimmed)
		}
	}
	for _, name := range unitNames {
		trimmed := strings.TrimSpace(name)
		if trimmed != "" && !seen[strings.ToLower(trimmed)] {
			seen[strings.ToLower(trimmed)] = true
			rawTargets = append(rawTargets, trimmed)
		}
	}

	if len(rawTargets) == 0 {
		return u.SyncMaster(ctx)
	}

	if len(rawTargets) > 5 {
		return nil, errors.New("Maksimal 5 kantor untuk disinkronkan secara bersamaan")
	}

	type resolvedTarget struct {
		Original   string
		KodeKantor string
		NamaKantor string
	}

	resolved := make([]resolvedTarget, len(rawTargets))
	for i, t := range rawTargets {
		kKode, kNama := u.resolveKantorInfo(ctx, t)
		if kNama == "" {
			kNama = t
		}
		resolved[i] = resolvedTarget{
			Original:   t,
			KodeKantor: kKode,
			NamaKantor: kNama,
		}
	}

	// Concurrent execution (up to 5 workers)
	var wg sync.WaitGroup
	var mu sync.Mutex
	unitResults := make([]sikdomain.UnitSyncResult, len(resolved))

	for idx, target := range resolved {
		wg.Add(1)
		go func(index int, tgt resolvedTarget) {
			defer wg.Done()

			count, err := u.syncSingleKantor(ctx, tgt.KodeKantor, tgt.NamaKantor)
			success := err == nil
			msg := fmt.Sprintf("%d pegawai terverifikasi dan tersimpan", count)
			if err != nil {
				msg = fmt.Sprintf("Gagal sinkronisasi: %v", err)
			}

			res := sikdomain.UnitSyncResult{
				UnitKerjaID:   tgt.Original,
				UnitKerjaNama: tgt.NamaKantor,
				TotalPegawai:  count,
				Success:       success,
				Message:       msg,
			}

			mu.Lock()
			unitResults[index] = res
			mu.Unlock()
		}(idx, target)
	}

	wg.Wait()

	var totalSynced int64
	for _, r := range unitResults {
		totalSynced += r.TotalPegawai
	}

	return &sikdomain.SIKSyncResult{
		TotalPegawai: totalSynced,
		Source:       fmt.Sprintf("SIK Kemenhub SOAP (%s)", u.sikCfg.Username),
		SyncedAt:     time.Now(),
		Message:      fmt.Sprintf("Sinkronisasi %d kantor berhasil diselesaikan (%d pegawai tersinkron)", len(unitResults), totalSynced),
		Units:        unitResults,
	}, nil
}

func (u *sikUsecase) ListSyncHistories(ctx context.Context, limit, offset int, status string) ([]sikdomain.SIKSyncHistory, int64, error) {
	return u.sikRepo.FindSyncHistories(ctx, limit, offset, status)
}

func (u *sikUsecase) GetSyncHistoryByID(ctx context.Context, id string) (*sikdomain.SIKSyncHistory, error) {
	return u.sikRepo.FindSyncHistoryByID(ctx, id)
}
