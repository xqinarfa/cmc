package domain

import (
	"context"
	"database/sql/driver"
	"encoding/json"
	"errors"
	"strings"
	"time"
)

// Pegawai represents the official SIK (Sistem Informasi Kepegawaian) Kemenhub employee record.
type Pegawai struct {
	NIP                    string    `json:"nip" gorm:"column:nip;primaryKey"`
	Nama                   string    `json:"nama" gorm:"column:nama;not null"`
	GelarDepan             string    `json:"gelar_depan,omitempty" gorm:"column:gelar_depan"`
	GelarBelakang          string    `json:"gelar_belakang,omitempty" gorm:"column:gelar_belakang"`
	TempatLahir            string    `json:"tempat_lahir,omitempty" gorm:"column:tempat_lahir"`
	TanggalLahir           string    `json:"tanggal_lahir,omitempty" gorm:"column:tanggal_lahir"`
	JenisKelamin           string    `json:"jenis_kelamin,omitempty" gorm:"column:jenis_kelamin"`
	Agama                  string    `json:"agama,omitempty" gorm:"column:agama"`
	StatusPerkawinan       string    `json:"status_perkawinan,omitempty" gorm:"column:status_perkawinan"`
	EmailDinas             string    `json:"email_dinas,omitempty" gorm:"column:email_dinas"`
	EmailPribadi           string    `json:"email_pribadi,omitempty" gorm:"column:email_pribadi"`
	NoHP                   string    `json:"no_hp,omitempty" gorm:"column:no_hp"`
	StatusKepegawaian      string    `json:"status_kepegawaian,omitempty" gorm:"column:status_kepegawaian;default:'PNS'"`
	Pangkat                string    `json:"pangkat,omitempty" gorm:"column:pangkat"`
	GolonganRuang          string    `json:"golongan_ruang,omitempty" gorm:"column:golongan_ruang"`
	Jabatan                string    `json:"jabatan,omitempty" gorm:"column:jabatan"`
	JenisJabatan           string    `json:"jenis_jabatan,omitempty" gorm:"column:jenis_jabatan"`
	Eselon                 string    `json:"eselon,omitempty" gorm:"column:eselon"`
	UnitKerja              string    `json:"unit_kerja,omitempty" gorm:"column:unit_kerja"`
	SubUnitKerja           string    `json:"sub_unit_kerja,omitempty" gorm:"column:sub_unit_kerja"`
	SubUnitKerjaKode       string    `json:"sub_unit_kerja_kode,omitempty" gorm:"column:sub_unit_kerja_kode"`
	SatuanKerja            string    `json:"satuan_kerja,omitempty" gorm:"column:satuan_kerja"`
	InstansiInduk          string    `json:"instansi_induk,omitempty" gorm:"column:instansi_induk;default:'Kementerian Perhubungan'"`
	LokasiKerja            string    `json:"lokasi_kerja,omitempty" gorm:"column:lokasi_kerja"`
	PendidikanTerakhir     string    `json:"pendidikan_terakhir,omitempty" gorm:"column:pendidikan_terakhir"`
	Jurusan                string    `json:"jurusan,omitempty" gorm:"column:jurusan"`
	NamaSekolah            string    `json:"nama_sekolah,omitempty" gorm:"column:nama_sekolah"`
	TahunLulus             int       `json:"tahun_lulus,omitempty" gorm:"column:tahun_lulus"`
	FotoURL                string    `json:"foto_url,omitempty" gorm:"column:foto_url"`
	AtasanLangsungNIP      string    `json:"atasan_langsung_nip,omitempty" gorm:"column:atasan_langsung_nip"`
	AtasanLangsungNama     string    `json:"atasan_langsung_nama,omitempty" gorm:"column:atasan_langsung_nama"`
	AtasanLangsungJabatan  string    `json:"atasan_langsung_jabatan,omitempty" gorm:"column:atasan_langsung_jabatan"`
	MasaKerjaTahun         int       `json:"masa_kerja_tahun" gorm:"column:masa_kerja_tahun;default:0"`
	MasaKerjaBulan         int       `json:"masa_kerja_bulan" gorm:"column:masa_kerja_bulan;default:0"`
	SystemRole             string    `json:"system_role,omitempty" gorm:"-"`
	CreatedAt              time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt              time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime"`
}

// TableName overrides the table name for GORM.
func (Pegawai) TableName() string {
	return "sik_pegawai"
}

// FormatNamaLengkap formats name with academic titles (e.g. Dr. Rudi Setiawan, M.T.).
func (p *Pegawai) FormatNamaLengkap() string {
	var parts []string
	if strings.TrimSpace(p.GelarDepan) != "" {
		parts = append(parts, strings.TrimSpace(p.GelarDepan))
	}
	parts = append(parts, strings.TrimSpace(p.Nama))
	fullName := strings.Join(parts, " ")
	if strings.TrimSpace(p.GelarBelakang) != "" {
		fullName = fullName + ", " + strings.TrimSpace(p.GelarBelakang)
	}
	return fullName
}

// FormatPangkatGolongan formats rank and grade together (e.g. "Penata Tk. I (III/d)").
func (p *Pegawai) FormatPangkatGolongan() string {
	if p.Pangkat != "" && p.GolonganRuang != "" {
		return p.Pangkat + " (" + p.GolonganRuang + ")"
	}
	if p.Pangkat != "" {
		return p.Pangkat
	}
	return p.GolonganRuang
}

// PegawaiFilter defines multi-criteria filtering for SIK employees.
type PegawaiFilter struct {
	Query             string `json:"query"`
	UnitKerja         string `json:"unit_kerja"`
	SubUnitKerja      string `json:"sub_unit_kerja"`
	SatuanKerja       string `json:"satuan_kerja"`
	Eselon            string `json:"eselon"`
	StatusKepegawaian string `json:"status_kepegawaian"`
}

// SIKReferensiItem represents an aggregated item count in SIK.
type SIKReferensiItem struct {
	Nama        string `json:"nama"`
	Kode        string `json:"kode,omitempty"`
	SatuanKerja string `json:"satuan_kerja,omitempty"`
	UnitKerja   string `json:"unit_kerja,omitempty"`
	Total       int64  `json:"total"`
}

// SIKReferensi aggregates distinct organization reference data directly from SIK.
type SIKReferensi struct {
	Eselon       []SIKReferensiItem `json:"eselon"`
	SatuanKerja  []SIKReferensiItem `json:"satuan_kerja"`
	UnitKerja    []SIKReferensiItem `json:"unit_kerja"`
	SubUnitKerja []SIKReferensiItem `json:"sub_unit_kerja"`
}

// UnitSyncResult represents the sync outcome for a specific Unit Kerja.
type UnitSyncResult struct {
	UnitKerjaID   string `json:"unit_kerja_id"`
	UnitKerjaNama string `json:"unit_kerja_nama"`
	TotalPegawai  int64  `json:"total_pegawai"`
	Success       bool   `json:"success"`
	Message       string `json:"message"`
}

// SIKSyncRequest holds options for unit-based or multiple-unit synchronization.
type SIKSyncRequest struct {
	UnitKerjaIDs   []string `json:"unit_kerja_ids,omitempty"`
	UnitKerjaNames []string `json:"unit_kerja_names,omitempty"`
}

// SIKSyncResult represents the result of SIK synchronization.
type SIKSyncResult struct {
	TotalPegawai int64            `json:"total_pegawai"`
	Source       string           `json:"source"`
	SyncedAt     time.Time        `json:"synced_at"`
	Message      string           `json:"message"`
	Units        []UnitSyncResult `json:"units,omitempty"`
	HistoryID    string           `json:"history_id,omitempty"`
}

// SyncChangeItem records an individual employee change during a sync run.
type SyncChangeItem struct {
	NIP           string   `json:"nip"`
	Nama          string   `json:"nama"`
	UnitKerja     string   `json:"unit_kerja"`
	Action        string   `json:"action"` // "INSERT", "UPDATE"
	ChangedFields []string `json:"changed_fields,omitempty"`
	Details       string   `json:"details"`
}

// UnitSyncSummary records stats per unit during a sync run.
type UnitSyncSummary struct {
	UnitKerjaID   string `json:"unit_kerja_id"`
	UnitKerjaNama string `json:"unit_kerja_nama"`
	TotalPegawai  int64  `json:"total_pegawai"`
	Inserted      int64  `json:"inserted"`
	Updated       int64  `json:"updated"`
	Unchanged     int64  `json:"unchanged"`
	Failed        int64  `json:"failed"`
	Success       bool   `json:"success"`
	Message       string `json:"message"`
}

type TargetUnitsList []string

func (t TargetUnitsList) Value() (driver.Value, error) {
	if t == nil {
		return "[]", nil
	}
	return json.Marshal(t)
}

func (t *TargetUnitsList) Scan(value interface{}) error {
	if value == nil {
		*t = []string{}
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		if str, ok := value.(string); ok {
			bytes = []byte(str)
		} else {
			return errors.New("cannot scan into TargetUnitsList")
		}
	}
	return json.Unmarshal(bytes, t)
}

type UnitSummariesList []UnitSyncSummary

func (u UnitSummariesList) Value() (driver.Value, error) {
	if u == nil {
		return "[]", nil
	}
	return json.Marshal(u)
}

func (u *UnitSummariesList) Scan(value interface{}) error {
	if value == nil {
		*u = []UnitSyncSummary{}
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		if str, ok := value.(string); ok {
			bytes = []byte(str)
		} else {
			return errors.New("cannot scan into UnitSummariesList")
		}
	}
	return json.Unmarshal(bytes, u)
}

type ChangesLogList []SyncChangeItem

func (c ChangesLogList) Value() (driver.Value, error) {
	if c == nil {
		return "[]", nil
	}
	return json.Marshal(c)
}

func (c *ChangesLogList) Scan(value interface{}) error {
	if value == nil {
		*c = []SyncChangeItem{}
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		if str, ok := value.(string); ok {
			bytes = []byte(str)
		} else {
			return errors.New("cannot scan into ChangesLogList")
		}
	}
	return json.Unmarshal(bytes, c)
}

// SIKSyncHistory represents an audit log entry for a synchronization operation.
type SIKSyncHistory struct {
	ID              string            `json:"id" gorm:"column:id;primaryKey"`
	SyncType        string            `json:"sync_type" gorm:"column:sync_type;not null"`
	Status          string            `json:"status" gorm:"column:status;not null;default:'SUCCESS'"`
	TriggeredByNIP  string            `json:"triggered_by_nip,omitempty" gorm:"column:triggered_by_nip"`
	TriggeredByName string            `json:"triggered_by_name" gorm:"column:triggered_by_name;default:'Administrator'"`
	Source          string            `json:"source" gorm:"column:source"`
	TargetUnits     TargetUnitsList   `json:"target_units" gorm:"column:target_units;type:jsonb"`
	TotalFetched    int64             `json:"total_fetched" gorm:"column:total_fetched;default:0"`
	TotalInserted   int64             `json:"total_inserted" gorm:"column:total_inserted;default:0"`
	TotalUpdated    int64             `json:"total_updated" gorm:"column:total_updated;default:0"`
	TotalUnchanged  int64             `json:"total_unchanged" gorm:"column:total_unchanged;default:0"`
	TotalFailed     int64             `json:"total_failed" gorm:"column:total_failed;default:0"`
	DurationMs      int64             `json:"duration_ms" gorm:"column:duration_ms;default:0"`
	Message         string            `json:"message,omitempty" gorm:"column:message"`
	ErrorMessage    string            `json:"error_message,omitempty" gorm:"column:error_message"`
	UnitSummaries   UnitSummariesList `json:"unit_summaries" gorm:"column:unit_summaries;type:jsonb"`
	ChangesLog      ChangesLogList    `json:"changes_log" gorm:"column:changes_log;type:jsonb"`
	CreatedAt       time.Time         `json:"created_at" gorm:"column:created_at;autoCreateTime"`
}

func (SIKSyncHistory) TableName() string {
	return "sik_sync_history"
}

// SIKRepository defines data access contracts for the SIK module.
type SIKRepository interface {
	FindByNIP(ctx context.Context, nip string) (*Pegawai, error)
	FindAll(ctx context.Context, query string, limit, offset int) ([]Pegawai, int64, error)
	FilterPegawai(ctx context.Context, filter PegawaiFilter, limit, offset int) ([]Pegawai, int64, error)
	FindByUnitKerja(ctx context.Context, unitKerja string) ([]Pegawai, error)
	FindBySatuanKerja(ctx context.Context, satuanKerja string) ([]Pegawai, error)
	GetReferensi(ctx context.Context) (*SIKReferensi, error)
	Save(ctx context.Context, pegawai *Pegawai) error
	SaveWithAudit(ctx context.Context, pegawai *Pegawai) (action string, changedFields []string, err error)
	Count(ctx context.Context) (int64, error)
	CountByUnitKerja(ctx context.Context, unitKerja string) (int64, error)

	// Sync History contracts
	SaveSyncHistory(ctx context.Context, history *SIKSyncHistory) error
	FindSyncHistories(ctx context.Context, limit, offset int, status string) ([]SIKSyncHistory, int64, error)
	FindSyncHistoryByID(ctx context.Context, id string) (*SIKSyncHistory, error)
}

// SIKUsecase defines business logic contracts for SIK.
type SIKUsecase interface {
	GetPegawaiByNIP(ctx context.Context, nip string) (*Pegawai, error)
	SearchPegawai(ctx context.Context, query string, limit, offset int) ([]Pegawai, int64, error)
	FilterPegawai(ctx context.Context, filter PegawaiFilter, limit, offset int) ([]Pegawai, int64, error)
	ListPegawaiByUnit(ctx context.Context, unitKerja string) ([]Pegawai, error)
	ListPegawaiBySatker(ctx context.Context, satuanKerja string) ([]Pegawai, error)
	GetReferensi(ctx context.Context) (*SIKReferensi, error)
	SyncMaster(ctx context.Context) (*SIKSyncResult, error)
	SyncUnits(ctx context.Context, unitIDs []string, unitNames []string) (*SIKSyncResult, error)

	// Sync History contracts
	ListSyncHistories(ctx context.Context, limit, offset int, status string) ([]SIKSyncHistory, int64, error)
	GetSyncHistoryByID(ctx context.Context, id string) (*SIKSyncHistory, error)
}

