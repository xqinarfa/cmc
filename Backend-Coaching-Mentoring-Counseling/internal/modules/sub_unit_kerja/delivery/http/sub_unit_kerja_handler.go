package http

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	subdomain "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
)

type SubUnitKerjaHandler struct {
	usecase subdomain.SubUnitKerjaUsecase
}

func NewSubUnitKerjaHandler(usecase subdomain.SubUnitKerjaUsecase) *SubUnitKerjaHandler {
	return &SubUnitKerjaHandler{usecase: usecase}
}

// List godoc
// @Summary      Daftar Sub Unit Kerja
// @Description  Mengambil daftar sub unit kerja (diurutkan berdasarkan kode ASC), dapat difilter berdasarkan unit_kerja_id atau satuan_kerja_id
// @Tags         Sub Unit Kerja
// @Produce      json
// @Param        unit_kerja_id    query     string  false  "Filter Unit Kerja ID"
// @Param        satuan_kerja_id  query     string  false  "Filter Satuan Kerja ID"
// @Param        q                query     string  false  "Kata kunci pencarian (nama, kode)"
// @Success      200              {object}  response.StandardResponse{data=[]domain.SubUnitKerja}
// @Router       /api/v1/sub-unit-kerja [get]
func (h *SubUnitKerjaHandler) List(c *gin.Context) {
	filter := subdomain.SubUnitKerjaFilter{
		UnitKerjaID:   c.Query("unit_kerja_id"),
		SatuanKerjaID: c.Query("satuan_kerja_id"),
		Query:         c.Query("q"),
	}

	list, err := h.usecase.ListSubUnitKerja(c.Request.Context(), filter)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "FETCH_FAILED", "Gagal memuat daftar sub unit kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar sub unit kerja berhasil dimuat (diurutkan berdasarkan kode)", list)
}

// GetByID godoc
// @Summary      Detail Sub Unit Kerja
// @Description  Mengambil informasi detail sub unit kerja berdasarkan ID atau kode
// @Tags         Sub Unit Kerja
// @Produce      json
// @Param        id   path      string  true  "ID atau Kode Sub Unit Kerja"
// @Success      200  {object}  response.StandardResponse{data=domain.SubUnitKerja}
// @Router       /api/v1/sub-unit-kerja/{id} [get]
func (h *SubUnitKerjaHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	item, err := h.usecase.GetSubUnitKerja(c.Request.Context(), id)
	if err != nil {
		response.Error(c, http.StatusNotFound, "NOT_FOUND", "Sub unit kerja tidak ditemukan", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Detail sub unit kerja berhasil dimuat", item)
}

// GetPegawai godoc
// @Summary      Daftar Pegawai per Sub Unit Kerja
// @Description  Mengambil daftar pegawai resmi dari SIK yang bernaung di bawah sub unit kerja ini
// @Tags         Sub Unit Kerja
// @Produce      json
// @Param        id      path      string  true   "ID atau Kode Sub Unit Kerja"
// @Param        q       query     string  false  "Kata kunci pencarian (nama, NIP)"
// @Param        limit   query     int     false  "Jumlah item (default 20)"
// @Param        offset  query     int     false  "Offset (default 0)"
// @Success      200     {object}  response.StandardResponse
// @Router       /api/v1/sub-unit-kerja/{id}/pegawai [get]
func (h *SubUnitKerjaHandler) GetPegawai(c *gin.Context) {
	id := c.Param("id")
	query := c.Query("q")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	list, total, err := h.usecase.GetPegawaiBySubUnitKerja(c.Request.Context(), id, query, limit, offset)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "FETCH_PEGAWAI_FAILED", "Gagal memuat daftar pegawai sub unit kerja", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Daftar pegawai sub unit kerja berhasil dimuat", gin.H{
		"items":  list,
		"total":  total,
		"limit":  limit,
		"offset": offset,
	})
}

// Sync godoc
// @Summary      Sinkronisasi Sub Unit Kerja dari SIK
// @Description  Memindai nilai sub unit kerja unik dari tabel master SIK pegawai dan memperbarui tabel referensi
// @Tags         Sub Unit Kerja
// @Produce      json
// @Success      200  {object}  response.StandardResponse
// @Router       /api/v1/sub-unit-kerja/sync-sik [post]
func (h *SubUnitKerjaHandler) Sync(c *gin.Context) {
	if err := h.usecase.SyncFromSIK(c.Request.Context()); err != nil {
		response.Error(c, http.StatusInternalServerError, "SYNC_FAILED", "Gagal sinkronisasi sub unit kerja dari SIK", err.Error())
		return
	}

	response.JSON(c, http.StatusOK, "Sinkronisasi sub unit kerja dari master SIK berhasil", nil)
}

