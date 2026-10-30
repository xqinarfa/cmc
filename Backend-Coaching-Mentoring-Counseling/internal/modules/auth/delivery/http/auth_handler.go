package http

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	"github.com/kalanara/cmc-backend/pkg/response"
	"github.com/kalanara/cmc-backend/pkg/validator"
)

type AuthHandler struct {
	authUsecase authdomain.AuthUsecase
	validator   *validator.CustomValidator
}

func NewAuthHandler(authUsecase authdomain.AuthUsecase, validator *validator.CustomValidator) *AuthHandler {
	return &AuthHandler{
		authUsecase: authUsecase,
		validator:   validator,
	}
}

// Register godoc
// @Summary      User Registration
// @Description  Register a new user account with role (coach, mentor, counselor, client)
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authdomain.RegisterInput true "Registration Payload"
// @Success      201  {object}  map[string]interface{} "User registered successfully"
// @Failure      400  {object}  map[string]interface{} "Invalid request payload"
// @Failure      422  {object}  map[string]interface{} "Validation failed"
// @Failure      409  {object}  map[string]interface{} "User already exists"
// @Router       /api/v1/auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var input authdomain.RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Validation failed for request fields", valErrors)
		return
	}

	res, err := h.authUsecase.Register(c.Request.Context(), input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusCreated, "User registered successfully", res)
}

// Login godoc
// @Summary      User Login (NIP / Email Credentials)
// @Description  Authenticate user using NIP or Email and Password, returns JWT access and refresh tokens
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authdomain.LoginInput true "Login Credentials"
// @Success      200  {object}  map[string]interface{} "Login successful"
// @Failure      400  {object}  map[string]interface{} "Invalid request payload"
// @Failure      401  {object}  map[string]interface{} "Invalid credentials"
// @Router       /api/v1/auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var input authdomain.LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if input.Email == "" && input.NIP == "" {
		response.Error(c, http.StatusBadRequest, "VALIDATION_FAILED", "NIP or Email is required", nil)
		return
	}

	res, err := h.authUsecase.Login(c.Request.Context(), input)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	token := res.Tokens.AccessToken
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Login successful",
		"token":   token,
		"tokens":  res.Tokens,
		"user":    res.User,
		"data": gin.H{
			"token":  token,
			"tokens": res.Tokens,
			"user":   res.User,
		},
	})
}

// LoginSSO godoc
// @Summary      SSO Login (Kemenhub HubNet)
// @Description  Exchange SSO authorization code for CMC JWT token pair. Auto-registers ASN pegawai if not found.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authdomain.SSOLoginRequest true "SSO Authorization Code"
// @Success      200  {object}  map[string]interface{} "SSO Authentication successful"
// @Failure      400  {object}  map[string]interface{} "Invalid request payload"
// @Failure      401  {object}  map[string]interface{} "SSO Authentication failed"
// @Router       /api/v1/auth/sso [post]
func (h *AuthHandler) LoginSSO(c *gin.Context) {
	var req authdomain.SSOLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if req.Code == "" {
		response.Error(c, http.StatusBadRequest, "VALIDATION_FAILED", "SSO authorization code is required", nil)
		return
	}

	res, err := h.authUsecase.LoginSSO(c.Request.Context(), req)
	if err != nil {
		response.Error(c, http.StatusUnauthorized, "SSO_FAILED", err.Error(), nil)
		return
	}

	token := res.Tokens.AccessToken
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "SSO Authentication successful",
		"token":   token,
		"tokens":  res.Tokens,
		"user":    res.User,
		"data": gin.H{
			"token":  token,
			"tokens": res.Tokens,
			"user":   res.User,
		},
	})
}

// LoginEduhub godoc
// @Summary      EduHub SSO Login
// @Description  Validates EduHub token from query param. Supports pre-decoded user JSON from ?user= param.
// @Description  Format callback aktual EduHub: /sso/auth/callback?token={JWT}&user={JSON}
// @Description  JWT payload: {exp, id, image, name, nip, role, sector}
// @Description  user JSON: {email, id, name, nip, role, image, sector}
// @Tags         auth
// @Accept       json,html
// @Produce      json,html
// @Param        token  query  string  true   "EduHub JWT token"
// @Param        user   query  string  false  "Pre-decoded user JSON from EduHub callback"
// @Success      307  {string} string "Redirect to frontend dashboard callback"
// @Success      200  {object} map[string]interface{} "EduHub authentication successful"
// @Failure      400  {object} map[string]interface{} "Token parameter is required"
// @Failure      401  {object} map[string]interface{} "Authentication failed"
// @Router       /api/v1/auth/sso [get]
func (h *AuthHandler) LoginEduhub(c *gin.Context) {
	token := c.Query("token")
	userJSON := c.Query("user")
	frontendURL := getFrontendURL(c)

	if token == "" {
		if strings.Contains(c.GetHeader("Accept"), "text/html") {
			c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/login?error=%s", frontendURL, url.QueryEscape("Token parameter is required")))
			return
		}
		response.Error(c, http.StatusBadRequest, "MISSING_TOKEN", "Token parameter is required", nil)
		return
	}

	// Parse pre-decoded user JSON jika ada (?user= dari callback EduHub)
	// Format: {"email":"...","id":"...","name":"...","nip":"...","role":"...","image":"...","sector":null}
	var preDecoded authdomain.EduhubUserInfo
	if userJSON != "" {
		decoded := userJSON
		// URL-decode jika masih encoded
		if unescaped, err := url.QueryUnescape(userJSON); err == nil {
			decoded = unescaped
		}
		_ = json.Unmarshal([]byte(decoded), &preDecoded)
	}

	var res *authdomain.AuthResponse
	var err error
	if preDecoded.NIP != "" {
		res, err = h.authUsecase.LoginEduhub(c.Request.Context(), token, preDecoded)
	} else {
		res, err = h.authUsecase.LoginEduhub(c.Request.Context(), token)
	}

	if err != nil {
		if strings.Contains(c.GetHeader("Accept"), "text/html") {
			c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/login?error=%s", frontendURL, url.QueryEscape(err.Error())))
			return
		}
		response.Error(c, http.StatusUnauthorized, "SSO_FAILED", err.Error(), nil)
		return
	}

	// Jika JSON API request (dari frontend fetch)
	if strings.Contains(c.GetHeader("Accept"), "application/json") && !strings.Contains(c.GetHeader("Accept"), "text/html") {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "EduHub SSO Authentication successful",
			"token":   res.Tokens.AccessToken,
			"tokens":  res.Tokens,
			"user":    res.User,
			"data": gin.H{
				"token":  res.Tokens.AccessToken,
				"tokens": res.Tokens,
				"user":   res.User,
			},
		})
		return
	}

	// Default: return JSON (untuk fetch dari callback page)
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "EduHub SSO Authentication successful",
		"token":   res.Tokens.AccessToken,
		"tokens":  res.Tokens,
		"user":    res.User,
		"data": gin.H{
			"token":  res.Tokens.AccessToken,
			"tokens": res.Tokens,
			"user":   res.User,
		},
	})
}

// RedirectGoogle godoc
// @Summary      Google OAuth Redirect
// @Description  Redirects user to Google OAuth 2.0 authorization screen
// @Tags         auth
// @Success      307  {string}  string "Redirect to Google authorization URL"
// @Router       /api/v1/auth/google [get]
func (h *AuthHandler) RedirectGoogle(c *gin.Context) {
	frontendURL := getFrontendURL(c)
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	if clientID == "" {
		clientID = "794501260849-l5br7jaticso08nk9kkmmqrs3ic57obh.apps.googleusercontent.com"
	}

	redirectURI := os.Getenv("GOOGLE_REDIRECT_URI")
	if redirectURI == "" {
		redirectURI = fmt.Sprintf("%s/sso/auth/callback", frontendURL)
	}

	googleAuthURL := fmt.Sprintf(
		"https://accounts.google.com/o/oauth2/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=offline&prompt=select_account",
		url.QueryEscape(clientID),
		url.QueryEscape(redirectURI),
		url.QueryEscape("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"),
	)

	c.Redirect(http.StatusTemporaryRedirect, googleAuthURL)
}

// GoogleCallback godoc
// @Summary      Google OAuth Callback via Backend
// @Description  Receives Google OAuth code via GET redirect, exchanges it for token, and redirects to frontend callback
// @Tags         auth
// @Success      307  {string}  string "Redirect to frontend dashboard"
// @Router       /api/v1/auth/google/callback [get]
func (h *AuthHandler) GoogleCallback(c *gin.Context) {
	code := c.Query("code")
	frontendURL := getFrontendURL(c)

	if code == "" {
		errParam := c.DefaultQuery("error", "Kode otorisasi Google tidak ditemukan")
		c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/login?error=%s", frontendURL, url.QueryEscape(errParam)))
		return
	}

	redirectURI := os.Getenv("GOOGLE_REDIRECT_URI")
	if redirectURI == "" {
		scheme := "https"
		if c.Request.TLS == nil && c.GetHeader("X-Forwarded-Proto") != "https" && (c.Request.Host == "localhost" || strings.HasPrefix(c.Request.Host, "127.0.0.1")) {
			scheme = "http"
		}
		redirectURI = fmt.Sprintf("%s://%s%s", scheme, c.Request.Host, c.Request.URL.Path)
	}

	res, err := h.authUsecase.LoginGoogle(c.Request.Context(), code, redirectURI)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/login?error=%s", frontendURL, url.QueryEscape(err.Error())))
		return
	}

	userJSON, _ := json.Marshal(res.User)
	redirectTarget := fmt.Sprintf("%s/sso/auth/callback?token=%s&user=%s",
		frontendURL,
		url.QueryEscape(res.Tokens.AccessToken),
		url.QueryEscape(string(userJSON)),
	)

	c.SetCookie("auth_token", res.Tokens.AccessToken, 86400, "/", "", false, false)
	c.Redirect(http.StatusTemporaryRedirect, redirectTarget)
}

// LoginGoogle godoc
// @Summary      Google SSO Login
// @Description  Exchange Google authorization code for a CMC JWT token pair
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authdomain.SSOLoginRequest true "Google Authorization Code"
// @Success      200  {object}  map[string]interface{} "Google Authentication successful"
// @Failure      400  {object}  map[string]interface{} "Invalid request payload"
// @Failure      401  {object}  map[string]interface{} "Authentication failed"
// @Router       /api/v1/auth/google [post]
func (h *AuthHandler) LoginGoogle(c *gin.Context) {
	var req authdomain.SSOLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if req.Code == "" {
		response.Error(c, http.StatusBadRequest, "VALIDATION_FAILED", "Google authorization code is required", nil)
		return
	}

	res, err := h.authUsecase.LoginGoogle(c.Request.Context(), req.Code, req.RedirectURI)
	if err != nil {
		response.Error(c, http.StatusUnauthorized, "GOOGLE_AUTH_FAILED", err.Error(), nil)
		return
	}

	token := res.Tokens.AccessToken
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Google Authentication successful",
		"token":   token,
		"tokens":  res.Tokens,
		"user":    res.User,
		"data": gin.H{
			"token":  token,
			"tokens": res.Tokens,
			"user":   res.User,
		},
	})
}

// GetSSOURL godoc
// @Summary      Get SSO Kemenhub Authorization URL
// @Description  Returns official HubNet Kemenhub OAuth 2.0 authorization URL for client redirection
// @Tags         auth
// @Produce      json
// @Success      200  {object}  map[string]interface{} "Authorization URL retrieved"
// @Router       /api/v1/auth/sso/url [get]
func (h *AuthHandler) GetSSOURL(c *gin.Context) {
	authURL := h.authUsecase.GetSSOAuthURL()

	if c.Query("redirect") == "true" {
		c.Redirect(http.StatusTemporaryRedirect, authURL)
		return
	}

	response.JSON(c, http.StatusOK, "SSO Authorization URL retrieved successfully", gin.H{
		"auth_url": authURL,
	})
}

// RefreshToken godoc
// @Summary      Refresh Access Token
// @Description  Exchange a valid refresh token for a new access token
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body authdomain.RefreshTokenInput true "Refresh Token Payload"
// @Success      200  {object}  map[string]interface{} "Token refreshed successfully"
// @Failure      400  {object}  map[string]interface{} "Invalid request payload"
// @Failure      401  {object}  map[string]interface{} "Invalid or expired token"
// @Router       /api/v1/auth/refresh [post]
func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var input authdomain.RefreshTokenInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.Error(c, http.StatusBadRequest, "INVALID_BODY", "Invalid JSON payload provided", nil)
		return
	}

	if valErrors := h.validator.ValidateStruct(input); len(valErrors) > 0 {
		response.Error(c, http.StatusUnprocessableEntity, "VALIDATION_FAILED", "Refresh token is required", valErrors)
		return
	}

	tokens, err := h.authUsecase.RefreshToken(c.Request.Context(), input.RefreshToken)
	if err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Token refreshed successfully", tokens)
}

// Logout godoc
// @Summary      Logout User
// @Description  Invalidate and blacklist the current JWT access token in Redis
// @Tags         auth
// @Produce      json
// @Security     BearerAuth
// @Success      200  {object}  map[string]interface{} "Successfully logged out"
// @Failure      401  {object}  map[string]interface{} "Unauthorized"
// @Router       /api/v1/auth/logout [post]
func (h *AuthHandler) Logout(c *gin.Context) {
	claimsVal, exists := c.Get("JWTClaims")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Missing authorization context", nil)
		return
	}

	claims, ok := claimsVal.(*authdomain.JWTClaims)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "UNAUTHORIZED", "Invalid authorization claims", nil)
		return
	}

	if err := h.authUsecase.Logout(c.Request.Context(), claims); err != nil {
		response.HandleDomainError(c, err)
		return
	}

	response.JSON(c, http.StatusOK, "Successfully logged out", nil)
}

func getFrontendURL(c *gin.Context) string {
	if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
		return strings.TrimRight(frontendURL, "/")
	}

	host := c.Request.Host
	if forwardedHost := c.GetHeader("X-Forwarded-Host"); forwardedHost != "" {
		host = strings.TrimSpace(strings.Split(forwardedHost, ",")[0])
	}

	hostName := host
	if strings.Contains(host, ":") {
		hostName = strings.Split(host, ":")[0]
	}

	scheme := "http"
	if c.Request.TLS != nil || c.GetHeader("X-Forwarded-Proto") == "https" {
		scheme = "https"
	}

	if hostName == "localhost" || hostName == "127.0.0.1" {
		return scheme + "://" + hostName + ":3000"
	}

	// Domain resmi BPSDM Kemenhub atau internal cluster k8s pod
	if strings.Contains(hostName, "bpsdm.kemenhub.go.id") ||
		strings.Contains(hostName, "cmc-") ||
		strings.Contains(hostName, "cluster.local") {
		return "https://bpsdm.kemenhub.go.id/cmc"
	}

	return scheme + "://" + host
}
