import Head from 'next/head';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Image from 'next/image';
import { FiFilm, FiUsers, FiZap, FiCalendar, FiInfo } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';

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
          
          <section className="py-12 md:py-20 lg:py-24">
            <div className="bg-slate-50 bg-subtle-grid bg-[length:2.5rem_2.5rem] p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
              
              <div className="flex justify-center mb-6 md:mb-8 relative z-10">
                <Image
                  src="/img/logo.jpg"
                  alt="Jeketian Logo"
                  width={140}
                  height={140}
                  className="rounded-full shadow-lg border-4 border-white object-cover"
                />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-center flex items-center justify-center mb-4 relative z-10">
                <LuSparkles className="mr-2 sm:mr-3 text-pink-500 text-4xl sm:text-5xl" />
                <span className="font-brand text-slate-800">Jeketian</span>
              </h2>

              <div className="flex justify-center mb-10 sm:mb-12 md:mb-16 relative z-10">
                <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative z-10">
                <div className="order-1 space-y-6"> {/* Kolom Teks Intro */}
                  <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Platform Komunitas Fans JKT48
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    <strong>Jeketian</strong> adalah ruang digital yang diciptakan dengan penuh cinta oleh penggemar, untuk penggemar JKT48. Kami hadir untuk menjadi sumber informasi terpadu dan terkini bagi Anda semua.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Tujuan kami adalah menyediakan platform yang informatif, interaktif, dan menyenangkan bagi seluruh komunitas penggemar JKT48 untuk terhubung, berbagi antusiasme, dan selalu update dengan semua hal tentang idola kita.
                  </p>
                </div>
                
                <div className="order-2 space-y-8"> {/* Kolom Video & Fitur */}
                  <div> {/* Wrapper untuk Video */}
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

                  <div> {/* Wrapper untuk Fitur Unggulan */}
                    <h4 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 mt-6 md:mt-0">
                      Fitur Unggulan Kami:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-600 text-base">
                      <div className="flex items-start group cursor-default bg-white/50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiUsers className="text-pink-500 mr-3 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:text-pink-700 transition-colors duration-200">Informasi lengkap dan update aktivitas para member JKT48.</span>
                      </div>
                      <div className="flex items-start group cursor-default bg-white/50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiCalendar className="text-purple-500 mr-3 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:text-purple-700 transition-colors duration-200">Jadwal pertunjukan teater, event spesial, dan penampilan live.</span>
                      </div>
                      <div className="flex items-start group cursor-default bg-white/50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiInfo className="text-orange-500 mr-3 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:text-orange-700 transition-colors duration-200">Berita terbaru dan semua pengumuman resmi dari JKT48.</span>
                      </div>
                      <div className="flex items-start group cursor-default bg-white/50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <FiFilm className="text-red-500 mr-3 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:text-red-700 transition-colors duration-200">Akses mudah ke konten Live Streaming dan siaran ulang (Replay).</span>
                      </div>
                    </div>
                  </div>
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
