package database

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"

	"github.com/kalanara/cmc-backend/internal/config"
)

type DB struct {
	GormDB *gorm.DB
	SqlDB  *sql.DB
	cfg    config.DatabaseConfig
}

func NewDB(cfg config.DatabaseConfig) (*DB, error) {
	gormConfig := &gorm.Config{
		Logger: gormlogger.Default.LogMode(gormlogger.Silent),
	}

	gormDB, err := gorm.Open(postgres.Open(cfg.DSN()), gormConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to PostgreSQL: %w", err)
	}

	sqlDB, err := gormDB.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	sqlDB.SetMaxOpenConns(cfg.MaxOpenConns)
	sqlDB.SetMaxIdleConns(cfg.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(cfg.ConnMaxLifetime)
	sqlDB.SetConnMaxIdleTime(cfg.ConnMaxIdleTime)

	ctx, cancel := context.WithTimeout(context.Background(), cfg.QueryTimeout)
	defer cancel()

	if err := sqlDB.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("database ping failed: %w", err)
	}

	slog.Info("PostgreSQL connection pool established",
		"host", cfg.Host,
		"port", cfg.Port,
		"database", cfg.Name,
		"max_open_conns", cfg.MaxOpenConns,
	)

	return &DB{
		GormDB: gormDB,
		SqlDB:  sqlDB,
		cfg:    cfg,
	}, nil
}

func (d *DB) Ping(ctx context.Context) error {
	ctxTimeout, cancel := context.WithTimeout(ctx, d.cfg.QueryTimeout)
	defer cancel()
	return d.SqlDB.PingContext(ctxTimeout)
}

func (d *DB) Close() error {
	if d.SqlDB != nil {
		slog.Info("Closing PostgreSQL connection pool")
		return d.SqlDB.Close()
	}
	return nil
}

func (d *DB) WithTimeout(ctx context.Context) (context.Context, context.CancelFunc) {
	timeout := d.cfg.QueryTimeout
	if timeout <= 0 {
		timeout = 5 * time.Second
	}
	return context.WithTimeout(ctx, timeout)
}

