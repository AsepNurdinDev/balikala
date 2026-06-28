import { CeremonyStep } from "../type";

export const ceremonySteps: CeremonyStep[] = [
  {
    id: "persiapan",
    stepNumber: 1,
    name: "Persiapan",
    description: "Mempersiapkan sarana prasarana serta menata sumber-sumber pengetahuan sebelum ritual dimulai.",
    details: [
      "Membersihkan area ibadah (Sanggah/Merajan) serta meja belajar/ruang pustaka.",
      "Mengumpulkan dan menata dengan rapi buku-buku pelajaran, kitab suci, lontar, atau catatan penting di tempat pemujaan.",
      "Merangkai Banten Saraswati (sesaji khas yang berhiaskan jajan suci berwarna kuning, buah, dan canang)."
    ]
  },
  {
    id: "persembahyangan",
    stepNumber: 2,
    name: "Persembahyangan",
    description: "Melakukan doa bersama untuk memuja manifestasi Ida Sang Hyang Widhi Wasa sebagai Dewi Saraswati.",
    details: [
      "Mengenakan pakaian adat Bali yang bersih, rapi, dan bernuansa putih/kuning.",
      "Melakukan persembahyangan bersama keluarga di Merajan, lalu dilanjutkan ke Pura sekolah, kampus, atau kantor.",
      "Melakukan Tri Sandhya dan Kramaning Sembah dengan memusatkan pikiran pada kejernihan akal budi."
    ]
  },
  {
    id: "menghaturkan-banten",
    stepNumber: 3,
    name: "Menghaturkan Banten",
    description: "Menghaturkan sesaji (banten) di atas tumpukan buku sebagai simbol rasa syukur atas limpahan pengetahuan.",
    details: [
      "Menempatkan banten Saraswati di atas tumpukan buku-buku yang telah ditata sebelumnya.",
      "Memercikkan air suci (Tirta Saraswati) pada buku dan sesaji sebagai lambang penyucian sumber belajar.",
      "Memohon berkah agar aksara dan ilmu di dalam buku dapat menjadi penerang kehidupan."
    ]
  },
  {
    id: "menghormati-buku",
    stepNumber: 4,
    name: "Menghormati Buku (Brata)",
    description: "Menghindari aktivitas membaca dan menulis selama hari raya sebagai wujud kontemplasi dan penghormatan.",
    details: [
      "Melaksanakan Brata (pantangan) untuk tidak membaca atau menulis sejak banten dihaturkan hingga keesokan paginya.",
      "Melakukan jeda belajar formal guna memberi kesempatan pikiran melakukan kontemplasi/refleksi spiritual.",
      "Menjaga kesucian diri dan menghormati buku-buku sebagai stana (tempat bersemayam) Dewi Saraswati."
    ]
  },
  {
    id: "penutup",
    stepNumber: 5,
    name: "Banyu Pinaruh (Penutup)",
    description: "Ritual pembersihan diri (melukat) di pantai atau sumber air suci pada keesokan hari sebelum matahari terbit.",
    details: [
      "Bangun sebelum matahari terbit pada hari Minggu (Redite) Pahing Sinta untuk menuju ke pantai, sungai, atau pancuran suci.",
      "Melakukan pembersihan lahir dan batin (melukat) dengan keramas air campuran bunga atau banyu pinaruh.",
      "Menikmati 'Nasi Pradnyam' (nasi kuning suci) bersama keluarga sebagai simbol menyerap inti sari kecerdasan dan kekuatan pikiran baru."
    ]
  }
];
