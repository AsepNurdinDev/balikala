# Panduan Optimisasi Performa 3D BaliKala

Penyebab utama aplikasi web terasa berat atau lambat saat memuat halaman adalah ukuran berkas model 3D (`.glb`) yang sangat besar (berkisar antara **76 MB hingga 91 MB** per berkas) dan pemrosesan rendering WebGL yang berjalan terus-menerus pada 60 FPS bahkan saat layar sedang diam.

Berikut adalah langkah-langkah optimisasi yang dapat diterapkan untuk menurunkan beban CPU, GPU, memori RAM, serta mempercepat waktu pemuatan (loading time) web.

---

## 1. Kompresi & Simplifikasi Model 3D (Dampak Terbesar)

Model 3D hasil generator AI Image-to-3D biasanya memiliki kepadatan poligon (triangles) yang sangat tinggi dan tidak efisien. Kita perlu melakukan kompresi agar ukurannya turun dari ~90 MB menjadi **di bawah 3–5 MB** tanpa kehilangan kualitas visual yang signifikan pada layar web.

### A. Menggunakan `gltf-pack` (Rekomendasi Utama)
`gltfpack` adalah alat baris perintah (CLI) yang sangat andal untuk mengompresi jaring (mesh), mengurangi poligon secara otomatis, dan menerapkan kompresi basis tekstur.

1. Pastikan Node.js terinstal, lalu instal `gltfpack` secara global:
   ```bash
   npm install -g gltfpack
   ```
2. Jalankan perintah kompresi untuk model Saraswati:
   ```bash
   gltfpack -i public/saraswati.glb -o public/saraswati_optimized.glb -cc
   ```
   *Catatan: Parameter `-cc` mengaktifkan kompresi Meshopt yang sangat efisien untuk di-decode oleh peramban.*

3. **Daftar Perintah Lengkap untuk Semua Model GLB BaliKala**:
   
   Jalankan perintah ini satu per satu di terminal Anda (pada direktori `c:\BaliKala\balikala\frontend`):
   ```bash
   # Kompresi model utama halaman Saraswati
   gltfpack -i public/saraswati.glb -o public/saraswati_optimized.glb -cc
   gltfpack -i public/angsa.glb -o public/angsa_optimized.glb -cc
   gltfpack -i public/kitab.glb -o public/kitab_optimized.glb -cc
   gltfpack -i public/lotus.glb -o public/lotus_optimized.glb -cc
   gltfpack -i public/tasbihgenitri.glb -o public/tasbihgenitri_optimized.glb -cc
   gltfpack -i public/veena.glb -o public/veena_optimized.glb -cc

   # Kompresi model halaman Nyepi
   gltfpack -i public/ogoh-ogoh.glb -o public/ogoh-ogoh_optimized.glb -cc

   # Kompresi model halaman Galungan
   gltfpack -i public/penjor.glb -o public/penjor_optimized.glb -cc
   ```

4. **Jalankan Otomatis Sekaligus (Batch Commands)**:
   
   * **Untuk Windows (PowerShell)**:
     ```powershell
     Get-ChildItem -Path public/*.glb -Exclude "*_optimized.glb" | ForEach-Object {
       Write-Host "Mengompresi $($_.Name)..."
       gltfpack -i $_.FullName -o "public/$($_.BaseName)_optimized.glb" -cc
     }
     ```
   * **Untuk Windows (Command Prompt / CMD)**:
     ```cmd
     for %f in (public\*.glb) do (
       echo Mengompresi %~nxf...
       gltfpack -i "%f" -o "public\%~nf_optimized.glb" -cc
     )
     ```
   * **Untuk macOS / Linux (Bash/Zsh)**:
     ```bash
     for f in public/*.glb; do
       if [[ "$f" != *"_optimized.glb" ]]; then
         echo "Mengompresi $f..."
         gltfpack -i "$f" -o "${f%.glb}_optimized.glb" -cc
       fi
     done
     ```


### B. Menggunakan `gltf-pipeline` dengan Draco Compression
Draco adalah pustaka kompresi geometris 3D terbuka buatan Google yang sangat populer.
1. Instal alat secara global:
   ```bash
   npm install -g gltf-pipeline
   ```
2. Jalankan kompresi Draco:
   ```bash
   gltf-pipeline -i public/saraswati.glb -o public/saraswati_draco.glb -d
   ```

### C. Desimasi Poligon di Blender (Manual)
Jika ingin hasil pengurangan poligon yang paling rapi:
1. Impor berkas `.glb` ke dalam **Blender**.
2. Pilih objek mesh, buka tab **Modifiers** (ikon kunci inggris).
3. Tambahkan modifier **Decimate**.
4. Turunkan nilai **Ratio** ke `0.1` atau `0.2` (ini akan memangkas 80% hingga 90% jumlah poligon/sisi segitiga).
5. Ekspor kembali sebagai `.glb`.

---

## 2. Optimisasi Kode React Three Fiber (R3F)

Saat ini, Canvas merender frame baru sebanyak 60 kali per detik (60 FPS) secara konstan yang membuat kipas laptop berputar kencang atau baterai HP cepat habis.

### A. Mengaktifkan Render On-Demand (`frameloop="demand"`)
Secara bawaan, R3F merender canvas terus-menerus (`frameloop="always"`). Kita bisa mengubahnya agar hanya merender ketika ada perubahan posisi kamera, interaksi klik, atau perubahan rotasi.

Ubah komponen `<Canvas>` pada `GoddessViewer.tsx` dan `SymbolInformation.tsx` menjadi:
```tsx
<Canvas
  shadows
  frameloop="demand" // ← HANYA render jika ada interaksi/perubahan
  camera={{ position: [0, 0.5, 4.0], fov: 40 }}
  gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
>
```

### B. Membatasi Resolusi Shadow Map
Peta bayangan (Shadow map) yang terlalu besar memakan memori GPU yang tinggi. Batasi resolusi bayangan ke ukuran yang cukup (misalnya `512` atau `1024` piksel).

Di `GoddessViewer.tsx`:
```tsx
<spotLight
  position={[5, 8, 5]}
  angle={0.35}
  penumbra={0.8}
  intensity={3.5}
  castShadow
  shadow-mapSize={[512, 512]} // ← Kurangi resolusi bayangan dari 1024 ke 512
  color="#fff6e6"
/>
```

### C. Lazy Loading / Dinamis Import (Next.js `next/dynamic`)
Kita dapat menunda pemuatan modul Three.js dan Canvas sampai halaman sepenuhnya dimuat, atau memisalkannya dari bundel utama agar ukuran berkas JavaScript awal lebih kecil.

Di `app/saraswati/page.tsx`:
```tsx
import dynamic from "next/dynamic";

// Memuat GoddessExplorer secara dinamis hanya di sisi klien
const GoddessExplorer = dynamic(
  () => import("./components/GoddessExplorer/GoddessExplorer"),
  { 
    ssr: false, 
    loading: () => <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-3xl">Memuat Eksplorer 3D...</div>
  }
);
```

### D. Penundaan Mount (Lazy Mounting) dengan Intersection Observer
Hanya aktifkan dan tampilkan Canvas 3D saat pengguna menggulir halaman (scroll) mendekati area penayangan model tersebut. Hal ini mencegah browser memuat WebGL saat pengguna masih berada di bagian atas halaman (Hero section).

Pustaka seperti `react-intersection-observer` sangat cocok untuk mendeteksi visibilitas area explorer sebelum Canvas dirender.
