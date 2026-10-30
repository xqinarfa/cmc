package redis

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/redis/go-redis/v9"
	"github.com/kalanara/cmc-backend/internal/config"
)

type Client struct {
	Rdb *redis.Client
	cfg config.RedisConfig
}

func NewClient(cfg config.RedisConfig) (*Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:         cfg.Address(),
		Password:     cfg.Password,
		DB:           cfg.DB,
		PoolSize:     cfg.PoolSize,
		MinIdleConns: cfg.MinIdleConns,
		DialTimeout:  cfg.DialTimeout,
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
	})

	ctx, cancel := context.WithTimeout(context.Background(), cfg.DialTimeout)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to ping Redis at %s: %w", cfg.Address(), err)
	}

	slog.Info("Redis connection established", "address", cfg.Address(), "db", cfg.DB)

	return &Client{
		Rdb: client,
		cfg: cfg,
	}, nil
}

func (r *Client) Ping(ctx context.Context) error {
	ctxTimeout, cancel := context.WithTimeout(ctx, r.cfg.ReadTimeout)
	defer cancel()
	return r.Rdb.Ping(ctxTimeout).Err()
}

func (r *Client) Close() error {
	if r.Rdb != nil {
		slog.Info("Closing Redis connection")
		return r.Rdb.Close()
	}
	return nil
}
