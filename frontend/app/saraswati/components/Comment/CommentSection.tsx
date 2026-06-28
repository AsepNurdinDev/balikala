"use client";

import { useState } from "react";
import { CommentData } from "../../type";
import { formatIndonesianDate } from "../../utils";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { MessageSquare } from "lucide-react";

const initialComments: CommentData[] = [
  {
    id: "1",
    name: "Ni Luh Ayu Sari",
    comment: "Halaman ini luar biasa! Baru pertama kali saya benar-benar memahami makna setiap simbol Dewi Saraswati secara mendalam. Teratai sebagai simbol kesucian di tengah lumpur sangat menginspirasi saya sebagai pelajar.",
    date: "15 Juni 2025",
  },
  {
    id: "2",
    name: "I Made Dharma Putra",
    comment: "Visualisasi 3D model Dewi Saraswati sangat membantu! Saya bisa langsung melihat hubungan antara simbol-simbol dan maknanya. Sungguh pengalaman belajar yang berbeda dari biasanya.",
    date: "28 Mei 2025",
  },
  {
    id: "3",
    name: "Kadek Surya Wijaya",
    comment: "Prosesi Banyu Pinaruh ternyata memiliki makna yang sangat mendalam. Platform BaliKala membantu generasi muda seperti saya untuk lebih menghargai dan melestarikan tradisi leluhur.",
    date: "10 April 2025",
  },
];

export default function CommentSection() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const handleNewComment = (name: string, commentText: string) => {
    const newComment: CommentData = {
      id: Date.now().toString(),
      name,
      comment: commentText,
      date: formatIndonesianDate(new Date()),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section
      id="comments-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-t border-slate-200/40 scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Ruang Diskusi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-800">
            Tanggapan & Komentar
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Bagikan pemikiran, perenungan, atau pertanyaan Anda tentang Hari Raya Saraswati bersama para pelajar lainnya.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left — Form */}
          <div className="lg:col-span-5">
            <CommentForm onSubmit={handleNewComment} />
          </div>

          {/* Right — List */}
          <div className="lg:col-span-7">
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </section>
  );
}
