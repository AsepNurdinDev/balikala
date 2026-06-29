package models

import "time"

type Comment struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	PostID    uint      `json:"post_id" gorm:"not null;index"`
	Name      string    `json:"name" gorm:"not null"`
	Email     string    `json:"email"`
	Body      string    `json:"body" gorm:"not null;type:text"`
	CreatedAt time.Time `json:"created_at"`
}
