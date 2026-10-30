package logger

import (
	"log/slog"
	"os"
	"strings"

	"github.com/kalanara/cmc-backend/internal/config"
)

func InitLogger(cfg config.AppConfig) *slog.Logger {
	var level slog.Level
	switch strings.ToLower(cfg.LogLevel) {
	case "debug":
		level = slog.LevelDebug
	case "info":
		level = slog.LevelInfo
	case "warn":
		level = slog.LevelWarn
	case "error":
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	opts := &slog.HandlerOptions{
		Level:     level,
		AddSource: cfg.Environment != "production",
	}

	var handler slog.Handler
	if strings.ToLower(cfg.LogFormat) == "text" {
		handler = slog.NewTextHandler(os.Stdout, opts)
	} else {
		handler = slog.NewJSONHandler(os.Stdout, opts)
	}

	appLogger := slog.New(handler).With(
		slog.String("app", cfg.Name),
		slog.String("env", cfg.Environment),
	)

	slog.SetDefault(appLogger)
	return appLogger
}
