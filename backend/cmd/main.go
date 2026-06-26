package main

import (
	"net/http"
	"os"

	"backend/internal/config"
	"backend/internal/routes"
	"backend/internal/seeders"

	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	if err := os.MkdirAll("./uploads", os.ModePerm); err != nil {
		panic("Gagal membuat folder uploads: " + err.Error())
	}

	// koneksi & migrasi database
	config.ConnectDatabase()

	seeders.SeedAdmin()

	r := gin.Default()

	r.Use(corsMiddleware())

	r.Static("/uploads", "./uploads")

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Blog API is running",
		})
	})

	routes.SetupRoutes(r)

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8090"
	}

	r.Run(":" + port)
}
