package repository_test

import (
	"context"
	"testing"

	"github.com/kalanara/cmc-backend/internal/modules/sik/repository"
)

func TestSOAPClient_Live(t *testing.T) {
	client := repository.NewSOAPClient(
		"https://sik.dephub.go.id:443/api/index.php/soap_services/sik_api",
		"N3wPres3nsiApp5",
		"CBlv1iA#VZa4tm6F895W3IcP7Qw$HLbfxjEkR@SKzMJTGUugqo",
	)

	ctx := context.Background()

	t.Run("GetListDataKantor", func(t *testing.T) {
		kantors, err := client.GetListDataKantor(ctx, "008")
		if err != nil {
			t.Fatalf("failed to get list data kantor: %v", err)
		}
		t.Logf("Fetched %d offices under 008", len(kantors))
		if len(kantors) == 0 {
			t.Errorf("expected > 0 offices")
		}
	})

	t.Run("GetPegawaiPerKantor", func(t *testing.T) {
		pegawai, err := client.GetPegawaiPerKantor(ctx, "008006000000000", "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan")
		if err != nil {
			t.Fatalf("failed to get pegawai per kantor: %v", err)
		}
		t.Logf("Fetched %d employees in 008006000000000", len(pegawai))
		if len(pegawai) > 0 {
			t.Logf("First employee: NIP=%s, Nama=%s, Kantor=%s, Subkantor=%s",
				pegawai[0].NIP, pegawai[0].Nama, pegawai[0].Kantor, pegawai[0].Subkantor)
		}
	})
}
