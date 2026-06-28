"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost, getToken } from "../../../services/api";
import { ArrowLeft, Save, FileImage, AlertCircle, Loader2 } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track field validation errors from backend
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Auth check
  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    if (!title.trim() || !content.trim()) {
      const localErrors: Record<string, string> = {};
      if (!title.trim()) localErrors.Title = "This field is required";
      if (!content.trim()) localErrors.Content = "This field is required";
      setFieldErrors(localErrors);
      setError("Judul dan Konten wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await createPost(formData);
      router.push("/admin/posts");
    } catch (err: any) {
      // Check if error contains specific field messages (e.g. Title: This field is required)
      const errorMsg = err.message || "";
      setError(errorMsg);

      // Parse field errors from API (e.g., Title: This field is required, Content: This field is required)
      const parsedFieldErrors: Record<string, string> = {};
      if (errorMsg.toLowerCase().includes("title")) {
        parsedFieldErrors.Title = "This field is required";
      }
      if (errorMsg.toLowerCase().includes("content")) {
        parsedFieldErrors.Content = "This field is required";
      }
      setFieldErrors(parsedFieldErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200/60 sticky top-0 z-40 shadow-soft">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/admin/posts"
            className="text-stone-600 hover:text-primary transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="font-serif font-bold text-slate-800 text-lg">Tulis Artikel Baru</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Form Area */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-10 w-full">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 font-bold">Gagal Menyimpan Artikel</p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-stone-200/50 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (fieldErrors.Title) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.Title;
                    return next;
                  });
                }
              }}
              placeholder="Masukkan judul artikel..."
              className={`block w-full px-4 py-3 border rounded-2xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold ${
                fieldErrors.Title ? "border-red-400 focus:border-red-500" : "border-stone-200 focus:border-primary"
              }`}
            />
            {fieldErrors.Title && (
              <span className="text-red-500 text-xs mt-1 block font-semibold">{fieldErrors.Title}</span>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              Gambar Unggulan (Opsional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Preview Box */}
              <div className="md:col-span-4 border border-dashed border-stone-200 rounded-2xl h-40 bg-stone-50 overflow-hidden flex items-center justify-center relative group">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute inset-0 bg-black/50 text-white font-semibold text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                    >
                      Hapus Gambar
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <FileImage className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-[10px] text-stone-400 font-semibold">Belum ada file dipilih</p>
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="md:col-span-8 space-y-2">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-stone-200 rounded-xl bg-white text-stone-700 text-xs font-bold shadow-sm hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  Pilih Berkas Gambar
                </label>
                <p className="text-xs text-stone-400 leading-relaxed font-semibold">
                  Mendukung berkas JPG, JPEG, PNG, atau WebP. Maksimal 2MB. Gambar ini akan dijadikan cover artikel blog.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              Konten / Isi Artikel <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows={12}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (fieldErrors.Content) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.Content;
                    return next;
                  });
                }
              }}
              placeholder="Tuliskan isi lengkap artikel di sini..."
              className={`block w-full px-4 py-3 border rounded-2xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium leading-relaxed ${
                fieldErrors.Content ? "border-red-400 focus:border-red-500" : "border-stone-200 focus:border-primary"
              }`}
            />
            {fieldErrors.Content && (
              <span className="text-red-500 text-xs mt-1 block font-semibold">{fieldErrors.Content}</span>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/posts"
              className="px-5 py-3 border border-stone-200 rounded-2xl text-stone-700 text-sm font-bold hover:bg-stone-50 transition-colors"
            >
              Batalkan
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-[#7c5333] transition-all font-bold text-sm shadow-md cursor-pointer hover:shadow-lg disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Artikel
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
