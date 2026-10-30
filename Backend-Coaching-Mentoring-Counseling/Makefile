.PHONY: test test-unit test-integration test-cover test-race bench benchstat proto loadtest-k6 loadtest-vegeta

test: test-unit

test-unit:
	@echo "==> Running unit tests with Testify, Gomock, Bufconn, Embedded NATS, SQLMock..."
	go test -v ./test/unit/...

test-race:
	@echo "==> Running unit tests with race detector (requires CGO)..."
	CGO_ENABLED=1 go test -v -race ./test/unit/...

test-integration:
	@echo "==> Running integration tests with Testcontainers (Docker)..."
	go test -v ./test/integration/...

test-cover:
	@echo "==> Generating coverage profile and HTML..."
	go test -coverpkg=./internal/... -coverprofile=coverage.out ./test/unit/...
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report written to coverage.html"

bench:
	@echo "==> Running Go benchmarks with memory allocation metrics..."
	go test -bench=".*" -benchmem ./test/benchmark

benchstat:
	@echo "==> Generating benchmark comparison with benchstat..."
	go test -bench=".*" -count=5 -benchmem ./test/benchmark > old.txt
	@echo "Baseline recorded in old.txt. Run benchstat against changes."

proto:
	@echo "==> Generating gRPC and Protobuf code..."
	buf generate

loadtest-k6:
	@echo "==> Running k6 load test..."
	k6 run loadtest/k6_load_test.js

loadtest-vegeta:
	@echo "==> Running Vegeta load test (50 req/s for 15s)..."
	vegeta attack -rate=50 -duration=15s -targets=loadtest/vegeta_targets.txt | vegeta report
