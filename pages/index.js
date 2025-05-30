import Head from 'next/head';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import { FiInfo, FiFilm, FiUsers, FiZap, FiCalendar } from 'react-icons/fi'; // Menambahkan FiCalendar jika belum ada

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Jeketian - JKT48 Fan Hub</title>
        <meta name="description" content="Website fan-made JKT48 yang didedikasikan untuk fans JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <BannerSlider />

        <div className="container mx-auto px-4">
          <section className="text-center pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Selamat Datang di <span className="font-brand">Jeketian</span>!
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Temukan informasi terbaru, jadwal, dan aktivitas member JKT48.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
              Jelajahi Sekarang
            </button>
          </section>

          <section className="py-12 md:py-16">
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 sm:p-8 md:p-12 rounded-xl shadow-2xl">
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                <div className="md:col-span-3 order-2 md:order-1">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800 flex items-center">
                    <FiZap className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-3xl sm:text-4xl" />
                    Mengenal <span className="font-brand ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">Jeketian</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-3">
                    Selamat datang di <strong>Jeketian</strong>, destinasi utama Anda untuk semua hal tentang JKT48! Website fan-made ini dibangun dari fans, oleh fans, dan untuk fans.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-3">
                    Fungsi utama kami adalah menyajikan informasi paling update dan komprehensif mengenai:
                  </p>
                  <ul className="list-none space-y-2 mb-4 text-slate-600 text-base sm:text-lg">
                    <li className="flex items-center">
                      <FiUsers className="text-pink-500 mr-2 flex-shrink-0" /> Profil member dan aktivitas terkini.
                    </li>
                    <li className="flex items-center">
                      <FiCalendar className="text-purple-500 mr-2 flex-shrink-0" /> Jadwal theater, event spesial, dan penampilan live.
                    </li>
                    <li className="flex items-center">
                      <FiInfo className="text-orange-500 mr-2 flex-shrink-0" /> Berita dan pengumuman resmi terbaru.
                    </li>
                    <li className="flex items-center">
                      <FiFilm className="text-red-500 mr-2 flex-shrink-0" /> Akses mudah ke konten Live Streaming dan siaran ulang (Replay).
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Kami berkomitmen untuk menjadi platform yang informatif, interaktif, dan menyenangkan bagi seluruh komunitas penggemar JKT48.
                  </p>
                </div>
                <div className="md:col-span-2 order-1 md:order-2">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-black">
                    <video
                      className="w-full h-full object-contain"
                      src="/video/trailer.jkt48.mp4"
                      controls
                      // poster="/video/nama_file_poster.jpg" // Opsional: Ganti dengan path ke gambar poster video Anda
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>
                  <p className="text-center text-sm text-slate-500 mt-3">
                    Trailer Jeketian (Contoh)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-12">
              Konten Utama
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">Judul Konten {item}</h3>
                  <p className="text-slate-600">
                    Ini adalah deskripsi singkat untuk konten yang akan ditampilkan.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-800 text-white text-center p-6">
        <p>© {new Date().getFullYear()} Jeketian. Dibuat dengan ❤️</p>
      </footer>
    </>
  );
}
