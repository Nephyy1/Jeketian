import Head from 'next/head';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Image from 'next/image'; // Impor Image dari next/image
import { FiFilm, FiUsers, FiZap, FiCalendar, FiInfo } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu'; // Impor LuSparkles untuk judul

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
          {/* Bagian Selamat Datang DIHAPUS */}

          {/* Bagian Tentang Jeketian - DIMODIFIKASI */}
          <section className="py-12 md:py-20 lg:py-24">
            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl">
              
              <div className="flex justify-center mb-6 md:mb-8">
                <Image
                  src="/img/logo.jpg"
                  alt="Jeketian Logo"
                  width={140}
                  height={140}
                  className="rounded-full shadow-lg border-4 border-white object-cover"
                />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 md:mb-16 text-center flex items-center justify-center">
                <LuSparkles className="mr-2 sm:mr-3 text-pink-500 text-4xl sm:text-5xl" />
                <span className="font-brand text-slate-800">Jeketian</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                <div className="order-1">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-slate-700">
                    Platform Komunitas Fans JKT48
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-3">
                    <strong>Jeketian</strong> adalah ruang digital yang diciptakan dengan penuh cinta oleh penggemar, untuk penggemar JKT48. Kami hadir untuk menjadi sumber informasi terpadu dan terkini bagi Anda semua.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
                    Temukan semua yang Anda butuhkan di sini:
                  </p>
                  <ul className="space-y-3 text-slate-600 text-base sm:text-lg">
                    <li className="flex items-start">
                      <FiUsers className="text-pink-500 mr-3 mt-1 flex-shrink-0 text-xl" />
                      <span>Informasi lengkap dan update aktivitas para member JKT48.</span>
                    </li>
                    <li className="flex items-start">
                      <FiCalendar className="text-purple-500 mr-3 mt-1 flex-shrink-0 text-xl" />
                      <span>Jadwal pertunjukan teater, event spesial, dan penampilan live.</span>
                    </li>
                    <li className="flex items-start">
                      <FiInfo className="text-orange-500 mr-3 mt-1 flex-shrink-0 text-xl" />
                      <span>Berita terbaru dan semua pengumuman resmi dari JKT48.</span>
                    </li>
                    <li className="flex items-start">
                      <FiFilm className="text-red-500 mr-3 mt-1 flex-shrink-0 text-xl" />
                      <span>Akses mudah ke konten Live Streaming dan siaran ulang (Replay) penampilan idola Anda.</span>
                    </li>
                  </ul>
                </div>
                <div className="order-2">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-black">
                    <video
                      className="w-full h-full object-contain"
                      src="/video/trailer.jkt48.mp4"
                      controls
                      poster="/img/logo.jpg" 
                    >
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>
                  <p className="text-center text-sm text-slate-500 mt-3">
                    Sebuah Perjalanan Bersama Jeketian
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
