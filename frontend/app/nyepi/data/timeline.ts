export interface TimelineItem {
  id: number;
  title: string;
  day: string;
  image: string;
  description: string;
  button: string;
  target: string;
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    title: "Pengrupukan",
    day: "Sehari Sebelum Nyepi",
    image: "/ngerupuk.jpg",
    description:
      "Pengrupukan merupakan rangkaian upacara yang dilaksanakan sehari sebelum Hari Raya Nyepi. Pada tahap ini masyarakat melaksanakan pawai Ogoh-Ogoh sebagai simbol menetralisir sifat-sifat negatif (Bhuta Kala) agar tercipta keseimbangan alam.",
    button: "Lihat Ogoh-Ogoh 3D",
    target: "ogoh-3d-section",
  },

  {
    id: 2,
    title: "Hari Raya Nyepi",
    day: "Tahun Baru Saka",
    image: "/nyepi.jpg",
    description:
      "Hari Raya Nyepi merupakan puncak perayaan Tahun Baru Saka. Umat Hindu melaksanakan Catur Brata Penyepian sebagai bentuk pengendalian diri, introspeksi, serta menjaga keharmonisan antara manusia dan alam semesta.",
    button: "Pelajari Catur Brata",
    target: "catur-brata-section",
  },

  {
    id: 3,
    title: "Ngembak Geni",
    day: "Sehari Setelah Nyepi",
    image: "/ngembak.jpeg",
    description:
      "Ngembak Geni menjadi penutup rangkaian Hari Raya Nyepi. Pada hari ini masyarakat saling bermaaf-maafan, mempererat tali persaudaraan, serta memulai aktivitas dengan semangat baru.",
    button: "Lihat Galeri",
    target: "gallery-section",
  },
];

export default timeline;
