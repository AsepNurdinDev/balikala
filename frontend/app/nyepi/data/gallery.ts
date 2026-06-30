export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    src: "/pawai_gallery.jpg",
    alt: "Pawai Ogoh-ogoh menjelang Nyepi",
    title: "Kemeriahan Pawai Ogoh-Ogoh",
    category: "Pengrupukan",
    description: "Karya seni patung raksasa yang diarak keliling desa pada malam Pengrupukan untuk mengusir kekuatan negatif sebelum keheningan Nyepi.",
  },
  {
    id: 2,
    src: "/nyepi_gallery.jpg",
    alt: "suasana hening Bali",
    title: "Keheningan jalan raya",
    category: "Nyepi",
    description: "dua pecalang sedang memeriksa jalan selama seluruh aktivitas dihentikan total selama 24 jam.",
  },
  {
    id: 3,
    src: "/melukat.jpg",
    alt: "Upacara Melukat penyucian diri",
    title: "Melukat: Penyucian Diri",
    category: "Ritual",
    description: "Prosesi penyucian jiwa dan pikiran dengan air suci sebagai rangkaian spiritual menyambut Tahun Baru Saka yang bersih.",
  },
  {
    id: 4,
    src: "/sembahyang.jpg",
    alt: "Umat Hindu bersembahyang",
    title: "Persembahyangan Khusyuk",
    category: "Ritual",
    description: "Umat Hindu mengenakan pakaian adat putih bersih, bersembahyang memohon keselamatan dan keharmonisan jagat raya.",
  },
  {
    id: 5,
    src: "/canang.jpg",
    alt: "Canang Sari sebagai persembahan",
    title: "Canang Sari & Wewangian",
    category: "Simbol",
    description: "Persembahan harian berupa bunga warna-warni dan dupa sebagai simbol rasa syukur dan keseimbangan hubungan manusia dengan Tuhan.",
  },
  {
    id: 6,
    src: "/ngembak_geni.avif",
    alt: "Ngembak Geni silaturahmi",
    title: "Dharma Shanti Ngembak Geni",
    category: "Ngembak Geni",
    description: "Momen silaturahmi, saling memaafkan, dan merayakan kehidupan baru dengan senyuman dan kedamaian setelah Nyepi usai.",
  },
];

export default gallery;
