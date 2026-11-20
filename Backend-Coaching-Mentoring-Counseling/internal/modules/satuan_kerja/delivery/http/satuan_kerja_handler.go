package http

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	satkerdomain "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type SatuanKerjaHandler struct {
	usecase satkerdomain.SatuanKerjaUsecase
}

func NewSatuanKerjaHandler(usecase satkerdomain.SatuanKerjaUsecase) *SatuanKerjaHandler {
	return &SatuanKerjaHandler{usecase: usecase}
}

// List godoc
// @Summary      Daftar Satuan Kerja Kemenhub
// @Description  Mengambil seluruh referensi Satuan Kerja (Badan, Ditjen, Setjen) dengan agregasi total unit & total pegawai
// @Tags         Satuan Kerja
// @Produce      json
// @Param        q    query     string  false  "Pencarian nama atau singkatan Satker"
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/satuan-kerja [get]
func (h *SatuanKerjaHandler) List(c *gin.Context) {
	query := c.Query("q")
	list, err := h.usecase.ListSatuanKerja(c.Request.Context(), query)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal mengambil daftar satuan kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar satuan kerja berhasil dimuat", list)
}

// GetByID godoc
// @Summary      Detail Satuan Kerja
// @Description  Mengambil informasi detail Satuan Kerja berdasarkan ID atau Kode
// @Tags         Satuan Kerja
// @Produce      json
// @Param        id   path      string  true  "ID atau Kode Satuan Kerja"
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/satuan-kerja/{id} [get]
func (h *SatuanKerjaHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	item, err := h.usecase.GetSatuanKerja(c.Request.Context(), id)
	if err != nil {
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Satuan kerja tidak ditemukan", nil)
		return
	}

	response.JSON(c, http.StatusOK, "Detail satuan kerja berhasil dimuat", item)
}

// GetPegawai godoc
// @Summary      Daftar Pegawai SIK di Satuan Kerja (Kantor Induk)
// @Description  Mengambil seluruh data pegawai resmi SIK yang bertugas di Satuan Kerja tertentu
// @Tags         Satuan Kerja
// @Produce      json
// @Param        id      path   string  true   "ID atau Kode Satuan Kerja"
// @Param        q       query  string  false  "Kata kunci pencarian pegawai"
// @Param        limit   query  int     false  "Limit per halaman (default 20)"
// @Param        offset  query  int     false  "Offset data (default 0)"
// @Success      200     {object}  response.StandardResponse
// @Router       /api/v1/satuan-kerja/{id}/pegawai [get]
func (h *SatuanKerjaHandler) GetPegawai(c *gin.Context) {
	id := c.Param("id")
	query := c.Query("q")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	pegawaiList, total, err := h.usecase.GetPegawaiBySatuanKerja(c.Request.Context(), id, query, limit, offset)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal mengambil pegawai satuan kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar pegawai satuan kerja berhasil dimuat", gin.H{
		"satuan_kerja_id": id,
		"items":           pegawaiList,
		"total":           total,
		"limit":           limit,
		"offset":          offset,
	})
}

// Sync godoc
// @Summary      Sinkronisasi Satuan Kerja dari SIK
// @Description  Memindai nilai satuan kerja unik dari tabel master SIK pegawai dan memperbarui tabel referensi
// @Tags         Satuan Kerja
// @Produce      json
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/satuan-kerja/sync-sik [post]
func (h *SatuanKerjaHandler) Sync(c *gin.Context) {
	if err := h.usecase.SyncFromSIK(c.Request.Context()); err != nil {
		response.Error(c, http.StatusInternalServerError, "SYNC_FAILED", "Gagal sinkronisasi satuan kerja dari SIK", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Sinkronisasi satuan kerja dari master SIK berhasil", nil)
}

