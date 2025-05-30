import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Image from 'next/image';
import { 
    FiFilm, FiUsers, FiZap, FiCalendar, FiInfo, FiRss, 
    FiExternalLink, FiMapPin, FiHelpCircle, FiChevronDown, FiChevronUp 
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { useState } from 'react';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let newsItems = [];
  let newsError = null;
  let eventItems = [];
  let eventError = null;
  let apiKeyError = null;

  console.log("[getServerSideProps] API Key being used:", apiKey);

  if (!jkt48Api || typeof jkt48Api.check !== 'function') {
    console.error("[getServerSideProps] jkt48Api object or check method is not available.");
    apiKeyError = "Fungsi pengecekan API Key tidak tersedia pada package.";
  } else {
    try {
      console.log("[getServerSideProps] Attempting to validate API Key...");
      const checkResponse = await jkt48Api.check(apiKey);
      console.log("[getServerSideProps] API Key check response:", JSON.stringify(checkResponse, null, 2));

      if (checkResponse && (checkResponse.success === false || checkResponse.valid === false || checkResponse.status === 'error' || checkResponse.status === false)) {
        apiKeyError = `API Key tidak valid atau bermasalah: ${checkResponse.message || 'Respons validasi tidak menunjukkan sukses.'}`;
        console.error("[getServerSideProps] API Key validation failed based on response structure:", apiKeyError);
      } else {
        console.log("[getServerSideProps] API Key validation seems successful (no error thrown and no explicit failure in response). Proceeding...");
      }
    } catch (error) {
      console.error("[getServerSideProps] Error validating API Key:", error.message);
      apiKeyError = `Gagal validasi API Key: ${error.message || "Kesalahan tidak diketahui saat validasi."}`;
    }
  }

  if (!apiKeyError) {
    console.log("[getServerSideProps] API Key valid, proceeding to fetch news and events.");
    try {
      if (jkt48Api && typeof jkt48Api.news === 'function') {
        const newsDataResponse = await jkt48Api.news(apiKey);
        if (newsDataResponse && newsDataResponse.news && Array.isArray(newsDataResponse.news)) {
          newsItems = newsDataResponse.news.slice(0, 6);
        } else {
          newsError = "Format data berita tidak sesuai.";
        }
      } else {
        newsError = "Metode berita tidak tersedia.";
      }
    } catch (error) {
      newsError = `Gagal memuat berita: ${error.message || "Kesalahan tidak diketahui"}`;
    }

    try {
      if (jkt48Api && typeof jkt48Api.events === 'function') {
        const eventDataResponse = await jkt48Api.events(apiKey);
        if (eventDataResponse && Array.isArray(eventDataResponse)) {
          eventItems = eventDataResponse.slice(0, 4);
        } else if (eventDataResponse && eventDataResponse.events && Array.isArray(eventDataResponse.events)) {
           eventItems = eventDataResponse.events.slice(0, 4);
        } else {
          eventError = "Format data event tidak sesuai atau API event bermasalah.";
        }
      } else {
        eventError = "Metode event tidak tersedia.";
      }
    } catch (error) {
      eventError = `Gagal memuat event: ${error.message || "Kesalahan tidak diketahui"}`;
    }
  } else {
     console.log("[getServerSideProps] API Key validation failed. Skipping news and event fetching.");
  }

  return {
    props: {
      newsItems,
      newsError,
      eventItems,
      eventError,
      apiKeyError,
    },
  };
}

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 px-1 text-left text-slate-700 hover:text-pink-600 focus:outline-none transition-colors duration-200"
      >
        <span className="text-base sm:text-lg font-medium">{question}</span>
        {isOpen ? (
          <FiChevronUp className="h-5 w-5 text-pink-500 flex-shrink-0" />
        ) : (
          <FiChevronDown className="h-5 w-5 text-slate-400 group-hover:text-pink-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 px-1 text-slate-600 text-sm sm:text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function HomePage({ newsItems, newsError, eventItems, eventError, apiKeyError }) {
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      options.timeZone = 'Asia/Jakarta';
    }
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const faqData = [
    {
      id: 1,
      question: "Apa Itu JKT48?",
      answer: "JKT48 adalah sebuah idol group asal Indonesia dan merupakan sister group pertama dari AKB48 (Jepang) di luar Jepang. Berbasis di Jakarta, JKT48 mengusung konsep \"Idol yang Dapat Kamu Temui Setiap Hari\" melalui pertunjukan rutin di teater mereka.",
    },
    {
      id: 2,
      question: "Di Mana Lokasi Teater JKT48?",
      answer: "Teater JKT48 berlokasi di fX Sudirman Mall, Lantai 4, Jalan Jenderal Sudirman, Pintu Satu Senayan, Jakarta Pusat. Ini adalah tempat di mana JKT48 mengadakan pertunjukan reguler mereka.",
    },
    {
      id: 3,
      question: "Bagaimana Cara Menonton Pertunjukan Teater JKT48?",
      answer: "Untuk menonton pertunjukan teater, Anda umumnya perlu membeli tiket melalui sistem ticketing resmi JKT48 yang diumumkan di website atau media sosial resmi JKT48. Perhatikan pengumuman jadwal show dan tata cara pembelian tiket karena seringkali ada sistem undian (lottery) atau penjualan terbatas, terutama untuk show populer.",
    },
  ];

  return (
    <>
      <Head>
        <title>Jeketian - JKT48 Fan Hub</title>
        <meta name="description" content="Website fan-made JKT48 yang didedikasikan untuk fans JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        {apiKeyError ? (
          <div className="container mx-auto px-4 py-10 text-center">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-md shadow-md max-w-lg mx-auto" role="alert">
              <p className="font-bold text-lg mb-2">Validasi API Key Gagal</p>
              <p className="text-sm">{apiKeyError}</p>
              <p className="text-xs mt-3">Harap periksa API Key Anda atau coba lagi nanti. Jika masalah berlanjut, hubungi penyedia layanan API.</p>
            </div>
          </div>
        ) : (
          <>
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
                <div className="text-center mb-10 md:mb-12">
                  <h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
                    Hot News JKT48
                  </h2>
                </div>
                {newsError && (
                  <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{newsError}</p>
                )}
                {!newsError && newsItems && newsItems.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {newsItems.map((item) => {
                      let localIconPath = null;
                      if (item.label) {
                        const labelParts = item.label.split('/');
                        const filename = labelParts.pop();
                        if (filename) {
                          localIconPath = `/img/${filename}`;
                        }
                      }
                      return (
                        <div 
                          key={item.id || item.title}
                          className="p-0.5 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                          <div className="bg-white rounded-lg p-5 h-full flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-colors duration-300 leading-tight min-h-[3.5rem]">
                                {item.title || "Judul tidak tersedia"}
                              </h3>
                              <p className="text-xs text-slate-500 mb-3 flex items-center">
                                <FiCalendar className="mr-2 text-slate-400" />
                                {formatDate(item.date)}
                              </p>
                              {localIconPath && (
                                <div className="mt-2 flex items-center text-xs text-gray-500">
                                  <span className="mr-1.5">Kategori:</span>
                                  <Image
                                    src={localIconPath}
                                    alt="Ikon Kategori Berita"
                                    width={40}
                                    height={40}
                                    className="inline-block object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; console.warn(`Gagal memuat ikon kategori lokal BERITA: ${localIconPath}`); }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="mt-4">
                              {item.id ? (
                                <Link href={`/news/${item.id}`} legacyBehavior>
                                  <a className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-medium transition-colors duration-300">
                                    Baca Selengkapnya
                                    <FiExternalLink className="ml-2 h-4 w-4" />
                                  </a>
                                </Link>
                              ) : (
                                <span className="inline-flex items-center text-sm text-gray-400 font-medium">
                                  (Detail tidak tersedia)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  !newsError && <p className="text-center text-slate-500">Tidak ada berita terkini.</p>
                )}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                  <h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-3px' }}>
                    Jadwal Event Mendatang
                  </h2>
                </div>
                {eventError && (
                  <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{eventError}</p>
                )}
                {!eventError && eventItems && eventItems.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {eventItems.map((event) => {
                      let localEventIconPath = null;
                      if (event.label && typeof event.label === 'string') {
                        const labelUrlParts = event.label.split('/');
                        const eventLabelFilename = labelUrlParts.pop();
                        if (eventLabelFilename) {
                            localEventIconPath = `/img/${eventLabelFilename}`;
                        }
                      }
                      return (
                        <div 
                          key={event.id}
                          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="h-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-400"></div>
                          <div className="p-5 space-y-3">
                            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 leading-tight truncate">
                                {event.title || "Nama Event Tidak Tersedia"}
                            </h3>
                            <div className="flex items-center text-sm text-slate-500">
                              <FiCalendar className="mr-2 text-pink-500 flex-shrink-0" />
                              <span>{formatDate(event.date, true)}</span>
                            </div>
                            {localEventIconPath && (
                              <div className="flex items-center text-xs text-gray-500">
                                <span className="mr-1.5">Kategori Event:</span>
                                <Image
                                  src={localEventIconPath}
                                  alt="Ikon Kategori Event"
                                  width={40}
                                  height={40}
                                  className="mr-1.5 object-contain"
                                  onError={(e) => { e.target.style.display = 'none'; console.warn(`Gagal memuat ikon kategori EVENT lokal: ${localEventIconPath}`); }}
                                />
                              </div>
                            )}
                            {event.url && (
                              <a 
                                href={event.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-pink-600 hover:text-purple-700 font-medium transition-colors duration-300 mt-2 group/link"
                              >
                                Lihat Detail Event
                                <FiExternalLink className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  !eventError && eventItems.length === 0 && <p className="text-center text-slate-500">Tidak ada event mendatang yang dijadwalkan.</p>
                )}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="inline-flex items-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-3px' }}>
                        <FiHelpCircle className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 mr-2 sm:mr-3 drop-shadow-sm" />
                        Pertanyaan Umum (FAQ)
                    </h2>
                </div>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-1 sm:p-2">
                    {faqData.map((faq) => (
                        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
              </section>
              
            </div>
          </>
        )}
      </main>

      <footer className="bg-slate-800 text-white text-center p-6">
        <p>© {new Date().getFullYear()} Jeketian. Dibuat dengan ❤️</p>
      </footer>
    </>
  );
}
