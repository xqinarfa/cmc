package usecase

import (
	"context"
	"crypto/rand"
	"fmt"
	"log/slog"
	"math/big"
	"strings"
	"time"

	"github.com/google/uuid"

	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type sessionUsecase struct {
	sessionRepo    sessiondomain.SessionRepository
	userRepo       userdomain.UserRepository
	eventPublisher authdomain.EventPublisher
}

func NewSessionUsecase(
	sessionRepo sessiondomain.SessionRepository,
	userRepo userdomain.UserRepository,
	eventPublisher authdomain.EventPublisher,
) sessiondomain.SessionUsecase {
	return &sessionUsecase{
		sessionRepo:    sessionRepo,
		userRepo:       userRepo,
		eventPublisher: eventPublisher,
	}
}

func generateToken() string {
	const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	b1 := make([]byte, 4)
	b2 := make([]byte, 4)
	for i := range b1 {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		b1[i] = charset[num.Int64()]
	}
	for i := range b2 {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		b2[i] = charset[num.Int64()]
	}
	return fmt.Sprintf("CMC-%s-%s", string(b1), string(b2))
}

func (u *sessionUsecase) BookSession(ctx context.Context, clientID uuid.UUID, input sessiondomain.BookSessionInput) (*sessiondomain.Session, error) {
	client, err := u.userRepo.FindByID(ctx, clientID)
	if err != nil {
		return nil, sharederrors.ErrUserNotFound
	}
	if client.Role.Normalize() != userdomain.RolePegawai && !client.Role.IsAdmin() {
		return nil, sharederrors.ErrForbidden
	}

	var practitioner *userdomain.User
	var errPrac error

	if strings.TrimSpace(input.PractitionerNIP) != "" {
		practitioner, _ = u.userRepo.FindByNIP(ctx, strings.TrimSpace(input.PractitionerNIP))
	}
	if practitioner == nil && input.PractitionerID != nil && *input.PractitionerID != uuid.Nil {
		practitioner, errPrac = u.userRepo.FindByID(ctx, *input.PractitionerID)
	}
	if practitioner == nil {
		if errPrac != nil {
			return nil, errPrac
		}
		return nil, sharederrors.ErrPractitionerNotFound
	}

	if !practitioner.Role.IsAdmin() {
		switch input.Type {
		case sessiondomain.TypeCoaching:
			if practitioner.Role != userdomain.RoleCoach && practitioner.Role != userdomain.RoleClient && practitioner.Role != userdomain.RolePegawai {
				return nil, sharederrors.ErrPractitionerNotFound
			}
		case sessiondomain.TypeMentoring:
			if practitioner.Role != userdomain.RoleMentor && practitioner.Role != userdomain.RoleClient && practitioner.Role != userdomain.RolePegawai {
				return nil, sharederrors.ErrPractitionerNotFound
			}
		case sessiondomain.TypeCounseling:
			if practitioner.Role != userdomain.RoleCounselor && practitioner.Role != userdomain.RoleClient && practitioner.Role != userdomain.RolePegawai {
				return nil, sharederrors.ErrPractitionerNotFound
			}
		}
	}

	scheduledAt := time.Now().Add(72 * time.Hour)
	if input.ScheduledAt != nil && !input.ScheduledAt.IsZero() {
		scheduledAt = *input.ScheduledAt
	}

	duration := input.DurationMinutes
	if duration <= 0 {
		duration = 60
	}

	sessionFormat := input.SessionFormat
	if sessionFormat == "" {
		sessionFormat = "1-on-1"
	}

	topic := input.Topic
	if topic == "" {
		topic = input.Title
	}

	actualClientID := clientID
	notes := input.Notes
	if strings.TrimSpace(input.ClientNIP) != "" && client.Role.IsAdmin() {
		targetUser, errTarget := u.userRepo.FindByNIP(ctx, strings.TrimSpace(input.ClientNIP))
		if errTarget == nil && targetUser != nil {
			if client.Role != userdomain.RoleSuperAdmin && client.UnitKerja != "" && targetUser.UnitKerja != "" {
				if !strings.EqualFold(strings.TrimSpace(client.UnitKerja), strings.TrimSpace(targetUser.UnitKerja)) {
					return nil, sharederrors.ErrForbidden
				}
			}
			actualClientID = targetUser.ID
			assignNote := fmt.Sprintf("[Ditugaskan oleh Admin: %s]", client.FullName)
			if notes == "" {
				notes = assignNote
			} else {
				notes = assignNote + " " + notes
			}
		}
	}

	atasanNIP := strings.TrimSpace(input.AtasanNIP)
	atasanNama := strings.TrimSpace(input.AtasanNama)
	atasanJabatan := strings.TrimSpace(input.AtasanJabatan)

	if atasanNIP == "" && client.AtasanLangsungNIP != "" {
		atasanNIP = client.AtasanLangsungNIP
	}
	if atasanNama == "" && client.AtasanLangsungNama != "" {
		atasanNama = client.AtasanLangsungNama
	}
	if atasanJabatan == "" && client.AtasanLangsungJabatan != "" {
		atasanJabatan = client.AtasanLangsungJabatan
	}

	session := &sessiondomain.Session{
		ID:              uuid.New(),
		ClientID:        actualClientID,
		PractitionerID:  practitioner.ID,
		Type:            input.Type,
		Status:          sessiondomain.StatusPending,
		Title:           input.Title,
		Topic:           topic,
		Objective:       input.Objective,
		SessionFormat:   sessionFormat,
		Token:           generateToken(),
		CurrentJP:       0,
		TargetJP:        6,
		Notes:           notes,
		AtasanNIP:       atasanNIP,
		AtasanNama:      atasanNama,
		AtasanJabatan:   atasanJabatan,
		ScheduledAt:     scheduledAt,
		DurationMinutes: duration,
	}

	if err := u.sessionRepo.Create(ctx, session); err != nil {
		return nil, err
	}

	// 1. Populate child: session_peserta
	if len(input.Peserta) > 0 {
		for i, pInput := range input.Peserta {
			roleInSession := pInput.RoleInSession
			if roleInSession == "" {
				if i == 0 {
					roleInSession = "utama"
				} else {
					roleInSession = "anggota"
				}
			}
			var pUserID *uuid.UUID
			if uObj, errU := u.userRepo.FindByNIP(ctx, strings.TrimSpace(pInput.NIP)); errU == nil && uObj != nil {
				pUserID = &uObj.ID
			}
			peserta := &sessiondomain.SessionPeserta{
				ID:            uuid.New(),
				SessionID:     session.ID,
				UserID:        pUserID,
				NIP:           strings.TrimSpace(pInput.NIP),
				Nama:          strings.TrimSpace(pInput.Nama),
				Email:         pInput.Email,
				Jabatan:       pInput.Jabatan,
				UnitKerja:     pInput.UnitKerja,
				SatuanKerja:   pInput.SatuanKerja,
				RoleInSession: roleInSession,
				CurrentJP:     0,
				TargetJP:      6,
				Status:        "active",
			}
			if errAdd := u.sessionRepo.AddPeserta(ctx, peserta); errAdd != nil {
				slog.Error("Failed to add peserta to session", "error", errAdd, "session_id", session.ID, "nip", peserta.NIP)
			}
			session.PesertaList = append(session.PesertaList, *peserta)
		}
	} else {
		// Default single participant
		peserta := &sessiondomain.SessionPeserta{
			ID:            uuid.New(),
			SessionID:     session.ID,
			UserID:        &actualClientID,
			NIP:           client.NIP,
			Nama:          client.FullName,
			Email:         client.Email,
			Jabatan:       client.Jabatan,
			UnitKerja:     client.UnitKerja,
			RoleInSession: "utama",
			CurrentJP:     0,
			TargetJP:      6,
			Status:        "active",
		}
		if errAdd := u.sessionRepo.AddPeserta(ctx, peserta); errAdd != nil {
			slog.Error("Failed to add default peserta to session", "error", errAdd, "session_id", session.ID, "nip", peserta.NIP)
		}
		session.PesertaList = append(session.PesertaList, *peserta)
	}

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":        uuid.New(),
			"session_id":      session.ID,
			"client_id":       session.ClientID,
			"practitioner_id": session.PractitionerID,
			"type":            session.Type,
			"token":           session.Token,
			"scheduled_at":    session.ScheduledAt,
			"timestamp":       time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.booked", evt)
	}

	return session, nil
}

func (u *sessionUsecase) GetSession(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) (*sessiondomain.Session, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	if !role.IsAdmin() {
		currentUser, _ := u.userRepo.FindByID(ctx, currentUserID)
		userNIP := ""
		if currentUser != nil {
			userNIP = strings.TrimSpace(currentUser.NIP)
		}

		isAtasan := (userNIP != "" && session.AtasanNIP != "" && session.AtasanNIP == userNIP) ||
			(userNIP != "" && session.Client != nil && session.Client.AtasanLangsungNIP == userNIP)

		isPeserta := false
		for _, p := range session.PesertaList {
			if (p.UserID != nil && *p.UserID == currentUserID) || (userNIP != "" && p.NIP == userNIP) {
				isPeserta = true
				break
			}
		}

		if session.ClientID != currentUserID && session.PractitionerID != currentUserID && !isAtasan && !isPeserta {
			return nil, sharederrors.ErrForbidden
		}
	}

	return session, nil
}

func (u *sessionUsecase) ListUserSessions(ctx context.Context, currentUserID uuid.UUID, role userdomain.Role) ([]sessiondomain.Session, error) {
	if role == userdomain.RoleAdmin || role == userdomain.RoleSuperAdmin {
		return u.sessionRepo.FindAll(ctx)
	}

	currentUser, err := u.userRepo.FindByID(ctx, currentUserID)
	userNIP := ""
	if err == nil && currentUser != nil {
		userNIP = strings.TrimSpace(currentUser.NIP)
	}

	return u.sessionRepo.FindByInvolvement(ctx, currentUserID, userNIP)
}

func (u *sessionUsecase) UpdateStatus(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input sessiondomain.UpdateSessionStatusInput) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if !role.IsAdmin() {
		currentUser, _ := u.userRepo.FindByID(ctx, currentUserID)
		userNIP := ""
		if currentUser != nil {
			userNIP = strings.TrimSpace(currentUser.NIP)
		}

		sessionAtasanNIP := strings.TrimSpace(session.AtasanNIP)
		clientAtasanNIP := ""
		if session.Client != nil {
			clientAtasanNIP = strings.TrimSpace(session.Client.AtasanLangsungNIP)
		}

		isAtasan := (userNIP != "" && sessionAtasanNIP != "" && sessionAtasanNIP == userNIP) ||
			(userNIP != "" && clientAtasanNIP != "" && clientAtasanNIP == userNIP)

		if input.Status == sessiondomain.StatusConfirmed || input.Status == sessiondomain.StatusRejected {
			if !isAtasan {
				return sharederrors.ErrForbidden
			}
		} else {
			if session.ClientID != currentUserID && session.PractitionerID != currentUserID && !isAtasan {
				return sharederrors.ErrForbidden
			}
		}
	}

	if err := u.sessionRepo.UpdateStatus(ctx, sessionID, input.Status, input.Notes); err != nil {
		return err
	}

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":   uuid.New(),
			"session_id": sessionID,
			"status":     input.Status,
			"updated_by": currentUserID,
			"timestamp":  time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.status_updated", evt)
	}

	return nil
}

func (u *sessionUsecase) AddMeeting(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input sessiondomain.AddMeetingInput) (*sessiondomain.Meeting, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	if !role.IsAdmin() && session.ClientID != currentUserID && session.PractitionerID != currentUserID {
		userNIP := ""
		if currentUser, err := u.userRepo.FindByID(ctx, currentUserID); err == nil && currentUser != nil {
			userNIP = strings.TrimSpace(currentUser.NIP)
		}

		sessionAtasanNIP := strings.TrimSpace(session.AtasanNIP)
		clientAtasanNIP := ""
		if session.Client != nil {
			clientAtasanNIP = strings.TrimSpace(session.Client.AtasanLangsungNIP)
		}

		isAtasan := (userNIP != "" && sessionAtasanNIP != "" && sessionAtasanNIP == userNIP) ||
			(userNIP != "" && clientAtasanNIP != "" && clientAtasanNIP == userNIP)

		isPeserta := false
		for _, p := range session.PesertaList {
			if (p.UserID != nil && *p.UserID == currentUserID) || (userNIP != "" && p.NIP == userNIP) {
				isPeserta = true
				break
			}
		}

		if !isAtasan && !isPeserta {
			return nil, sharederrors.ErrForbidden
		}
	}

	// Aturan Resmi: Pertemuan baru dapat ditambahkan setelah sesi diverifikasi dan disetujui oleh atasan / pejabat penilai
	if session.Status != sessiondomain.StatusConfirmed && session.Status != sessiondomain.StatusCompleted {
		return nil, sharederrors.ErrSessionNotVerified
	}

	// Aturan Resmi: 1 pertemuan = 2 JP. Maks. 2 pertemuan per bulan per jenis kegiatan.
	targetDateStr := strings.TrimSpace(input.ScheduledDate)
	targetMonth := ""
	if len(targetDateStr) >= 7 && (targetDateStr[4] == '-' || targetDateStr[4] == '/') {
		targetMonth = targetDateStr[:7]
	} else {
		targetMonth = time.Now().Format("2006-01")
	}

	var countInMonth int
	for _, m := range session.Meetings {
		mDate := strings.TrimSpace(m.ScheduledDate)
		if len(mDate) >= 7 && mDate[:7] == targetMonth {
			countInMonth++
		}
	}
	for _, p := range session.PertemuanList {
		pDate := strings.TrimSpace(p.ScheduledDate)
		if len(pDate) >= 7 && pDate[:7] == targetMonth {
			alreadyCounted := false
			for _, m := range session.Meetings {
				if m.ID == p.ID {
					alreadyCounted = true
					break
				}
			}
			if !alreadyCounted {
				countInMonth++
			}
		}
	}

	if countInMonth >= 2 {
		return nil, fmt.Errorf("%w (sudah ada %d pertemuan di bulan %s)", sharederrors.ErrMaxMonthlyMeetingsExceeded, countInMonth, targetMonth)
	}

	meetingType := input.MeetingType
	switch strings.ToLower(meetingType) {
	case "online", "daring":
		meetingType = "Daring"
	case "offline", "luring":
		meetingType = "Luring"
	case "hybrid":
		meetingType = "Hybrid"
	default:
		meetingType = "Luring"
	}

	meetingNumber := input.MeetingNumber
	if meetingNumber <= 0 {
		maxNumber := 0
		for _, m := range session.Meetings {
			if m.MeetingNumber > maxNumber {
				maxNumber = m.MeetingNumber
			}
		}
		for _, p := range session.PertemuanList {
			if p.MeetingNumber > maxNumber {
				maxNumber = p.MeetingNumber
			}
		}
		meetingNumber = maxNumber + 1
	}

	status := "draft"
	lowerStatus := strings.ToLower(input.Status)
	if lowerStatus == "completed" || lowerStatus == "lengkap" {
		status = "completed"
	} else if lowerStatus == "pending" {
		status = "pending"
	}

	meeting := &sessiondomain.Meeting{
		ID:            uuid.New(),
		SessionID:     sessionID,
		MeetingNumber: meetingNumber,
		Title:         input.Title,
		ScheduledDate: input.ScheduledDate,
		MeetingType:   meetingType,
		Location:      input.Location,
		Summary:       input.Summary,
		JPCollected:   2, // 1 pertemuan = 2 JP
		Status:        status,
	}

	if err := u.sessionRepo.AddMeeting(ctx, meeting); err != nil {
		return nil, err
	}

	pertemuan := &sessiondomain.SessionPertemuan{
		ID:            meeting.ID,
		SessionID:     sessionID,
		MeetingNumber: meetingNumber,
		Title:         input.Title,
		ScheduledDate: input.ScheduledDate,
		MeetingType:   meetingType,
		Location:      input.Location,
		Status:        status,
	}
	_ = u.sessionRepo.AddPertemuan(ctx, pertemuan)

	return meeting, nil
}

func (u *sessionUsecase) UpdateMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role, input sessiondomain.UpdateMeetingInput) (*sessiondomain.Meeting, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	if !role.IsAdmin() && session.ClientID != currentUserID && session.PractitionerID != currentUserID {
		userNIP := ""
		if currentUser, err := u.userRepo.FindByID(ctx, currentUserID); err == nil && currentUser != nil {
			userNIP = strings.TrimSpace(currentUser.NIP)
		}

		sessionAtasanNIP := strings.TrimSpace(session.AtasanNIP)
		clientAtasanNIP := ""
		if session.Client != nil {
			clientAtasanNIP = strings.TrimSpace(session.Client.AtasanLangsungNIP)
		}

		isAtasan := (userNIP != "" && sessionAtasanNIP != "" && sessionAtasanNIP == userNIP) ||
			(userNIP != "" && clientAtasanNIP != "" && clientAtasanNIP == userNIP)

		if !isAtasan {
			return nil, sharederrors.ErrForbidden
		}
	}

	meeting, err := u.sessionRepo.FindMeetingByID(ctx, sessionID, meetingID)
	if err != nil {
		return nil, err
	}

	if input.Title != "" {
		meeting.Title = input.Title
	}
	if input.ScheduledDate != "" {
		meeting.ScheduledDate = input.ScheduledDate
	}
	if input.MeetingType != "" {
		meetingType := input.MeetingType
		switch strings.ToLower(meetingType) {
		case "online", "daring":
			meetingType = "Daring"
		case "offline", "luring":
			meetingType = "Luring"
		case "hybrid":
			meetingType = "Hybrid"
		default:
			meetingType = "Luring"
		}
		meeting.MeetingType = meetingType
	}
	if input.Location != "" {
		meeting.Location = input.Location
	}
	if input.Summary != "" {
		meeting.Summary = input.Summary
	}
	if input.JPCollected > 0 {
		meeting.JPCollected = input.JPCollected
	}
	if input.Status != "" {
		status := "draft"
		lowerStatus := strings.ToLower(input.Status)
		if lowerStatus == "completed" || lowerStatus == "lengkap" {
			status = "completed"
		} else if lowerStatus == "pending" {
			status = "pending"
		}
		meeting.Status = status
	}

	if err := u.sessionRepo.UpdateMeeting(ctx, meeting); err != nil {
		return nil, err
	}

	return meeting, nil
}

func (u *sessionUsecase) DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID, currentUserID uuid.UUID, role userdomain.Role) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if !role.IsAdmin() && session.ClientID != currentUserID && session.PractitionerID != currentUserID {
		userNIP := ""
		if currentUser, err := u.userRepo.FindByID(ctx, currentUserID); err == nil && currentUser != nil {
			userNIP = strings.TrimSpace(currentUser.NIP)
		}

		sessionAtasanNIP := strings.TrimSpace(session.AtasanNIP)
		clientAtasanNIP := ""
		if session.Client != nil {
			clientAtasanNIP = strings.TrimSpace(session.Client.AtasanLangsungNIP)
		}

		isAtasan := (userNIP != "" && sessionAtasanNIP != "" && sessionAtasanNIP == userNIP) ||
			(userNIP != "" && clientAtasanNIP != "" && clientAtasanNIP == userNIP)

		if !isAtasan {
			return sharederrors.ErrForbidden
		}
	}

	return u.sessionRepo.DeleteMeeting(ctx, sessionID, meetingID)
}

func (u *sessionUsecase) ListPeserta(ctx context.Context, sessionID uuid.UUID) ([]sessiondomain.SessionPeserta, error) {
	return u.sessionRepo.ListPeserta(ctx, sessionID)
}

func (u *sessionUsecase) AddPeserta(ctx context.Context, sessionID uuid.UUID, input sessiondomain.PesertaInput) (*sessiondomain.SessionPeserta, error) {
	var pUserID *uuid.UUID
	if uObj, errU := u.userRepo.FindByNIP(ctx, strings.TrimSpace(input.NIP)); errU == nil && uObj != nil {
		pUserID = &uObj.ID
	}
	role := input.RoleInSession
	if role == "" {
		role = "anggota"
	}
	peserta := &sessiondomain.SessionPeserta{
		ID:            uuid.New(),
		SessionID:     sessionID,
		UserID:        pUserID,
		NIP:           strings.TrimSpace(input.NIP),
		Nama:          strings.TrimSpace(input.Nama),
		Email:         input.Email,
		Jabatan:       input.Jabatan,
		UnitKerja:     input.UnitKerja,
		SatuanKerja:   input.SatuanKerja,
		RoleInSession: role,
		CurrentJP:     0,
		TargetJP:      6,
		Status:        "active",
	}
	if err := u.sessionRepo.AddPeserta(ctx, peserta); err != nil {
		return nil, err
	}
	return peserta, nil
}

func (u *sessionUsecase) ListPertemuan(ctx context.Context, sessionID uuid.UUID) ([]sessiondomain.SessionPertemuan, error) {
	return u.sessionRepo.ListPertemuan(ctx, sessionID)
}

func (u *sessionUsecase) SaveCatatanPertemuan(ctx context.Context, sessionID uuid.UUID, input sessiondomain.CatatPertemuanPesertaInput) (*sessiondomain.SessionPertemuanPesertaCatatan, error) {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	// Determine target pertemuan
	var targetPertemuan *sessiondomain.SessionPertemuan
	if input.SessionPertemuanID != uuid.Nil {
		targetPertemuan, _ = u.sessionRepo.FindPertemuanByID(ctx, sessionID, input.SessionPertemuanID)
	}
	if targetPertemuan == nil && input.PertemuanKe > 0 {
		for _, p := range session.PertemuanList {
			if p.MeetingNumber == input.PertemuanKe {
				targetPertemuan = &p
				break
			}
		}
	}

	if targetPertemuan == nil {
		if session.Status != sessiondomain.StatusConfirmed && session.Status != sessiondomain.StatusCompleted {
			return nil, sharederrors.ErrSessionNotVerified
		}

		targetDateStr := strings.TrimSpace(input.Tanggal)
		targetMonth := ""
		if len(targetDateStr) >= 7 && (targetDateStr[4] == '-' || targetDateStr[4] == '/') {
			targetMonth = targetDateStr[:7]
		} else {
			targetMonth = time.Now().Format("2006-01")
		}

		var countInMonth int
		for _, p := range session.PertemuanList {
			pDate := strings.TrimSpace(p.ScheduledDate)
			if len(pDate) >= 7 && pDate[:7] == targetMonth {
				countInMonth++
			}
		}
		if countInMonth >= 2 {
			return nil, fmt.Errorf("%w (sudah ada %d pertemuan di bulan %s)", sharederrors.ErrMaxMonthlyMeetingsExceeded, countInMonth, targetMonth)
		}

		mNum := input.PertemuanKe
		if mNum <= 0 {
			maxNumber := 0
			for _, p := range session.PertemuanList {
				if p.MeetingNumber > maxNumber {
					maxNumber = p.MeetingNumber
				}
			}
			mNum = maxNumber + 1
		}
		targetPertemuan = &sessiondomain.SessionPertemuan{
			ID:            uuid.New(),
			SessionID:     sessionID,
			MeetingNumber: mNum,
			Title:         input.Tujuan,
			ScheduledDate: fmt.Sprintf("%s %s", strings.TrimSpace(input.Tanggal), strings.TrimSpace(input.Waktu)),
			MeetingType:   input.Moda,
			Location:      input.Lokasi,
			Status:        "completed",
		}
		if targetPertemuan.Title == "" {
			targetPertemuan.Title = fmt.Sprintf("Pertemuan #%d", mNum)
		}
		if err := u.sessionRepo.AddPertemuan(ctx, targetPertemuan); err != nil {
			return nil, err
		}
	} else {
		if input.Tanggal != "" || input.Waktu != "" {
			targetPertemuan.ScheduledDate = fmt.Sprintf("%s %s", strings.TrimSpace(input.Tanggal), strings.TrimSpace(input.Waktu))
		}
		if input.Moda != "" {
			targetPertemuan.MeetingType = input.Moda
		}
		if input.Lokasi != "" {
			targetPertemuan.Location = input.Lokasi
		}
		if input.Tujuan != "" {
			targetPertemuan.Title = input.Tujuan
		}
		targetPertemuan.Status = "completed"
		_ = u.sessionRepo.UpdatePertemuan(ctx, targetPertemuan)
	}

	jp := input.JPCollected
	if jp <= 0 {
		jp = 2
	}
	status := input.Status
	if status == "" {
		status = "completed"
	}

	catatan := &sessiondomain.SessionPertemuanPesertaCatatan{
		ID:                    uuid.New(),
		SessionID:             sessionID,
		SessionPertemuanID:    targetPertemuan.ID,
		NIP:                   input.NIP,
		Nama:                  input.Nama,
		Tujuan:                input.Tujuan,
		IdentifikasiKebutuhan: input.IdentifikasiKebutuhan,
		AreaPengembangan:      input.AreaPengembangan,
		Pembahasan:            input.Pembahasan,
		KesepakatanSolusi:     input.KesepakatanSolusi,
		UmpanBalik:            input.UmpanBalik,
		RencanaTindakLanjut:   input.RencanaTindakLanjut,
		TargetWaktu:           input.TargetWaktu,
		ActionLearningFiles:   input.ActionLearningFiles,
		BuktiFotoFiles:        input.BuktiFotoFiles,
		JPCollected:           jp,
		Status:                status,
	}

	for _, p := range session.PesertaList {
		if strings.TrimSpace(p.NIP) == strings.TrimSpace(input.NIP) {
			catatan.SessionPesertaID = &p.ID
			break
		}
	}

	if err := u.sessionRepo.SaveCatatanPertemuan(ctx, catatan); err != nil {
		return nil, err
	}

	return catatan, nil
}

func (u *sessionUsecase) ListCatatanPertemuan(ctx context.Context, pertemuanID uuid.UUID) ([]sessiondomain.SessionPertemuanPesertaCatatan, error) {
	return u.sessionRepo.ListCatatanByPertemuan(ctx, pertemuanID)
}

func (u *sessionUsecase) ResendNotification(ctx context.Context, sessionID uuid.UUID, currentUserID uuid.UUID) error {
	session, err := u.sessionRepo.FindByID(ctx, sessionID)
	if err != nil {
		return err
	}

	if session.ClientID != currentUserID {
		return sharederrors.ErrForbidden
	}

	slog.Info("Notification reminder resent", "session_id", sessionID, "practitioner_id", session.PractitionerID)

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":        uuid.New(),
			"session_id":      sessionID,
			"practitioner_id": session.PractitionerID,
			"client_id":       currentUserID,
			"timestamp":       time.Now().UTC(),
		}
		_ = u.eventPublisher.PublishEvent(ctx, "session.reminder_sent", evt)
	}

	return nil
}
