import { FortressNodeData, SymbolData, CeremonyStageData, QuizQuestion, CommentData } from "./types";

export const fortressNodes: FortressNodeData[] = [
  {
    id: "kebijaksanaan",
    name: "Kebijaksanaan",
    title: "Sang Hyang Jnana (Kebijaksanaan Sejati)",
    meaning: "Mampu memahami kebenaran sejati untuk membedakan antara yang baik (Sradha) dan buruk. Kebijaksanaan menjadi penuntun utama agar ilmu pengetahuan tidak disalahgunakan, melainkan dipakai untuk menerangi jalan kehidupan.",
    action: "Belajar dengan tekun, rajin membaca pustaka suci atau literatur bermanfaat, serta selalu merenungkan setiap tindakan sebelum melakukannya agar memberikan manfaat bagi diri sendiri dan lingkungan sekitar.",
    example: "Berpikir kritis sebelum menyebarkan informasi atau berita di media sosial. Memilah mana yang merupakan kebenaran yang bermanfaat dan mana yang hanya berupa kebohongan yang merugikan orang lain."
  },
  {
    id: "kejujuran",
    name: "Kejujuran",
    title: "Satya (Kebenaran & Kejujuran)",
    meaning: "Keselarasan yang utuh antara pikiran, perkataan, dan perbuatan. Kejujuran adalah pondasi moral yang menepis kepalsuan dan ilusi duniawi (Maya), sehingga jiwa tetap bersih dan terhindar dari perilaku curang.",
    action: "Mengakui kesalahan dengan berani, berbicara jujur sesuai kebenaran tanpa melebih-lebihkan atau memanipulasi fakta, serta bertindak konsisten dengan nilai kebajikan yang diyakini.",
    example: "Mengerjakan ujian sekolah atau tugas pekerjaan secara mandiri tanpa menyontek, serta mengembalikan barang berharga milik orang lain yang kita temukan di jalan."
  },
  {
    id: "disiplin",
    name: "Disiplin",
    title: "Tapa (Pengendalian & Keteguhan Diri)",
    meaning: "Keteguhan hati dan kedisiplinan diri dalam mengontrol hawa nafsu (Indriya) serta konsisten menjalankan kewajiban hidup (Dharma) meskipun menghadapi berbagai godaan atau rintangan.",
    action: "Mengatur waktu dengan baik antara kewajiban spiritual, belajar, bekerja, dan beristirahat, serta memiliki ketegasan untuk menolak ajakan atau kebiasaan buruk yang merusak diri.",
    example: "Konsisten bangun pagi untuk melakukan perenungan diri atau doa, serta membatasi waktu bermain game atau media sosial demi fokus menyelesaikan tugas-tugas penting tepat waktu."
  },
  {
    id: "kesabaran",
    name: "Kesabaran",
    title: "Kshama (Kesabaran & Pengampunan)",
    meaning: "Kemampuan mengendalikan amarah, memaafkan kesalahan orang lain, dan tetap tenang serta teguh berdiri di tengah badai ujian kehidupan. Kesabaran mencegah terjadinya tindakan gegabah yang merugikan.",
    action: "Menarik napas dalam-dalam saat emosi mulai naik, tidak membalas kejahatan dengan kejahatan, dan memandang setiap kegagalan atau kesulitan sebagai proses penempaan jiwa.",
    example: "Tetap tersenyum, tenang, dan tidak membalas dengan amarah ketika dituduh secara tidak adil oleh orang lain, serta bersedia mendengarkan penjelasan mereka dengan kepala dingin."
  }
];

export const symbolsData: SymbolData[] = [
  {
    id: "canang",
    name: "Canang Sari",
    meaning: "Simbol ketulusan hati dan kesiapan diri dalam mempersembahkan segala pikiran, ucapan, serta perbuatan kehadapan Sang Hyang Widhi Wasa. Canang melambangkan keseimbangan energi alam semesta."
  },
  {
    id: "dupa",
    name: "Dupa",
    meaning: "Simbol saksi suci persembahyangan dan media penghantar doa-doa tulus kita menuju hadapan Sang Hyang Pramesti Guru. Asap dupa yang membubung melambangkan pikiran yang diarahkan ke atas menuju Tuhan."
  },
  {
    id: "banten",
    name: "Banten Pagerwesi",
    meaning: "Simbol persembahan suci dan wujud syukur yang mendalam atas karunia pengetahuan serta perlindungan yang dianugerahkan. Menjadi lambang visual dari tekad memagari diri dengan dharma."
  },
  {
    id: "tirta",
    name: "Tirta",
    meaning: "Air suci penyucian lahir dan batin yang membersihkan kekotoran pikiran (Klesha), sekaligus sebagai berkah pemantapan kekuatan spiritual dan keteduhan hati setelah melaksanakan persembahyangan."
  },
  {
    id: "bunga",
    name: "Bunga",
    meaning: "Simbol ketulusan, keharuman pikiran, keluhuran budi, serta kedamaian jiwa. Warna-warni bunga melambangkan manifestasi kekuatan Tuhan yang menjaga arah angin alam semesta (Dewata Nawa Sanga)."
  }
];

export const ceremonyStages: CeremonyStageData[] = [
  {
    id: "persiapan",
    name: "1. Persiapan",
    subtitle: "Penyucian Diri dan Lingkungan",
    description: "Tahapan awal sebelum upacara dimulai, berfokus pada pembersihan fisik lingkungan tempat suci serta penyucian jasmani dan rohani.",
    details: [
      "Pembersihan area tempat pemujaan (sanggah/pemerajan) serta pekarangan rumah.",
      "Menyiapkan banten khusus Pagerwesi (seperti Banten Pagerwesi, Pajegan, dan Canang Sari).",
      "Melakukan mandi suci (mebersih) sebagai simbol penyucian noda fisik dan batin sebelum sembahyang."
    ],
    offerings: ["Banten Pagerwesi", "Sesayut Pageh Urip", "Canang Sari"],
    values: ["Kebersihan Lahir Batin", "Ketulusan Niat", "Kesucian Pikiran"]
  },
  {
    id: "persembahyangan",
    name: "2. Persembahyangan",
    subtitle: "Menghubungkan Diri dengan Sang Guru",
    description: "Puncak meditasi dan doa yang ditujukan kepada Sang Hyang Pramesti Guru (Tuhan sebagai guru semesta) memohon keteguhan iman dan tuntunan ilmu.",
    details: [
      "Melakukan puja Trisandya secara khusyuk bersama keluarga.",
      "Melakukan Kramaning Sembah (sembah panca sembah) yang ditujukan ke hadapan Sang Hyang Pramesti Guru.",
      "Melakukan hening (meditasi) sejenak memohon penerangan batin agar ilmu pengetahuan menjadi benteng kokoh."
    ],
    offerings: ["Dupa Harum", "Bunga Pancawarna", "Kwanggen"],
    values: ["Bhakti (Devosi)", "Konsentrasi (Ekagrata)", "Kesadaran Spiritual"]
  },
  {
    id: "persembahan",
    name: "3. Persembahan Banten",
    subtitle: "Wujud Harmoni Makro & Mikrokosmos",
    description: "Menghaturkan sesaji di tempat-tempat suci dan pekarangan rumah sebagai wujud syukur atas keseimbangan alam semesta dan perlindungan diri.",
    details: [
      "Menghaturkan banten di Pura Kemulan, Pengrurah, tugu, serta pelataran rumah.",
      "Pemerataan sesaji sebagai simbol harmonisasi alam semesta (Bhuana Agung) dan diri manusia (Bhuana Alit).",
      "Menghaturkan segehan di pintu masuk rumah untuk menetralisir energi negatif agar tidak masuk ke pekarangan."
    ],
    offerings: ["Segehan Manca Warna", "Banten Penyengek", "Banten Pejati"],
    values: ["Yajna (Korban Suci)", "Keseimbangan Kosmis", "Rasa Syukur"]
  },
  {
    id: "penutup",
    name: "4. Penutup (Nunas Tirta)",
    subtitle: "Menerima Berkat Kedamaian",
    description: "Mengakhiri rangkaian upacara dengan memohon air suci (Tirta Wangsupada) dan beras suci (Bija) sebagai simbol pembersihan akhir dan kesejahteraan hidup.",
    details: [
      "Memohon Tirta Wangsupada dari Sang Hyang Pramesti Guru sebagai berkah penyucian diri.",
      "Meminum dan memercikkan tirta ke kepala guna menyucikan pikiran, ucapan, serta perbuatan.",
      "Memasang Bija di dahi (simbol konsentrasi rohani/mata ketiga) dan dada (simbol kemakmuran)."
    ],
    offerings: ["Tirta Wangsupada", "Bija/Wija Suci", "Canang Sari"],
    values: ["Kesucian Akhir", "Kemakmuran & Kesejahteraan", "Kedamaian Hati (Shanti)"]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Pagerwesi berasal dari kata 'Pager' (pagar) dan 'Wesi' (besi). Apakah filosofi utama dari perayaan ini bagi kehidupan manusia?",
    options: [
      "Membangun pagar fisik yang kuat dari besi di sekeliling rumah agar aman dari pencuri.",
      "Memperkuat benteng pertahanan diri dari godaan luar melalui ilmu pengetahuan sejati dan dharma.",
      "Melakukan ritual pengorbanan suci demi mendapatkan kekuatan fisik yang kebal senjata.",
      "Mengadakan perayaan besar-besaran untuk mengusir roh jahat secara berkelompok."
    ],
    answerIndex: 1,
    explanation: "Secara filosofis, Pagerwesi berarti memagari diri (pager) dengan kekuatan spiritual yang kokoh seperti besi (wesi). Benteng perlindungan terkuat ini dicapai melalui ilmu pengetahuan suci yang berlandaskan Dharma."
  },
  {
    id: 2,
    question: "Siapakah manifestasi Tuhan (Ida Sang Hyang Widhi Wasa) yang dipuja secara khusus pada perayaan Hari Raya Pagerwesi?",
    options: [
      "Sang Hyang Pramesti Guru (Tuhan sebagai Guru Sejati Alam Semesta)",
      "Dewa Baruna (Manifestasi Tuhan sebagai Penguasa Lautan)",
      "Dewa Wisnu (Manifestasi Tuhan sebagai Pemelihara Kehidupan)",
      "Dewa Ganesha (Manifestasi Tuhan sebagai Penghalau Rintangan)"
    ],
    answerIndex: 0,
    explanation: "Pada hari raya Pagerwesi, pemujaan ditujukan kepada Sang Hyang Pramesti Guru, yakni Ida Sang Hyang Widhi Wasa dalam manifestasinya sebagai Guru Sejati yang menganugerahkan ilmu pengetahuan demi menuntun manusia dari kegelapan."
  },
  {
    id: 3,
    question: "Pagerwesi dirayakan pada hari Rabu Kliwon wuku Sinta. Berapa harikah jaraknya setelah perayaan Hari Raya Saraswati?",
    options: [
      "1 hari",
      "3 hari",
      "4 hari",
      "10 hari"
    ],
    answerIndex: 2,
    explanation: "Hari Raya Saraswati dirayakan pada hari Sabtu Saniscara Umanis wuku Watugunung (hari terakhir siklus wuku), sedangkan Pagerwesi dirayakan pada hari Rabu Kliwon wuku Sinta (wuku pertama di siklus berikutnya), berjarak tepat 4 hari."
  },
  {
    id: 4,
    question: "Bagaimanakah kaitan filosofis yang erat antara Hari Raya Saraswati dan Hari Raya Pagerwesi?",
    options: [
      "Saraswati melambangkan hari libur nasional, sedangkan Pagerwesi melambangkan hari kerja keras.",
      "Saraswati adalah hari diturunkannya ilmu pengetahuan, sedangkan Pagerwesi adalah hari untuk membentengi diri dengan ilmu tersebut.",
      "Saraswati ditujukan untuk umat yang masih sekolah, sementara Pagerwesi khusus dikhususkan bagi para guru.",
      "Kedua hari raya tersebut bertolak belakang dan tidak memiliki kaitan spiritual satu sama lain."
    ],
    answerIndex: 1,
    explanation: "Pada hari Saraswati, kita menerima anugerah ilmu pengetahuan suci. Pada hari Pagerwesi (4 hari kemudian), kita memohon kekuatan spiritual agar dapat memagari/membentengi kehidupan kita menggunakan ilmu pengetahuan tersebut secara bijaksana."
  },
  {
    id: 5,
    question: "Dalam konteks interaksi 'Benteng Diri', apa saja empat pilar utama yang harus dikembangkan untuk membentengi diri dari pengaruh buruk?",
    options: [
      "Kekayaan, Jabatan, Kekuasaan, dan Keturunan Mulia",
      "Puasa, Mantra Gaib, Bertapa di Hutan, dan Memakai Jimat",
      "Kebijaksanaan, Kejujuran, Disiplin, dan Kesabaran yang berlandaskan Dharma",
      "Kecerdasan Akademik, Kekuatan Fisik, Ketenaran, dan Kelincahan Berbicara"
    ],
    answerIndex: 2,
    explanation: "Empat pilar utama penyusun Benteng Diri menurut nilai luhur Pagerwesi adalah Kebijaksanaan (Jnana), Kejujuran (Satya), Disiplin (Tapa), dan Kesabaran (Kshama). Semuanya harus dihidupi secara harmonis."
  }
];

export const initialComments: CommentData[] = [
  {
    id: "1",
    name: "I Wayan Sudarma",
    comment: "Halaman interaktif ini luar biasa! Diagram Benteng Diri membantu saya memahami filosofi Pagerwesi dengan cara yang menyenangkan dan visual tanpa merasa bosan.",
    date: "28 Juni 2026"
  },
  {
    id: "2",
    name: "Kadek Lestari",
    comment: "Ternyata Pagerwesi memiliki arti yang sangat mendalam tentang memagari kehidupan kita dengan ilmu pengetahuan dan kejujuran. Penjelasannya ringkas dan mengena.",
    date: "28 Juni 2026"
  }
];
