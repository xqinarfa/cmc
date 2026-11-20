package http

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	unitdomain "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type UnitKerjaHandler struct {
	usecase unitdomain.UnitKerjaUsecase
}

func NewUnitKerjaHandler(usecase unitdomain.UnitKerjaUsecase) *UnitKerjaHandler {
	return &UnitKerjaHandler{usecase: usecase}
}

// List godoc
// @Summary      Daftar Unit Kerja Kemenhub
// @Description  Mengambil seluruh referensi Unit Kerja (Kantor, Balai, Pusat, Biro) dengan agregasi total pegawai
// @Tags         Unit Kerja
// @Produce      json
// @Param        satuan_kerja_id  query     string  false  "Filter berdasarkan Satuan Kerja ID atau nama"
// @Param        q                query     string  false  "Pencarian nama Unit Kerja, lokasi, atau kode"
// @Success      200              {object}  response.StandardResponse
// @Router       /api/v1/unit-kerja [get]
func (h *UnitKerjaHandler) List(c *gin.Context) {
	satkerID := c.Query("satuan_kerja_id")
	query := c.Query("q")

	list, err := h.usecase.ListUnitKerja(c.Request.Context(), satkerID, query)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal mengambil daftar unit kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar unit kerja berhasil dimuat", list)
}

// GetByID godoc
// @Summary      Detail Unit Kerja
// @Description  Mengambil informasi detail Unit Kerja berdasarkan ID atau Kode
// @Tags         Unit Kerja
// @Produce      json
// @Param        id   path      string  true  "ID atau Kode Unit Kerja"
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/unit-kerja/{id} [get]
func (h *UnitKerjaHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	item, err := h.usecase.GetUnitKerja(c.Request.Context(), id)
	if err != nil {
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Unit kerja tidak ditemukan", nil)
		return
	}

	response.JSON(c, http.StatusOK, "Detail unit kerja berhasil dimuat", item)
}

// GetPegawai godoc
// @Summary      Daftar Pegawai SIK di Unit Kerja (Kantor / Balai)
// @Description  Mengambil data seluruh pegawai resmi SIK yang bertugas di Unit Kerja / Kantor tertentu
// @Tags         Unit Kerja
// @Produce      json
// @Param        id      path   string  true   "ID atau Nama Unit Kerja"
// @Param        q       query  string  false  "Kata kunci pencarian pegawai"
// @Param        limit   query  int     false  "Limit per halaman (default 20)"
// @Param        offset  query  int     false  "Offset data (default 0)"
// @Success      200     {object}  response.StandardResponse
// @Router       /api/v1/unit-kerja/{id}/pegawai [get]
func (h *UnitKerjaHandler) GetPegawai(c *gin.Context) {
	id := c.Param("id")
	query := c.Query("q")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	pegawaiList, total, err := h.usecase.GetPegawaiByUnitKerja(c.Request.Context(), id, query, limit, offset)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Gagal mengambil pegawai unit kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar pegawai unit kerja berhasil dimuat", gin.H{
		"unit_kerja_id": id,
		"items":         pegawaiList,
		"total":         total,
		"limit":         limit,
		"offset":        offset,
	})
}

// Sync godoc
// @Summary      Sinkronisasi Unit Kerja dari SIK
// @Description  Memindai nilai unit kerja unik dari tabel master SIK pegawai dan memperbarui tabel referensi
// @Tags         Unit Kerja
// @Produce      json
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/unit-kerja/sync-sik [post]
func (h *UnitKerjaHandler) Sync(c *gin.Context) {
	if err := h.usecase.SyncFromSIK(c.Request.Context()); err != nil {
		response.Error(c, http.StatusInternalServerError, "SYNC_FAILED", "Gagal sinkronisasi unit kerja dari SIK", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Sinkronisasi unit kerja dari master SIK berhasil", nil)
}

