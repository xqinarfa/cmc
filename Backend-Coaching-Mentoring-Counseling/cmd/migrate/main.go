package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"

	"github.com/kalanara/cmc-backend/internal/config"
)

func main() {
	var (
		migrationDir string
		command      string
		steps        int
	)

	flag.StringVar(&migrationDir, "dir", "migrations", "Directory containing migration files")
	flag.StringVar(&command, "cmd", "up", "Migration action: up, down, version, force")
	flag.IntVar(&steps, "steps", 1, "Number of steps for down/up migrations")
	flag.Parse()

	// Load environment variables
	_ = godotenv.Load()
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load database config: %v", err)
	}

	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.Name,
		cfg.Database.SSLMode,
	)

	sourceURL := fmt.Sprintf("file://%s", migrationDir)
	m, err := migrate.New(sourceURL, dbURL)
	if err != nil {
		log.Fatalf("Failed to initialize migration runner: %v", err)
	}
	defer m.Close()

	switch command {
	case "up":
		log.Println("Applying migrations (up)...")
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration up failed: %v", err)
		}
		log.Println("Migrations applied successfully!")

	case "down":
		log.Printf("Rolling back %d step(s)...", steps)
		if err := m.Steps(-steps); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration down failed: %v", err)
		}
		log.Println("Rollback completed successfully!")

	case "version":
		version, dirty, err := m.Version()
		if err != nil {
			log.Fatalf("Failed to get current migration version: %v", err)
		}
		log.Printf("Current migration version: %d (dirty: %t)", version, dirty)

	default:
		log.Fatalf("Unknown migration command: %s. Valid: up, down, version", command)
		os.Exit(1)
	}
}
