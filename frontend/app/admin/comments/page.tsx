"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getCommentsByPost, deleteComment, getToken, logout, Comment } from "../../services/api";
import { ArrowLeft, Trash2, LogOut, MessageSquare, AlertCircle, Calendar, Mail, User } from "lucide-react";

interface CommentWithPostTitle extends Comment {
  post_title: string;
}

export default function AdminCommentsPage() {
  const router = useRouter();
  const [comments, setComments] = useState<CommentWithPostTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadAllComments();
  }, [router]);

  const loadAllComments = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get all posts
      const posts = await getAllPosts();
      
      // 2. Fetch comments for each post in parallel
      const commentsPromises = posts.map(async (post) => {
        try {
          const postComments = await getCommentsByPost(post.id);
          return postComments.map((c) => ({
            ...c,
            post_title: post.title,
          }));
        } catch (e) {
          // If a specific post fails or has no comments, return empty array gracefully
          return [];
        }
      });

      const results = await Promise.all(commentsPromises);
      
      // 3. Flatten and sort comments ascending by created_at (as per API contract)
      const allComments = results.flat().sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });

      setComments(allComments);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data komentar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      try {
        await deleteComment(id);
        setComments((prev) => prev.filter((c) => c.id !== id));
      } catch (err: any) {
        alert(err.message || "Gagal menghapus komentar.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200/60 sticky top-0 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-extrabold tracking-wide text-primary flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base">B</span>
              <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
            </Link>
            <span className="text-stone-300">|</span>
            <h1 className="text-sm font-bold text-stone-600 uppercase tracking-widest flex items-center gap-1">
              Dashboard Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts"
              className="text-stone-600 hover:text-primary transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Artikel
            </Link>
            
            <button
              onClick={() => logout()}
              className="text-red-600 hover:text-red-700 transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-800">Manajemen Komentar</h2>
          <p className="text-stone-500 text-sm mt-1">Daftar komentar dari pengunjung blog BaliKala</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span className="text-sm text-red-700 font-semibold">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-500 text-sm font-semibold">Memuat data seluruh komentar...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white border border-stone-200/50 rounded-3xl p-12 text-center shadow-soft">
            <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-slate-700 mb-1">
              Tidak Ada Komentar
            </h3>
            <p className="text-stone-400 text-sm max-w-sm mx-auto">
              Belum ada komentar dari pengguna pada artikel blog mana pun.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-stone-200/40 rounded-3xl p-6 shadow-soft hover:shadow-medium transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {comment.name}
                    </span>
                    {comment.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {comment.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(comment.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed font-medium bg-stone-50/50 p-3.5 rounded-2xl border border-stone-100">
                    {comment.body}
                  </p>

                  <div className="text-xs text-stone-400">
                    Komentar pada artikel:{" "}
                    <span className="font-bold text-primary italic">
                      "{comment.post_title}"
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex justify-end">
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-700 transition p-3 rounded-2xl hover:bg-red-50 cursor-pointer flex items-center gap-1 text-xs font-bold border border-red-100"
                    title="Hapus Komentar"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus Komentar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
