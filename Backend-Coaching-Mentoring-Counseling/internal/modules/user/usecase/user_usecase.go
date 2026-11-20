package usecase

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	sikdomain "github.com/kalanara/cmc-backend/internal/modules/sik/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type userUsecase struct {
	userRepo userdomain.UserRepository
	sikRepo  sikdomain.SIKRepository
}

func NewUserUsecase(userRepo userdomain.UserRepository, optionalSIKRepo ...sikdomain.SIKRepository) userdomain.UserUsecase {
	var sikRepo sikdomain.SIKRepository
	if len(optionalSIKRepo) > 0 {
		sikRepo = optionalSIKRepo[0]
	}
	return &userUsecase{
		userRepo: userRepo,
		sikRepo:  sikRepo,
	}
}

func (u *userUsecase) hydrateUserFromSIK(ctx context.Context, user *userdomain.User) error {
	if u.sikRepo == nil || user.NIP == "" {
		return nil
	}

	pegawai, err := u.sikRepo.FindByNIP(ctx, user.NIP)
	if err != nil {
		// If not found in SIK master, do not block the user
		return nil
	}

	// Update user attributes from SIK
	user.GelarDepan = pegawai.GelarDepan
	user.GelarBelakang = pegawai.GelarBelakang
	user.TempatLahir = pegawai.TempatLahir
	user.TanggalLahir = pegawai.TanggalLahir
	user.JenisKelamin = pegawai.JenisKelamin
	user.Agama = pegawai.Agama
	user.Jabatan = pegawai.Jabatan
	user.JenisJabatan = pegawai.JenisJabatan
	user.PangkatGolongan = pegawai.FormatPangkatGolongan()
	user.UnitKerja = pegawai.UnitKerja
	user.SubUnitKerja = pegawai.SubUnitKerja
	user.SubUnitKerjaKode = pegawai.SubUnitKerjaKode
	user.SatuanKerja = pegawai.SatuanKerja
	if pegawai.InstansiInduk != "" {
		user.InstansiInduk = pegawai.InstansiInduk
	}
	user.Eselon = pegawai.Eselon
	if pegawai.StatusKepegawaian != "" {
		user.StatusKepegawaian = pegawai.StatusKepegawaian
	}
	user.PendidikanTerakhir = pegawai.PendidikanTerakhir
	user.AtasanLangsungNIP = pegawai.AtasanLangsungNIP
	user.AtasanLangsungNama = pegawai.AtasanLangsungNama
	user.AtasanLangsungJabatan = pegawai.AtasanLangsungJabatan
	user.MasaKerjaTahun = pegawai.MasaKerjaTahun
	user.MasaKerjaBulan = pegawai.MasaKerjaBulan

	if user.AvatarURL == "" && pegawai.FotoURL != "" {
		user.AvatarURL = pegawai.FotoURL
	}
	if user.Phone == "" && pegawai.NoHP != "" {
		user.Phone = pegawai.NoHP
	}

	now := time.Now().UTC()
	user.SIKSyncedAt = &now

	rawBytes, _ := json.Marshal(pegawai)
	user.SIKData = string(rawBytes)

	return u.userRepo.Update(ctx, user)
}

func (u *userUsecase) GetProfile(ctx context.Context, userID uuid.UUID) (*userdomain.UserResponse, error) {
	user, err := u.userRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Auto-hydrate from SIK if not yet synced and NIP is available
	if user.NIP != "" && user.SIKSyncedAt == nil && u.sikRepo != nil {
		_ = u.hydrateUserFromSIK(ctx, user)
	}

	return user.ToResponse(), nil
}

func (u *userUsecase) ListPractitioners(ctx context.Context, role userdomain.Role) ([]userdomain.UserResponse, error) {
	users, err := u.userRepo.ListByRole(ctx, role)
	if err != nil {
		return nil, err
	}

	responses := make([]userdomain.UserResponse, len(users))
	for i, usr := range users {
		responses[i] = *usr.ToResponse()
	}
	return responses, nil
}

func (u *userUsecase) SyncSIK(ctx context.Context, userID uuid.UUID) (*userdomain.UserResponse, error) {
	user, err := u.userRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if user.NIP == "" {
		return nil, sharederrors.ErrBadRequest
	}

	if err := u.hydrateUserFromSIK(ctx, user); err != nil {
		return nil, err
	}

	return user.ToResponse(), nil
}
