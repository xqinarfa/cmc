package grpc

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"runtime/debug"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/kalanara/cmc-backend/internal/config"
	grpchandler "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc"
	authv1 "github.com/kalanara/cmc-backend/internal/modules/auth/delivery/grpc/proto/auth/v1"
	"github.com/kalanara/cmc-backend/internal/platform/metrics"
)

type Server struct {
	grpcServer *grpc.Server
	listener   net.Listener
	cfg        config.GRPCConfig
}

func NewServer(cfg config.GRPCConfig, authHandler *grpchandler.AuthGRPCHandler) (*Server, error) {
	addr := fmt.Sprintf(":%d", cfg.Port)
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, fmt.Errorf("failed to listen on gRPC port %d: %w", cfg.Port, err)
	}

	opts := []grpc.ServerOption{
		grpc.UnaryInterceptor(unaryServerInterceptor()),
	}

	grpcServer := grpc.NewServer(opts...)
	authv1.RegisterAuthServiceServer(grpcServer, authHandler)

	return &Server{
		grpcServer: grpcServer,
		listener:   lis,
		cfg:        cfg,
	}, nil
}

func (s *Server) Start() error {
	slog.Info("gRPC server listening", "port", s.cfg.Port)
	return s.grpcServer.Serve(s.listener)
}

func (s *Server) GracefulStop() {
	slog.Info("Stopping gRPC server gracefully")
	s.grpcServer.GracefulStop()
}

func unaryServerInterceptor() grpc.UnaryServerInterceptor {
	promMetrics := metrics.GetMetrics()

	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		start := time.Now()

		defer func() {
			if r := recover(); r != nil {
				slog.Error("gRPC panic recovered",
					slog.Any("error", r),
					slog.String("method", info.FullMethod),
					slog.String("stack", string(debug.Stack())),
				)
				err = status.Errorf(codes.Internal, "internal server panic: %v", r)
			}
		}()

		resp, err = handler(ctx, req)

		latency := time.Since(start)
		st, _ := status.FromError(err)
		statusCode := st.Code().String()

		promMetrics.GRPCRequestsTotal.WithLabelValues(info.FullMethod, statusCode).Inc()

		slog.Info("gRPC Call",
			slog.String("method", info.FullMethod),
			slog.String("code", statusCode),
			slog.Duration("latency", latency),
		)

		return resp, err
	}
}
