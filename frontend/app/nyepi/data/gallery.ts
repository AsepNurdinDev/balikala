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
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=800",
    alt: "Pawai Ogoh-ogoh menjelang Nyepi",
    title: "Kemeriahan Pawai Ogoh-Ogoh",
    category: "Pengrupukan",
    description: "Karya seni patung raksasa yang diarak keliling desa pada malam Pengrupukan untuk mengusir kekuatan negatif sebelum keheningan Nyepi.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=800",
    alt: "Candi Bentar dan suasana hening Bali",
    title: "Keheningan Pura Penataran",
    category: "Nyepi",
    description: "Gerbang pura yang megah berdiri di tengah keheningan pulau Bali saat seluruh aktivitas dihentikan total selama 24 jam.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
    alt: "Upacara Melukat penyucian diri",
    title: "Melukat: Penyucian Diri",
    category: "Ritual",
    description: "Prosesi penyucian jiwa dan pikiran dengan air suci sebagai rangkaian spiritual menyambut Tahun Baru Saka yang bersih.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800",
    alt: "Umat Hindu bersembahyang",
    title: "Persembahyangan Khusyuk",
    category: "Ritual",
    description: "Umat Hindu mengenakan pakaian adat putih bersih, bersembahyang memohon keselamatan dan keharmonisan jagat raya.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1577717900162-27b1fa7b3225?q=80&w=800",
    alt: "Canang Sari sebagai persembahan",
    title: "Canang Sari & Wewangian",
    category: "Simbol",
    description: "Persembahan harian berupa bunga warna-warni dan dupa sebagai simbol rasa syukur dan keseimbangan hubungan manusia dengan Tuhan.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1518548419070-ad8e3b54822c?q=80&w=800",
    alt: "Ngembak Geni silaturahmi",
    title: "Dharma Shanti Ngembak Geni",
    category: "Ngembak Geni",
    description: "Momen silaturahmi, saling memaafkan, dan merayakan kehidupan baru dengan senyuman dan kedamaian setelah Nyepi usai.",
  },
];

export default gallery;
