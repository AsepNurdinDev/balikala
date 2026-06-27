export interface BrataItem {
  id: string;
  title: string;
  translation: string;
  shortDesc: string;
  longDesc: string;
  philosophy: string;
  icon: string;
}

const caturBrata: BrataItem[] = [
  {
    id: "amati-geni",
    title: "Amati Geni",
    translation: "Tidak Menyalakan Api",
    shortDesc: "Pantangan menyalakan api atau cahaya fisik serta mengendalikan api amarah dalam diri.",
    longDesc: "Amati Geni mewajibkan umat untuk tidak menyalakan api, lampu, atau alat penerangan lainnya secara fisik. Secara spiritual, ini bermakna memadamkan kobaran api nafsu, amarah, keserakahan, dan ego yang ada dalam diri manusia.",
    philosophy: "Kesunyian total tanpa cahaya luar membantu mengarahkan pandangan ke dalam diri sendiri (introspeksi). Dengan memadamkan cahaya fisik, kita mengaktifkan cahaya spiritual di dalam jiwa untuk melihat kebenaran sejati.",
    icon: "FlameOff",
  },
  {
    id: "amati-karya",
    title: "Amati Karya",
    translation: "Tidak Bekerja",
    shortDesc: "Pantangan melakukan pekerjaan duniawi, mengalihkan fokus ke perenungan spiritual.",
    longDesc: "Amati Karya melarang segala bentuk aktivitas kerja fisik atau pekerjaan sehari-hari. Umat diajak menghentikan kesibukan duniawi yang tak pernah usai untuk memberikan ruang bagi raga beristirahat dan bagi jiwa untuk merenung.",
    philosophy: "Kehidupan modern sering kali membuat manusia terasing dari dirinya sendiri karena kesibukan tanpa henti. Amati Karya adalah momen jeda sakral untuk menyelaraskan kembali pikiran, menghentikan pengejaran materi sejenak, dan fokus pada pembersihan rohani.",
    icon: "BriefcaseX",
  },
  {
    id: "amati-lelungan",
    title: "Amati Lelungan",
    translation: "Tidak Bepergian",
    shortDesc: "Pantangan bepergian keluar rumah, berdiam diri di tempat tinggal untuk mawas diri.",
    longDesc: "Amati Lelungan melarang umat untuk bepergian keluar dari pekarangan rumah atau berjalan-jalan. Semua orang berdiam diri di rumah masing-masing, menciptakan keheningan mutlak di seluruh penjuru Bali.",
    philosophy: "Dengan berdiam di rumah, manusia diajak untuk 'pulang' ke dalam pusat kesadarannya sendiri. Ini melambangkan pemusatan pikiran dan pencegahan indra dari gangguan dunia luar agar meditasi berjalan dengan khusyuk.",
    icon: "MapPinOff",
  },
  {
    id: "amati-lelanguan",
    title: "Amati Lelanguan",
    translation: "Tidak Menikmati Hiburan",
    shortDesc: "Pantangan menikmati kesenangan indrawi, permainan, musik, maupun bersenang-senang.",
    longDesc: "Amati Lelanguan melarang segala bentuk hiburan, rekreasi, permainan, atau aktivitas rekreatif yang memanjakan panca indra. Tidak ada musik, tontonan, atau pesta pora yang diperbolehkan.",
    philosophy: "Pantangan ini melatih keteguhan diri terhadap kepuasan indrawi. Melalui keheningan dari hiburan luar, umat dapat merasakan kedamaian sejati yang bersumber dari ketenangan batin, bukan rangsangan eksternal.",
    icon: "SmileOff",
  },
];

export default caturBrata;
