package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"gorm.io/gorm"

	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	"github.com/kalanara/cmc-backend/internal/platform/database"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type SessionRepository struct {
	db *database.DB
}

func NewSessionRepository(db *database.DB) *SessionRepository {
	return &SessionRepository{db: db}
}

func (r *SessionRepository) Create(ctx context.Context, session *sessiondomain.Session) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).Create(session)
	if result.Error != nil {
		return fmt.Errorf("failed to create session: %w", result.Error)
	}
	return nil
}

func (r *SessionRepository) FindByID(ctx context.Context, id uuid.UUID) (*sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var session sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("PesertaList", func(db *gorm.DB) *gorm.DB {
			return db.Order("role_in_session asc, created_at asc")
		}).
		Preload("PertemuanList", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Preload("PertemuanList.CatatanList", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at asc")
		}).
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("id = ?", id).
		First(&session)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, sharederrors.ErrSessionNotFound
		}
		return nil, fmt.Errorf("failed to find session: %w", result.Error)
	}

	// Auto-fallback: if PesertaList is empty but Client exists, populate it in-memory or in DB
	if len(session.PesertaList) == 0 && session.Client != nil {
		peserta := sessiondomain.SessionPeserta{
			ID:            uuid.New(),
			SessionID:     session.ID,
			UserID:        &session.ClientID,
			NIP:           session.Client.NIP,
			Nama:          session.Client.FullName,
			Email:         session.Client.Email,
			Jabatan:       session.Client.Jabatan,
			UnitKerja:     session.Client.UnitKerja,
			RoleInSession: "utama",
			CurrentJP:     session.CurrentJP,
			TargetJP:      session.TargetJP,
			Status:        "active",
		}
		_ = r.db.GormDB.WithContext(ctxTimeout).Create(&peserta)
		session.PesertaList = []sessiondomain.SessionPeserta{peserta}
	}

	return &session, nil
}

func (r *SessionRepository) FindByClientID(ctx context.Context, clientID uuid.UUID) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("PesertaList").
		Preload("PertemuanList").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("client_id = ?", clientID).
		Order("created_at desc").
		Find(&sessions)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to list client sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) FindByPractitionerID(ctx context.Context, practitionerID uuid.UUID) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("PesertaList").
		Preload("PertemuanList").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Where("practitioner_id = ?", practitionerID).
		Order("created_at desc").
		Find(&sessions)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to list practitioner sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) FindByInvolvement(ctx context.Context, userID uuid.UUID, nip string) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	query := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("PesertaList").
		Preload("PertemuanList").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		})

	cleanNIP := strings.TrimSpace(nip)
	if cleanNIP != "" {
		query = query.Joins("LEFT JOIN users AS c ON c.id = sessions.client_id").
			Where(`
				sessions.client_id = ? 
				OR sessions.practitioner_id = ? 
				OR sessions.atasan_nip = ? 
				OR c.atasan_langsung_nip = ?
				OR sessions.id IN (SELECT session_id FROM session_peserta WHERE user_id = ? OR nip = ?)
			`, userID, userID, cleanNIP, cleanNIP, userID, cleanNIP)
	} else {
		query = query.Where(`
			sessions.client_id = ? 
			OR sessions.practitioner_id = ?
			OR sessions.id IN (SELECT session_id FROM session_peserta WHERE user_id = ?)
		`, userID, userID, userID)
	}

	result := query.Order("sessions.created_at desc").Find(&sessions)
	if result.Error != nil {
		return nil, fmt.Errorf("failed to list involved sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) FindAll(ctx context.Context) ([]sessiondomain.Session, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var sessions []sessiondomain.Session
	result := r.db.GormDB.WithContext(ctxTimeout).
		Preload("Client").
		Preload("Practitioner").
		Preload("PesertaList").
		Preload("PertemuanList").
		Preload("Meetings", func(db *gorm.DB) *gorm.DB {
			return db.Order("meeting_number asc")
		}).
		Order("created_at desc").
		Find(&sessions)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to list all sessions: %w", result.Error)
	}
	return sessions, nil
}

func (r *SessionRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status sessiondomain.SessionStatus, notes string) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	updates := map[string]interface{}{
		"status": status,
	}
	if notes != "" {
		updates["notes"] = notes
	}

	result := r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Session{}).
		Where("id = ?", id).
		Updates(updates)

	if result.Error != nil {
		return fmt.Errorf("failed to update session status: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return sharederrors.ErrSessionNotFound
	}
	return nil
}

// -------------------------------------------------------------
// Meetings (Backward Compatible)
// -------------------------------------------------------------

func (r *SessionRepository) AddMeeting(ctx context.Context, meeting *sessiondomain.Meeting) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if meeting.MeetingNumber > 0 {
		var existing sessiondomain.Meeting
		err := r.db.GormDB.WithContext(ctxTimeout).
			Where("session_id = ? AND meeting_number = ?", meeting.SessionID, meeting.MeetingNumber).
			First(&existing).Error

		if err == nil {
			existing.Title = meeting.Title
			if meeting.ScheduledDate != "" {
				existing.ScheduledDate = meeting.ScheduledDate
			}
			if meeting.MeetingType != "" {
				existing.MeetingType = meeting.MeetingType
			}
			if meeting.Location != "" {
				existing.Location = meeting.Location
			}
			if meeting.Summary != "" {
				existing.Summary = meeting.Summary
			}
			if meeting.JPCollected > 0 {
				existing.JPCollected = meeting.JPCollected
			}
			if meeting.Status != "" {
				existing.Status = meeting.Status
			}
			*meeting = existing
			return r.UpdateMeeting(ctx, meeting)
		}
	} else {
		var maxNumber int
		r.db.GormDB.WithContext(ctxTimeout).
			Model(&sessiondomain.Meeting{}).
			Where("session_id = ?", meeting.SessionID).
			Select("COALESCE(MAX(meeting_number), 0)").
			Scan(&maxNumber)
		meeting.MeetingNumber = maxNumber + 1
	}

	if err := r.db.GormDB.WithContext(ctxTimeout).Create(meeting).Error; err != nil {
		return fmt.Errorf("failed to add meeting: %w", err)
	}

	// Also sync to session_pertemuan
	pertemuan := sessiondomain.SessionPertemuan{
		ID:            meeting.ID,
		SessionID:     meeting.SessionID,
		MeetingNumber: meeting.MeetingNumber,
		Title:         meeting.Title,
		ScheduledDate: meeting.ScheduledDate,
		MeetingType:   meeting.MeetingType,
		Location:      meeting.Location,
		Status:        meeting.Status,
	}
	_ = r.db.GormDB.WithContext(ctxTimeout).Save(&pertemuan)

	// Recalculate session JP
	r.recalculateSessionJP(ctxTimeout, meeting.SessionID)
	return nil
}

func (r *SessionRepository) UpdateMeeting(ctx context.Context, meeting *sessiondomain.Meeting) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if err := r.db.GormDB.WithContext(ctxTimeout).Save(meeting).Error; err != nil {
		return fmt.Errorf("failed to update meeting: %w", err)
	}

	// Sync to session_pertemuan
	pertemuan := sessiondomain.SessionPertemuan{
		ID:            meeting.ID,
		SessionID:     meeting.SessionID,
		MeetingNumber: meeting.MeetingNumber,
		Title:         meeting.Title,
		ScheduledDate: meeting.ScheduledDate,
		MeetingType:   meeting.MeetingType,
		Location:      meeting.Location,
		Status:        meeting.Status,
	}
	_ = r.db.GormDB.WithContext(ctxTimeout).Save(&pertemuan)

	// Recalculate session JP
	r.recalculateSessionJP(ctxTimeout, meeting.SessionID)
	return nil
}

func (r *SessionRepository) FindMeetingByID(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) (*sessiondomain.Meeting, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var meeting sessiondomain.Meeting
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? AND session_id = ?", meetingID, sessionID).
		First(&meeting).Error
	if err != nil {
		return nil, err
	}
	return &meeting, nil
}

func (r *SessionRepository) DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	result := r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? AND session_id = ?", meetingID, sessionID).
		Delete(&sessiondomain.Meeting{})

	if result.Error != nil {
		return fmt.Errorf("failed to delete meeting: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return errors.New("meeting not found")
	}

	_ = r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? AND session_id = ?", meetingID, sessionID).
		Delete(&sessiondomain.SessionPertemuan{})

	r.recalculateSessionJP(ctxTimeout, sessionID)
	return nil
}

// -------------------------------------------------------------
// Session Peserta
// -------------------------------------------------------------

func (r *SessionRepository) AddPeserta(ctx context.Context, peserta *sessiondomain.SessionPeserta) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if peserta.ID == uuid.Nil {
		peserta.ID = uuid.New()
	}

	var existing sessiondomain.SessionPeserta
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("session_id = ? AND nip = ?", peserta.SessionID, peserta.NIP).
		First(&existing).Error

	if err == nil {
		// Update existing
		existing.Nama = peserta.Nama
		existing.Jabatan = peserta.Jabatan
		existing.UnitKerja = peserta.UnitKerja
		existing.RoleInSession = peserta.RoleInSession
		*peserta = existing
		return r.db.GormDB.WithContext(ctxTimeout).Save(peserta).Error
	}

	return r.db.GormDB.WithContext(ctxTimeout).Create(peserta).Error
}

func (r *SessionRepository) ListPeserta(ctx context.Context, sessionID uuid.UUID) ([]sessiondomain.SessionPeserta, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sessiondomain.SessionPeserta
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("session_id = ?", sessionID).
		Order("role_in_session asc, nama asc").
		Find(&list).Error

	return list, err
}

func (r *SessionRepository) DeletePeserta(ctx context.Context, sessionID uuid.UUID, pesertaID uuid.UUID) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	return r.db.GormDB.WithContext(ctxTimeout).
		Where("id = ? AND session_id = ?", pesertaID, sessionID).
		Delete(&sessiondomain.SessionPeserta{}).Error
}

// -------------------------------------------------------------
// Session Pertemuan
// -------------------------------------------------------------

func (r *SessionRepository) AddPertemuan(ctx context.Context, pertemuan *sessiondomain.SessionPertemuan) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if pertemuan.ID == uuid.Nil {
		pertemuan.ID = uuid.New()
	}

	if pertemuan.MeetingNumber <= 0 {
		var maxNumber int
		r.db.GormDB.WithContext(ctxTimeout).
			Model(&sessiondomain.SessionPertemuan{}).
			Where("session_id = ?", pertemuan.SessionID).
			Select("COALESCE(MAX(meeting_number), 0)").
			Scan(&maxNumber)
		pertemuan.MeetingNumber = maxNumber + 1
	}

	if err := r.db.GormDB.WithContext(ctxTimeout).Create(pertemuan).Error; err != nil {
		return err
	}

	// Also mirror to meetings table for compatibility
	meeting := sessiondomain.Meeting{
		ID:            pertemuan.ID,
		SessionID:     pertemuan.SessionID,
		MeetingNumber: pertemuan.MeetingNumber,
		Title:         pertemuan.Title,
		ScheduledDate: pertemuan.ScheduledDate,
		MeetingType:   pertemuan.MeetingType,
		Location:      pertemuan.Location,
		Status:        pertemuan.Status,
	}
	_ = r.db.GormDB.WithContext(ctxTimeout).Save(&meeting)

	return nil
}

func (r *SessionRepository) UpdatePertemuan(ctx context.Context, pertemuan *sessiondomain.SessionPertemuan) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if err := r.db.GormDB.WithContext(ctxTimeout).Save(pertemuan).Error; err != nil {
		return err
	}

	// Also mirror to meetings table
	meeting := sessiondomain.Meeting{
		ID:            pertemuan.ID,
		SessionID:     pertemuan.SessionID,
		MeetingNumber: pertemuan.MeetingNumber,
		Title:         pertemuan.Title,
		ScheduledDate: pertemuan.ScheduledDate,
		MeetingType:   pertemuan.MeetingType,
		Location:      pertemuan.Location,
		Status:        pertemuan.Status,
	}
	_ = r.db.GormDB.WithContext(ctxTimeout).Save(&meeting)

	return nil
}

func (r *SessionRepository) FindPertemuanByID(ctx context.Context, sessionID uuid.UUID, pertemuanID uuid.UUID) (*sessiondomain.SessionPertemuan, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var pertemuan sessiondomain.SessionPertemuan
	err := r.db.GormDB.WithContext(ctxTimeout).
		Preload("CatatanList", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at asc")
		}).
		Where("id = ? AND session_id = ?", pertemuanID, sessionID).
		First(&pertemuan).Error

	if err != nil {
		return nil, err
	}
	return &pertemuan, nil
}

func (r *SessionRepository) ListPertemuan(ctx context.Context, sessionID uuid.UUID) ([]sessiondomain.SessionPertemuan, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sessiondomain.SessionPertemuan
	err := r.db.GormDB.WithContext(ctxTimeout).
		Preload("CatatanList", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at asc")
		}).
		Where("session_id = ?", sessionID).
		Order("meeting_number asc").
		Find(&list).Error

	return list, err
}

// -------------------------------------------------------------
// Session Pertemuan Peserta Catatan
// -------------------------------------------------------------

func (r *SessionRepository) SaveCatatanPertemuan(ctx context.Context, catatan *sessiondomain.SessionPertemuanPesertaCatatan) error {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	if catatan.ID == uuid.Nil {
		catatan.ID = uuid.New()
	}

	// Check if this participant already has a note for this specific meeting
	var existing sessiondomain.SessionPertemuanPesertaCatatan
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("session_pertemuan_id = ? AND nip = ?", catatan.SessionPertemuanID, catatan.NIP).
		First(&existing).Error

	if err == nil {
		// Update existing note
		catatan.ID = existing.ID
		if catatan.Tujuan == "" {
			catatan.Tujuan = existing.Tujuan
		}
		if catatan.Pembahasan == "" {
			catatan.Pembahasan = existing.Pembahasan
		}
		if catatan.JPCollected <= 0 {
			catatan.JPCollected = existing.JPCollected
		}
		if err := r.db.GormDB.WithContext(ctxTimeout).Save(catatan).Error; err != nil {
			return err
		}
	} else {
		// Create new note
		if err := r.db.GormDB.WithContext(ctxTimeout).Create(catatan).Error; err != nil {
			return err
		}
	}

	// Update pertemuan status to completed
	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.SessionPertemuan{}).
		Where("id = ?", catatan.SessionPertemuanID).
		Update("status", "completed")

	// Update mirrored meetings table
	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.Meeting{}).
		Where("id = ?", catatan.SessionPertemuanID).
		Updates(map[string]interface{}{
			"status":  "completed",
			"summary": catatan.Pembahasan,
		})

	// Recalculate participant JP in session_peserta
	var participantTotalJP int
	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.SessionPertemuanPesertaCatatan{}).
		Where("session_id = ? AND nip = ? AND (status = 'completed' OR status = 'verified')", catatan.SessionID, catatan.NIP).
		Select("COALESCE(SUM(jp_collected), 0)").
		Scan(&participantTotalJP)

	_ = r.db.GormDB.WithContext(ctxTimeout).
		Model(&sessiondomain.SessionPeserta{}).
		Where("session_id = ? AND nip = ?", catatan.SessionID, catatan.NIP).
		Update("current_jp", participantTotalJP)

	// Recalculate overall session JP
	r.recalculateSessionJP(ctxTimeout, catatan.SessionID)
	return nil
}

func (r *SessionRepository) ListCatatanByPertemuan(ctx context.Context, pertemuanID uuid.UUID) ([]sessiondomain.SessionPertemuanPesertaCatatan, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sessiondomain.SessionPertemuanPesertaCatatan
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("session_pertemuan_id = ?", pertemuanID).
		Order("created_at asc").
		Find(&list).Error

	return list, err
}

func (r *SessionRepository) ListCatatanBySession(ctx context.Context, sessionID uuid.UUID) ([]sessiondomain.SessionPertemuanPesertaCatatan, error) {
	ctxTimeout, cancel := r.db.WithTimeout(ctx)
	defer cancel()

	var list []sessiondomain.SessionPertemuanPesertaCatatan
	err := r.db.GormDB.WithContext(ctxTimeout).
		Where("session_id = ?", sessionID).
		Order("created_at asc").
		Find(&list).Error

	return list, err
}

func (r *SessionRepository) recalculateSessionJP(ctx context.Context, sessionID uuid.UUID) {
	var totalJP int
	_ = r.db.GormDB.WithContext(ctx).
		Model(&sessiondomain.Meeting{}).
		Where("session_id = ? AND (status = 'lengkap' OR status = 'completed')", sessionID).
		Select("COALESCE(SUM(jp_collected), 0)").
		Scan(&totalJP)

	_ = r.db.GormDB.WithContext(ctx).
		Model(&sessiondomain.Session{}).
		Where("id = ?", sessionID).
		Update("current_jp", totalJP)
}
