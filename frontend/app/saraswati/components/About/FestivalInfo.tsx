"use client";

import { motion } from "framer-motion";
import { Book, Calendar, Sparkles, Heart } from "lucide-react";

export default function FestivalInfo() {
  const infos = [
    {
      icon: <Book className="w-6 h-6 text-blue-650" />,
      title: "Apa Itu Saraswati?",
      description: "Hari raya suci umat Hindu Bali untuk merayakan turunnya ilmu pengetahuan sebagai pembebas manusia dari kebodohan."
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      title: "Kapan Dirayakan?",
      description: "Dirayakan setiap 210 hari (6 bulan Bali) sekali pada hari Sabtu (Saniscara) Umanis wuku Watugunung."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      title: "Mengapa Dirayakan?",
      description: "Sebagai ungkapan syukur dan pemujaan kepada manifestasi Tuhan (Dewi Saraswati) atas berkah akal pikiran."
    },
    {
      icon: <Heart className="w-6 h-6 text-amber-500" />,
      title: "Apa Maknanya?",
      description: "Mengingatkan manusia untuk terus belajar, menuntut kebijaksanaan, dan memanfaatkan ilmu demi keselamatan alam semesta."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {infos.map((info, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all flex gap-5 items-start"
        >
          <div className="p-4 bg-slate-50 border border-slate-100/50 rounded-2xl shrink-0">
            {info.icon}
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-extrabold text-slate-800 text-lg">{info.title}</h3>
            <p className="text-slate-550 text-sm leading-relaxed font-medium">{info.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
