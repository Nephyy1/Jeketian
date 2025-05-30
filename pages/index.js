import Head from 'next/head';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Image from 'next/image';
import { FiFilm, FiUsers, FiZap, FiCalendar, FiInfo, FiArrowRight, FiRss, FiExternalLink } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { JKT48API } from '@jkt48/core';

export async function getServerSideProps() {
  const jkt48Api = new JKT48API();
  const apiKey = "48-NEPHYY";
  let newsItems = [];
  let newsError = null;

  console.log("[getServerSideProps] Attempting to fetch news with API key:", apiKey);

  try {
    const newsDataResponse = await jkt48Api.news(apiKey);
    console.log("[getServerSideProps] Raw newsDataResponse from API:", JSON.stringify(newsDataResponse, null, 2));

    if (newsDataResponse && newsDataResponse.data && Array.isArray(newsDataResponse.data)) {
      newsItems = newsDataResponse.data.slice(0, 6);
      if (newsItems.length === 0 && newsDataResponse.data.length > 0) {
        console.warn("[getServerSideProps] News data was an array, but slice(0,6) resulted in empty. Original length:", newsDataResponse.data.length);
      } else if (newsItems.length === 0) {
        console.warn("[getServerSideProps] API returned data, but it's an empty array.");
      }
    } else if (newsDataResponse && typeof newsDataResponse === 'object' && !Array.isArray(newsDataResponse.data)) {
      console.warn("[getServerSideProps] News API response received, but 'data' property is missing or not an array. Response:", newsDataResponse);
      newsError = "Format data berita tidak sesuai dari API.";
      newsItems = [];
    } else if (!newsDataResponse) {
      console.warn("[getServerSideProps] News API returned no response (null or undefined).");
      newsError = "Tidak ada respons dari API berita.";
      newsItems = [];
    } else {
      console.warn("[getServerSideProps] News data is not in the expected array format. Full response:", newsDataResponse);
      newsError = "Format data berita tidak dikenal.";
      newsItems = [];
    }
  } catch (error) {
    console.error("[getServerSideProps] Error fetching news:", error.message);
    if (error.stack) {
      console.error("[getServerSideProps] Error stack:", error.stack);
    }
    if (error.response && error.response.data) {
      console.error("[getServerSideProps] API error response data:", JSON.stringify(error.response.data, null, 2));
    }
    newsError = `Gagal memuat berita: ${error.message || "Terjadi kesalahan pada server."}`;
    newsItems = [];
  }

  console.log("[getServerSideProps] Returning props: newsError:", newsError, "newsItems count:", newsItems.length);

  return {
    props: {
      newsItems,
      newsError,
    },
  };
}

export default function HomePage({ newsItems, newsError }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

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

              <div className="grid md:grid-cols-5 gap-8 md:gap-10 lg:gap-12 items-start relative z-10">
                <div className="order-1 md:col-span-2 space-y-6">
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
                
                <div className="order-2 md:col-span-3 space-y-8">
                  <div>
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

                  <div>
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
            <div className="flex items-center justify-center mb-10 md:mb-12">
              <FiRss className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-400">
                Hot News JKT48
              </h2>
            </div>

            {newsError && (
              <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{newsError}</p>
            )}

            {!newsError && newsItems && newsItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {newsItems.map((item) => (
                  <a 
                    key={item.id || item.title} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
                  >
                    {item.thumbnail && (
                      <div className="w-full h-48 relative overflow-hidden">
                        <Image 
                          src={item.thumbnail} 
                          alt={item.title || 'News thumbnail'} 
                          layout="fill" 
                          objectFit="cover"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors duration-300 leading-tight">
                        {item.title || "Judul tidak tersedia"}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 flex items-center">
                        <FiCalendar className="mr-2 text-slate-400" />
                        {formatDate(item.date)}
                      </p>
                      <div className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-medium transition-colors duration-300">
                        Baca Selengkapnya
                        <FiExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              !newsError && <p className="text-center text-slate-500">Tidak ada berita terkini.</p>
            )}
          </section>
          
        </div>
      </main>

      <footer className="bg-slate-800 text-white text-center p-6">
        <p>© {new Date().getFullYear()} Jeketian. Dibuat dengan ❤️</p>
      </footer>
    </>
  );
}
