package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	platformredis "github.com/kalanara/cmc-backend/internal/platform/redis"
)

type TokenBlacklistRepository struct {
	redisClient *platformredis.Client
}

func NewTokenBlacklistRepository(redisClient *platformredis.Client) *TokenBlacklistRepository {
	return &TokenBlacklistRepository{redisClient: redisClient}
}

func (r *TokenBlacklistRepository) BlacklistToken(ctx context.Context, jti string, ttl time.Duration) error {
	key := fmt.Sprintf("blacklist:token:%s", jti)
	return r.redisClient.Rdb.Set(ctx, key, "revoked", ttl).Err()
}

func (r *TokenBlacklistRepository) IsTokenBlacklisted(ctx context.Context, jti string) (bool, error) {
	key := fmt.Sprintf("blacklist:token:%s", jti)
	res, err := r.redisClient.Rdb.Exists(ctx, key).Result()
	if err != nil {
		if err == redis.Nil {
			return false, nil
		}
		return false, err
	}
	return res > 0, nil
}
