package validator

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

type CustomValidator struct {
	validate *validator.Validate
}

func New() *CustomValidator {
	return &CustomValidator{
		validate: validator.New(),
	}
}

// FieldError represents structured validation error for a field.
type FieldError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// ValidateStruct validates a struct and returns friendly error messages.
func (v *CustomValidator) ValidateStruct(s interface{}) []FieldError {
	err := v.validate.Struct(s)
	if err == nil {
		return nil
	}

	var errorsList []FieldError
	if valErrors, ok := err.(validator.ValidationErrors); ok {
		for _, e := range valErrors {
			errorsList = append(errorsList, FieldError{
				Field:   strings.ToLower(e.Field()),
				Message: formatFieldError(e),
			})
		}
	} else {
		errorsList = append(errorsList, FieldError{
			Field:   "general",
			Message: err.Error(),
		})
	}

	return errorsList
}

func formatFieldError(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return fmt.Sprintf("%s is required", e.Field())
	case "email":
		return fmt.Sprintf("%s must be a valid email address", e.Field())
	case "min":
		return fmt.Sprintf("%s must be at least %s characters or items", e.Field(), e.Param())
	case "max":
		return fmt.Sprintf("%s must not exceed %s characters or items", e.Field(), e.Param())
	case "oneof":
		return fmt.Sprintf("%s must be one of: %s", e.Field(), e.Param())
	case "e164":
		return fmt.Sprintf("%s must follow international E.164 phone format", e.Field())
	default:
		return fmt.Sprintf("%s is invalid according to rule '%s'", e.Field(), e.Tag())
	}
}
