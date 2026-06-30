package routes

import (
	"backend/internal/controllers"
	"backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		// Auth
		api.POST("/login", controllers.Login)

		// Posts - public read access
		api.GET("/posts", controllers.FindPost)
		api.GET("/posts/:id", controllers.FindPostById)
		api.GET("/festivals", controllers.GetFestivals)

		// Comments - public (tidak perlu login)
		api.GET("/posts/:id/comments", controllers.GetCommentsByPost)
		api.POST("/posts/:id/comments", controllers.StoreComment)

		// Festival Posts - public (untuk mendapatkan post_id anchor komentar hari raya)
		api.GET("/festival-posts/:slug", controllers.GetFestivalPostId)

		// Posts & Comments - protected (need Bearer token)
		protected := api.Group("/")
		protected.Use(middlewares.AuthMiddleware())
		{
			protected.POST("/posts", controllers.StorePost)
			protected.PUT("/posts/:id", controllers.UpdatePost)
			protected.DELETE("/posts/:id", controllers.DeletePost)

			// Admin bisa hapus komentar
			protected.DELETE("/comments/:id", controllers.DeleteComment)
		}
	}
}
