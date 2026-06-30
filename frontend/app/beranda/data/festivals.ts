export interface Festival {
  id: string;
  name: string;
  date: string;
  formattedDate: string;
  nextDate: string;
  category: string;
  shortDesc: string;
  description: string;
  rituals: string[];
  color: string;
  gradient: string;
  illustrationType: 'nyepi' | 'galungan' | 'kuningan' | 'saraswati' | 'pagerwesi' | 'pengrupukan';
}

export const FESTIVALS: Festival[] = [
  {
    id: "nyepi",
    name: "Nyepi",
    date: "8 Maret 2027",
    formattedDate: "Senin, 8 Maret 2027",
    nextDate: "2027-03-08T06:00:00",
    category: "Sasih (Sasih Kesanga)",
    shortDesc: "Hari Penyucian Diri dan Alam Semesta melalui Catur Brata Penyepian.",
    description: "Nyepi adalah hari raya Hindu yang dirayakan setiap tahun Baru Saka. Hari ini jatuh pada sehari setelah tilem Kesanga. Pada hari Nyepi, umat Hindu melaksanakan Catur Brata Penyepian: Amati Geni (tidak menyalakan api), Amati Karya (tidak bekerja), Amati Lelungan (tidak bepergian), dan Amati Lelanguan (tidak bersenang-senang). Suasana sunyi senyap menyelimuti seluruh pulau Bali selama 24 jam untuk memberikan kesempatan alam semesta memulihkan diri secara spiritual dan ekologis.",
    rituals: [
      "Melasti (penyucian sarana upacara di laut/sumber air 3-4 hari sebelum Nyepi)",
      "Tawur Agung Kesanga (upacara sesajen besar di persimpangan jalan sehari sebelum Nyepi)",
      "Catur Brata Penyepian (24 jam meditasi, keheningan total, tanpa aktivitas)",
      "Ngembak Geni (silaturahmi, mengunjungi kerabat, saling memaafkan sehari setelah Nyepi)"
    ],
    color: "#8B5E3C",
    gradient: "from-stone-850 via-stone-800 to-stone-900",
    illustrationType: 'nyepi'
  },
  {
    id: "galungan",
    name: "Galungan",
    date: "13 Januari 2027",
    formattedDate: "Rabu, 13 Januari 2027",
    nextDate: "2027-01-13T08:00:00",
    category: "Pawukon (Rabu Kliwon Dungulan)",
    shortDesc: "Kemenangan Dharma (Kebaikan) melawan Adharma (Keburukan).",
    description: "Galungan dirayakan oleh umat Hindu Bali setiap 210 hari sekali (menggunakan kalender wuku). Hari raya ini menandai kemenangan Dharma (kebaikan) atas Adharma (kejahatan). Ciri khas perayaan Galungan adalah pemasangan Penjor (hiasan bambu melengkung yang megah dihiasi janur dan hasil bumi) di depan rumah sebagai simbol syukur kepada Sang Hyang Widhi atas segala kemakmuran dan lambang Gunung Agung yang suci.",
    rituals: [
      "Tumpek Wariga (penyucian tumbuh-tumbuhan untuk kelayakan sarana upacara)",
      "Sugihan Jawa & Sugihan Bali (pembersihan alam semesta secara makrokosmos dan mikrokosmos)",
      "Penampahan Galungan (persiapan sesaji, pemotongan babi untuk hidangan lawar)",
      "Persembahyangan Galungan (sembahyang bersama keluarga di Pemerajan dan Pura Kahyangan Tiga)"
    ],
    color: "#C89B3C",
    gradient: "from-amber-800 via-amber-600 to-[#C89B3C]",
    illustrationType: 'galungan'
  },
  {
    id: "kuningan",
    name: "Kuningan",
    date: "23 Januari 2027",
    formattedDate: "Sabtu, 23 Januari 2027",
    nextDate: "2027-01-23T08:00:00",
    category: "Pawukon (Sabtu Kliwon Kuningan)",
    shortDesc: "Hari Pemujaan Dewa dan Leluhur yang Turun Memberikan Berkah.",
    description: "Kuningan dirayakan tepat 10 hari setelah Galungan. Umat Hindu meyakini bahwa pada hari Kuningan para Dewa, Bhatara, dan leluhur turun kembali ke bumi untuk memberikan wara nugraha (berkah). Persembahyangan pada hari Kuningan harus diselesaikan sebelum tengah hari (jam 12 siang), karena setelah itu para leluhur diyakini kembali ke swargaloka. Nasi kuning disajikan dalam wadah selanggi sebagai simbol kemakmuran.",
    rituals: [
      "Penampahan Kuningan (malam persiapan sesaji khusus)",
      "Pemasangan Tamiang dan Endongan (tamiang lambang perlindungan dewa, endongan lambang bekal spiritual)",
      "Persembahyangan Pagi Hari (dilaksanakan khusyuk sebelum matahari berada tegak lurus)",
      "Sajian Nasi Kuning (simbol limpahan karunia pangan dan materi dari Yang Maha Kuasa)"
    ],
    color: "#C89B3C",
    gradient: "from-yellow-750 via-[#C89B3C] to-amber-500",
    illustrationType: 'kuningan'
  },
  {
    id: "saraswati",
    name: "Saraswati",
    date: "31 Oktober 2026",
    formattedDate: "Sabtu, 31 Oktober 2026",
    nextDate: "2026-10-31T08:00:00",
    category: "Pawukon (Sabtu Umanis Watugunung)",
    shortDesc: "Turunnya Ilmu Pengetahuan Suci dan Penghormatan Dewi Saraswati.",
    description: "Hari Raya Saraswati adalah hari pemujaan terhadap Dewi Saraswati sebagai dewi ilmu pengetahuan, seni, dan sastra suci. Pada hari ini, kitab suci, lontar, buku-buku pelajaran ditata rapi untuk diupacarai sesaji. Pelajar, guru, dan umat Hindu pergi ke sekolah dan pura untuk memohon ketajaman pikiran (cipta) dan kebijaksanaan. Di hari ini, umat Hindu dilarang untuk membaca atau menulis buku sebagai bentuk takzim penghormatan.",
    rituals: [
      "Penyucian Kitab/Lontar (buku ditata di tempat suci dan dihaturkan sesajen khusus)",
      "Persembahyangan Bersama (sembahyang di Pura Padmasana sekolah atau pura universitas)",
      "Banyu Pinaruh (ritual mandi/keramas di laut atau sumber air suci keesokan paginya sebelum matahari terbit)",
      "Dharma Gita (membaca lontar keagamaan secara berkelompok di malam hari)"
    ],
    color: "#8B5E3C",
    gradient: "from-teal-850 via-emerald-800 to-emerald-600",
    illustrationType: 'saraswati'
  },
  {
    id: "pagerwesi",
    name: "Pagerwesi",
    date: "4 November 2026",
    formattedDate: "Rabu, 4 November 2026",
    nextDate: "2026-11-04T08:00:00",
    category: "Pawukon (Rabu Kliwon Sinta)",
    shortDesc: "Memagari Diri dengan Benteng Ilmu Pengetahuan dan Keteguhan Iman.",
    description: "Pagerwesi dirayakan empat hari setelah Saraswati. Pagerwesi berasal dari kata 'pager' (pagar/benteng) dan 'wesi' (besi), yang melambangkan perlindungan diri yang kuat. Hari raya ini bertujuan untuk memagari jiwa dan pikiran umat agar tidak terpengaruh oleh godaan negatif, menggunakan ilmu pengetahuan suci yang diperoleh saat Saraswati. Pemujaan ditujukan kepada Sanghyang Pramesti Guru (Tuhan sebagai guru semesta).",
    rituals: [
      "Pemujaan Sanghyang Pramesti Guru (memohon perlindungan spiritual dan tuntunan moral)",
      "Mebanten Pagerwesi (menghaturkan sesaji khusus di pekarangan rumah dan pura keluarga)",
      "Yoga Samadhi (melakukan perenungan batin dan meditasi hening)",
      "Mapinton (upacara pengenalan ajaran suci bagi anak-anak yang mulai belajar)"
    ],
    color: "#A61E2D",
    gradient: "from-stone-900 via-rose-950 to-[#A61E2D]",
    illustrationType: 'pagerwesi'
  }
];
