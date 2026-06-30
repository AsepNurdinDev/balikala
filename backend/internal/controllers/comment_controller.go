package controllers

import (
	"backend/internal/config"
	"backend/internal/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type CreateCommentInput struct {
	Name  string `json:"name" binding:"required"`
	Email string `json:"email"`
	Body  string `json:"body" binding:"required"`
}

// GET /api/posts/:id/comments
func GetCommentsByPost(c *gin.Context) {
	postID := c.Param("id")

	var post models.Post
	if err := config.DB.Where("id = ?", postID).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post tidak ditemukan",
		})
		return
	}

	var comments []models.Comment
	config.DB.Where("post_id = ?", postID).Order("created_at asc").Find(&comments)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "List komentar",
		"data":    comments,
	})
}

// POST /api/posts/:id/comments
func StoreComment(c *gin.Context) {
	postID := c.Param("id")

	var post models.Post
	if err := config.DB.Where("id = ?", postID).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post tidak ditemukan",
		})
		return
	}

	var input CreateCommentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		var ve validator.ValidationErrors
		if errors.As(err, &ve) {
			out := make([]ErrorMsg, len(ve))
			for i, fe := range ve {
				out[i] = ErrorMsg{
					Field:   fe.Field(),
					Message: GetErrorMsg(fe),
				}
			}
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"errors": out,
			})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	postIDUint, err := strconv.ParseUint(postID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID post tidak valid"})
		return
	}

	comment := models.Comment{
		PostID: uint(postIDUint),
		Name:   input.Name,
		Email:  input.Email,
		Body:   input.Body,
	}

	if err := config.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal menyimpan komentar",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Komentar berhasil ditambahkan",
		"data":    comment,
	})
}

// DELETE /api/comments/:id  (admin only, butuh Bearer token)
func DeleteComment(c *gin.Context) {
	var comment models.Comment
	if err := config.DB.Where("id = ?", c.Param("id")).First(&comment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Komentar tidak ditemukan",
		})
		return
	}

	config.DB.Delete(&comment)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Komentar berhasil dihapus",
	})
}
