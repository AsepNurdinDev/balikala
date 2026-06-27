export interface ReferenceItem {
  id: number;
  title: string;
  author: string;
  source: string;
  description: string;
  link?: string;
}

const references: ReferenceItem[] = [
  {
    id: 1,
    title: "Lontar Sundarigama",
    author: "Leluhur Hindu Bali",
    source: "Naskah Lontar Keagamaan",
    description: "Naskah suci utama yang memuat panduan hari raya Hindu di Bali, termasuk rincian pelaksanaan Catur Brata Penyepian dan esensi spiritual Hari Suci Nyepi.",
  },
  {
    id: 2,
    title: "Nilai Spiritual Catur Brata Penyepian",
    author: "Parisada Hindu Dharma Indonesia (PHDI)",
    source: "Panduan Keagamaan Nasional",
    description: "Ketetapan resmi PHDI mengenai tatacara pelaksanaan Hari Raya Nyepi, pembagian catur brata, serta batas-batas toleransi kemanusiaan (Amukti Brata).",
    link: "https://phdi.or.id",
  },
  {
    id: 3,
    title: "Kebudayaan Bali dan Rangkaian Ritual",
    author: "Dr. I Wayan Ardika",
    source: "Kajian Ilmiah Universitas Udayana",
    description: "Kajian ilmiah mengenai perkembangan pawai Ogoh-Ogoh sebagai bagian dari Pengrupukan, serta maknanya dalam kohesi sosial masyarakat Bali modern.",
  },
];

export default references;
