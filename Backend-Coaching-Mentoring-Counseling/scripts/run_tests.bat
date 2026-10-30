@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo  CMC Backend Go - Automated Test Runner
echo =======================================================

set MODE=%1
if "%MODE%"=="" set MODE=unit

if "%MODE%"=="unit" goto :run_unit
if "%MODE%"=="cover" goto :run_cover
if "%MODE%"=="bench" goto :run_bench
if "%MODE%"=="integration" goto :run_integration
if "%MODE%"=="all" goto :run_all

echo Usage: %0 [unit ^| cover ^| bench ^| integration ^| all]
exit /b 1

:run_unit
echo [1/1] Running Unit Tests (Testify, Mockery/Gomock, Bufconn, Embedded NATS, SQLMock)...
go test -v ./test/unit/...
goto :end

:run_cover
echo Generating Test Coverage Report...
go test -coverpkg=./internal/... -coverprofile=coverage.out ./test/unit/...
go tool cover -html=coverage.out -o coverage.html
echo Coverage HTML generated at: coverage.html
goto :end

:run_bench
echo Running Benchmarks (Argon2id, JWT, RateLimiter)...
go test -bench ".*" -benchmem ./test/benchmark
goto :end

:run_integration
echo Running Integration Tests with Testcontainers (PostgreSQL in Docker)...
go test -v -run TestAuthUsecase_Integration ./test/integration/...
goto :end

:run_all
echo [1/3] Running Unit Tests...
go test -v ./test/unit/...
if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

echo [2/3] Generating Coverage...
go test -coverpkg=./internal/... -coverprofile=coverage.out ./test/unit/...
go tool cover -html=coverage.out -o coverage.html

echo [3/3] Running Benchmarks...
go test -bench ".*" -benchmem ./test/benchmark
goto :end

:end
echo Test run complete.
