# Jeketian ✨

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNephyy1%2FJeketian)

Jeketian adalah sebuah website *fanbase* JKT48 yang dirancang untuk menjadi pusat informasi terpadu bagi para penggemar. Website ini menyediakan berbagai informasi terkini mulai dari berita, jadwal pertunjukan teater, daftar member, hingga status *live streaming*, semuanya disajikan dalam antarmuka yang modern dan responsif.

## 🚀 Live Demo

Kunjungi versi live dari website ini di: **[https://jeketian.web.id](https://jeketian.web.id)**

---

## 🌟 Fitur Utama

* **Berita Terbaru:** Kumpulan berita dan pengumuman resmi dari JKT48.
* **Jadwal Teater:** Informasi jadwal pertunjukan teater yang akan datang, lengkap dengan daftar member yang tampil.
* **Daftar Member:** Galeri seluruh member aktif JKT48, dilengkapi dengan foto dan tautan media sosial.
* **Live Streaming:** Menampilkan member yang sedang melakukan siaran langsung di Showroom dan IDN Live.
* **Riwayat Siaran:** Arsip aktivitas siaran langsung yang telah selesai dan video tonton ulang (replay).
* **Desain Responsif:** Tampilan yang optimal di berbagai perangkat, baik desktop maupun mobile.
* **SEO Friendly:** Dioptimalkan untuk mesin pencari dengan *meta tags* dan *structured data* yang dinamis.

---

## 💻 Tumpukan Teknologi

Proyek ini dibangun menggunakan teknologi modern untuk memastikan performa, skalabilitas, dan pengalaman pengguna yang baik.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🔌 API & Sumber Data

Website ini dapat menyajikan data secara dinamis berkat API publik yang disediakan oleh komunitas. Penghargaan besar untuk:

* **JKT48-Connect API**: Sumber utama untuk sebagian besar data seperti berita, jadwal, dan live stream.
* **@jkt48/core**: Untuk beberapa permintaan data, proyek ini juga menggunakan library **`@jkt48/core`** yang sangat mempermudah interaksi dengan API JKT48.

Proyek ini bersifat *non-profit* dan dibuat untuk komunitas. Mohon gunakan dengan bijak.

---

## 🛠️ Panduan Instalasi Lokal

Jika Anda ingin menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/Nephyy1/Jeketian.git](https://github.com/Nephyy1/Jeketian.git)
    cd Jeketian
    ```

2.  **Instal Dependensi**
    Gunakan `npm` untuk menginstal semua paket yang dibutuhkan.
    ```bash
    npm install
    ```

3.  **Atur Environment Variable**
    Buat file baru bernama `.env.local` di direktori utama proyek. Dapatkan API Key Anda dari [JKT48-Connect](https://jkt48-connect.com/) dan tambahkan ke dalam file tersebut.
    ```env
    # .env.local
    NEPHYY_APIKEY=MASUKKAN_API_KEY_ANDA_DI_SINI
    ```

4.  **Jalankan Server Development**
    Setelah semua dependensi terinstal dan environment variable diatur, jalankan server development.
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 👤 Dibuat Oleh

* **Nephyy** ([Nephyy1](https://github.com/Nephyy1))

Dibuat dengan ❤️ untuk komunitas fans JKT48.

---

## 📄 Lisensi

Dirilis di bawah [Lisensi MIT](https://github.com/Nephyy1/Jeketian/blob/main/LICENSE).
