package seeders

import (
	"fmt"

	"backend/internal/config"
	"backend/internal/models"
)

// Daftar slug festival dan judulnya yang dipakai sebagai anchor komentar
var festivalPosts = []struct {
	Slug  string
	Title string
}{
	{"saraswati", "[FESTIVAL:saraswati] Hari Raya Saraswati"},
	{"nyepi", "[FESTIVAL:nyepi] Hari Raya Nyepi"},
	{"pagerwesi", "[FESTIVAL:pagerwesi] Hari Raya Pagerwesi"},
	{"galungan-kuningan", "[FESTIVAL:galungan-kuningan] Hari Raya Galungan & Kuningan"},
}

// SeedFestivalPosts membuat post anchor untuk setiap hari raya jika belum ada.
// Post ini digunakan sebagai target untuk komentar dari halaman hari raya.
func SeedFestivalPosts() {
	for _, fp := range festivalPosts {
		var count int64
		config.DB.Model(&models.Post{}).Where("title = ?", fp.Title).Count(&count)
		if count > 0 {
			continue
		}

		post := models.Post{
			Title:   fp.Title,
			Content: fmt.Sprintf("Post internal untuk komentar Hari Raya %s. Jangan dihapus.", fp.Slug),
			Image:   "",
		}

		if err := config.DB.Create(&post).Error; err != nil {
			fmt.Printf("Gagal membuat festival post untuk %s: %v\n", fp.Slug, err)
		} else {
			fmt.Printf("Festival post dibuat -> slug: %s, id: %d\n", fp.Slug, post.Id)
		}
	}
}
