#!/usr/bin/env bash
set -e

echo "Generating protobuf files..."
protoc --go_out=. --go_opt=paths=source_relative \
       --go-grpc_out=. --go-grpc_opt=paths=source_relative \
       internal/modules/auth/delivery/grpc/proto/auth/v1/auth.proto

echo "Proto files generated successfully!"
