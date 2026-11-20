package domain

import "errors"

// Sentinel domain errors shared across modules.
var (
	ErrUserNotFound        = errors.New("user not found")
	ErrUserAlreadyExists    = errors.New("user with this email already exists")
	ErrInvalidCredentials   = errors.New("invalid email or password")
	ErrUnauthorized         = errors.New("authentication required or invalid token")
	ErrForbidden            = errors.New("access denied: insufficient permissions")
	ErrTokenExpired         = errors.New("token has expired")
	ErrTokenRevoked         = errors.New("token has been revoked")
	ErrInvalidToken         = errors.New("token is malformed or invalid")
	ErrSessionNotFound      = errors.New("session not found")
	ErrInvalidSessionStatus = errors.New("invalid session status transition")
	ErrConflict             = errors.New("resource conflict")
	ErrInternalServer       = errors.New("an internal error occurred")
	ErrBadRequest           = errors.New("invalid request parameters")
	ErrRateLimitExceeded    = errors.New("too many requests, please slow down")
	ErrPractitionerNotFound = errors.New("practitioner not found or role is invalid")
	ErrPegawaiNotFound      = errors.New("pegawai not found in SIK")
	ErrMaxMonthlyMeetingsExceeded = errors.New("maksimal 2 pertemuan per bulan per jenis kegiatan (1 pertemuan = 2 JP)")
	ErrSessionNotVerified   = errors.New("pertemuan hanya dapat ditambahkan setelah sesi diverifikasi dan disetujui oleh atasan / pejabat penilai")
	ErrSessionAlreadyCompleted = errors.New("sesi sudah ditandai selesai sehingga tidak dapat menambah pertemuan baru")
)
