package usecase

import (
	"context"

	satkerdomain "github.com/kalanara/cmc-backend/internal/modules/satuan_kerja/domain"
	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
)

type SatuanKerjaUsecase struct {
	repo satkerdomain.SatuanKerjaRepository
}

func NewSatuanKerjaUsecase(repo satkerdomain.SatuanKerjaRepository) *SatuanKerjaUsecase {
	return &SatuanKerjaUsecase{repo: repo}
}

func (u *SatuanKerjaUsecase) ListSatuanKerja(ctx context.Context, query string) ([]satkerdomain.SatuanKerja, error) {
	return u.repo.FindAll(ctx, query)
}

func (u *SatuanKerjaUsecase) GetSatuanKerja(ctx context.Context, id string) (*satkerdomain.SatuanKerja, error) {
	return u.repo.FindByID(ctx, id)
}

func (u *SatuanKerjaUsecase) GetPegawaiBySatuanKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	satker, err := u.repo.FindByID(ctx, id)
	targetNama := id
	if err == nil && satker != nil {
		targetNama = satker.Nama
	}
	return u.repo.GetPegawaiBySatuanKerja(ctx, targetNama, query, limit, offset)
}

func (u *SatuanKerjaUsecase) SyncFromSIK(ctx context.Context) error {
	return u.repo.SyncFromSIK(ctx)
}

