package usecase

import (
	"context"
	"strings"

	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	subdomain "github.com/kalanara/cmc-backend/internal/modules/sub_unit_kerja/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type subUnitKerjaUsecase struct {
	repo subdomain.SubUnitKerjaRepository
}

func NewSubUnitKerjaUsecase(repo subdomain.SubUnitKerjaRepository) subdomain.SubUnitKerjaUsecase {
	return &subUnitKerjaUsecase{repo: repo}
}

func (u *subUnitKerjaUsecase) ListSubUnitKerja(ctx context.Context, filter subdomain.SubUnitKerjaFilter) ([]subdomain.SubUnitKerja, error) {
	return u.repo.FindAll(ctx, filter)
}

func (u *subUnitKerjaUsecase) GetSubUnitKerja(ctx context.Context, id string) (*subdomain.SubUnitKerja, error) {
	cleanID := strings.TrimSpace(id)
	if cleanID == "" {
		return nil, sharederrors.ErrBadRequest
	}
	return u.repo.FindByID(ctx, cleanID)
}

func (u *subUnitKerjaUsecase) GetPegawaiBySubUnitKerja(ctx context.Context, id string, query string, limit, offset int) ([]sikdomain.Pegawai, int64, error) {
	cleanID := strings.TrimSpace(id)
	if cleanID == "" {
		return nil, 0, sharederrors.ErrBadRequest
	}

	subUnit, err := u.repo.FindByID(ctx, cleanID)
	if err != nil {
		return nil, 0, err
	}

	return u.repo.GetPegawaiBySubUnitKerja(ctx, subUnit.Nama, query, limit, offset)
}

func (u *subUnitKerjaUsecase) SyncFromSIK(ctx context.Context) error {
	return u.repo.SyncFromSIK(ctx)
}

