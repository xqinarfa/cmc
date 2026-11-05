package validator_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kalanara/cmc-backend/pkg/validator"
)

type sampleTestStruct struct {
	Email string `validate:"required,email"`
	Name  string `validate:"required,min=3,max=50"`
	Role  string `validate:"required,oneof=coach mentor client"`
	Phone string `validate:"omitempty,e164"`
}

func TestCustomValidator_ValidateStruct(t *testing.T) {
	v := validator.New()

	t.Run("Valid Struct Returns No Errors", func(t *testing.T) {
		valid := sampleTestStruct{
			Email: "user@dephub.go.id",
			Name:  "Budi Santoso",
			Role:  "coach",
			Phone: "+628123456789",
		}
		errorsList := v.ValidateStruct(valid)
		assert.Empty(t, errorsList)
	})

	t.Run("Invalid Struct Returns Field Errors", func(t *testing.T) {
		invalid := sampleTestStruct{
			Email: "not-an-email",
			Name:  "A",       // min 3 failed
			Role:  "unknown", // oneof failed
			Phone: "1234",    // invalid e164
		}
		errorsList := v.ValidateStruct(invalid)
		require.NotEmpty(t, errorsList)
		assert.True(t, len(errorsList) >= 4)

		fieldMap := make(map[string]string)
		for _, e := range errorsList {
			fieldMap[e.Field] = e.Message
		}

		assert.Contains(t, fieldMap["email"], "must be a valid email address")
		assert.Contains(t, fieldMap["name"], "must be at least 3 characters")
		assert.Contains(t, fieldMap["role"], "must be one of: coach mentor client")
		assert.Contains(t, fieldMap["phone"], "must follow international E.164")
	})
}

