package usecase

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kalanara/cmc-backend/internal/config"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
)

type authUsecase struct {
	userRepo       userdomain.UserRepository
	blacklistRepo  authdomain.TokenBlacklistRepository
	passwordHasher authdomain.PasswordHasher
	jwtService     authdomain.JWTService
	eventPublisher authdomain.EventPublisher
	ssoCfg         config.SSOConfig
	httpClient     *http.Client
}

func NewAuthUsecase(
	userRepo userdomain.UserRepository,
	blacklistRepo authdomain.TokenBlacklistRepository,
	passwordHasher authdomain.PasswordHasher,
	jwtService authdomain.JWTService,
	eventPublisher authdomain.EventPublisher,
	ssoCfg config.SSOConfig,
) authdomain.AuthUsecase {
	return &authUsecase{
		userRepo:       userRepo,
		blacklistRepo:  blacklistRepo,
		passwordHasher: passwordHasher,
		jwtService:     jwtService,
		eventPublisher: eventPublisher,
		ssoCfg:         ssoCfg,
		httpClient:     &http.Client{Timeout: 10 * time.Second},
	}
}

func (u *authUsecase) Register(ctx context.Context, input authdomain.RegisterInput) (*authdomain.AuthResponse, error) {
	existing, err := u.userRepo.FindByEmail(ctx, input.Email)
	if err == nil && existing != nil {
		return nil, sharederrors.ErrUserAlreadyExists
	}

	hashedPassword, err := u.passwordHasher.HashPassword(input.Password)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	user := &userdomain.User{
		ID:           uuid.New(),
		Email:        input.Email,
		PasswordHash: hashedPassword,
		FullName:     input.FullName,
		Role:         input.Role,
		Phone:        input.Phone,
		IsActive:     true,
	}

	if err := u.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	if u.eventPublisher != nil {
		evt := map[string]interface{}{
			"event_id":  uuid.New(),
			"user_id":   user.ID,
			"email":     user.Email,
			"full_name": user.FullName,
			"role":      user.Role,
			"timestamp": time.Now().UTC(),
		}
		if err := u.eventPublisher.PublishEvent(ctx, "user.registered", evt); err != nil {
			slog.Warn("Failed to publish user.registered event to NATS", "user_id", user.ID, "error", err)
		}
	}

	tokens, err := u.jwtService.GenerateTokenPair(user)
	if err != nil {
		return nil, err
	}

	return &authdomain.AuthResponse{
		Tokens: tokens,
		User:   user.ToResponse(),
	}, nil
}

func (u *authUsecase) Login(ctx context.Context, input authdomain.LoginInput) (*authdomain.AuthResponse, error) {
	var user *userdomain.User
	var err error

	identifier := strings.TrimSpace(input.NIP)
	if identifier == "" {
		identifier = strings.TrimSpace(input.Email)
	}

	if identifier == "" {
		return nil, sharederrors.ErrInvalidCredentials
	}

	if !strings.Contains(identifier, "@") {
		user, err = u.userRepo.FindByNIP(ctx, identifier)
		if err != nil && input.Email != "" {
			user, err = u.userRepo.FindByEmail(ctx, input.Email)
		}
	} else {
		user, err = u.userRepo.FindByEmail(ctx, identifier)
		if err != nil && input.NIP != "" {
			user, err = u.userRepo.FindByNIP(ctx, input.NIP)
		}
	}

	if err != nil {
		if errors.Is(err, sharederrors.ErrUserNotFound) {
			return nil, sharederrors.ErrInvalidCredentials
		}
		return nil, err
	}

	if !user.IsActive {
		return nil, sharederrors.ErrForbidden
	}

	if !u.passwordHasher.CheckPassword(input.Password, user.PasswordHash) {
		return nil, sharederrors.ErrInvalidCredentials
	}

	tokens, err := u.jwtService.GenerateTokenPair(user)
	if err != nil {
		return nil, err
	}

	return &authdomain.AuthResponse{
		Tokens: tokens,
		User:   user.ToResponse(),
	}, nil
}

func (u *authUsecase) RefreshToken(ctx context.Context, refreshToken string) (*authdomain.TokenPair, error) {
	claims, err := u.jwtService.ValidateToken(refreshToken)
	if err != nil {
		return nil, err
	}

	if u.blacklistRepo != nil && claims.ID != "" {
		isBlacklisted, err := u.blacklistRepo.IsTokenBlacklisted(ctx, claims.ID)
		if err == nil && isBlacklisted {
			return nil, sharederrors.ErrTokenRevoked
		}
	}

	user, err := u.userRepo.FindByID(ctx, claims.UserID)
	if err != nil {
		return nil, err
	}

	if !user.IsActive {
		return nil, sharederrors.ErrForbidden
	}

	if u.blacklistRepo != nil && claims.ID != "" {
		remainingTTL := time.Until(claims.ExpiresAt.Time)
		if remainingTTL > 0 {
			_ = u.blacklistRepo.BlacklistToken(ctx, claims.ID, remainingTTL)
		}
	}

	return u.jwtService.GenerateTokenPair(user)
}

func (u *authUsecase) Logout(ctx context.Context, claims *authdomain.JWTClaims) error {
	if claims == nil || claims.ID == "" || u.blacklistRepo == nil {
		return nil
	}

	ttl := time.Until(claims.ExpiresAt.Time)
	if ttl <= 0 {
		ttl = 15 * time.Minute
	}

	return u.blacklistRepo.BlacklistToken(ctx, claims.ID, ttl)
}

func (u *authUsecase) GetSSOAuthURL() string {
	redirectURI := u.ssoCfg.KemenhubRedirect
	if redirectURI == "" {
		redirectURI = fmt.Sprintf("%s/sso/auth/callback", u.ssoCfg.FrontendURL)
	}

	return fmt.Sprintf(
		"%s?client_id=%s&redirect_uri=%s&response_type=code&scope=&login_api=null&identifier=%s",
		u.ssoCfg.KemenhubAuthURL,
		url.QueryEscape(u.ssoCfg.KemenhubAppID),
		url.QueryEscape(redirectURI),
		url.QueryEscape(u.ssoCfg.SSOIdentifier),
	)
}

func (u *authUsecase) LoginSSO(ctx context.Context, req authdomain.SSOLoginRequest) (*authdomain.AuthResponse, error) {
	if !u.ssoCfg.EnableSSO {
		return nil, errors.New("SSO Kemenhub feature is currently disabled")
	}

	redirectURI := req.RedirectURI
	if redirectURI == "" {
		redirectURI = u.ssoCfg.KemenhubRedirect
	}

	// 1. Exchange OAuth Authorization Code for Access Token
	data := url.Values{}
	data.Set("grant_type", "authorization_code")
	data.Set("client_id", u.ssoCfg.KemenhubAppID)
	data.Set("client_secret", u.ssoCfg.KemenhubAppSecret)
	data.Set("redirect_uri", redirectURI)
	data.Set("code", req.Code)

	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, u.ssoCfg.KemenhubTokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return nil, fmt.Errorf("failed to create SSO token request: %w", err)
	}
	httpReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := u.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to contact SSO token server: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		errBody, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("SSO returned status %d: %s", resp.StatusCode, string(errBody))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read SSO token response: %w", err)
	}

	var tokenData map[string]interface{}
	if err := json.Unmarshal(body, &tokenData); err != nil {
		return nil, fmt.Errorf("failed to parse SSO token response: %w", err)
	}

	accessToken, ok := tokenData["access_token"].(string)
	if !ok || accessToken == "" {
		return nil, errors.New("access_token not found in SSO response")
	}

	// 2. Fetch User Profile from SSO User API
	userURL := fmt.Sprintf("%s?uid=%s", u.ssoCfg.KemenhubUserURL, u.ssoCfg.KemenhubAppID)
	reqInfo, err := http.NewRequestWithContext(ctx, http.MethodGet, userURL, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create SSO userinfo request: %w", err)
	}
	reqInfo.Header.Set("Authorization", "Bearer "+accessToken)

	respInfo, err := u.httpClient.Do(reqInfo)
	if err != nil || respInfo.StatusCode != http.StatusOK {
		return nil, errors.New("failed to fetch user info from SSO")
	}
	defer respInfo.Body.Close()

	infoBody, err := io.ReadAll(respInfo.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read SSO userinfo body: %w", err)
	}

	var userInfo struct {
		DataUser struct {
			NIP     string `json:"nip"`
			Name    string `json:"name"`
			Email   string `json:"email"`
			Foto    string `json:"foto"`
			Photo   string `json:"photo"`
			Picture string `json:"picture"`
			Avatar  string `json:"avatar"`
			Image   string `json:"image"`
			UrlFoto string `json:"url_foto"`
		} `json:"data_user"`
		Foto    string `json:"foto"`
		Photo   string `json:"photo"`
		Picture string `json:"picture"`
		Avatar  string `json:"avatar"`
		Image   string `json:"image"`
		UrlFoto string `json:"url_foto"`
	}
	if err := json.Unmarshal(infoBody, &userInfo); err != nil {
		return nil, fmt.Errorf("failed to parse SSO user info: %w", err)
	}

	nip := strings.TrimSpace(userInfo.DataUser.NIP)
	name := strings.TrimSpace(userInfo.DataUser.Name)
	email := strings.TrimSpace(userInfo.DataUser.Email)

	if nip == "" {
		return nil, errors.New("SSO did not return NIP")
	}
	if email == "" {
		email = fmt.Sprintf("%s@dephub.go.id", nip)
	}
	if name == "" {
		name = fmt.Sprintf("ASN Kemenhub (%s)", nip)
	}

	photo := userInfo.DataUser.Foto
	if photo == "" { photo = userInfo.DataUser.Photo }
	if photo == "" { photo = userInfo.DataUser.Picture }
	if photo == "" { photo = userInfo.DataUser.Avatar }
	if photo == "" { photo = userInfo.DataUser.Image }
	if photo == "" { photo = userInfo.DataUser.UrlFoto }
	if photo == "" { photo = userInfo.Foto }
	if photo == "" { photo = userInfo.Photo }
	if photo == "" { photo = userInfo.Picture }
	if photo == "" { photo = userInfo.Avatar }
	if photo == "" { photo = userInfo.Image }
	if photo == "" { photo = userInfo.UrlFoto }

	// 3. Find or Auto-register / Update User in Database
	user, err := u.userRepo.FindByNIP(ctx, nip)
	if err != nil && email != "" {
		user, err = u.userRepo.FindByEmail(ctx, email)
	}

	if err != nil || user == nil {
		// Auto-register new ASN user from SSO
		randomPwd, _ := u.passwordHasher.HashPassword(uuid.NewString())
		user = &userdomain.User{
			ID:           uuid.New(),
			NIP:          nip,
			Email:        email,
			FullName:     name,
			PasswordHash: randomPwd,
			Role:         userdomain.RoleClient,
			AvatarURL:    photo,
			Provider:     "HUBNET",
			IsActive:     true,
		}
		if errCreate := u.userRepo.Create(ctx, user); errCreate != nil {
			return nil, fmt.Errorf("failed to auto-register SSO user: %w", errCreate)
		}

		if u.eventPublisher != nil {
			evt := map[string]interface{}{
				"event_id":  uuid.New(),
				"user_id":   user.ID,
				"nip":       user.NIP,
				"email":     user.Email,
				"full_name": user.FullName,
				"role":      user.Role,
				"provider":  user.Provider,
				"timestamp": time.Now().UTC(),
			}
			_ = u.eventPublisher.PublishEvent(ctx, "user.sso_registered", evt)
		}
	} else {
		// Update existing user with updated SSO data
		updated := false
		if user.NIP == "" {
			user.NIP = nip
			updated = true
		}
		if name != "" && user.FullName != name {
			user.FullName = name
			updated = true
		}
		if photo != "" && user.AvatarURL != photo {
			user.AvatarURL = photo
			updated = true
		}
		if user.Provider == "" || user.Provider == "LOCAL" {
			user.Provider = "HUBNET"
			updated = true
		}
		if updated {
			_ = u.userRepo.Update(ctx, user)
		}
	}

	if !user.IsActive {
		return nil, sharederrors.ErrForbidden
	}

	tokens, err := u.jwtService.GenerateTokenPair(user)
	if err != nil {
		return nil, err
	}

	return &authdomain.AuthResponse{
		Tokens: tokens,
		User:   user.ToResponse(),
	}, nil
}

func (u *authUsecase) LoginEduhub(ctx context.Context, token string, preDecodedUser ...authdomain.EduhubUserInfo) (*authdomain.AuthResponse, error) {
	if token == "" {
		return nil, errors.New("token parameter is required")
	}

	var nip, email, name, photo string

	// Strategi 1: Gunakan data user yang sudah di-decode dari query param ?user=
	// (format aktual callback EduHub: /sso/auth/callback?token=JWT&user=JSON)
	if len(preDecodedUser) > 0 && preDecodedUser[0].NIP != "" {
		u := preDecodedUser[0]
		nip = strings.TrimSpace(u.NIP)
		email = strings.TrimSpace(u.Email)
		name = strings.TrimSpace(u.Name)
		photo = strings.TrimSpace(u.Image)
		slog.Info("LoginEduhub: using pre-decoded user from ?user= param", "nip", nip, "email", email)
	}

	// Strategi 2: Decode payload JWT EduHub (tanpa verifikasi signature)
	// JWT dari EduHub berisi: {exp, id, image, name, nip, role, sector}
	if nip == "" {
		jwtNIP, jwtName, jwtImage := decodeEduhubJWTPayload(token)
		if jwtNIP != "" {
			nip = jwtNIP
			if name == "" {
				name = jwtName
			}
			if photo == "" {
				photo = jwtImage
			}
			slog.Info("LoginEduhub: decoded NIP from JWT payload", "nip", nip)
		}
	}

	// Strategi 3: Panggil EduHub verify API (fallback jika JWT tidak bisa didecode)
	if nip == "" {
		verifyURL := u.ssoCfg.EduhubVerifyURL
		if verifyURL == "" {
			verifyURL = "https://bpsdm.kemenhub.go.id/api/portal/auth/sso"
		}

		reqBody, err := json.Marshal(map[string]string{"token": token})
		if err != nil {
			return nil, fmt.Errorf("failed to marshal EduHub verify request: %w", err)
		}

		verifyReq, err := http.NewRequestWithContext(ctx, http.MethodPost, verifyURL, strings.NewReader(string(reqBody)))
		if err != nil {
			return nil, fmt.Errorf("failed to create EduHub verify request: %w", err)
		}
		verifyReq.Header.Set("Content-Type", "application/json")

		verifyResp, err := u.httpClient.Do(verifyReq)
		if err != nil {
			return nil, fmt.Errorf("failed to contact EduHub SSO server: %w", err)
		}
		defer verifyResp.Body.Close()

		respBody, err := io.ReadAll(verifyResp.Body)
		if err != nil {
			return nil, fmt.Errorf("failed to read EduHub verify response: %w", err)
		}

		if verifyResp.StatusCode == http.StatusOK {
			// Format respons EduHub (Panduan hal.5):
			// {"success": true, "user": {"email": "...", "username": "NIP"}}
			var eduhubResp struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
				User    struct {
					Email    string `json:"email"`
					Username string `json:"username"` // NIP
					Name     string `json:"name"`
					Image    string `json:"image"`
				} `json:"user"`
			}
			if err := json.Unmarshal(respBody, &eduhubResp); err == nil && eduhubResp.Success {
				nip = strings.TrimSpace(eduhubResp.User.Username)
				if email == "" {
					email = strings.TrimSpace(eduhubResp.User.Email)
				}
				if name == "" {
					name = strings.TrimSpace(eduhubResp.User.Name)
				}
				if photo == "" {
					photo = eduhubResp.User.Image
				}
				slog.Info("LoginEduhub: verified via EduHub API", "nip", nip)
			}
		}
	}

	if nip == "" {
		return nil, errors.New("tidak dapat memperoleh NIP dari token EduHub")
	}
	if email == "" {
		email = fmt.Sprintf("%s@kemenhub.go.id", nip)
	}
	if name == "" {
		name = fmt.Sprintf("ASN Kemenhub (%s)", nip)
	}

	// Cari atau auto-register user di database CMC
	user, err := u.userRepo.FindByNIP(ctx, nip)
	if err != nil && email != "" {
		user, err = u.userRepo.FindByEmail(ctx, email)
	}

	if err != nil || user == nil {
		// Auto-register ASN pegawai baru dari EduHub SSO
		randomPwd, _ := u.passwordHasher.HashPassword(uuid.NewString())
		user = &userdomain.User{
			ID:           uuid.New(),
			NIP:          nip,
			Email:        email,
			FullName:     name,
			PasswordHash: randomPwd,
			Role:         userdomain.RoleClient,
			AvatarURL:    photo,
			Provider:     "EDUHUB",
			IsActive:     true,
		}
		if errCreate := u.userRepo.Create(ctx, user); errCreate != nil {
			return nil, fmt.Errorf("gagal mendaftarkan user EduHub: %w", errCreate)
		}

		if u.eventPublisher != nil {
			evt := map[string]interface{}{
				"event_id":  uuid.New(),
				"user_id":   user.ID,
				"nip":       user.NIP,
				"email":     user.Email,
				"full_name": user.FullName,
				"role":      user.Role,
				"provider":  user.Provider,
				"timestamp": time.Now().UTC(),
			}
			_ = u.eventPublisher.PublishEvent(ctx, "user.eduhub_registered", evt)
		}
	} else {
		// Update data yang sudah ada jika ada perubahan
		updated := false
		if user.NIP == "" {
			user.NIP = nip
			updated = true
		}
		if name != "" && user.FullName != name {
			user.FullName = name
			updated = true
		}
		if photo != "" && user.AvatarURL != photo {
			user.AvatarURL = photo
			updated = true
		}
		if user.Provider == "" || user.Provider == "LOCAL" {
			user.Provider = "EDUHUB"
			updated = true
		}
		if email != "" && user.Email != email {
			user.Email = email
			updated = true
		}
		if updated {
			_ = u.userRepo.Update(ctx, user)
		}
	}

	if !user.IsActive {
		return nil, sharederrors.ErrForbidden
	}

	// Generate CMC JWT token pair (bukan token EduHub)
	tokens, err := u.jwtService.GenerateTokenPair(user)
	if err != nil {
		return nil, err
	}

	return &authdomain.AuthResponse{
		Tokens: tokens,
		User:   user.ToResponse(),
	}, nil
}

// decodeEduhubJWTPayload decodes the payload of an EduHub JWT without signature verification.
// EduHub JWT payload format: {exp, id, image, name, nip, role, sector}
func decodeEduhubJWTPayload(tokenStr string) (nip, name, image string) {
	parts := strings.Split(tokenStr, ".")
	if len(parts) != 3 {
		return
	}

	// Decode base64url payload (no signature verification)
	payload := parts[1]
	decoded, err := base64.RawURLEncoding.DecodeString(payload)
	if err != nil {
		return
	}

	var claims struct {
		NIP   string `json:"nip"`
		Name  string `json:"name"`
		Image string `json:"image"`
	}
	if err := json.Unmarshal(decoded, &claims); err != nil {
		return
	}

	return strings.TrimSpace(claims.NIP), strings.TrimSpace(claims.Name), strings.TrimSpace(claims.Image)
}

func (u *authUsecase) LoginGoogle(ctx context.Context, code string, redirectURI ...string) (*authdomain.AuthResponse, error) {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	if clientID == "" {
		clientID = "794501260849-l5br7jaticso08nk9kkmmqrs3ic57obh.apps.googleusercontent.com"
	}
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	redirect := os.Getenv("GOOGLE_REDIRECT_URI")
	if len(redirectURI) > 0 && redirectURI[0] != "" {
		redirect = redirectURI[0]
	}
	if redirect == "" {
		redirect = fmt.Sprintf("%s/sso/auth/callback", u.ssoCfg.FrontendURL)
	}

	// 1. Exchange OAuth Authorization Code for Access Token
	data := url.Values{}
	data.Set("grant_type", "authorization_code")
	data.Set("client_id", clientID)
	data.Set("client_secret", clientSecret)
	data.Set("redirect_uri", redirect)
	data.Set("code", code)

	tokenReq, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://oauth2.googleapis.com/token", strings.NewReader(data.Encode()))
	if err != nil {
		return nil, fmt.Errorf("failed to create Google token request: %w", err)
	}
	tokenReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := u.httpClient.Do(tokenReq)
	if err != nil {
		return nil, fmt.Errorf("failed to contact Google token server: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		errBody, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("Google token server returned status %d: %s", resp.StatusCode, string(errBody))
	}

	var tokenData struct {
		AccessToken string `json:"access_token"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&tokenData); err != nil {
		return nil, fmt.Errorf("failed to parse Google token response: %w", err)
	}

	if tokenData.AccessToken == "" {
		return nil, errors.New("access_token not found in Google response")
	}

	// 2. Fetch User Profile from Google UserInfo API
	userInfoReq, err := http.NewRequestWithContext(ctx, http.MethodGet, "https://www.googleapis.com/oauth2/v2/userinfo", nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create Google userinfo request: %w", err)
	}
	userInfoReq.Header.Set("Authorization", "Bearer "+tokenData.AccessToken)

	respInfo, err := u.httpClient.Do(userInfoReq)
	if err != nil || respInfo.StatusCode != http.StatusOK {
		return nil, errors.New("failed to fetch user info from Google")
	}
	defer respInfo.Body.Close()

	var googleUser struct {
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}
	if err := json.NewDecoder(respInfo.Body).Decode(&googleUser); err != nil {
		return nil, fmt.Errorf("failed to parse Google user info: %w", err)
	}

	if googleUser.Email == "" {
		return nil, errors.New("Google did not return an email address")
	}

	// 3. Find or Auto-register / Update User in Database
	user, err := u.userRepo.FindByEmail(ctx, googleUser.Email)
	if err != nil || user == nil {
		randomPwd, _ := u.passwordHasher.HashPassword(uuid.NewString())
		name := strings.TrimSpace(googleUser.Name)
		if name == "" {
			name = googleUser.Email
		}
		user = &userdomain.User{
			ID:           uuid.New(),
			Email:        googleUser.Email,
			FullName:     name,
			PasswordHash: randomPwd,
			Role:         userdomain.RoleClient,
			AvatarURL:    googleUser.Picture,
			Provider:     "GOOGLE",
			IsActive:     true,
		}
		if errCreate := u.userRepo.Create(ctx, user); errCreate != nil {
			return nil, fmt.Errorf("failed to auto-register Google user: %w", errCreate)
		}

		if u.eventPublisher != nil {
			evt := map[string]interface{}{
				"event_id":  uuid.New(),
				"user_id":   user.ID,
				"email":     user.Email,
				"full_name": user.FullName,
				"role":      user.Role,
				"provider":  user.Provider,
				"timestamp": time.Now().UTC(),
			}
			_ = u.eventPublisher.PublishEvent(ctx, "user.google_registered", evt)
		}
	} else {
		updated := false
		if googleUser.Name != "" && user.FullName != googleUser.Name {
			user.FullName = googleUser.Name
			updated = true
		}
		if googleUser.Picture != "" && user.AvatarURL != googleUser.Picture {
			user.AvatarURL = googleUser.Picture
			updated = true
		}
		if user.Provider == "" || user.Provider == "LOCAL" {
			user.Provider = "GOOGLE"
			updated = true
		}
		if updated {
			_ = u.userRepo.Update(ctx, user)
		}
	}

	if !user.IsActive {
		return nil, sharederrors.ErrForbidden
	}

	tokens, err := u.jwtService.GenerateTokenPair(user)
	if err != nil {
		return nil, err
	}

	return &authdomain.AuthResponse{
		Tokens: tokens,
		User:   user.ToResponse(),
	}, nil
}
