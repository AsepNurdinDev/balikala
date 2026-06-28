import { SymbolData } from "../type";

// Camera coordinates derived from the actual saraswati.glb model.
// Model is normalised so maxDim = 2.5, centred at origin.
// X: left(−) / right(+) · Y: down(−) / up(+) · Z: closer to camera(+)
//
// Positions match the annotated reference image:
//   Veena         → upper-right  (shoulder/instrument body)
//   Tasbih Genitri → upper-left  (raised left hand)
//   Kitab         → lower-right  (book at right hip/waist)
//   Teratai       → middle-left  (lotus flower in lower-left hand)
//   Angsa         → bottom-left  (swan at the feet)
//   Empat Lengan  → full-body overview

// ------------------------------------------------------------------
// Default / Overview camera  (shown when no symbol is selected)
// ------------------------------------------------------------------
export const OVERVIEW_CAMERA: {
  position: [number, number, number];
  target: [number, number, number];
} = {
  target:   [0.0,  0.05, 0.0],
  position: [0.0,  0.10, 2.8],   // default full-figure overview
};

export const symbolsData: SymbolData[] = [
  {
    id: "kitab",
    name: "Kitab",
    emoji: "📖",
    meaning:
      "Melambangkan ilmu pengetahuan, kebijaksanaan, serta sumber ajaran suci yang menuntun manusia dari kegelapan menuju cahaya kebenaran.",
    value:
      "Ilmu pengetahuan sejati harus terus dipelajari secara aktif, dipahami secara mendalam, dan diamalkan secara nyata dalam kehidupan sehari-hari.",
    // Right mid: book held at right side — slightly zoomed out
    cameraTarget:   [ 0.18, -0.08, 0.05],
    cameraPosition: [ 0.55,  0.05, 1.60],
    modelPath: "/kitab.glb",
  },
  {
    id: "teratai",
    name: "Teratai (Lotus)",
    emoji: "🪷",
    meaning:
      "Melambangkan kesucian spiritual. Teratai tumbuh dan mekar dengan indah di atas air yang berlumpur tanpa ternoda oleh kotoran di sekitarnya.",
    value:
      "Ilmu pengetahuan harus didasari dan digunakan dengan hati yang bersih, serta tetap menjaga moralitas di tengah tantangan lingkungan.",
    // Middle-left: lotus flower in lower-left hand — slightly zoomed out
    cameraTarget:   [-0.25,  0.04, 0.05],
    cameraPosition: [-0.80,  0.20, 1.60],
    modelPath: "/lotus.glb",
  },
  {
    id: "wina",
    name: "Wina (Veena)",
    emoji: "🎻",
    meaning:
      "Melambangkan keharmonisan, keindahan, estetika, dan ekspresi seni dalam kehidupan. Alunan nadanya menenangkan jiwa yang gelisah.",
    value:
      "Belajar tidak hanya mengasah rasionalitas, tetapi juga kepekaan rasa, seni, dan etika demi terciptanya keselarasan batin.",
    // Upper-right: veena body at right shoulder area — zoomed out further to see entire instrument
    cameraTarget:   [ 0.15,  0.08, 0.05],
    cameraPosition: [ 0.55,  0.30, 2.05],
    modelPath: "/veena.glb",
  },
  {
    id: "angsa",
    name: "Angsa",
    emoji: "🦢",
    meaning:
      "Melambangkan kebijaksanaan tertinggi (Wiweka). Angsa memiliki kemampuan luar biasa untuk memisahkan makanan dari air lumpur.",
    value:
      "Belajar memberikan kita kemampuan 'Wiweka' — kecerdasan untuk menyaring informasi serta membedakan Dharma dari Adharma.",
    // Bottom: swan at the base / feet — slightly zoomed out
    cameraTarget:   [-0.10, -0.50, 0.05],
    cameraPosition: [ 0.00, -0.10, 1.85],
    modelPath: "/angsa.glb",
  },
  {
    id: "tasbih",
    name: "Tasbih (Genitri)",
    emoji: "📿",
    meaning:
      "Melambangkan konsentrasi pikiran, ketekunan yang tiada henti, serta hubungan spiritual yang terus berputar menuju kesadaran tertinggi.",
    value:
      "Menuntut ilmu memerlukan disiplin diri yang kuat, latihan yang berkesinambungan, dan fokus agar ilmu meresap ke dalam jiwa.",
    // Upper-left: rosary beads — slightly zoomed out
    cameraTarget:   [-0.22,  0.38, 0.05],
    cameraPosition: [-0.75,  0.55, 1.50],
    modelPath: "/tasbihgenitri.glb",
  },
  {
    id: "empat-lengan",
    name: "Empat Lengan",
    emoji: "👐",
    meaning:
      "Melambangkan empat aspek psikologis manusia: Pikiran (Manas), Intelek (Buddhi), Ego (Ahamkara), dan Kesadaran (Chitta).",
    value:
      "Pendidikan yang utuh tidak hanya mengisi otak dengan informasi, tetapi juga melatih emosi, membersihkan ego, dan memperluas kesadaran.",
    // Full-body — closer than overview to frame all four arms
    cameraTarget:   [ 0.0,  0.08, 0.0],
    cameraPosition: [ 0.0,  0.12, 2.5],
    modelPath: "/saraswati.glb",
  },
];
