package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/kalanara/cmc-backend/internal/modules/sik/repository"
)

func escapeSQL(str string) string {
	s := strings.TrimSpace(str)
	s = strings.ReplaceAll(s, "'", "''")
	return s
}

func sqlVal(str string) string {
	val := strings.TrimSpace(str)
	if val == "" {
		return "NULL"
	}
	return fmt.Sprintf("'%s'", escapeSQL(val))
}

func mapSOAPToFields(item repository.SOAPItemPegawai, defaultKantor string) map[string]string {
	nip := strings.TrimSpace(item.NIP)
	if nip == "" {
		nip = strings.TrimSpace(item.NIK)
	}

	kantor := strings.TrimSpace(item.Kantor)
	if kantor == "" {
		kantor = defaultKantor
	}

	satker := strings.TrimSpace(item.Unit)
	if satker == "" {
		satker = "Badan Pengembangan Sumber Daya Manusia Perhubungan"
	}

	var jabatan, jenisJabatan string
	if item.JabatanStruktural != "" {
		jabatan = strings.TrimSpace(item.JabatanStruktural)
		jenisJabatan = "Struktural"
	} else if item.JabatanFungsional != "" {
		jabatan = strings.TrimSpace(item.JabatanFungsional)
		jenisJabatan = "Fungsional"
	} else {
		jabatan = "Pelaksana"
		jenisJabatan = "Pelaksana"
	}

	status := "PNS"
	jp := strings.ToLower(strings.TrimSpace(item.JenisPegawai))
	if strings.Contains(jp, "pppk") {
		status = "PPPK"
	} else if jp != "" && jp != "pns" {
		status = "NON_PNS"
	}

	return map[string]string{
		"nip":                 nip,
		"nama":                strings.TrimSpace(item.Nama),
		"tempat_lahir":        strings.TrimSpace(item.TempatLahir),
		"tanggal_lahir":       strings.TrimSpace(item.TanggalLahir),
		"jenis_kelamin":       strings.TrimSpace(item.JenisKelamin),
		"email_dinas":         strings.TrimSpace(item.Email),
		"no_hp":               strings.TrimSpace(item.Telepon),
		"status_kepegawaian":  status,
		"pangkat":             strings.TrimSpace(item.Pangkat),
		"golongan_ruang":      strings.TrimSpace(item.Golongan),
		"jabatan":             jabatan,
		"jenis_jabatan":       jenisJabatan,
		"eselon":              strings.TrimSpace(item.Eselon),
		"unit_kerja":          kantor,
		"sub_unit_kerja":      strings.TrimSpace(item.Subkantor),
		"sub_unit_kerja_kode": strings.TrimSpace(item.KodeSubkantor),
		"satuan_kerja":        satker,
		"instansi_induk":      "Kementerian Perhubungan",
		"pendidikan_terakhir": strings.TrimSpace(item.PendidikanTerakhir),
		"foto_url":            strings.TrimSpace(item.Foto),
	}
}

func main() {
	client := repository.NewSOAPClient(
		"https://sik.dephub.go.id:443/api/index.php/soap_services/sik_api",
		"N3wPres3nsiApp5",
		"CBlv1iA#VZa4tm6F895W3IcP7Qw$HLbfxjEkR@SKzMJTGUugqo",
	)

	targets := []struct {
		code string
		name string
	}{
		{"008006000000000", "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"},
		{"008002000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat"},
		{"008003000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut"},
		{"008004000000000", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara"},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	var sb strings.Builder
	sb.WriteString("-- Migration 000014: Sync all BPSDM offices (Aparatur, Darat, Laut, Udara) to match SIK sync history\n\n")

	totalExported := 0
	seenNIP := make(map[string]bool)

	for _, tgt := range targets {
		log.Printf("Fetching SIK SOAP: %s (%s)...", tgt.name, tgt.code)
		items, err := client.GetPegawaiPerKantor(ctx, tgt.code, tgt.name)
		if err != nil {
			log.Fatalf("Failed to fetch %s: %v", tgt.name, err)
		}
		log.Printf("-> Found %d items for %s", len(items), tgt.name)

		sb.WriteString(fmt.Sprintf("-- Office: %s (%s) - %d items\n", tgt.name, tgt.code, len(items)))

		for _, it := range items {
			f := mapSOAPToFields(it, tgt.name)
			nip := f["nip"]
			if nip == "" || seenNIP[nip] {
				continue
			}
			seenNIP[nip] = true
			totalExported++

			sb.WriteString("INSERT INTO sik_pegawai (\n")
			sb.WriteString("    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,\n")
			sb.WriteString("    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,\n")
			sb.WriteString("    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,\n")
			sb.WriteString("    created_at, updated_at\n")
			sb.WriteString(") VALUES (\n")
			sb.WriteString(fmt.Sprintf("    %s, %s, %s, %s, %s,\n",
				sqlVal(f["nip"]), sqlVal(f["nama"]),
				sqlVal(f["tempat_lahir"]), sqlVal(f["tanggal_lahir"]), sqlVal(f["jenis_kelamin"]),
			))
			sb.WriteString(fmt.Sprintf("    %s, %s, %s, %s, %s, %s, %s, %s,\n",
				sqlVal(f["email_dinas"]), sqlVal(f["no_hp"]), sqlVal(f["status_kepegawaian"]),
				sqlVal(f["pangkat"]), sqlVal(f["golongan_ruang"]), sqlVal(f["jabatan"]), sqlVal(f["jenis_jabatan"]), sqlVal(f["eselon"]),
			))
			sb.WriteString(fmt.Sprintf("    %s, %s, %s, %s, %s, %s, %s,\n",
				sqlVal(f["unit_kerja"]), sqlVal(f["sub_unit_kerja"]), sqlVal(f["sub_unit_kerja_kode"]), sqlVal(f["satuan_kerja"]),
				sqlVal(f["instansi_induk"]), sqlVal(f["pendidikan_terakhir"]), sqlVal(f["foto_url"]),
			))
			sb.WriteString("    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP\n")
			sb.WriteString(") ON CONFLICT (nip) DO UPDATE SET\n")
			sb.WriteString("    nama = EXCLUDED.nama,\n")
			sb.WriteString("    jabatan = EXCLUDED.jabatan,\n")
			sb.WriteString("    jenis_jabatan = EXCLUDED.jenis_jabatan,\n")
			sb.WriteString("    pangkat = EXCLUDED.pangkat,\n")
			sb.WriteString("    golongan_ruang = EXCLUDED.golongan_ruang,\n")
			sb.WriteString("    eselon = EXCLUDED.eselon,\n")
			sb.WriteString("    unit_kerja = EXCLUDED.unit_kerja,\n")
			sb.WriteString("    sub_unit_kerja = EXCLUDED.sub_unit_kerja,\n")
			sb.WriteString("    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,\n")
			sb.WriteString("    satuan_kerja = EXCLUDED.satuan_kerja,\n")
			sb.WriteString("    status_kepegawaian = EXCLUDED.status_kepegawaian,\n")
			sb.WriteString("    email_dinas = EXCLUDED.email_dinas,\n")
			sb.WriteString("    no_hp = EXCLUDED.no_hp,\n")
			sb.WriteString("    updated_at = CURRENT_TIMESTAMP;\n\n")
		}
	}

	outPath := "migrations/000014_sync_bpsdm_pegawai_from_sik.up.sql"
	err := os.WriteFile(outPath, []byte(sb.String()), 0644)
	if err != nil {
		log.Fatalf("Failed to write sql file: %v", err)
	}

	downPath := "migrations/000014_sync_bpsdm_pegawai_from_sik.down.sql"
	downSql := "-- Migration 000014: down\n-- No deletion of master pegawai to preserve data integrity\n"
	_ = os.WriteFile(downPath, []byte(downSql), 0644)

	log.Printf("Successfully generated %s with %d total distinct employees!", outPath, totalExported)
}
