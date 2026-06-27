'use client'

import { useState } from 'react'
// Local Comment type to avoid missing module error for '@/types'
interface Comment {
  id: number
  post_id?: number
  name: string
  email?: string
  body: string
  created_at: string
}
// Local helper to avoid missing module error for '@/lib/utils'
function timeAgo(dateString: string) {
  const then = new Date(dateString).getTime()
  const now = Date.now()
  const seconds = Math.floor((now - then) / 1000)

  const intervals: [number, string][] = [
    [60, 'second'],
    [60 * 60, 'minute'],
    [60 * 60 * 24, 'hour'],
    [60 * 60 * 24 * 30, 'day'],
    [60 * 60 * 24 * 365, 'month'],
  ]

  if (isNaN(then)) return ''

  if (seconds < 60) return `${seconds} seconds ago`

  for (let i = intervals.length - 1; i >= 0; i--) {
    const [sec, name] = intervals[i]
    const value = Math.floor(seconds / sec)
    if (value >= 1) return `${value} ${name}${value > 1 ? 's' : ''} ago`
  }

  return 'a long time ago'
}

interface CommentSectionProps {
  postId: number
  initialComments: Comment[]
}

export default function CommentSection({
  postId,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  function handleCommentAdded(newComment: Comment) {
    setComments((prev) => [...prev, newComment])
  }

  return (
    <section className="comment-section">
      <h2 className="section-title">
        Komentar
        <span className="comment-count">{comments.length}</span>
      </h2>

      {/* Form komentar */}

      {/* List komentar */}
      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty-comments">
            <p>Belum ada komentar. Jadilah yang pertama!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-name">{comment.name}</span>
                  <span className="comment-time">
                    {timeAgo(comment.created_at)}
                  </span>
                </div>
                <p className="comment-text">{comment.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}