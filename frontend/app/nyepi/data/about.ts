export interface AboutCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  title: string;
  paragraphs: string[];
  cards: AboutCard[];
  image: string;
}

const about: AboutData = {
  title: "Tentang Hari Raya Nyepi",
  image: "/nyepii.jpg",
  paragraphs: [
    "Hari Raya Nyepi merupakan Tahun Baru Saka yang dirayakan oleh umat Hindu di Bali. Hari suci ini menjadi momen penting untuk melakukan introspeksi diri, penyucian jiwa, dan menjaga keseimbangan alam semesta.",
    "Nyepi bukan sekadar hari tanpa aktivitas fisik biasa, melainkan sebuah simbol pengendalian diri secara menyeluruh melalui pelaksanaan Catur Brata Penyepian. Ini merupakan bentuk penghormatan tinggi terhadap siklus kehidupan dan menjaga keharmonisan abadi antara manusia, alam, dan pencipta."
  ],
  cards: [
    {
      id: "makna",
      title: "Makna Nyepi",
      description: "Pembersihan Bhuwana Alit (diri manusia) dan Bhuwana Agung (alam semesta) dari pengaruh negatif untuk kembali bersih dan suci.",
      icon: "BookOpen",
    },
    {
      id: "tujuan",
      title: "Tujuan Mulia",
      description: "Memohon kepada Sang Hyang Widhi Wasa agar melimpahkan kedamaian, keselarasan hidup, dan kesejahteraan rohani bagi seluruh makhluk hidup.",
      icon: "Target",
    },
    {
      id: "filosofi",
      title: "Filosofi Mendalam",
      description: "Kembali ke titik nol (keheningan mutlak) untuk mendengarkan suara hati nurani, merenungkan perbuatan masa lalu, dan merancang perbaikan diri.",
      icon: "Flame",
    }
  ]
};

export default about;
