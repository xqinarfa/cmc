# Coaching, Mentoring & Counseling Backend API

Production-ready backend service built with **Golang** using **Modular Clean Architecture (Package-by-Feature)**. Setiap modul bisnis dikelompokkan secara terpisah dan independen (Domain, Usecase, Repository, Delivery), dipadukan dengan platform infrastruktur bersama (PostgreSQL, Redis, MinIO, NATS, gRPC, Prometheus).

---

## 🏛️ Modular Clean Architecture Layout

Struktur `internal/` dikelompokkan berdasarkan **modul bisnis**, bukan dicampur menjadi satu:

```
Backend-Coaching-Mentoring-Counseling/
├── cmd/
│   ├── api/
│   │   └── main.go                             # Entry point, dependency injection, graceful shutdown
│   └── migrate/
│       └── main.go                             # golang-migrate CLI runner (up/down/version)
├── internal/
│   ├── config/                                 # Validasi konfigurasi env (caarlos0/env)
│   ├── shared/                                 # Domain errors bersama yang digunakan lintas modul
│   │   └── domain/errors.go
│   ├── platform/                               # Platform infrastruktur & middleware bersama
│   │   ├── database/postgres.go                # PostgreSQL GORM connection pool & timeout
│   │   ├── redis/redis.go                      # Redis client pool
│   │   ├── nats/nats.go                        # NATS JetStream client & publisher
│   │   ├── minio/minio.go                      # MinIO S3 client (upload & presigned URL)
│   │   ├── logger/logger.go                    # Structured logging (log/slog)
│   │   ├── metrics/metrics.go                  # Prometheus metrics registry
│   │   ├── security/                           # Password hashing (bcrypt) & JWT generator
│   │   └── middleware/                         # RequestID, Logger, Recovery, CORS, RateLimiter, JWT/RBAC, Timeout
│   ├── modules/                                # 🎯 MODUL-MODUL BISNIS INDEPENDEN
│   │   ├── user/                               # 👤 Modul User & Profil
│   │   │   ├── domain/user.go                  # User entity, Role (admin, coach, mentor, counselor, client), interfaces
│   │   │   ├── usecase/user_usecase.go         # Profil & listing praktisi
│   │   │   ├── repository/user_repository.go   # PostgreSQL GORM user persistence
│   │   │   └── delivery/http/user_handler.go   # HTTP handler (/api/v1/users/me, /practitioners)
│   │   ├── auth/                               # 🔐 Modul Autentikasi & Otorisasi
│   │   │   ├── domain/auth.go                  # TokenPair, JWTClaims, DTOs, interfaces
│   │   │   ├── usecase/auth_usecase.go         # Register, Login, Refresh, Logout
│   │   │   ├── repository/token_blacklist.go   # Redis token blacklist & revocation
│   │   │   └── delivery/
│   │   │       ├── http/auth_handler.go        # HTTP handler (/register, /login, /refresh, /logout)
│   │   │       └── grpc/                       # gRPC AuthService & Protobuf definitions
│   │   ├── session/                            # 📅 Modul Sesi Coaching, Mentoring & Counseling
│   │   │   ├── domain/session.go               # Session entity, SessionType, SessionStatus, DTOs, events
│   │   │   ├── usecase/session_usecase.go      # Booking sesi, status updates, event publishing NATS
│   │   │   ├── repository/session_repo.go      # PostgreSQL GORM session persistence
│   │   │   └── delivery/http/session_handler.go# HTTP handler (/sessions, /:id, /:id/status)
│   │   └── health/                             # 🩺 Modul Healthcheck & Observabilitas
│   │       └── delivery/http/health_handler.go # /healthz (liveness) & /readyz (readiness probe)
│   └── app/                                    # Assembler aplikasi
│       ├── http/router.go                      # Gin engine yang me-mount seluruh modul
│       └── grpc/server.go                      # gRPC server yang me-mount AuthService
├── pkg/
│   ├── response/response.go                    # Standardized JSON response envelope
│   └── validator/validator.go                  # Input validator (go-playground/validator/v10)
├── migrations/                                 # SQL Migrations (golang-migrate)
│   ├── 000001_create_users_table.up.sql / .down.sql
│   └── 000002_create_sessions_table.up.sql / .down.sql
├── test/
│   └── integration/auth_integration_test.go    # Integration test suite (testcontainers-go)
├── loadtest/
│   └── k6_load_test.js                         # k6 Load Testing script lengkap
├── deploy/
│   └── prometheus.yml                          # Prometheus config
├── .air.toml                                   # Air live reload config
├── .env & .env.example                         # Environment config
├── compose.yaml                                # Docker Compose infrastructure
├── Dockerfile                                  # Multi-stage production container
└── go.mod
```

---

## ⚡ Tech Stack & Libraries

- **Language:** Go (1.24+)
- **Routing:** Gin (`github.com/gin-gonic/gin`)
- **Database & ORM:** PostgreSQL 16 + GORM (`gorm.io/gorm`, `gorm.io/driver/postgres`)
- **Database Migrations:** `github.com/golang-migrate/migrate/v4`
- **Cache & Blacklist:** Redis 7 (`github.com/redis/go-redis/v9`)
- **Object Storage:** MinIO S3 (`github.com/minio/minio-go/v7`)
- **Event Streaming:** NATS JetStream (`github.com/nats-io/nats.go`)
- **RPC:** gRPC + Protocol Buffers (`google.golang.org/grpc`, `google.golang.org/protobuf`)
- **Live Reload:** Air (`github.com/air-verse/air`)
- **Authentication:** JWT HS256 (`github.com/golang-jwt/jwt/v5`) dengan Refresh Token rotation
- **Password Hashing:** `golang.org/x/crypto/bcrypt` (Cost: 12)
- **Input Validation:** `github.com/go-playground/validator/v10`
- **Structured Logging:** `log/slog` (JSON & Text format)
- **Observability:** Prometheus (`/metrics`) + Go Profiler (`/debug/pprof`)
- **Rate Limiting:** Token Bucket per IP (`golang.org/x/time/rate`)
- **Integration Testing:** `github.com/testcontainers/testcontainers-go`

---

## 🚀 Quick Start

### 1. Jalankan Infrastruktur Pendukung (Docker)
```bash
docker compose up -d postgres redis nats minio prometheus
```

Layanan yang aktif:
- **PostgreSQL:** `localhost:5432` (`cmc_user` / `cmc_password`)
- **Redis:** `localhost:6379`
- **NATS:** `localhost:4222` (Dashboard monitoring: `http://localhost:8222`)
- **MinIO:** API `localhost:9000` | Console `http://localhost:9001` (`minioadmin` / `minioadmin`)
- **Prometheus:** `http://localhost:9090`

### 2. Jalankan Migrasi Database
```bash
# Migrasi UP
go run ./cmd/migrate -cmd=up

# Cek versi migrasi saat ini
go run ./cmd/migrate -cmd=version
```

### 3. Jalankan Aplikasi dengan Air (Live Reload)
```bash
air
```

*HTTP Server berjalan di `http://localhost:8080`, dan gRPC Server di `localhost:50051`.*

---

## 🔒 Role-Based Access Control (RBAC)

1. `admin`: Akses penuh ke semua data pengguna dan sesi.
2. `coach`: Konfirmasi dan kelola sesi coaching.
3. `mentor`: Konfirmasi dan kelola sesi mentoring.
4. `counselor`: Konfirmasi dan kelola sesi counseling.
5. `client`: Membuat booking ke Coach/Mentor/Counselor, melihat sesi sendiri, dan membatalkan sesi.

---

## 📡 API Endpoints per Modul

### 🩺 Modul Health & Observabilitas
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/healthz` | Liveness probe (Kubernetes / Docker) |
| `GET` | `/readyz` | Readiness probe (Memeriksa PostgreSQL, Redis, NATS, MinIO) |
| `GET` | `/metrics` | Prometheus metrics scrape endpoint |
| `GET` | `/debug/pprof/*` | Profiler Go runtime (CPU, Heap, Goroutine, Mutex) |

### 🔐 Modul Auth
| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Registrasi akun baru (email, password, role, dll.) |
| `POST` | `/api/v1/auth/login` | Public | Login akun & dapatkan access token + refresh token |
| `POST` | `/api/v1/auth/refresh` | Public | Refresh access token & rotasi refresh token |
| `POST` | `/api/v1/auth/logout` | Bearer | Blacklist token JTI di Redis |

### 👤 Modul User
| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `GET` | `/api/v1/users/me` | Bearer | Ambil profil pengguna yang sedang login |
| `GET` | `/api/v1/users/practitioners` | Bearer | Ambil daftar praktisi berdasarkan role (`coach`/`mentor`/`counselor`) |

### 📅 Modul Session
| Method | Endpoint | Roles | Deskripsi |
|---|---|---|---|
| `POST` | `/api/v1/sessions` | `client`, `admin` | Booking sesi coaching/mentoring/counseling baru |
| `GET` | `/api/v1/sessions` | All Authenticated | Daftar sesi milik pengguna saat ini |
| `GET` | `/api/v1/sessions/:id` | Participant / Admin | Detail sesi berdasarkan ID |
| `PATCH` | `/api/v1/sessions/:id/status` | Coach/Mentor/Counselor/Client/Admin | Update status sesi (`confirmed`, `completed`, `cancelled`) |

---

## 🧪 Testing & Load Testing

```bash
# Unit test cepat
go test -v -short ./...

# Integration test dengan Docker testcontainers
go test -v ./test/integration/...

# Load test k6
k6 run loadtest/k6_load_test.js
```
