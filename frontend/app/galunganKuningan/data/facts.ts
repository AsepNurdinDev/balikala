export interface CulturalFact {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  source: string;
}

export const CULTURAL_FACTS: CulturalFact[] = [
  {
    id: 1,
    question: "Mengapa Penjor dipasang di sebelah kanan pintu masuk rumah?",
    answer: "Karena sisi kanan melambangkan energi Dharma (kebaikan) dan jalur purusa (spiritual).",
    explanation: "Dalam konsep tata ruang Bali (Sanga Mandala), pintu masuk bagian kanan (dilihat dari arah keluar pekarangan) dikaitkan dengan jalur energi positif, kekuatan, dan kesucian. Pemasangan penjor di sebelah kanan gerbang rumah ditujukan agar siapa saja yang memasuki rumah menyerap energi kedamaian dan kelimpahan.",
    source: "Lontar Sundarigama"
  },
  {
    id: 2,
    question: "Mengapa Galungan berlangsung selama 10 hari?",
    answer: "Sebagai simbol siklus perjuangan manusia dalam menyeimbangkan dualitas kosmis.",
    explanation: "Jarak 10 hari antara Galungan (Rabu Kliwon Dungulan) dan Kuningan (Sabtu Kliwon Kuningan) melambangkan waktu bagi umat untuk mengevaluasi kemenangan Dharma, menyebarkan energi kasih (Dharma Santi) kepada sesama, hingga puncaknya memohon berkat keberlanjutan (Kuningan).",
    source: "Tradisi Adat Bali"
  },
  {
    id: 3,
    question: "Mengapa persembahyangan Kuningan harus berakhir sebelum tengah hari?",
    answer: "Karena energi leluhur diyakini kembali ke alam swargaloka pada tengah hari.",
    explanation: "Umat Hindu meyakini bahwa pada hari Kuningan, para dewa dan leluhur memberikan berkah dari pagi hari hingga matahari berada tepat di atas kepala (tengah hari). Setelah pukul 12.00 WITA, energi alam bergeser kembali, dan para leluhur diyakini kembali ke alamnya masing-masing.",
    source: "Lontar Sundarigama"
  },
  {
    id: 4,
    question: "Mengapa Penjor menggunakan bambu sebagai bahan tiang utama?",
    answer: "Bambu melambangkan keteguhan iman yang tetap luwes menghadapi rintangan.",
    explanation: "Bambu memiliki sifat yang kuat di bagian akarnya (kokoh), tumbuh tegak lurus ke atas (fokus pikiran kepada Sang Pencipta), namun melengkung di ujungnya melambangkan kerendahan hati dan keluwesan hidup (tidak mudah patah oleh angin kencang).",
    source: "Filosofi Penjaran Bali"
  },
  {
    id: 5,
    question: "Apa arti kata 'Galungan' secara harfiah?",
    answer: "Berasal dari bahasa Jawa Kuno yang berarti 'Menang' atau 'Dungulan'.",
    explanation: "Kata Galungan sepadan dengan kata Dungulan, yang artinya menang atau menaklukkan. Hari Raya Galungan merayakan kemenangan nilai-nilai kebenaran (Dharma) di dalam diri manusia atas nafsu hewani atau keburukan (Adharma).",
    source: "Kamus Jawa Kuno - Indonesia"
  },
  {
    id: 6,
    question: "Apa perbedaan esensial antara Galungan dan Kuningan?",
    answer: "Galungan merayakan kemenangan Dharma, Kuningan memohon berkah keselamatan leluhur.",
    explanation: "Jika Galungan difokuskan pada perayaan kemenangan Dharma dan pemasangan penjor megah sebagai wujud syukur, Kuningan difokuskan pada permohonan keselamatan spiritual (nguningang) dengan sajian nasi kuning dan simbol perlindungan seperti tamiang.",
    source: "Lontar Sundarigama"
  },
  {
    id: 7,
    question: "Mengapa nasi kuning disajikan dalam wadah bernama 'Selanggi' saat Kuningan?",
    answer: "Selanggi melambangkan kebulatan tekad dan wadah keharmonisan hidup.",
    explanation: "Selanggi adalah wadah melingkar kecil yang dibuat dari janur kelapa. Menyajikan nasi kuning di dalamnya menyimbolkan bahwa kemakmuran materi harus selalu dinikmati di dalam bingkai etika kebersamaan dan kebulatan batin spiritual.",
    source: "Tradisi Sesaji Bali"
  },
  {
    id: 8,
    question: "Apa makna dari hiasan gantungan Kelapa Gading di Penjor?",
    answer: "Kelapa melambangkan kesucian air kehidupan dan kemurnian jiwa.",
    explanation: "Kelapa gading (kelapa berwarna kuning keemasan) adalah simbol air suci (tirta) pembersih jiwa. Kehadirannya di penjor menandakan bahwa kemakmuran material harus diimbangi dengan kesucian sumber daya air dan batin.",
    source: "Tattwa Widhi"
  },
  {
    id: 9,
    question: "Mengapa janur muda selalu menghiasi perayaan Galungan dan Kuningan?",
    answer: "Janur melambangkan 'seja-ning-nur' atau cahaya sejati yang suci.",
    explanation: "Dalam bahasa Jawa Kuno, janur sering diartikan sebagai cahaya yang suci atau terang (nur). Penggunaan janur muda melambangkan bahwa persembahan dibuat dengan pikiran yang jernih, suci, dan tercerahkan oleh ajaran kebenaran.",
    source: "Kamus Lontar Bali"
  },
  {
    id: 10,
    question: "Apakah penjor Galungan boleh dipasang berbulan-bulan?",
    answer: "Secara tradisi, penjor dicabut setelah 35 hari (selapan) yaitu pada hari Budha Kliwon Pegat Wakan.",
    explanation: "Hari Pegat Wakan (35 hari setelah Galungan) menandai berakhirnya seluruh rangkaian perayaan Galungan secara resmi. Pada hari tersebut, penjor diturunkan, hiasannya dibakar, dan abunya ditanam di pekarangan rumah sebagai wujud syukur pengembalian unsur alam.",
    source: "Lontar Sundarigama"
  },
  {
    id: 11,
    question: "Mengapa ada variasi bentuk Penjor di berbagai desa adat di Bali?",
    answer: "Karena adanya konsep Desa, Kala, Patra (menyesuaikan tempat, waktu, dan keadaan setempat).",
    explanation: "Meskipun esensi penjor sama (bambu melengkung dengan hiasan janur dan hasil bumi), bentuk anyaman janur dan kelengkapan buah bervariasi bergantung pada tradisi desa adat masing-masing. Keberagaman ini diakui secara sah sebagai kekayaan ekspresi budaya Bali.",
    source: "Konsep Desa Kala Patra"
  },
  {
    id: 12,
    question: "Apa makna filosofis dari batang Tebu yang diikat di Penjor?",
    answer: "Tebu melambangkan manisnya konsistensi dalam menempuh jalan Dharma.",
    explanation: "Batang tebu rasanya manis dari pangkal hingga ujung. Ini mengajarkan manusia bahwa dalam berbuat kebajikan, kita harus konsisten dan memiliki ketetapan hati yang manis dari awal perjuangan hingga akhir hayat.",
    source: "Lontar Yadnya Santhi"
  },
  {
    id: 13,
    question: "Apa fungsi daun 'Paku' (Pakis) pada hiasan Penjor?",
    answer: "Melambangkan keanekaragaman flora liar yang menyokong ekosistem bumi.",
    explanation: "Pemasangan dedaunan liar seperti paku/pakis melambangkan bahwa alam liar yang tidak dibudidayakan pun memiliki kontribusi penting dalam rantai ekologi. Penjor menghargai seluruh ciptaan Tuhan tanpa terkecuali.",
    source: "Bhuta Hita Tattwa"
  },
  {
    id: 14,
    question: "Mengapa ada ritual memotong babi (Nampah) sehari sebelum Galungan?",
    answer: "Sebagai simbol penyembelihan sifat-sifat kebinatangan (keburukan) di dalam diri manusia.",
    explanation: "Nampah celeng (memotong babi) bukan sekadar menyiapkan daging untuk kuliner lawar, melainkan simbol ritual untuk menyembelih nafsu malas, serakah, dan kotor (sifat tamas dan rajas) yang sering dilambangkan dengan karakter babi.",
    source: "Lontar Sundarigama"
  },
  {
    id: 15,
    question: "Apa arti lambang 'Endongan' yang menyerupai tas?",
    answer: "Melambangkan bekal kebajikan (karma baik) untuk menyeberangi samudra kehidupan.",
    explanation: "Endongan mengajarkan umat manusia bahwa saat roh kita dipanggil kembali oleh Sang Pencipta, kita tidak membawa harta benda fisik. Satu-satunya bekal (endongan) yang kita bawa adalah perbuatan baik, kebijaksanaan, dan cinta kasih selama hidup.",
    source: "Dharma Sastra"
  }
];
