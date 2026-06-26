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

		// Posts - protected (need Bearer token)
		protected := api.Group("/")
		protected.Use(middlewares.AuthMiddleware())
		{
			protected.POST("/posts", controllers.StorePost)
			protected.PUT("/posts/:id", controllers.UpdatePost)
			protected.DELETE("/posts/:id", controllers.DeletePost)
		}
	}
}
