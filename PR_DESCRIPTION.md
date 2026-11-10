# Format Judul PR
`[Tugas 3] Implementasi Aplikasi Manajemen Produk`

---

## Ringkasan Perubahan
Pull request ini mengimplementasikan aplikasi antarmuka web **Manajemen Produk** menggunakan React 19, TypeScript, dan Vite sesuai spesifikasi tugas pertemuan ke-12.

Fitur utama yang diimplementasikan:
1. **Daftar & Katalog Produk**: Menampilkan daftar produk awal dalam layout grid responsif dengan rincian ID, nama produk, harga terformat Rupiah (`RpX.XXX`), serta tombol aksi *Edit* dan *Hapus*.
2. **Pencarian Real-Time**: Fitur filter pencarian nama produk yang responsif secara *real-time* disertai indikator jumlah produk dan status tampilan kosong (*empty state*).
3. **Modal Tambah Produk**: Pop-up dialog untuk menambahkan produk baru dilengkapi validasi kolom nama tidak boleh kosong dan harga harus lebih dari 0.
4. **Modal Edit Produk**: Pop-up dialog untuk memperbarui nama dan harga produk terpilih dengan data awal terisi otomatis.
5. **Modal Konfirmasi Hapus**: Pop-up konfirmasi penghapusan produk lengkap dengan ikon peringatan dan preview data produk yang akan dihapus.
6. **Desain Elegan & Aksesibilitas**: Tampilan antarmuka profesional tanpa penggunaan emoji (menggunakan ikon SVG inline), penutupan modal dengan tombol escape/backdrop, dan struktur komponen modular berprinsip *one-way data flow*.

---

## Bukti Pengujian

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman utama aplikasi | Menampilkan header Manajemen Produk, tombol Tambah Produk, search bar, 5 kartu produk awal, dan ringkasan footer | Sesuai |
| Melakukan pencarian produk dengan kata kunci nama | Daftar produk terfilter secara dinamis sesuai kata kunci dan counter produk diperbarui | Sesuai |
| Melakukan pencarian dengan kata kunci yang tidak ada | Menampilkan pesan "Tidak ada produk ditemukan" dan counter menunjukkan 0 | Sesuai |
| Membuka pop-up Tambah Produk | Modal form tambah produk terbuka dengan kolom nama produk dan harga kosong | Sesuai |
| Submit Tambah Produk dengan nama kosong atau harga ≤ 0 | Form tidak tersimpan dan pesan validasi ditampilkan | Sesuai |
| Menambahkan produk baru yang valid | Produk baru ditambahkan ke dalam state dengan ID otomatis bertambah dan modal tertutup | Sesuai |
| Membuka pop-up Edit Produk pada salah satu item | Modal form edit produk terbuka dan form terisi data produk yang dipilih | Sesuai |
| Menyimpan perubahan pada pop-up Edit Produk | Data nama dan/atau harga produk terbarui pada kartu produk yang bersangkutan | Sesuai |
| Membuka pop-up Hapus Produk | Dialog konfirmasi muncul dengan rincian ID, nama, dan harga produk yang akan dihapus | Sesuai |
| Mengonfirmasi penghapusan produk | Produk dihapus dari daftar dan counter jumlah produk berkurang secara reaktif | Sesuai |
| Menutup modal dengan tombol Batal, ikon silang (×), atau tombol Escape | Modal tertutup tanpa mengubah atau menghapus data produk | Sesuai |
