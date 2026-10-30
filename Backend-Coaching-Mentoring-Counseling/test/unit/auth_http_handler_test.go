package unit_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"

	authdelivery "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/http"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	healthdelivery "github.com/kalanara/cmc-backend/internal/modules/health/delivery/http"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	sharederrors "github.com/kalanara/cmc-backend/internal/shared/domain"
	"github.com/kalanara/cmc-backend/pkg/validator"
	"github.com/kalanara/cmc-backend/test/mocks"
)

func TestHTTPHandler_Register_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/register", handler.Register)

	input := authdomain.RegisterInput{
		Email:    "test@example.com",
		Password: "Password123!",
		FullName: "Test User",
		Role:     userdomain.RoleClient,
	}

	mockUsecase.EXPECT().
		Register(gomock.Any(), input).
		Return(&authdomain.AuthResponse{
			User: &userdomain.UserResponse{
				Email: input.Email,
			},
		}, nil)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	require.Equal(t, http.StatusCreated, w.Code)
	assert.Contains(t, w.Body.String(), "User registered successfully")
}

func TestHTTPHandler_Register_ValidationFailed(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/register", handler.Register)

	// Invalid payload: password too short, invalid role
	input := authdomain.RegisterInput{
		Email:    "not-an-email",
		Password: "short",
		FullName: "",
		Role:     "invalid_role",
	}

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnprocessableEntity, w.Code)
	assert.Contains(t, w.Body.String(), "VALIDATION_FAILED")
}

func TestHTTPHandler_Login_InvalidCredentials(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/login", handler.Login)

	input := authdomain.LoginInput{
		Email:    "wrong@example.com",
		Password: "Password123!",
	}

	mockUsecase.EXPECT().
		Login(gomock.Any(), input).
		Return(nil, sharederrors.ErrInvalidCredentials)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
	assert.Contains(t, w.Body.String(), "INVALID_CREDENTIALS")
}

func TestHTTPHandler_Healthz(t *testing.T) {
	gin.SetMode(gin.TestMode)

	handler := healthdelivery.NewHealthHandler(nil, nil, nil, nil)
	router := gin.New()
	router.GET("/healthz", handler.Healthz)

	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "UP")
}

func TestHTTPHandler_LoginSSO_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/sso", handler.LoginSSO)

	reqBody := authdomain.SSOLoginRequest{
		Code:        "auth_code_12345",
		RedirectURI: "http://localhost:3000/sso/auth/callback",
	}

	mockUsecase.EXPECT().
		LoginSSO(gomock.Any(), reqBody).
		Return(&authdomain.AuthResponse{
			Tokens: &authdomain.TokenPair{
				AccessToken:  "jwt.access.sso",
				RefreshToken: "jwt.refresh.sso",
			},
			User: &userdomain.UserResponse{
				NIP:      "198904122014031002",
				FullName: "ASN Budi Santoso",
				Email:    "budi@dephub.go.id",
				Provider: "HUBNET",
			},
		}, nil)

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/sso", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "SSO Authentication successful")
	assert.Contains(t, w.Body.String(), "198904122014031002")
}

func TestHTTPHandler_LoginSSO_MissingCode(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/sso", handler.LoginSSO)

	reqBody := authdomain.SSOLoginRequest{
		Code: "",
	}

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/sso", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "SSO authorization code is required")
}

func TestHTTPHandler_GetSSOURL_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.GET("/api/v1/auth/sso/url", handler.GetSSOURL)

	expectedURL := "https://hubnet.kemenhub.go.id/sso/oauth/authorize?client_id=test-id&identifier=CMC"
	mockUsecase.EXPECT().GetSSOAuthURL().Return(expectedURL)

	req := httptest.NewRequest(http.MethodGet, "/api/v1/auth/sso/url", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var resp struct {
		Success bool `json:"success"`
		Data    struct {
			AuthURL string `json:"auth_url"`
		} `json:"data"`
	}
	err := json.Unmarshal(w.Body.Bytes(), &resp)
	require.NoError(t, err)
	assert.True(t, resp.Success)
	assert.Equal(t, expectedURL, resp.Data.AuthURL)
}

func TestHTTPHandler_LoginGoogle_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/google", handler.LoginGoogle)

	reqBody := authdomain.SSOLoginRequest{
		Code:        "google_auth_code_123",
		RedirectURI: "http://localhost:3000/sso/auth/callback",
	}

	mockUsecase.EXPECT().
		LoginGoogle(gomock.Any(), reqBody.Code, reqBody.RedirectURI).
		Return(&authdomain.AuthResponse{
			Tokens: &authdomain.TokenPair{
				AccessToken: "jwt.access.google",
			},
			User: &userdomain.UserResponse{
				Email:    "pegawai@dephub.go.id",
				FullName: "Pegawai Google",
				Provider: "GOOGLE",
			},
		}, nil)

	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/google", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Google Authentication successful")
	assert.Contains(t, w.Body.String(), "pegawai@dephub.go.id")
}

func TestHTTPHandler_Login_NIP_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockUsecase := mocks.NewMockAuthUsecase(ctrl)
	customValidator := validator.New()
	handler := authdelivery.NewAuthHandler(mockUsecase, customValidator)

	router := gin.New()
	router.POST("/api/v1/auth/login", handler.Login)

	input := authdomain.LoginInput{
		NIP:      "198904122014031002",
		Password: "Password123!",
	}

	mockUsecase.EXPECT().
		Login(gomock.Any(), input).
		Return(&authdomain.AuthResponse{
			Tokens: &authdomain.TokenPair{
				AccessToken: "jwt.token.nip",
			},
			User: &userdomain.UserResponse{
				NIP:      "198904122014031002",
				FullName: "Siti Wahyuni",
			},
		}, nil)

	body, _ := json.Marshal(input)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Login successful")
	assert.Contains(t, w.Body.String(), "198904122014031002")
}

