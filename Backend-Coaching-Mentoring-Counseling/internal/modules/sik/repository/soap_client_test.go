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
		for _, k := range kantors {
			t.Logf("Kantor: code=%s, name=%s", k.KodeKantor, k.NamaKantor)
		}
	})

	t.Run("GetPegawaiPerKantor_Units", func(t *testing.T) {
		units := []struct {
			code string
			name string
		}{
			{"008002000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat"},
			{"008003000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut"},
			{"008004000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara"},
		}
		for _, u := range units {
			list, err := client.GetPegawaiPerKantor(ctx, u.code, u.name)
			if err != nil {
				t.Logf("Unit %s (%s) ERROR: %v", u.code, u.name, err)
			} else {
				t.Logf("Unit %s (%s) SUCCESS: count=%d", u.code, u.name, len(list))
			}
		}
	})
}
