package controllers

import (
	"backend/internal/config"
	"backend/internal/helpers"
	"backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var admin models.Admin

	if err := config.DB.
		Where("email = ?", input.Email).
		First(&admin).Error; err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Email salah",
		})

		return
	}

	err := bcrypt.CompareHashAndPassword(
		[]byte(admin.Password),
		[]byte(input.Password),
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Password salah",
		})

		return
	}

	token, _ := helpers.GenerateToken(admin.ID)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"token":   token,
	})
}
