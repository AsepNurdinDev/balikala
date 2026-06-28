export interface PreparationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  philosophicalMeaning: string;
  details: string[];
}

export const PREPARATION_DATA: PreparationItem[] = [
  {
    id: "persiapan",
    title: "Persiapan",
    subtitle: "Penyucian Lahir dan Batin",
    description: "Sebelum memulai rangkaian upacara besar, setiap keluarga Hindu di Bali membersihkan pekarangan rumah dan menyiapkan sarana upacara (banten). Ini melambangkan penyucian diri secara lahiriah dan kesiapan batin.",
    philosophicalMeaning: "Penyucian lahir batin merupakan fondasi utama sebelum berkomunikasi dengan Sang Pencipta. Rumah yang bersih memancarkan energi positif (sattwam), menciptakan lingkungan hening dan suci bagi kedatangan leluhur.",
    details: [
      "Membersihkan pekarangan rumah dan area pemujaan keluarga (Pemerajan).",
      "Menyiapkan seluruh perlengkapan upacara, termasuk kelapa, buah-buahan, dan bunga.",
      "Menyiapkan sarana persembahyangan seperti dupa dan tirta (air suci).",
      "Melaksanakan pembersihan spiritual diri sendiri (melukat/mandi suci) sebagai simbol kesiapan spiritual."
    ]
  },
  {
    id: "penjor",
    title: "Pembuatan Penjor",
    subtitle: "Simbol Kemakmuran & Syukur",
    description: "Penjor dibuat dari bambu utuh melengkung tinggi yang dihias dengan janur, dedaunan, kain, dan berbagai hasil bumi. Penjor dipasang di depan pintu masuk rumah di sebelah kanan pintu gerbang.",
    philosophicalMeaning: "Penjor melambangkan Gunung Agung yang dianggap suci dan merupakan sumber kemakmuran. Lengkungan ujung penjor melambangkan puncak gunung, sedangkan hasil bumi yang digantung melambangkan syukur atas segala anugerah pangan dari Tuhan.",
    details: [
      "Menggunakan bambu lurus berujung melengkung, melambangkan kekuatan dan kelenturan.",
      "Dihiasi dengan janur muda yang melambangkan kesucian dan ketulusan hati.",
      "Menggantungkan hasil bumi (pala bungkah dan pala gantung) sebagai bentuk persembahan.",
      "Pemasangan dilakukan pada sore hari Penampahan Galungan sebagai batas akhir persiapan."
    ]
  },
  {
    id: "banten",
    title: "Pembuatan Banten",
    subtitle: "Sarana Komunikasi Spiritual",
    description: "Banten adalah sesaji rajutan janur yang berisi bunga, buah, jajan, dan makanan ritual. Banten dibuat dengan penuh konsentrasi dan keikhlasan (yadnya) oleh para wanita keluarga.",
    philosophicalMeaning: "Banten berasal dari kata 'Bantu' (alat) dan 'Enten' (ingat/sadar), yang bermakna sarana untuk membangkitkan kesadaran spiritual manusia. Ia merupakan bahasa simbolis yang mengekspresikan rasa terima kasih yang mendalam kepada Sang Pencipta.",
    details: [
      "Pembuatan banten Galungan seperti Banten tumpeng, Banten Pejati, dan Sodan.",
      "Menyusun buah, kue tradisional, dan bunga berwarna-warni sesuai arah mata angin.",
      "Setiap elemen banten memiliki makna simbolis yang mewakili unsur-unsur alam semesta (Panca Maha Bhuta).",
      "Dibuat secara gotong royong, mempererat ikatan kekerabatan keluarga."
    ]
  },
  {
    id: "mecaru",
    title: "Mecaru",
    subtitle: "Penyelarasan Manusia dengan Semesta",
    description: "Mecaru adalah ritual persembahan yang ditujukan kepada Bhuta Kala (kekuatan alam bawah). Ritual ini dilaksanakan di pekarangan rumah (nista mandala) atau perempatan desa pada sore hari.",
    philosophicalMeaning: "Mecaru bermakna keharmonisan atau penetralan. Ritual ini bukan menyembah roh jahat, melainkan bentuk penyelarasan hubungan antara manusia dengan alam semesta (Bhuta Hita) agar kekuatan negatif bertransformasi menjadi energi positif yang melindungi.",
    details: [
      "Menghaturkan segehan (nasi lima warna) di pekarangan rumah atau pintu masuk.",
      "Memercikkan tirta pengrupukan untuk menetralisir energi negatif.",
      "Bunyi kentongan dan taburan obor keliling rumah untuk mengusir kegelapan spiritual.",
      "Menciptakan keseimbangan kosmis agar hari raya Galungan esok hari dapat dilalui dengan damai dan suci."
    ]
  }
];
