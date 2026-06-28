export interface OgohData {
  name: string;
  creator: string;
  banjar: string;
  height: string;
  materials: string[];
  description: string;
  symbolism: string;
}

const ogohData: OgohData = {
  name: "Bhuta Kala Sandhyakala",
  creator: "Sekaa Teruna Teruni (Pemuda-Pemudi) Banjar",
  banjar: "Banjar BaliKala, Denpasar, Bali",
  height: "4.5 Meter",
  materials: [
    "Ulat-ulatan Bambu",
    "Kertas Koran Bekas",
    "Tanah Liat (Pelekat)",
    "Pewarna Ramah Lingkungan",
    "Serabut Kelapa (Rambut)",
  ],
  description:
    "Ogoh-ogoh Bhuta Kala Sandhyakala menggambarkan sosok mistis penguasa waktu peralihan antara siang dan malam (sore hari). Transisi waktu ini dianggap sakral dan rawan energi negatif jika manusia tidak mawas diri.",
  symbolism:
    "Secara spiritual, patung ini menjadi visualisasi dari sifat-sifat buruk, egoisme, dan angkara murka manusia. Pengarakan dan pemusnahan patung ini di akhir malam Pengrupukan menyimbolkan tekad bulat untuk membakar keburukan tersebut agar dapat memasuki keheningan Hari Raya Nyepi dalam keadaan suci.",
};

export default ogohData;
