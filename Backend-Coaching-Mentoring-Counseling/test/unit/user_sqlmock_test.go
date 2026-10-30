package unit_test

import (
	"context"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"

	userdomain "github.com/kalanara/cmc-backend/internal/modules/user/domain"
	userrepo "github.com/kalanara/cmc-backend/internal/modules/user/repository"
	platformdb "github.com/kalanara/cmc-backend/internal/platform/database"
)

func TestUserRepository_SQLMock_FindByID(t *testing.T) {
	dbMock, mock, err := sqlmock.New()
	require.NoError(t, err)
	defer dbMock.Close()

	dialector := postgres.New(postgres.Config{
		Conn:       dbMock,
		DriverName: "postgres",
	})

	gormDB, err := gorm.Open(dialector, &gorm.Config{
		Logger: gormlogger.Default.LogMode(gormlogger.Silent),
	})
	require.NoError(t, err)

	// Build DB struct with 5 second timeout
	dbInstance := &platformdb.DB{
		GormDB: gormDB,
		SqlDB:  dbMock,
	}

	repo := userrepo.NewUserRepository(dbInstance)

	userID := uuid.New()
	expectedEmail := "user.mock@example.com"
	expectedName := "Mock User"

	rows := sqlmock.NewRows([]string{"id", "email", "password_hash", "full_name", "role", "phone", "avatar_url", "is_active", "created_at", "updated_at", "deleted_at"}).
		AddRow(userID, expectedEmail, "hash123", expectedName, "coach", "+628111222", "", true, time.Now(), time.Now(), nil)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "users" WHERE id = $1 AND deleted_at IS NULL ORDER BY "users"."id" LIMIT $2`)).
		WithArgs(userID, 1).
		WillReturnRows(rows)

	ctx := context.Background()
	user, err := repo.FindByID(ctx, userID)

	require.NoError(t, err)
	assert.NotNil(t, user)
	assert.Equal(t, userID, user.ID)
	assert.Equal(t, expectedEmail, user.Email)
	assert.Equal(t, expectedName, user.FullName)
	assert.Equal(t, userdomain.RoleCoach, user.Role)

	assert.NoError(t, mock.ExpectationsWereMet())
}
