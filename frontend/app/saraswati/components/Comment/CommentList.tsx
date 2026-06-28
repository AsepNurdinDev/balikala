"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CommentData } from "../../type";
import { getInitials } from "../../utils";

interface CommentListProps {
  comments: CommentData[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif font-bold text-slate-800 text-lg flex items-center gap-2">
        Daftar Komentar
        <span className="text-sm font-extrabold text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">
          {comments.length}
        </span>
      </h3>

      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-hide">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-xs hover:shadow-sm transition"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xs font-bold shrink-0">
                {getInitials(comment.name)}
              </div>

              {/* Content */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-800 text-sm">{comment.name}</span>
                  <span className="text-slate-400 text-[10px] md:text-xs font-semibold">{comment.date}</span>
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                  {comment.comment}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
