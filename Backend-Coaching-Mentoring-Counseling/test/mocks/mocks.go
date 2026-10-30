package mocks

import (
	"context"
	"reflect"
	"time"

	"github.com/google/uuid"
	authdomain "github.com/kalanara/cmc-backend/internal/modules/auth/domain"
	sessiondomain "github.com/kalanara/cmc-backend/internal/modules/session/domain"
	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	"go.uber.org/mock/gomock"
)

// MockUserRepository is a mock of UserRepository interface.
type MockUserRepository struct {
	ctrl     *gomock.Controller
	recorder *MockUserRepositoryMockRecorder
}

type MockUserRepositoryMockRecorder struct {
	mock *MockUserRepository
}

func NewMockUserRepository(ctrl *gomock.Controller) *MockUserRepository {
	mock := &MockUserRepository{ctrl: ctrl}
	mock.recorder = &MockUserRepositoryMockRecorder{mock}
	return mock
}

func (m *MockUserRepository) EXPECT() *MockUserRepositoryMockRecorder {
	return m.recorder
}

func (m *MockUserRepository) Create(ctx context.Context, user *userdomain.User) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Create", ctx, user)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockUserRepositoryMockRecorder) Create(ctx, user interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockUserRepository)(nil).Create), ctx, user)
}

func (m *MockUserRepository) FindByID(ctx context.Context, id uuid.UUID) (*userdomain.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByID", ctx, id)
	ret0, _ := ret[0].(*userdomain.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserRepositoryMockRecorder) FindByID(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByID", reflect.TypeOf((*MockUserRepository)(nil).FindByID), ctx, id)
}

func (m *MockUserRepository) FindByEmail(ctx context.Context, email string) (*userdomain.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByEmail", ctx, email)
	ret0, _ := ret[0].(*userdomain.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserRepositoryMockRecorder) FindByEmail(ctx, email interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByEmail", reflect.TypeOf((*MockUserRepository)(nil).FindByEmail), ctx, email)
}

func (m *MockUserRepository) FindByNIP(ctx context.Context, nip string) (*userdomain.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByNIP", ctx, nip)
	ret0, _ := ret[0].(*userdomain.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserRepositoryMockRecorder) FindByNIP(ctx, nip interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByNIP", reflect.TypeOf((*MockUserRepository)(nil).FindByNIP), ctx, nip)
}

func (m *MockUserRepository) Update(ctx context.Context, user *userdomain.User) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Update", ctx, user)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockUserRepositoryMockRecorder) Update(ctx, user interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Update", reflect.TypeOf((*MockUserRepository)(nil).Update), ctx, user)
}

func (m *MockUserRepository) Delete(ctx context.Context, id uuid.UUID) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", ctx, id)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockUserRepositoryMockRecorder) Delete(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockUserRepository)(nil).Delete), ctx, id)
}

func (m *MockUserRepository) ListByRole(ctx context.Context, role userdomain.Role) ([]userdomain.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListByRole", ctx, role)
	ret0, _ := ret[0].([]userdomain.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserRepositoryMockRecorder) ListByRole(ctx, role interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListByRole", reflect.TypeOf((*MockUserRepository)(nil).ListByRole), ctx, role)
}

// MockTokenBlacklistRepository
type MockTokenBlacklistRepository struct {
	ctrl     *gomock.Controller
	recorder *MockTokenBlacklistRepositoryMockRecorder
}

type MockTokenBlacklistRepositoryMockRecorder struct {
	mock *MockTokenBlacklistRepository
}

func NewMockTokenBlacklistRepository(ctrl *gomock.Controller) *MockTokenBlacklistRepository {
	mock := &MockTokenBlacklistRepository{ctrl: ctrl}
	mock.recorder = &MockTokenBlacklistRepositoryMockRecorder{mock}
	return mock
}

func (m *MockTokenBlacklistRepository) EXPECT() *MockTokenBlacklistRepositoryMockRecorder {
	return m.recorder
}

func (m *MockTokenBlacklistRepository) BlacklistToken(ctx context.Context, jti string, ttl time.Duration) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "BlacklistToken", ctx, jti, ttl)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockTokenBlacklistRepositoryMockRecorder) BlacklistToken(ctx, jti, ttl interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "BlacklistToken", reflect.TypeOf((*MockTokenBlacklistRepository)(nil).BlacklistToken), ctx, jti, ttl)
}

func (m *MockTokenBlacklistRepository) IsTokenBlacklisted(ctx context.Context, jti string) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsTokenBlacklisted", ctx, jti)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockTokenBlacklistRepositoryMockRecorder) IsTokenBlacklisted(ctx, jti interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsTokenBlacklisted", reflect.TypeOf((*MockTokenBlacklistRepository)(nil).IsTokenBlacklisted), ctx, jti)
}

// MockJWTService
type MockJWTService struct {
	ctrl     *gomock.Controller
	recorder *MockJWTServiceMockRecorder
}

type MockJWTServiceMockRecorder struct {
	mock *MockJWTService
}

func NewMockJWTService(ctrl *gomock.Controller) *MockJWTService {
	mock := &MockJWTService{ctrl: ctrl}
	mock.recorder = &MockJWTServiceMockRecorder{mock}
	return mock
}

func (m *MockJWTService) EXPECT() *MockJWTServiceMockRecorder {
	return m.recorder
}

func (m *MockJWTService) GenerateTokenPair(user *userdomain.User) (*authdomain.TokenPair, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GenerateTokenPair", user)
	ret0, _ := ret[0].(*authdomain.TokenPair)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockJWTServiceMockRecorder) GenerateTokenPair(user interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GenerateTokenPair", reflect.TypeOf((*MockJWTService)(nil).GenerateTokenPair), user)
}

func (m *MockJWTService) ValidateToken(tokenString string) (*authdomain.JWTClaims, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ValidateToken", tokenString)
	ret0, _ := ret[0].(*authdomain.JWTClaims)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockJWTServiceMockRecorder) ValidateToken(tokenString interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ValidateToken", reflect.TypeOf((*MockJWTService)(nil).ValidateToken), tokenString)
}

// MockPasswordHasher
type MockPasswordHasher struct {
	ctrl     *gomock.Controller
	recorder *MockPasswordHasherMockRecorder
}

type MockPasswordHasherMockRecorder struct {
	mock *MockPasswordHasher
}

func NewMockPasswordHasher(ctrl *gomock.Controller) *MockPasswordHasher {
	mock := &MockPasswordHasher{ctrl: ctrl}
	mock.recorder = &MockPasswordHasherMockRecorder{mock}
	return mock
}

func (m *MockPasswordHasher) EXPECT() *MockPasswordHasherMockRecorder {
	return m.recorder
}

func (m *MockPasswordHasher) HashPassword(password string) (string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "HashPassword", password)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockPasswordHasherMockRecorder) HashPassword(password interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "HashPassword", reflect.TypeOf((*MockPasswordHasher)(nil).HashPassword), password)
}

func (m *MockPasswordHasher) CheckPassword(plainPassword, hashedPassword string) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckPassword", plainPassword, hashedPassword)
	ret0, _ := ret[0].(bool)
	return ret0
}

func (mr *MockPasswordHasherMockRecorder) CheckPassword(plainPassword, hashedPassword interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckPassword", reflect.TypeOf((*MockPasswordHasher)(nil).CheckPassword), plainPassword, hashedPassword)
}

// MockSessionRepository
type MockSessionRepository struct {
	ctrl     *gomock.Controller
	recorder *MockSessionRepositoryMockRecorder
}

type MockSessionRepositoryMockRecorder struct {
	mock *MockSessionRepository
}

func NewMockSessionRepository(ctrl *gomock.Controller) *MockSessionRepository {
	mock := &MockSessionRepository{ctrl: ctrl}
	mock.recorder = &MockSessionRepositoryMockRecorder{mock}
	return mock
}

func (m *MockSessionRepository) EXPECT() *MockSessionRepositoryMockRecorder {
	return m.recorder
}

func (m *MockSessionRepository) Create(ctx context.Context, session *sessiondomain.Session) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Create", ctx, session)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockSessionRepositoryMockRecorder) Create(ctx, session interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockSessionRepository)(nil).Create), ctx, session)
}

func (m *MockSessionRepository) FindByID(ctx context.Context, id uuid.UUID) (*sessiondomain.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByID", ctx, id)
	ret0, _ := ret[0].(*sessiondomain.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockSessionRepositoryMockRecorder) FindByID(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByID", reflect.TypeOf((*MockSessionRepository)(nil).FindByID), ctx, id)
}

func (m *MockSessionRepository) FindByClientID(ctx context.Context, clientID uuid.UUID) ([]sessiondomain.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByClientID", ctx, clientID)
	ret0, _ := ret[0].([]sessiondomain.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockSessionRepositoryMockRecorder) FindByClientID(ctx, clientID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByClientID", reflect.TypeOf((*MockSessionRepository)(nil).FindByClientID), ctx, clientID)
}

func (m *MockSessionRepository) FindByPractitionerID(ctx context.Context, practitionerID uuid.UUID) ([]sessiondomain.Session, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByPractitionerID", ctx, practitionerID)
	ret0, _ := ret[0].([]sessiondomain.Session)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockSessionRepositoryMockRecorder) FindByPractitionerID(ctx, practitionerID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByPractitionerID", reflect.TypeOf((*MockSessionRepository)(nil).FindByPractitionerID), ctx, practitionerID)
}

func (m *MockSessionRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status sessiondomain.SessionStatus, notes string) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateStatus", ctx, id, status, notes)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockSessionRepositoryMockRecorder) UpdateStatus(ctx, id, status, notes interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateStatus", reflect.TypeOf((*MockSessionRepository)(nil).UpdateStatus), ctx, id, status, notes)
}

func (m *MockSessionRepository) AddMeeting(ctx context.Context, meeting *sessiondomain.Meeting) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AddMeeting", ctx, meeting)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockSessionRepositoryMockRecorder) AddMeeting(ctx, meeting interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AddMeeting", reflect.TypeOf((*MockSessionRepository)(nil).AddMeeting), ctx, meeting)
}

func (m *MockSessionRepository) DeleteMeeting(ctx context.Context, sessionID uuid.UUID, meetingID uuid.UUID) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteMeeting", ctx, sessionID, meetingID)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockSessionRepositoryMockRecorder) DeleteMeeting(ctx, sessionID, meetingID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteMeeting", reflect.TypeOf((*MockSessionRepository)(nil).DeleteMeeting), ctx, sessionID, meetingID)
}

// MockAuthUsecase is a mock of AuthUsecase interface.
type MockAuthUsecase struct {
	ctrl     *gomock.Controller
	recorder *MockAuthUsecaseMockRecorder
}

type MockAuthUsecaseMockRecorder struct {
	mock *MockAuthUsecase
}

func NewMockAuthUsecase(ctrl *gomock.Controller) *MockAuthUsecase {
	mock := &MockAuthUsecase{ctrl: ctrl}
	mock.recorder = &MockAuthUsecaseMockRecorder{mock}
	return mock
}

func (m *MockAuthUsecase) EXPECT() *MockAuthUsecaseMockRecorder {
	return m.recorder
}

func (m *MockAuthUsecase) Register(ctx context.Context, input authdomain.RegisterInput) (*authdomain.AuthResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Register", ctx, input)
	ret0, _ := ret[0].(*authdomain.AuthResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) Register(ctx, input interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Register", reflect.TypeOf((*MockAuthUsecase)(nil).Register), ctx, input)
}

func (m *MockAuthUsecase) Login(ctx context.Context, input authdomain.LoginInput) (*authdomain.AuthResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Login", ctx, input)
	ret0, _ := ret[0].(*authdomain.AuthResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) Login(ctx, input interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Login", reflect.TypeOf((*MockAuthUsecase)(nil).Login), ctx, input)
}

func (m *MockAuthUsecase) RefreshToken(ctx context.Context, refreshToken string) (*authdomain.TokenPair, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "RefreshToken", ctx, refreshToken)
	ret0, _ := ret[0].(*authdomain.TokenPair)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) RefreshToken(ctx, refreshToken interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RefreshToken", reflect.TypeOf((*MockAuthUsecase)(nil).RefreshToken), ctx, refreshToken)
}

func (m *MockAuthUsecase) Logout(ctx context.Context, claims *authdomain.JWTClaims) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Logout", ctx, claims)
	err, _ := ret[0].(error)
	return err
}

func (mr *MockAuthUsecaseMockRecorder) Logout(ctx, claims interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Logout", reflect.TypeOf((*MockAuthUsecase)(nil).Logout), ctx, claims)
}

func (m *MockAuthUsecase) LoginSSO(ctx context.Context, req authdomain.SSOLoginRequest) (*authdomain.AuthResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "LoginSSO", ctx, req)
	ret0, _ := ret[0].(*authdomain.AuthResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) LoginSSO(ctx, req interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoginSSO", reflect.TypeOf((*MockAuthUsecase)(nil).LoginSSO), ctx, req)
}

func (m *MockAuthUsecase) LoginEduhub(ctx context.Context, token string, preDecodedUser ...authdomain.EduhubUserInfo) (*authdomain.AuthResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, token}
	for _, a := range preDecodedUser {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "LoginEduhub", varargs...)
	ret0, _ := ret[0].(*authdomain.AuthResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) LoginEduhub(ctx, token interface{}, preDecodedUser ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, token}, preDecodedUser...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoginEduhub", reflect.TypeOf((*MockAuthUsecase)(nil).LoginEduhub), varargs...)
}

func (m *MockAuthUsecase) LoginGoogle(ctx context.Context, code string, redirectURI ...string) (*authdomain.AuthResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{ctx, code}
	for _, a := range redirectURI {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "LoginGoogle", varargs...)
	ret0, _ := ret[0].(*authdomain.AuthResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockAuthUsecaseMockRecorder) LoginGoogle(ctx, code interface{}, redirectURI ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{ctx, code}, redirectURI...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoginGoogle", reflect.TypeOf((*MockAuthUsecase)(nil).LoginGoogle), varargs...)
}

func (m *MockAuthUsecase) GetSSOAuthURL() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetSSOAuthURL")
	ret0, _ := ret[0].(string)
	return ret0
}

func (mr *MockAuthUsecaseMockRecorder) GetSSOAuthURL() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetSSOAuthURL", reflect.TypeOf((*MockAuthUsecase)(nil).GetSSOAuthURL))
}

// MockUserUsecase is a mock of UserUsecase interface.
type MockUserUsecase struct {
	ctrl     *gomock.Controller
	recorder *MockUserUsecaseMockRecorder
}

type MockUserUsecaseMockRecorder struct {
	mock *MockUserUsecase
}

func NewMockUserUsecase(ctrl *gomock.Controller) *MockUserUsecase {
	mock := &MockUserUsecase{ctrl: ctrl}
	mock.recorder = &MockUserUsecaseMockRecorder{mock}
	return mock
}

func (m *MockUserUsecase) EXPECT() *MockUserUsecaseMockRecorder {
	return m.recorder
}

func (m *MockUserUsecase) GetProfile(ctx context.Context, userID uuid.UUID) (*userdomain.UserResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetProfile", ctx, userID)
	ret0, _ := ret[0].(*userdomain.UserResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserUsecaseMockRecorder) GetProfile(ctx, userID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetProfile", reflect.TypeOf((*MockUserUsecase)(nil).GetProfile), ctx, userID)
}

func (m *MockUserUsecase) ListPractitioners(ctx context.Context, role userdomain.Role) ([]userdomain.UserResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListPractitioners", ctx, role)
	ret0, _ := ret[0].([]userdomain.UserResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockUserUsecaseMockRecorder) ListPractitioners(ctx, role interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListPractitioners", reflect.TypeOf((*MockUserUsecase)(nil).ListPractitioners), ctx, role)
}
