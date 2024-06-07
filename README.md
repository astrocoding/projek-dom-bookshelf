# DOM Bookshelf

Projek ini merupakan implementasi konsep Document Object Model (DOM) dan Web Storage API pada sebuah aplikasi web sederhana untuk mengelola daftar buku.

## Tentang Aplikasi

Aplikasi ini memungkinkan pengguna untuk:

- Menambahkan buku baru ke dalam daftar
- Memindahkan buku yang sudah selesai dibaca ke rak "Sudah Dibaca"
- Menghapus buku dari daftar
- Menyimpan data buku yang tersimpan di browser

## Konsep DOM

Dalam aplikasi ini, DOM digunakan untuk:

- Manipulasi Elemen: Menambah, memindahkan, dan menghapus elemen buku pada halaman web.
- Event Handling: Menangani event click pada tombol-tombol fungsionalitas aplikasi.
- Akses Data: Mendapatkan dan mengubah nilai input dari pengguna.

## Konsep Web Storage

Aplikasi ini menggunakan Web Storage API, yaitu:

- localStorage: Menyimpan data buku yang ditambahkan oleh pengguna secara permanen di browser.
- JSON: Mengkonversi data buku menjadi format JSON untuk disimpan dan diambil dari localStorage.

## Cara Menggunakan

1. Buka file `index.html` pada browser.
2. Isi formulir dengan judul, penulis, dan status buku.
3. Klik tombol "Tambah Buku" untuk menambahkan buku ke daftar.
4. Klik tombol "Sudah Dibaca" untuk memindahkan buku ke rak "Sudah Dibaca".
5. Klik tombol "Hapus" untuk menghapus buku dari daftar.
6. Refresh halaman, data buku yang tersimpan akan tetap ada.

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- Web Storage API

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request dengan perubahan yang Anda usulkan.
