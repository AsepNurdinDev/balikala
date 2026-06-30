package controllers

import (
	"backend/internal/config"
	"backend/internal/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// slugToTitle adalah pemetaan slug festival ke judul post anchor-nya
var slugToTitle = map[string]string{
	"saraswati":          "[FESTIVAL:saraswati] Hari Raya Saraswati",
	"nyepi":              "[FESTIVAL:nyepi] Hari Raya Nyepi",
	"pagerwesi":          "[FESTIVAL:pagerwesi] Hari Raya Pagerwesi",
	"galungan-kuningan":  "[FESTIVAL:galungan-kuningan] Hari Raya Galungan & Kuningan",
}

// GET /api/festival-posts/:slug
// Mengembalikan post ID untuk halaman hari raya tertentu berdasarkan slug.
// Digunakan oleh frontend untuk mengetahui post_id yang akan dipakai untuk komentar.
func GetFestivalPostId(c *gin.Context) {
	slug := c.Param("slug")

	title, ok := slugToTitle[slug]
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{
			"error": fmt.Sprintf("Festival '%s' tidak ditemukan", slug),
		})
		return
	}

	var post models.Post
	if err := config.DB.Where("title = ?", title).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post anchor festival belum dibuat. Pastikan server sudah dijalankan dengan seeder.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"id":   post.Id,
			"slug": slug,
		},
	})
}
