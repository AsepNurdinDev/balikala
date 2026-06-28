"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Send } from "lucide-react";

interface CommentFormProps {
  onSubmit: (name: string, comment: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;
    onSubmit(name.trim(), commentText.trim());
    setName("");
    setCommentText("");
  };

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-xs">
      <h3 className="font-serif font-bold text-slate-800 text-lg mb-5">Tulis Komentar</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field */}
        <div className="space-y-1.5">
          <label htmlFor="sara-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Nama Lengkap
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="sara-name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda..."
              className="w-full bg-white border border-slate-200 focus:border-blue-300 rounded-xl pl-11 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition placeholder-slate-350"
            />
          </div>
        </div>

        {/* Comment field */}
        <div className="space-y-1.5">
          <label htmlFor="sara-comment-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Komentar Anda
          </label>
          <textarea
            id="sara-comment-input"
            required
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Bagikan pemikiran Anda tentang Hari Raya Saraswati..."
            className="w-full bg-white border border-slate-200 focus:border-blue-300 rounded-xl p-4 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition resize-none placeholder-slate-350"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!name.trim() || !commentText.trim()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold tracking-wide transition shadow-md shadow-blue-500/10 cursor-pointer text-xs uppercase"
        >
          <Send className="w-4 h-4" />
          Kirim Tanggapan
        </motion.button>
      </form>
    </div>
  );
}
