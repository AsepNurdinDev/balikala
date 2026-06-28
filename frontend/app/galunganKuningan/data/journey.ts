export interface JourneyDay {
  dayNumber: number;
  name: string;
  balineseDay: string;
  activity: string;
  philosophy: string;
  culturalNote: string;
}

export const JOURNEY_DATA: JourneyDay[] = [
  {
    dayNumber: 1,
    name: "Hari Raya Galungan",
    balineseDay: "Budha Kliwon Dungulan",
    activity: "Melakukan persembahyangan bersama keluarga besar di Pemerajan (pura keluarga) dan Pura Kahyangan Tiga di desa masing-masing.",
    philosophy: "Merupakan puncak kemenangan Dharma (kebaikan) atas Adharma (keburukan). Hari untuk merenungkan kebersihan batin dan memenangkan kesadaran rohani atas nafsu duniawi.",
    culturalNote: "Di beberapa daerah di Bali, persembahyangan juga dilakukan di pura-pura leluhur terjauh (Pura Kawitan) dan dipenuhi pawai tari Barong keliling desa (ngelawang) untuk menetralisir aura negatif."
  },
  {
    dayNumber: 2,
    name: "Manis Galungan",
    balineseDay: "Wraspati Umanis Dungulan",
    activity: "Mengunjungi keluarga, kerabat dekat, dan berwisata bersama anak-anak. Ini adalah hari rekreasi dan silaturahmi (Dharma Santi).",
    philosophy: "Mengaktualisasikan kemenangan Dharma dengan menebar rasa kasih sayang, kedamaian, dan mempererat tali persaudaraan antar sesama manusia.",
    culturalNote: "Masyarakat Bali beramai-ramai mengunjungi tempat wisata alam seperti pantai atau pegunungan. Anak-anak biasanya mendapatkan hadiah atau uang jajan kecil dari tetua (tradisi galungan)."
  },
  {
    dayNumber: 3,
    name: "Hari Jumat Galungan",
    balineseDay: "Sukra Paing Dungulan",
    activity: "Masyarakat tetap menjaga ketenangan rumah tangga, merapikan sarana sesaji yang telah digunakan, dan menikmati hidangan bersama keluarga.",
    philosophy: "Tahap kontemplasi awal setelah perayaan besar. Menjaga ketenangan pikiran (kesucian batin) setelah luapan kegembiraan hari raya.",
    culturalNote: "Tidak ada upacara besar khusus pada hari ini, namun masyarakat tetap menjaga ketertiban rohani dan membatasi aktivitas yang bising."
  },
  {
    dayNumber: 4,
    name: "Pemaridan Guru",
    balineseDay: "Saniscara Pon Dungulan",
    activity: "Melakukan persembahyangan di pura keluarga memohon tirta pemaridan (air suci pengembalian berkah) dari Bhatara Guru (manifestasi Dewa Siwa sebagai guru semesta).",
    philosophy: "Melambangkan pengembalian berkah dan penyerapan ilmu pengetahuan suci. Manusia diingatkan bahwa segala berkah berasal dari Sang Guru Agung dan harus digunakan demi kebaikan.",
    culturalNote: "Di beberapa desa, tirta pemaridan dipercikkan ke seluruh anggota keluarga serta sarana pertanian sebagai simbol berkah kesuburan."
  },
  {
    dayNumber: 5,
    name: "Hari Minggu Kuningan",
    balineseDay: "Redite Kliwon Kuningan",
    activity: "Umat Hindu memfokuskan diri pada meditasi ringan, hening, menjaga kebersihan pekarangan, serta mempersiapkan ketenangan batin menjelang Kuningan.",
    philosophy: "Memasuki wuku Kuningan, batin mulai diorientasikan kembali pada kesucian spiritual. Menghindari perselisihan dan emosi berlebihan.",
    culturalNote: "Aktivitas adat berkurang untuk memberikan waktu beristirahat bagi warga setelah rangkaian gotong-royong Galungan yang intens."
  },
  {
    dayNumber: 6,
    name: "Pemacekan Agung",
    balineseDay: "Soma Umanis Kuningan",
    activity: "Menghaturkan sesaji (segehan agung) di depan pintu gerbang rumah. Pemujaan ditujukan kepada Sang Hyang Widhi dalam manifestasi-Nya melindungi keselamatan bumi.",
    philosophy: "Macekan berarti pilar pembatas atau keteguhan. Lambang peneguhan hati umat manusia agar tidak goyah diterpa godaan nafsu negatif yang berpotensi merusak kemenangan Dharma.",
    culturalNote: "Pada sore hari, dilakukan visualisasi penanaman 'pilar kekuatan' spiritual di pekarangan rumah masing-masing."
  },
  {
    dayNumber: 7,
    name: "Hari Selasa Kuningan",
    balineseDay: "Anggara Pon Kuningan",
    activity: "Melakukan sembahyang harian secara mandiri (trisandya) dan memelihara suasana damai di pekarangan rumah.",
    philosophy: "Melanjutkan proses introspeksi diri. Menyelaraskan perkataan, perbuatan, dan pikiran (Tri Kaya Parisudha) agar tetap berada di jalan kebenaran.",
    culturalNote: "Ini adalah masa tenang di mana masyarakat Bali beraktivitas kerja seperti biasa namun tetap menjaga vibrasi spiritual rumah tangga."
  },
  {
    dayNumber: 8,
    name: "Hari Rabu Kuningan",
    balineseDay: "Budha Wage Kuningan",
    activity: "Membersihkan dan meninjau kembali sarana persembahyangan di tempat suci keluarga (pemerajan).",
    philosophy: "Mempersiapkan sarana fisik dengan ketelitian. Kebersihan fisik sarana ibadah mencerminkan kebersihan niat dan ketulusan hati yang mempersiapkannya.",
    culturalNote: "Ibu-ibu mulai mengumpulkan bahan janur baru yang segar untuk merajut tamiang dan endongan yang akan dipasang pada hari Kuningan."
  },
  {
    dayNumber: 9,
    name: "Hari Uleman",
    balineseDay: "Wraspati Wage Kuningan",
    activity: "Mempersiapkan sesaji awal untuk menyambut kedatangan leluhur yang diyakini turun memberikan berkah ke bumi pada keesokan harinya.",
    philosophy: "Uleman berarti undangan. Secara spiritual melambangkan kesiapan hati menyambut kehadiran kesadaran kosmis yang agung dan arwah suci para leluhur.",
    culturalNote: "Warga berkumpul di dapur adat untuk mulai memasak kue-kue tradisional yang akan disajikan di banten Kuningan."
  },
  {
    dayNumber: 10,
    name: "Penampahan Kuningan",
    balineseDay: "Sukra Umanis Kuningan",
    activity: "Membuat tamiang, endongan, kolem dari janur. Memasak hidangan sajen termasuk nasi kuning dan lauk pauk ritual.",
    philosophy: "Hari persiapan fisik dan mental terakhir. Merajut simbol perlindungan (tamiang) dan bekal perjalanan spiritual (endongan) untuk mematangkan kesadaran jiwa.",
    culturalNote: "Pekerjaan dilakukan secara gotong-royong. Sore hari biasanya dihiasi dengan kesibukan memasak nasi kuning aromatik menggunakan kunyit segar."
  },
  {
    dayNumber: 11,
    name: "Hari Raya Kuningan",
    balineseDay: "Saniscara Kliwon Kuningan",
    activity: "Melaksanakan persembahyangan khusyuk di pura keluarga dan pura kahyangan. Pemasangan tamiang, endongan, kolem. Ritual sembahyang diselesaikan sebelum pukul 12.00 WITA.",
    philosophy: "Puncak hari raya Kuningan (nguningang berarti memohon berkah/keselamatan). Memohon anugerah kemakmuran lahir batin dari para dewa dan leluhur sebelum mereka kembali ke swargaloka.",
    culturalNote: "Nasi kuning menjadi sajian wajib. Suasana sangat semarak di pagi hari dan menjadi hening kembali menjelang tengah hari seiring selesainya upacara."
  }
];
