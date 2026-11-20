package repository

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/base64"
	"encoding/xml"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"regexp"
	"strings"
	"time"
)

// SOAPClient handles SOAP-XML communication with SIK Kemenhub Web Service.
type SOAPClient struct {
	baseURL    string
	username   string
	password   string
	httpClient *http.Client
}

func NewSOAPClient(baseURL, username, password string) *SOAPClient {
	cleanURL := strings.TrimSpace(baseURL)
	if cleanURL == "" {
		cleanURL = "https://sik.dephub.go.id:443/api/index.php/soap_services/sik_api"
	}

	return &SOAPClient{
		baseURL:  cleanURL,
		username: strings.TrimSpace(username),
		password: strings.TrimSpace(password),
		httpClient: &http.Client{
			Timeout: 45 * time.Second,
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{
					InsecureSkipVerify: true, // SIK server may use self-signed or internal CA
				},
			},
		},
	}
}

// SOAPItemKantor represents an office record returned by get_list_data_kantor.
type SOAPItemKantor struct {
	KodeKantor     string `xml:"kode_kantor"`
	KodeKantorLama string `xml:"kode_kantor_lama"`
	KodeUnit       string `xml:"kode_unit"`
	KodeUnitLama   string `xml:"kode_unit_lama"`
	KodeSatker     string `xml:"kode_satker"`
	NamaKantor     string `xml:"nama_kantor"`
	Jenis          string `xml:"jenis"`
	Alamat         string `xml:"alamat"`
	Email          string `xml:"email"`
	Telepon        string `xml:"telepon"`
}

// SOAPItemPegawai represents a raw employee record from SIK SOAP response.
type SOAPItemPegawai struct {
	UserID                string `xml:"user_id"`
	NIP                   string `xml:"nip"`
	NIK                   string `xml:"nik"`
	Nama                  string `xml:"nama"`
	TanggalLahir          string `xml:"tanggal_lahir"`
	TempatLahir           string `xml:"tempat_lahir"`
	JenisKelamin          string `xml:"jenis_kelamin"`
	Karpeg                string `xml:"karpeg"`
	Unit                  string `xml:"unit"`
	KodeUnit              string `xml:"kode_unit"`
	Kantor                string `xml:"kantor"`
	KodeKantor            string `xml:"kode_kantor"`
	Subkantor             string `xml:"subkantor"`
	KodeSubkantor         string `xml:"kode_subkantor"`
	TmtGolongan           string `xml:"tmt_golongan"`
	Golongan              string `xml:"golongan"`
	Pangkat               string `xml:"pangkat"`
	KodeEselon            string `xml:"kode_eselon"`
	Eselon                string `xml:"eselon"`
	KodeJabatanStruktural string `xml:"kode_jabatan_struktural"`
	JabatanStruktural     string `xml:"jabatan_struktural"`
	TmtJabatanStruktural  string `xml:"tmt_jabatan_struktural"`
	KodeJabatanFungsional string `xml:"kode_jabatan_fungsional"`
	JabatanFungsional     string `xml:"jabatan_fungsional"`
	TmtJabatanFungsional  string `xml:"tmt_jabatan_fungsional"`
	Email                 string `xml:"email"`
	Telepon               string `xml:"telepon"`
	TmtCPNS               string `xml:"tmt_cpns"`
	TmtPNS                string `xml:"tmt_pns"`
	PendidikanTerakhir    string `xml:"pendidikan_terakhir"`
	Foto                  string `xml:"foto"`
	JenisPegawai          string `xml:"jenis_pegawai"`
}

type soapResponseKantorEnvelope struct {
	XMLName xml.Name `xml:"Envelope"`
	Body    struct {
		Response struct {
			Return struct {
				Items []SOAPItemKantor `xml:"item"`
			} `xml:"return"`
		} `xml:"get_list_data_kantorResponse"`
	} `xml:"Body"`
}

type soapResponsePegawaiEnvelope struct {
	XMLName xml.Name `xml:"Envelope"`
	Body    struct {
		Response struct {
			Return struct {
				Items []SOAPItemPegawai `xml:"item"`
			} `xml:"return"`
		} `xml:"get_pegawai_per_kantorResponse"`
	} `xml:"Body"`
}

type soapResponseNIPEnvelope struct {
	XMLName xml.Name `xml:"Envelope"`
	Body    struct {
		Response struct {
			Return struct {
				Items []SOAPItemPegawai `xml:"item"`
			} `xml:"return"`
		} `xml:"get_pegawai_by_nipResponse"`
	} `xml:"Body"`
}

func (c *SOAPClient) execute(ctx context.Context, action string, bodyXML string) ([]byte, error) {
	reqXML := fmt.Sprintf(`<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    %s
  </soap:Body>
</soap:Envelope>`, bodyXML)

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL, bytes.NewBufferString(reqXML))
	if err != nil {
		return nil, fmt.Errorf("failed to create soap request: %w", err)
	}

	auth := base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", c.username, c.password)))
	req.Header.Set("Content-Type", "text/xml; charset=utf-8")
	req.Header.Set("SOAPAction", fmt.Sprintf("urn:soap_services/sik_api#%s", action))
	req.Header.Set("Authorization", fmt.Sprintf("Basic %s", auth))

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("soap request failed: %w", err)
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read soap response body: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("soap service returned status %d: %s", resp.StatusCode, string(respBytes))
	}

	return respBytes, nil
}

var nsRegex = regexp.MustCompile(`<(/?)[\w-]+:([^>]+)>`)

func stripXMLNamespaces(xmlData []byte) []byte {
	return nsRegex.ReplaceAll(xmlData, []byte("<$1$2>"))
}

// GetListDataKantor fetches list of offices under a unit code (e.g. 008 for BPSDM).
func (c *SOAPClient) GetListDataKantor(ctx context.Context, kodeUnit string) ([]SOAPItemKantor, error) {
	cleanKode := strings.TrimSpace(kodeUnit)
	if cleanKode == "" {
		cleanKode = "008" // Default to BPSDM
	}

	bodyXML := fmt.Sprintf(`<get_list_data_kantorRequest>
      <kode_unit>%s</kode_unit>
    </get_list_data_kantorRequest>`, cleanKode)

	respBytes, err := c.execute(ctx, "get_list_data_kantor", bodyXML)
	if err != nil {
		return nil, err
	}

	cleaned := stripXMLNamespaces(respBytes)
	var env soapResponseKantorEnvelope
	if err := xml.Unmarshal(cleaned, &env); err != nil {
		return nil, fmt.Errorf("failed to unmarshal kantor soap response: %w", err)
	}

	return env.Body.Response.Return.Items, nil
}

// GetPegawaiPerKantor fetches all employees in a specific office by kode_kantor.
func (c *SOAPClient) GetPegawaiPerKantor(ctx context.Context, kodeKantor string, namaKantor string) ([]SOAPItemPegawai, error) {
	cleanKode := strings.TrimSpace(kodeKantor)
	cleanNama := strings.TrimSpace(namaKantor)

	// In SIK SOAP API: when kode_kantor is provided, nama_kantor MUST be empty
	// to avoid strict/conflicting equality filters in SIK database.
	if cleanKode != "" {
		cleanNama = ""
	}

	bodyXML := fmt.Sprintf(`<get_pegawai_per_kantorRequest>
      <kode_kantor>%s</kode_kantor>
      <nama_kantor>%s</nama_kantor>
      <kode_subkantor></kode_subkantor>
    </get_pegawai_per_kantorRequest>`, htmlEscape(cleanKode), htmlEscape(cleanNama))

	respBytes, err := c.execute(ctx, "get_pegawai_per_kantor", bodyXML)
	if err != nil {
		slog.Error("SOAP get_pegawai_per_kantor execute failed", "error", err)
		return nil, err
	}

	cleaned := stripXMLNamespaces(respBytes)
	var env soapResponsePegawaiEnvelope
	if err := xml.Unmarshal(cleaned, &env); err != nil {
		slog.Error("SOAP get_pegawai_per_kantor unmarshal failed", "error", err, "raw_preview", string(respBytes[:min(len(respBytes), 300)]))
		return nil, fmt.Errorf("failed to unmarshal pegawai soap response: %w", err)
	}

	slog.Info("SOAP get_pegawai_per_kantor unmarshaled",
		"items_count", len(env.Body.Response.Return.Items),
		"raw_len", len(respBytes),
		"raw_preview", string(respBytes[:min(len(respBytes), 893)]),
	)

	return env.Body.Response.Return.Items, nil
}

// GetPegawaiByNIP fetches single employee by NIP.
func (c *SOAPClient) GetPegawaiByNIP(ctx context.Context, nip string) (*SOAPItemPegawai, error) {
	bodyXML := fmt.Sprintf(`<get_pegawai_by_nipRequest>
      <nip>%s</nip>
      <nik></nik>
    </get_pegawai_by_nipRequest>`, htmlEscape(nip))

	respBytes, err := c.execute(ctx, "get_pegawai_by_nip", bodyXML)
	if err != nil {
		return nil, err
	}

	cleaned := stripXMLNamespaces(respBytes)
	var env soapResponseNIPEnvelope
	if err := xml.Unmarshal(cleaned, &env); err != nil {
		return nil, fmt.Errorf("failed to unmarshal pegawai by nip soap response: %w", err)
	}

	if len(env.Body.Response.Return.Items) == 0 {
		return nil, fmt.Errorf("pegawai with nip %s not found in sik", nip)
	}

	return &env.Body.Response.Return.Items[0], nil
}

func htmlEscape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "\"", "&quot;")
	return s
}
