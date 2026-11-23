# Format Judul PR
`[Tugas 4] Implementasi React Router v7 dan Tailwind CSS v4 pada Manajemen Produk`

---

## Ringkasan Perubahan
Pull request ini mengembangkan aplikasi **Manajemen Produk** dari Tugas 3 dengan menerapkan **React Router v7**, **Tailwind CSS v4**, serta persistensi data menggunakan `localStorage` sesuai ketentuan Pertemuan 13 (Tugas 4).

Perubahan utama yang diimplementasikan:
1. **Konfigurasi React Router v7 & Tailwind CSS v4**: Memasang `react-router@7`, `tailwindcss`, dan `@tailwindcss/vite`, serta memigrasi seluruh styling dari CSS manual (`App.css`) ke utility classes Tailwind dengan pendekatan *mobile-first* dan komponen atom `Button` yang reusable.
2. **Shared Layout & Navigasi (`AppLayout` + `Navbar` + `Outlet`)**: Menyediakan navigasi konsisten menggunakan `NavLink` dengan indikator halaman aktif untuk rute `/` (Dashboard), `/products` (Produk), dan `/settings` (Pengaturan).
3. **Halaman Dashboard (`/`)**: Menampilkan ringkasan statistik inventaris (total produk, total nilai katalog, rata-rata harga, mode tampilan aktif) dan daftar singkat produk dengan tautan cepat ke detail.
4. **Halaman Produk (`/products`)**: Seluruh fitur CRUD Tugas 3 (cari, tambah, edit, hapus dengan validasi modal) tetap berjalan penuh, dilengkapi tautan **Detail** ke `/products/:id` serta perubahan tampilan dinamis **Grid** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) dan **List** sesuai pengaturan.
5. **Halaman Detail Produk (`/products/:id`)**: Membaca parameter `:id` via `useParams()`, menampilkan informasi produk dari sumber state yang sama, mendukung aksi edit/hapus (dengan navigasi kembali melalui `useNavigate`), dan menampilkan tampilan pemulihan bila ID produk tidak ditemukan.
6. **Halaman Pengaturan (`/settings`)**: Menyediakan pilihan mode tampilan **Grid** atau **List** serta opsi reset ke data awal.
7. **Halaman 404 (`*`)**: Menangani URL tidak dikenal dengan pesan jelas dan tautan kembali ke `/products` serta `/`.
8. **Persistensi `localStorage`**: Menyimpan daftar produk dan preferensi mode tampilan Grid/List sehingga perubahan tetap bertahan setelah browser dimuat ulang.

---

## Bukti Pengujian

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman utama (`/`) | Dashboard tampil bersama Navbar aktif dan statistik katalog produk sesuai data saat ini | Sesuai |
| Berpindah antar halaman melalui Navbar (`/`, `/products`, `/settings`) | Konten halaman berganti melalui `Outlet` tanpa full page reload dan status `NavLink` aktif berubah sesuai URL | Sesuai |
| Melakukan operasi CRUD pada `/products` (pencarian, tambah, edit, hapus dengan validasi) | Seluruh fitur CRUD Tugas 3 tetap berfungsi normal dan daftar produk langsung terbarui | Sesuai |
| Mengklik tombol Detail atau nama produk pada salah satu kartu (misalnya ID 2) | URL berpindah ke `/products/2` dan menampilkan detail produk ID 2 lengkap dengan tautan kembali | Sesuai |
| Mengakses URL detail produk dengan ID tidak tersedia (`/products/999`) | Halaman detail menampilkan pesan "Produk Tidak Ditemukan" beserta tautan kembali ke `/products` | Sesuai |
| Mengubah mode tampilan dari Grid ke List (atau sebaliknya) di `/settings` lalu membuka `/products` | Tata letak daftar produk pada `/products` berubah mengikuti mode yang dipilih di Settings | Sesuai |
| Memuat ulang browser (refresh) setelah mengubah produk dan mode tampilan | Data produk terbaru dan pilihan mode Grid/List tetap bertahan dari `localStorage` | Sesuai |
| Mengakses URL yang tidak terdaftar (misalnya `/alamat-salah`) | Halaman 404 tampil dengan pesan jelas dan tautan kembali ke halaman Produk dan Dashboard | Sesuai |
| Mengubah lebar layar browser (mobile, tablet, desktop) | Grid produk beradaptasi secara responsif (1 kolom < 768px, 2 kolom >= 768px, 3 kolom >= 1024px) | Sesuai |
