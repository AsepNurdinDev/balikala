package seeders

import (
	"fmt"
	"os"

	"backend/internal/config"
	"backend/internal/models"

	"golang.org/x/crypto/bcrypt"
)

func SeedAdmin() {
	var count int64
	config.DB.Model(&models.Admin{}).Count(&count)

	if count > 0 {
		return
	}

	email := os.Getenv("ADMIN_EMAIL")
	if email == "" {
		email = "admin@example.com"
	}

	password := os.Getenv("ADMIN_PASSWORD")
	if password == "" {
		password = "password"
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Gagal hash password admin:", err)
		return
	}

	admin := models.Admin{
		Name:     "Administrator",
		Email:    email,
		Password: string(hashed),
	}

	if err := config.DB.Create(&admin).Error; err != nil {
		fmt.Println("Gagal membuat admin default:", err)
		return
	}

	fmt.Println("Admin default dibuat -> email:", email, "| password:", password)
}
