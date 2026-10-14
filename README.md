# SoilWise — website sistem pakar tanah (frontend)

Buka `index.html` di browser (klik dua kali). Tidak perlu server, build, atau internet
(kecuali font Google yang akan memakai font cadangan bila offline).

## Halaman
- `index.html` — Beranda + cek cepat
- `diagnosis.html` — form 3 langkah + hasil diagnosis
- `data.html` — Data Resmi (angka, grafik, tabel, daftar sumber + tautan ke situs instansi)
- `panduan.html` — Panduan lapangan + FAQ
- `metodologi.html` — bobot skor, 10 aturan, keterbatasan, keputusan desain

## Berkas bersama (`assets/`)
- `style.css` — semua gaya (token warna di `:root`)
- `shared.js` — navbar & footer (ganti nama merek di `BRAND`)
- `data.js` — SEMUA data rujukan dan status verifikasinya. Ubah angka/sumber cukup di sini.
- `engine.js` — aturan sistem pakar (`RULES`), bobot (`WEIGHTS`), dan tampilan hasil
- `icons.js` — ikon Lucide (ISC) yang disematkan

## Catatan jujur
Bobot skor adalah asumsi prototipe (belum dikalibrasi lab / divalidasi pakar).
Status tiap sumber: "Sudah dicek", "Kutipan media", atau "Cocokkan dulu" — lihat `data.js`.
