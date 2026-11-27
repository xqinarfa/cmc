package http

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"github.com/kalanara/cmc-backend/internal/platform/middleware"
	"github.com/kalanara/cmc-backend/internal/platform/security"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type SIKHandler struct {
	sikUsecase     sikdomain.SIKUsecase
	userRepo       userdomain.UserRepository
	passwordHasher *security.PasswordHasher
}

func NewSIKHandler(sikUsecase sikdomain.SIKUsecase, userRepo userdomain.UserRepository, optionalHasher ...*security.PasswordHasher) *SIKHandler {
	var hasher *security.PasswordHasher
	if len(optionalHasher) > 0 && optionalHasher[0] != nil {
		hasher = optionalHasher[0]
	} else {
		hasher = security.NewPasswordHasher(12)
	}
	return &SIKHandler{
		sikUsecase:     sikUsecase,
		userRepo:       userRepo,
		passwordHasher: hasher,
	}
}

// GetByNIP retrieves employee data from SIK by their official NIP.
// @Summary      Get SIK Pegawai by NIP
// @Description  Mengambil data pegawai resmi dari master SIK Kemenhub berdasarkan NIP
// @Tags         SIK
// @Produce      json
// @Param        nip   path      string  true  "Nomor Induk Pegawai (NIP)"
// @Success      200   {object}  response.StandardResponse{data=domain.Pegawai}
// @Failure      400   {object}  response.StandardResponse
// @Failure      404   {object}  response.StandardResponse
// @Router       /api/v1/sik/pegawai/{nip} [get]
func (h *SIKHandler) GetByNIP(c *gin.Context) {
	nip := c.Param("nip")
	pegawai, err := h.sikUsecase.GetPegawaiByNIP(c.Request.Context(), nip)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Data pegawai SIK berhasil ditemukan", pegawai)
}

// ListOrSearch searches or lists employees from SIK.
// @Summary      Search SIK Pegawai
// @Description  Pencarian data pegawai SIK berdasarkan nama, NIP, jabatan, unit kerja, satuan kerja, atau eselon
// @Tags         SIK
// @Produce      json
// @Param        q             query     string  false  "Kata kunci pencarian (nama, NIP)"
// @Param        unit_kerja    query     string  false  "Filter berdasarkan Unit Kerja"
// @Param        sub_unit_kerja query    string  false  "Filter berdasarkan Sub Unit Kerja"
// @Param        satuan_kerja  query     string  false  "Filter berdasarkan Satuan Kerja"
// @Param        eselon        query     string  false  "Filter berdasarkan Eselon"
// @Param        limit         query     int     false  "Jumlah item per halaman (default 20)"
// @Param        offset        query     int     false  "Offset data (default 0)"
// @Success      200           {object}  response.StandardResponse
// @Router       /api/v1/sik/pegawai [get]
func (h *SIKHandler) ListOrSearch(c *gin.Context) {
	query := c.Query("q")
	unitKerja := c.Query("unit_kerja")
	subUnitKerja := c.Query("sub_unit_kerja")
	satuanKerja := c.Query("satuan_kerja")
	eselon := c.Query("eselon")
	status := c.Query("status")
	if status == "" {
		status = c.Query("status_kepegawaian")
	}
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	var list []sikdomain.Pegawai
	var total int64
	var err error

	if unitKerja != "" || subUnitKerja != "" || satuanKerja != "" || eselon != "" || (status != "" && status != "all") {
		filter := sikdomain.PegawaiFilter{
			Query:             query,
			UnitKerja:         unitKerja,
			SubUnitKerja:      subUnitKerja,
			SatuanKerja:       satuanKerja,
			Eselon:            eselon,
			StatusKepegawaian: status,
		}
		list, total, err = h.sikUsecase.FilterPegawai(c.Request.Context(), filter, limit, offset)
	} else {
		list, total, err = h.sikUsecase.SearchPegawai(c.Request.Context(), query, limit, offset)
	}

	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	if len(list) > 0 && h.userRepo != nil {
		nips := make([]string, 0, len(list))
		for _, p := range list {
			if p.NIP != "" {
				nips = append(nips, p.NIP)
			}
		}
		if roles, errRoles := h.userRepo.FindRolesByNIPs(c.Request.Context(), nips); errRoles == nil {
			for i := range list {
				if r, ok := roles[list[i].NIP]; ok && r != "" {
					list[i].SystemRole = string(r)
				} else {
					list[i].SystemRole = "client"
				}
			}
		}
	}

	response.JSON(c, http.StatusOK, "Daftar pegawai SIK berhasil dimuat", gin.H{
		"items":  list,
		"total":  total,
		"limit":  limit,
		"offset": offset,
	})
}

// GetReferensi returns distinct reference values (Eselon, Satuan Kerja, Unit Kerja) directly from SIK.
// @Summary      Get SIK References
// @Description  Mengambil daftar referensi organisasi (Eselon, Satuan Kerja, Unit Kerja) dari data SIK
// @Tags         SIK
// @Produce      json
// @Success      200     {object}  response.StandardResponse
// @Router       /api/v1/sik/referensi [get]
func (h *SIKHandler) GetReferensi(c *gin.Context) {
	ref, err := h.sikUsecase.GetReferensi(c.Request.Context())
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Referensi master SIK berhasil dimuat", ref)
}

// Me retrieves SIK employee details for the currently authenticated user.
// @Summary      Get My SIK Profile
// @Description  Mengambil data lengkap SIK dari user yang sedang login
// @Tags         SIK
// @Produce      json
// @Security     BearerAuth
// @Success      200   {object}  response.StandardResponse{data=domain.Pegawai}
// @Failure      401   {object}  response.StandardResponse
// @Failure      404   {object}  response.StandardResponse
// @Router       /api/v1/sik/me [get]
func (h *SIKHandler) Me(c *gin.Context) {
	userIDVal, exists := c.Get("UserID")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing user context", nil)
		return
	}

	userID, ok := userIDVal.(uuid.UUID)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Invalid user id", nil)
		return
	}

	user, err := h.userRepo.FindByID(c.Request.Context(), userID)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	if user.NIP == "" {
		response.Error(c, http.StatusBadRequest, "NIP_NOT_SET", "User belum memiliki NIP terasosiasi", nil)
		return
	}

	pegawai, err := h.sikUsecase.GetPegawaiByNIP(c.Request.Context(), user.NIP)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Profil SIK pegawai berhasil dimuat", pegawai)
}

// SyncMaster synchronizes master employee registry from SIK, optionally filtered by selected unit kerja (up to 5 offices concurrently).
// @Summary      Sync Master SIK Pegawai
// @Description  Sinkronisasi data master pegawai SIK Kementerian Perhubungan dengan kredensial sistem resmi (mendukung sinkronisasi hingga 5 kantor bersamaan)
// @Tags         SIK
// @Accept       json
// @Produce      json
// @Param        request       body      domain.SIKSyncRequest false "Pilihan unit kerja untuk disinkronkan (maksimal 5 kantor)"
// @Success      200   {object}  response.StandardResponse{data=domain.SIKSyncResult}
// @Failure      400   {object}  response.StandardResponse
// @Failure      500   {object}  response.StandardResponse
// @Router       /api/v1/sik/sync [post]
func (h *SIKHandler) SyncMaster(c *gin.Context) {
	var req sikdomain.SIKSyncRequest
	_ = c.ShouldBindJSON(&req)

	if len(req.UnitKerjaIDs) > 5 || len(req.UnitKerjaNames) > 5 {
		response.Error(c, http.StatusBadRequest, "MAX_UNITS_EXCEEDED", "Maksimal 5 kantor untuk disinkronkan secara bersamaan", nil)
		return
	}

	var result *sikdomain.SIKSyncResult
	var err error

	if len(req.UnitKerjaIDs) > 0 || len(req.UnitKerjaNames) > 0 {
		result, err = h.sikUsecase.SyncUnits(c.Request.Context(), req.UnitKerjaIDs, req.UnitKerjaNames)
	} else {
		result, err = h.sikUsecase.SyncMaster(c.Request.Context())
	}

	if err != nil {
		response.Error(c, http.StatusInternalServerError, "SYNC_FAILED", "Gagal melakukan sinkronisasi master SIK", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Master data SIK Kemenhub berhasil disinkronkan", result)
}

// ListSyncHistory retrieves paginated synchronization audit runs.
// @Summary      List SIK Sync History
// @Description  Mengambil riwayat sinkronisasi SIK dan catatan perubahan pegawai
// @Tags         SIK
// @Produce      json
// @Param        status        query     string  false  "Filter status sinkronisasi (SUCCESS, FAILED, PARTIAL)"
// @Param        limit         query     int     false  "Jumlah item per halaman (default 20)"
// @Param        offset        query     int     false  "Offset data (default 0)"
// @Success      200           {object}  response.StandardResponse
// @Router       /api/v1/sik/sync-history [get]
func (h *SIKHandler) ListSyncHistory(c *gin.Context) {
	status := c.Query("status")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	list, total, err := h.sikUsecase.ListSyncHistories(c.Request.Context(), limit, offset, status)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "FETCH_FAILED", "Gagal memuat riwayat sinkronisasi SIK", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Riwayat sinkronisasi SIK berhasil dimuat", gin.H{
		"items":  list,
		"total":  total,
		"limit":  limit,
		"offset": offset,
	})
}

// GetSyncHistoryDetail retrieves a single synchronization run including its full changes log.
// @Summary      Get SIK Sync History Detail
// @Description  Mengambil detail riwayat sinkronisasi SIK berdasarkan ID
// @Tags         SIK
// @Produce      json
// @Param        id            path      string  true   "ID Riwayat Sinkronisasi"
// @Success      200           {object}  response.StandardResponse
// @Router       /api/v1/sik/sync-history/{id} [get]
func (h *SIKHandler) GetSyncHistoryDetail(c *gin.Context) {
	id := c.Param("id")
	item, err := h.sikUsecase.GetSyncHistoryByID(c.Request.Context(), id)
	if err != nil {
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Riwayat sinkronisasi tidak ditemukan", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Detail riwayat sinkronisasi berhasil dimuat", item)
}

// ResetPassword resets an employee's password to their NIP so they can log in immediately.
// @Summary      Reset Pegawai Password to NIP
// @Description  Mengatur ulang kata sandi pegawai menjadi NIP agar dapat login menggunakan data pegawai yang baru disinkronkan
// @Tags         SIK
// @Accept       json
// @Produce      json
// @Param        nip   path      string  false  "Nomor Induk Pegawai (NIP)"
// @Success      200   {object}  response.StandardResponse
// @Failure      400   {object}  response.StandardResponse
// @Failure      404   {object}  response.StandardResponse
// @Router       /api/v1/sik/pegawai/{nip}/reset-password [post]
func (h *SIKHandler) ResetPassword(c *gin.Context) {
	nip := strings.TrimSpace(c.Param("nip"))
	if nip == "" {
		nip = strings.TrimSpace(c.Query("nip"))
	}
	if nip == "" {
		var req struct {
			NIP string `json:"nip"`
		}
		if err := c.ShouldBindJSON(&req); err == nil && req.NIP != "" {
			nip = strings.TrimSpace(req.NIP)
		}
	}

	if nip == "" {
		response.Error(c, http.StatusBadRequest, "INVALID_NIP", "NIP pegawai wajib diisi", nil)
		return
	}

	// 1. Find employee in SIK master registry
	pegawai, err := h.sikUsecase.GetPegawaiByNIP(c.Request.Context(), nip)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	// 2. Hash NIP as the password
	hashedPassword, err := h.passwordHasher.HashPassword(nip)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "HASH_FAILED", "Gagal memproses kata sandi baru", err.Error())
		return
	}

	now := time.Now().UTC()
	rawBytes, _ := json.Marshal(pegawai)
	sikDataStr := string(rawBytes)
	if sikDataStr == "" {
		sikDataStr = "{}"
	}

	// 3. Check if user already exists in users table
	user, err := h.userRepo.FindByNIP(c.Request.Context(), nip)
	if err == nil && user != nil {
		// Update existing user: reset password and refresh SIK profile data
		user.PasswordHash = hashedPassword
		user.IsActive = true
		user.FullName = pegawai.FormatNamaLengkap()
		user.Jabatan = pegawai.Jabatan
		user.JenisJabatan = pegawai.JenisJabatan
		user.PangkatGolongan = pegawai.FormatPangkatGolongan()
		user.UnitKerja = pegawai.UnitKerja
		user.SubUnitKerja = pegawai.SubUnitKerja
		user.SubUnitKerjaKode = pegawai.SubUnitKerjaKode
		user.SatuanKerja = pegawai.SatuanKerja
		user.InstansiInduk = pegawai.InstansiInduk
		user.Eselon = pegawai.Eselon
		user.StatusKepegawaian = pegawai.StatusKepegawaian
		user.PendidikanTerakhir = pegawai.PendidikanTerakhir
		user.AtasanLangsungNIP = pegawai.AtasanLangsungNIP
		user.AtasanLangsungNama = pegawai.AtasanLangsungNama
		user.AtasanLangsungJabatan = pegawai.AtasanLangsungJabatan
		user.MasaKerjaTahun = pegawai.MasaKerjaTahun
		user.MasaKerjaBulan = pegawai.MasaKerjaBulan
		user.SIKData = sikDataStr
		if user.Email == "" {
			email := strings.TrimSpace(pegawai.EmailDinas)
			if email == "" {
				email = strings.TrimSpace(pegawai.EmailPribadi)
			}
			if email == "" {
				email = fmt.Sprintf("%s@dephub.go.id", nip)
			}
			user.Email = email
		}
		user.SIKSyncedAt = &now

		if updateErr := h.userRepo.Update(c.Request.Context(), user); updateErr != nil {
			response.Error(c, http.StatusInternalServerError, "UPDATE_FAILED", "Gagal memperbarui kata sandi user", updateErr.Error())
			return
		}
	} else if errors.Is(err, sharederrors.ErrUserNotFound) || user == nil {
		// Create new user record provisioned from SIK with password = NIP
		email := strings.TrimSpace(pegawai.EmailDinas)
		if email == "" {
			email = strings.TrimSpace(pegawai.EmailPribadi)
		}
		if email == "" {
			email = fmt.Sprintf("%s@dephub.go.id", nip)
		}

		// Ensure email is not duplicated with another NIP
		existingEmailUser, _ := h.userRepo.FindByEmail(c.Request.Context(), email)
		if existingEmailUser != nil && existingEmailUser.NIP != nip {
			email = fmt.Sprintf("%s@dephub.go.id", nip)
		}

		newUser := &userdomain.User{
			ID:                 uuid.New(),
			NIP:                nip,
			Email:              email,
			PasswordHash:       hashedPassword,
			FullName:           pegawai.FormatNamaLengkap(),
			Role:               userdomain.RolePegawai,
			Phone:              pegawai.NoHP,
			AvatarURL:          pegawai.FotoURL,
			Provider:           "LOCAL",
			IsActive:           true,
			GelarDepan:         pegawai.GelarDepan,
			GelarBelakang:      pegawai.GelarBelakang,
			TempatLahir:        pegawai.TempatLahir,
			TanggalLahir:       pegawai.TanggalLahir,
			JenisKelamin:       pegawai.JenisKelamin,
			Agama:              pegawai.Agama,
			Jabatan:            pegawai.Jabatan,
			JenisJabatan:       pegawai.JenisJabatan,
			PangkatGolongan:    pegawai.FormatPangkatGolongan(),
			UnitKerja:          pegawai.UnitKerja,
			SubUnitKerja:       pegawai.SubUnitKerja,
			SubUnitKerjaKode:   pegawai.SubUnitKerjaKode,
			SatuanKerja:        pegawai.SatuanKerja,
			InstansiInduk:      pegawai.InstansiInduk,
			Eselon:             pegawai.Eselon,
			StatusKepegawaian:  pegawai.StatusKepegawaian,
			PendidikanTerakhir: pegawai.PendidikanTerakhir,
			AtasanLangsungNIP:  pegawai.AtasanLangsungNIP,
			AtasanLangsungNama: pegawai.AtasanLangsungNama,
			AtasanLangsungJabatan: pegawai.AtasanLangsungJabatan,
			MasaKerjaTahun:     pegawai.MasaKerjaTahun,
			MasaKerjaBulan:     pegawai.MasaKerjaBulan,
			SIKData:            sikDataStr,
			SIKSyncedAt:        &now,
		}

		if createErr := h.userRepo.Create(c.Request.Context(), newUser); createErr != nil {
			response.Error(c, http.StatusInternalServerError, "CREATE_FAILED", "Gagal mendaftarkan user pegawai baru", createErr.Error())
			return
		}
	} else {
		response.Error(c, http.StatusInternalServerError, "DATABASE_ERROR", "Terjadi kesalahan saat memeriksa akun pegawai", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Kata sandi pegawai berhasil di-reset menjadi NIP", gin.H{
		"nip":              nip,
		"nama":             pegawai.FormatNamaLengkap(),
		"password_default": nip,
		"role":             "client",
		"email":            pegawai.EmailDinas,
	})
}

// GetRoleByNIP retrieves the current system role and unit admin quota statistics for an employee.
// @Summary      Get Pegawai System Role and Unit Admin Quota
// @Description  Mengambil role aktif user serta informasi statistik jumlah admin dalam unit kerja terkait
// @Tags         SIK
// @Produce      json
// @Param        nip   path      string  true  "Nomor Induk Pegawai (NIP)"
// @Success      200   {object}  response.StandardResponse
// @Failure      400   {object}  response.StandardResponse
// @Failure      404   {object}  response.StandardResponse
// @Router       /api/v1/sik/pegawai/{nip}/role [get]
func (h *SIKHandler) GetRoleByNIP(c *gin.Context) {
	nip := strings.TrimSpace(c.Param("nip"))
	if nip == "" {
		response.Error(c, http.StatusBadRequest, "INVALID_NIP", "NIP pegawai wajib diisi", nil)
		return
	}

	pegawai, err := h.sikUsecase.GetPegawaiByNIP(c.Request.Context(), nip)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	currentRole := userdomain.RolePegawai
	isRegistered := false

	user, err := h.userRepo.FindByNIP(c.Request.Context(), nip)
	if err == nil && user != nil {
		currentRole = user.Role.Normalize()
		isRegistered = true
	}

	adminCount := int64(0)
	if h.userRepo != nil && pegawai.UnitKerja != "" {
		adminCount, _ = h.userRepo.CountAdminsByUnitKerja(c.Request.Context(), pegawai.UnitKerja)
	}

	roleLabel := "Pegawai"
	switch currentRole {
	case userdomain.RoleSuperAdmin:
		roleLabel = "Super Admin"
	case userdomain.RoleAdmin:
		roleLabel = "Admin Unit Kerja"
	case userdomain.RolePegawai:
		roleLabel = "Pegawai"
	}

	response.JSON(c, http.StatusOK, "Informasi peran pegawai berhasil dimuat", gin.H{
		"nip":                nip,
		"nama":               pegawai.FormatNamaLengkap(),
		"unit_kerja":         pegawai.UnitKerja,
		"role":               string(currentRole),
		"role_label":         roleLabel,
		"is_registered":      isRegistered,
		"unit_admins_count":  adminCount,
		"target_admin_quota": 2,
	})
}

// UpdateRoleByNIP updates or provisions an employee's system role (e.g. admin unit kerja, coach, mentor, counselor, client).
// @Summary      Update Pegawai System Role
// @Description  Menetapkan atau mengubah peran pengguna pegawai (misalnya menjadikan Admin Unit Kerja)
// @Tags         SIK
// @Accept       json
// @Produce      json
// @Param        nip     path      string  true  "Nomor Induk Pegawai (NIP)"
// @Param        request body      object  true  "Role update payload (e.g. {\"role\": \"admin\"})"
// @Success      200     {object}  response.StandardResponse
// @Failure      400     {object}  response.StandardResponse
// @Failure      404     {object}  response.StandardResponse
// @Router       /api/v1/sik/pegawai/{nip}/role [post]
func (h *SIKHandler) UpdateRoleByNIP(c *gin.Context) {
	// Cek otorisasi: hanya super_admin yang berhak mengubah peran pegawai
	if roleVal, exists := c.Get(middleware.ContextKeyRole); exists {
		var userRole userdomain.Role
		if r, ok := roleVal.(userdomain.Role); ok {
			userRole = r
		} else if s, ok := roleVal.(string); ok {
			userRole = userdomain.Role(s)
		}
		if userRole.Normalize() != userdomain.RoleSuperAdmin {
			response.Error(c, http.StatusForbidden, "FORBIDDEN", "Manajemen hak akses ini untuk Super Admin saja", nil)
			return
		}
	}

	nip := strings.TrimSpace(c.Param("nip"))
	if nip == "" {
		response.Error(c, http.StatusBadRequest, "INVALID_NIP", "NIP pegawai wajib diisi", nil)
		return
	}

	var req struct {
		Role string `json:"role"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Format JSON payload tidak valid", err.Error())
		return
	}

	targetRole := userdomain.Role(strings.TrimSpace(strings.ToLower(req.Role))).Normalize()
	if !targetRole.IsValid() {
		response.Error(c, http.StatusBadRequest, "INVALID_ROLE", "Peran tidak valid. Pilihan: super_admin, admin, pegawai", nil)
		return
	}

	pegawai, err := h.sikUsecase.GetPegawaiByNIP(c.Request.Context(), nip)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	now := time.Now().UTC()
	user, err := h.userRepo.FindByNIP(c.Request.Context(), nip)
	if err == nil && user != nil {
		user.Role = targetRole
		user.IsActive = true
		if updateErr := h.userRepo.Update(c.Request.Context(), user); updateErr != nil {
			response.Error(c, http.StatusInternalServerError, "UPDATE_FAILED", "Gagal memperbarui peran pegawai", updateErr.Error())
			return
		}
	} else if errors.Is(err, sharederrors.ErrUserNotFound) || user == nil {
		hashedPassword, _ := h.passwordHasher.HashPassword(nip)
		email := strings.TrimSpace(pegawai.EmailDinas)
		if email == "" {
			email = strings.TrimSpace(pegawai.EmailPribadi)
		}
		if email == "" {
			email = fmt.Sprintf("%s@dephub.go.id", nip)
		}
		existingEmailUser, _ := h.userRepo.FindByEmail(c.Request.Context(), email)
		if existingEmailUser != nil && existingEmailUser.NIP != nip {
			email = fmt.Sprintf("%s@dephub.go.id", nip)
		}

		rawBytes, _ := json.Marshal(pegawai)
		sikDataStr := string(rawBytes)
		if sikDataStr == "" {
			sikDataStr = "{}"
		}

		newUser := &userdomain.User{
			ID:                 uuid.New(),
			NIP:                nip,
			Email:              email,
			PasswordHash:       hashedPassword,
			FullName:           pegawai.FormatNamaLengkap(),
			Role:               targetRole,
			Phone:              pegawai.NoHP,
			AvatarURL:          pegawai.FotoURL,
			Provider:           "LOCAL",
			IsActive:           true,
			GelarDepan:         pegawai.GelarDepan,
			GelarBelakang:      pegawai.GelarBelakang,
			TempatLahir:        pegawai.TempatLahir,
			TanggalLahir:       pegawai.TanggalLahir,
			JenisKelamin:       pegawai.JenisKelamin,
			Agama:              pegawai.Agama,
			Jabatan:            pegawai.Jabatan,
			JenisJabatan:       pegawai.JenisJabatan,
			PangkatGolongan:    pegawai.FormatPangkatGolongan(),
			UnitKerja:          pegawai.UnitKerja,
			SubUnitKerja:       pegawai.SubUnitKerja,
			SubUnitKerjaKode:   pegawai.SubUnitKerjaKode,
			SatuanKerja:        pegawai.SatuanKerja,
			InstansiInduk:      pegawai.InstansiInduk,
			Eselon:             pegawai.Eselon,
			StatusKepegawaian:  pegawai.StatusKepegawaian,
			PendidikanTerakhir: pegawai.PendidikanTerakhir,
			AtasanLangsungNIP:  pegawai.AtasanLangsungNIP,
			AtasanLangsungNama: pegawai.AtasanLangsungNama,
			AtasanLangsungJabatan: pegawai.AtasanLangsungJabatan,
			MasaKerjaTahun:     pegawai.MasaKerjaTahun,
			MasaKerjaBulan:     pegawai.MasaKerjaBulan,
			SIKData:            sikDataStr,
			SIKSyncedAt:        &now,
		}

		if createErr := h.userRepo.Create(c.Request.Context(), newUser); createErr != nil {
			response.Error(c, http.StatusInternalServerError, "CREATE_FAILED", "Gagal mendaftarkan user pegawai dengan peran baru", createErr.Error())
			return
		}
	} else {
		response.Error(c, http.StatusInternalServerError, "DATABASE_ERROR", "Terjadi kesalahan saat memeriksa akun pegawai", err.Error())
		return
	}

	adminCount := int64(0)
	if h.userRepo != nil && pegawai.UnitKerja != "" {
		adminCount, _ = h.userRepo.CountAdminsByUnitKerja(c.Request.Context(), pegawai.UnitKerja)
	}

	roleLabel := "Pegawai"
	switch targetRole {
	case userdomain.RoleSuperAdmin:
		roleLabel = "Super Admin"
	case userdomain.RoleAdmin:
		roleLabel = "Admin Unit Kerja"
	case userdomain.RolePegawai:
		roleLabel = "Pegawai"
	}

	response.JSON(c, http.StatusOK, fmt.Sprintf("Peran pegawai berhasil diperbarui menjadi %s", roleLabel), gin.H{
		"nip":                nip,
		"nama":               pegawai.FormatNamaLengkap(),
		"unit_kerja":         pegawai.UnitKerja,
		"role":               string(targetRole),
		"role_label":         roleLabel,
		"unit_admins_count":  adminCount,
		"target_admin_quota": 2,
	})
}




