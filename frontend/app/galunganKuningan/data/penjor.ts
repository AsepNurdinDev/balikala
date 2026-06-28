export interface PenjorPart {
  id: string;
  name: string;
  function: string;
  philosophy: string;
  culturalValue: string;
  description: string;
  hotspotPosition: [number, number, number]; // [x, y, z] for 3D marker positioning
}

export const PENJOR_PARTS: PenjorPart[] = [
  {
    id: "sampian",
    name: "Sampian Penjor",
    function: "Hiasan melengkung indah di ujung penjor.",
    philosophy: "Melambangkan stana Ida Sang Hyang Widhi Wasa (Tuhan) dan keindahan persembahan yang tulus kepada alam semesta.",
    culturalValue: "Merepresentasikan rasa hormat yang mendalam dan dedikasi estetika dalam mempercantik sarana upakara.",
    description: "Sampian dibuat dari rajutan janur kelapa muda dengan pola yang sangat anggun dan digantungkan tepat pada ujung lengkungan bambu penjor.",
    hotspotPosition: [0.65, 2.1, 0.0]
  },
  {
    id: "janur",
    name: "Janur (Hiasan Kelapa Muda)",
    function: "Dekorasi pembungkus tiang bambu.",
    philosophy: "Melambangkan kesucian batin, keindahan, keceriaan, serta harapan rohani yang tumbuh tinggi.",
    culturalValue: "Simbol ketulusan dan kemurnian tekad umat dalam menegakkan kebenaran (Dharma).",
    description: "Janur kelapa muda diukir melingkar (ringgitan) sepanjang bambu, melambangkan keindahan yang menghiasi perjuangan spiritual.",
    hotspotPosition: [0.22, 1.1, 0.0]
  },
  {
    id: "tamiang",
    name: "Tamiang",
    function: "Perisai bundar janur yang digantung.",
    philosophy: "Melambangkan tameng pelindung diri dari nafsu jahat (Adharma) serta melambangkan roda Dharma yang terus berputar.",
    culturalValue: "Mengingatkan manusia untuk senantiasa membentengi pikiran dari pengaruh luar yang merusak.",
    description: "Anyaman melingkar dari janur kelapa yang disematkan di tengah-tengah penjor sebagai lambang penangkal energi negatif.",
    hotspotPosition: [0.4, 1.5, 0.05]
  },
  {
    id: "pala_bungkah",
    name: "Pala Bungkah",
    function: "Hasil bumi berupa umbi-umbian (singkong, ubi, keladi) yang digantung di bagian bawah.",
    philosophy: "Melambangkan kesuburan tanah, kemakmuran fisik, dan fondasi ketahanan pangan yang diberikan oleh Ibu Pertiwi.",
    culturalValue: "Bentuk apresiasi manusia terhadap kesuburan tanah yang menghidupi fisik jasmani.",
    description: "Umbi-umbian diikat rapi dan digantungkan di bagian bawah penjor untuk menunjukkan kelimpahan hasil bumi bawah tanah.",
    hotspotPosition: [-0.15, -0.6, 0.15]
  },
  {
    id: "pala_gantung",
    name: "Pala Gantung",
    function: "Hasil bumi yang tumbuh menggantung (pisang, jeruk, mentimun).",
    philosophy: "Melambangkan berkah yang mengalir dari langit dan kesejahteraan yang tumbuh subur di pepohonan.",
    culturalValue: "Eksplorasi rasa syukur atas keanekaragaman pangan dan buah-buahan yang manis.",
    description: "Pisang dan hasil pertanian lainnya digantung di penjor, melambangkan karunia pangan dari Sang Pencipta.",
    hotspotPosition: [0.3, 0.6, 0.1]
  },
  {
    id: "kelapa",
    name: "Kelapa (Pala Gading)",
    function: "Buah kelapa kuning gading yang digantung di badan penjor.",
    philosophy: "Kelapa melambangkan kebulatan tekad dan simbol kehidupan yang kaya manfaat dari akar hingga pucuk daun.",
    culturalValue: "Mengajarkan manusia untuk menjadi pribadi yang bermanfaat bagi lingkungan sekitar (kegunaan sosial).",
    description: "Buah kelapa kuning (kelapa gading) utuh digantung di tengah penjor, melambangkan keutuhan spiritual.",
    hotspotPosition: [0.0, -0.1, 0.2]
  },
  {
    id: "tebu",
    name: "Tebu",
    function: "Batang tebu diikatkan sejajar tiang bambu.",
    philosophy: "Melambangkan manisnya hasil perjuangan menegakkan kebenaran (Dharma) di bumi.",
    culturalValue: "Mengingatkan bahwa jalan kebajikan selalu berujung manis bagi jiwa manusia.",
    description: "Batang tebu manis diikatkan tegak lurus mendampingi bambu penjor, menyimbolkan keteguhan rasa manis rohani.",
    hotspotPosition: [-0.1, -0.9, 0.1]
  },
  {
    id: "bambu",
    name: "Bambu (Tiang Penjor)",
    function: "Pilar penopang utama penjor.",
    philosophy: "Melambangkan Gunung Agung yang kokoh dan suci, serta jalur spiritual purusa (vertikal) yang menghubungkan manusia dengan Tuhan.",
    culturalValue: "Keteguhan iman yang harus luwes menghadapi perubahan zaman namun tidak goyah dari dasar kebenaran.",
    description: "Dipilih bambu utuh yang kuat dan berujung melengkung alami, dipasang tanpa dipangkas puncaknya.",
    hotspotPosition: [0.0, 0.2, 0.0]
  },
  {
    id: "pangkal_penjor",
    name: "Pangkal Penjor",
    function: "Bagian dasar bambu yang ditanam di tanah.",
    philosophy: "Melambangkan akar keyakinan spiritual (sraddha) dan hubungan harmonis dengan leluhur.",
    culturalValue: "Melambangkan penghormatan terhadap akar tradisi budaya yang menyokong kehidupan masa kini.",
    description: "Terletak di dekat tanah, biasanya dihiasi dengan banten khusus penjor (banten penyeneng) dan kain kuning-putih.",
    hotspotPosition: [0.0, -1.6, 0.0]
  }
];
