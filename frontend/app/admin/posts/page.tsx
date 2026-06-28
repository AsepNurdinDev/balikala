"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllPosts, deletePost, getToken, logout, getImageUrl, Post } from "../../services/api";
import { Plus, Edit2, Trash2, MessageSquare, LogOut, Search, FileText, Calendar, AlertCircle } from "lucide-react";

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Authentication check and load data
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts(query);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat daftar artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(search);
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      try {
        await deletePost(id);
        setPosts((prev) => prev.filter((post) => post.id !== id));
      } catch (err: any) {
        alert(err.message || "Gagal menghapus artikel.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans">
      {/* Header Dashboard */}
      <header className="bg-white border-b border-stone-200/60 sticky top-0 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-extrabold tracking-wide text-primary flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base">B</span>
              <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
            </Link>
            <span className="text-stone-300">|</span>
            <h1 className="text-sm font-bold text-stone-600 uppercase tracking-widest">
              Dashboard Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/comments"
              className="text-stone-600 hover:text-primary transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-50"
            >
              <MessageSquare className="w-4 h-4" />
              Kelola Komentar
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
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex-grow md:max-w-md relative flex items-center">
            <input
              type="text"
              placeholder="Cari artikel berdasarkan judul atau konten..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-24 py-3 border border-stone-200 rounded-2xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition-all"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3" />
            <button
              type="submit"
              className="absolute right-2 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-[#7c5333] transition-colors cursor-pointer"
            >
              Cari
            </button>
          </form>

          <Link
            href="/admin/posts/create"
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl hover:bg-[#7c5333] transition-all font-bold text-sm shadow-md cursor-pointer hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Tulis Artikel Baru
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span className="text-sm text-red-700 font-semibold">{error}</span>
          </div>
        )}

        {/* Posts Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-500 text-sm font-semibold">Memuat daftar artikel...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-stone-200/50 rounded-3xl p-12 text-center shadow-soft">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-slate-700 mb-1">
              Tidak Ada Artikel
            </h3>
            <p className="text-stone-400 text-sm mb-6 max-w-sm mx-auto">
              {search ? `Pencarian untuk "${search}" tidak menemukan hasil.` : "Belum ada artikel yang dipublikasikan di blog ini."}
            </p>
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  fetchPosts("");
                }}
                className="text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border border-stone-200/50 rounded-3xl overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="py-4 px-6 text-xs font-bold text-stone-500 uppercase tracking-wider">Artikel</th>
                    <th className="py-4 px-6 text-xs font-bold text-stone-500 uppercase tracking-wider hidden md:table-cell">Tanggal Pembuatan</th>
                    <th className="py-4 px-6 text-xs font-bold text-stone-500 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200/40 relative">
                            {post.image ? (
                              <img
                                src={getImageUrl(post.image)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback if image load fails
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-slate-800 text-base line-clamp-1">
                              {post.title}
                            </h4>
                            <p className="text-stone-400 text-xs mt-0.5 line-clamp-1 max-w-lg">
                              {post.content}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-stone-500 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-stone-400" />
                          {new Date(post.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/blog/${post.id}`}
                            target="_blank"
                            className="text-stone-500 hover:text-primary transition p-2 rounded-xl hover:bg-stone-100 cursor-pointer"
                            title="Lihat Halaman Publik"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-blue-600 hover:text-blue-700 transition p-2 rounded-xl hover:bg-blue-50 cursor-pointer"
                            title="Edit Artikel"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="text-red-600 hover:text-red-700 transition p-2 rounded-xl hover:bg-red-50 cursor-pointer"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
