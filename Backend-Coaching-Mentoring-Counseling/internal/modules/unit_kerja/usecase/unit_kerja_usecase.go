package usecase

import (
	"context"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	unitdomain "github.com/kalanara/cmc-backend/internal/modules/unit_kerja/domain"
)

type UnitKerjaUsecase struct {
	repo unitdomain.UnitKerjaRepository
}

func NewUnitKerjaUsecase(repo unitdomain.UnitKerjaRepository) *UnitKerjaUsecase {
	return &UnitKerjaUsecase{repo: repo}
}

func (u *UnitKerjaUsecase) ListUnitKerja(ctx context.Context, satkerID string, query string) ([]unitdomain.UnitKerja, error) {
	return u.repo.FindAll(ctx, satkerID, query)
}

func (u *UnitKerjaUsecase) GetUnitKerja(ctx context.Context, id string) (*unitdomain.UnitKerja, error) {
	return u.repo.FindByID(ctx, id)
}

func (u *UnitKerjaUsecase) GetPegawaiByUnitKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	unit, err := u.repo.FindByID(ctx, id)
	targetNama := id
	if err == nil && unit != nil {
		targetNama = unit.Nama
	}
	return u.repo.GetPegawaiByUnitKerja(ctx, targetNama, query, limit, offset)
}

func (u *UnitKerjaUsecase) SyncFromSIK(ctx context.Context) error {
	return u.repo.SyncFromSIK(ctx)
}

