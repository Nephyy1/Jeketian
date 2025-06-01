import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import Image from 'next/image';
import { 
    FiFilm, FiUsers, FiCalendar, FiInfo, 
    FiExternalLink, FiMapPin, FiChevronDown, FiChevronUp, FiGift,
    FiHelpCircle, FiYoutube, FiPlayCircle
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GlobalSwiperStyles = () => (
  <style jsx global>{`
    .swiper-button-prev,
    .swiper-button-next {
      color: transparent !important;
      background-image: none !important;
      background-color: transparent !important;
      width: 2.75rem !important;
      height: 2.75rem !important;
    }
    .swiper-button-prev::after,
    .swiper-button-next::after {
        content: '' !important;
    }
  `}</style>
);


export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let newsItems = [];
  let newsError = null;
  let eventItems = [];
  let eventError = null;
  let birthdayItems = [];
  let birthdayError = null;
  let youtubeItems = []; 
  let youtubeError = null; 
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
        console.log("[getServerSideProps] API Key validation seems successful. Proceeding...");
      }
    } catch (error) {
      console.error("[getServerSideProps] Error validating API Key:", error.message);
      apiKeyError = `Gagal validasi API Key: ${error.message || "Kesalahan tidak diketahui saat validasi."}`;
    }
  }

  if (!apiKeyError) {
    console.log("[getServerSideProps] API Key valid, proceeding to fetch data.");
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

    try {
      if (jkt48Api && typeof jkt48Api.birthday === 'function') {
        console.log("[getServerSideProps] Attempting to fetch birthdays...");
        const birthdayDataResponse = await jkt48Api.birthday(apiKey);
        console.log("[getServerSideProps] Raw birthdayDataResponse from API (should be an array):", JSON.stringify(birthdayDataResponse, null, 2));
        if (birthdayDataResponse && Array.isArray(birthdayDataResponse)) {
            birthdayItems = birthdayDataResponse.slice(0, 5);
        } else {
          console.warn("[getServerSideProps] Birthday data is not in expected array format. Response:", birthdayDataResponse);
          birthdayError = "Format data ulang tahun tidak sesuai.";
        }
      } else {
        console.error("[getServerSideProps] 'jkt48Api.birthday' is not a function or jkt48Api is not defined.");
        birthdayError = "Metode ulang tahun tidak tersedia.";
      }
    } catch (error) {
      console.error("[getServerSideProps] Error fetching birthdays:", error.message);
      birthdayError = `Gagal memuat data ulang tahun: ${error.message || "Kesalahan tidak diketahui"}`;
    }

    try {
      if (jkt48Api && typeof jkt48Api.youtube === 'function') {
        console.log("[getServerSideProps] Attempting to fetch YouTube videos...");
        const youtubeDataResponse = await jkt48Api.youtube(apiKey);
        console.log("[getServerSideProps] Raw youtubeDataResponse from API:", JSON.stringify(youtubeDataResponse, null, 2));
        if (youtubeDataResponse && Array.isArray(youtubeDataResponse)) {
            youtubeItems = youtubeDataResponse.slice(0, 8);
        } else if (youtubeDataResponse && youtubeDataResponse.videos && Array.isArray(youtubeDataResponse.videos)) {
            youtubeItems = youtubeDataResponse.videos.slice(0, 8);
        }
         else {
          console.warn("[getServerSideProps] YouTube data is not in expected array format. Response:", youtubeDataResponse);
          youtubeError = "Format data YouTube tidak sesuai.";
        }
      } else {
        console.error("[getServerSideProps] 'jkt48Api.youtube' is not a function or jkt48Api is not defined.");
        youtubeError = "Metode YouTube tidak tersedia.";
      }
    } catch (error) {
      console.error("[getServerSideProps] Error fetching YouTube videos:", error.message);
      youtubeError = `Gagal memuat video YouTube: ${error.message || "Kesalahan tidak diketahui"}`;
    }

  } else {
     console.log("[getServerSideProps] API Key validation failed. Skipping data fetching.");
  }

  return {
    props: {
      newsItems, newsError,
      eventItems, eventError,
      birthdayItems, birthdayError,
      youtubeItems, youtubeError,
      apiKeyError,
    },
  };
}

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 sm:p-6 text-left flex justify-between items-center focus:outline-none transition-all duration-300 ease-in-out group ${isOpen ? 'bg-pink-50 text-pink-700' : 'text-slate-800 hover:bg-slate-50'}`}
      >
        <div className="flex items-center">
          <FiHelpCircle className={`mr-3 h-6 w-6 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-pink-600' : 'text-pink-500 group-hover:text-pink-600'}`} />
          <span className="text-base sm:text-lg font-semibold">
            {question}
          </span>
        </div>
        {isOpen ? (
          <FiChevronUp className="h-6 w-6 text-pink-600 flex-shrink-0 transform transition-transform duration-300" />
        ) : (
          <FiChevronDown className="h-6 w-6 text-slate-500 group-hover:text-pink-500 flex-shrink-0 transform transition-transform duration-300" />
        )}
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        <div className="px-6 sm:px-7 pb-5 pt-3 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function HomePage({ 
  newsItems, newsError, 
  eventItems, eventError, 
  birthdayItems, birthdayError, 
  youtubeItems, youtubeError,
  apiKeyError 
}) {
  const formatDate = (dateString, includeTime = false, onlyMonthDay = false) => {
    if (!dateString) return "Tanggal tidak tersedia";
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (onlyMonthDay) {
        options = { month: 'long', day: 'numeric' };
    }
    if (includeTime && !onlyMonthDay) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
    }
    options.timeZone = 'Asia/Jakarta'; 
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const faqData = [
    { id: 1, question: "Apa Itu JKT48?", answer: "JKT48 adalah sebuah idol group asal Indonesia dan merupakan sister group pertama dari AKB48 (Jepang) di luar Jepang. Berbasis di Jakarta, JKT48 mengusung konsep \"Idol yang Dapat Kamu Temui Setiap Hari\" melalui pertunjukan rutin di teater mereka." },
    { id: 2, question: "Di Mana Lokasi Teater JKT48?", answer: "Teater JKT48 berlokasi di fX Sudirman Mall, Lantai 4, Jalan Jenderal Sudirman, Pintu Satu Senayan, Jakarta Pusat. Ini adalah tempat di mana JKT48 mengadakan pertunjukan reguler mereka." },
    { id: 3, question: "Bagaimana Cara Menonton Pertunjukan Teater JKT48?", answer: "Untuk menonton pertunjukan teater, Anda umumnya perlu membeli tiket melalui sistem ticketing resmi JKT48 yang diumumkan di website atau media sosial resmi JKT48. Perhatikan pengumuman jadwal show dan tata cara pembelian tiket karena seringkali ada sistem undian (lottery) atau penjualan terbatas, terutama untuk show populer." },
  ];

  return (
    <>
      <GlobalSwiperStyles />
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
                    <Image src="/img/logo.jpg" alt="Jeketian Logo" width={140} height={140} className="rounded-full shadow-lg border-4 border-white object-cover" />
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
                      <h3 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Platform Komunitas Fans JKT48</h3>
                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed"><strong>Jeketian</strong> adalah ruang digital yang diciptakan dengan penuh cinta oleh penggemar, untuk penggemar JKT48. Kami hadir untuk menjadi sumber informasi terpadu dan terkini bagi Anda semua.</p>
                      <p className="text-base sm:text-lg text-slate-600 leading-relaxed">Tujuan kami adalah menyediakan platform yang informatif, interaktif, dan menyenangkan bagi seluruh komunitas penggemar JKT48 untuk terhubung, berbagi antusiasme, dan selalu update dengan semua hal tentang idola kita.</p>
                    </div>
                    <div className="order-2 md:col-span-3 space-y-8">
                      <div>
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-black">
                          <video className="w-full h-full object-contain" src="/video/trailer.jkt48.mp4" controls poster="/img/logo.jpg" > Browser Anda tidak mendukung tag video. </video>
                        </div>
                        <p className="text-center text-sm text-slate-500 mt-3">Sebuah Perjalanan Bersama Jeketian</p>
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 mt-6 md:mt-0">Fitur Unggulan Kami:</h4>
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
                <div className="text-center mb-10 md:mb-12"><h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">Hot News JKT48</h2></div>
                {newsError && (<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{newsError}</p>)}
                {!newsError && newsItems && newsItems.length > 0 ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">{newsItems.map((item) => {let localIconPath = null; if (item.label) {const labelParts = item.label.split('/'); const filename = labelParts.pop(); if (filename) { localIconPath = `/img/${filename}`; }} return (<div key={item.id || item.title} className="p-0.5 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"><div className="bg-white rounded-lg p-5 h-full flex flex-col justify-between"><div><h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-colors duration-300 leading-tight min-h-[3.5rem]">{item.title || "Judul tidak tersedia"}</h3><p className="text-xs text-slate-500 mb-3 flex items-center"><FiCalendar className="mr-2 text-slate-400" />{formatDate(item.date)}</p>{localIconPath && (<div className="mt-2 flex items-center text-xs text-gray-500"><span className="mr-1.5">Kategori:</span><Image src={localIconPath} alt="Ikon Kategori Berita" width={40} height={40} className="inline-block object-contain" onError={(e) => { e.target.style.display = 'none'; console.warn(`Gagal memuat ikon kategori lokal BERITA: ${localIconPath}`); }}/></div>)}</div><div className="mt-4">{item.id ? (<Link href={`/news/${item.id}`} legacyBehavior><a className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-medium transition-colors duration-300">Baca Selengkapnya<FiExternalLink className="ml-2 h-4 w-4" /></a></Link>) : (<span className="inline-flex items-center text-sm text-gray-400 font-medium">(Detail tidak tersedia)</span>)}</div></div></div>);})}</div>) : (!newsError && <p className="text-center text-slate-500">Tidak ada berita terkini.</p>)}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12"><h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-2px' }}>Jadwal Event Mendatang</h2></div>
                {eventError && (<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{eventError}</p>)}
                {!eventError && eventItems && eventItems.length > 0 ? (<div className="grid md:grid-cols-2 gap-6 md:gap-8">{eventItems.map((event) => {let localEventIconPath = null; if (event.label && typeof event.label === 'string') {const labelUrlParts = event.label.split('/'); const eventLabelFilename = labelUrlParts.pop(); if (eventLabelFilename) { localEventIconPath = `/img/${eventLabelFilename}`; }} return (<div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden"><div className="h-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-400"></div><div className="p-5 space-y-3"><h3 className="text-lg font-semibold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 leading-tight truncate">{event.title || "Nama Event Tidak Tersedia"}</h3><div className="flex items-center text-sm text-slate-500"><FiCalendar className="mr-2 text-pink-500 flex-shrink-0" /><span>{formatDate(event.date, true)}</span></div>{localEventIconPath && (<div className="flex items-center text-xs text-gray-500"><span className="mr-1.5">Kategori Event:</span><Image src={localEventIconPath} alt="Ikon Kategori Event" width={40} height={40} className="mr-1.5 object-contain" onError={(e) => { e.target.style.display = 'none'; console.warn(`Gagal memuat ikon kategori EVENT lokal: ${localEventIconPath}`); }}/></div>)}{event.url && (<a href={event.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-pink-600 hover:text-purple-700 font-medium transition-colors duration-300 mt-2 group/link">Lihat Detail Event<FiExternalLink className="ml-1.5 h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" /></a>)}</div></div>);})}</div>) : (!eventError && eventItems.length === 0 && <p className="text-center text-slate-500">Tidak ada event mendatang yang dijadwalkan.</p>)}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12"><h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-2px' }}>Ulang Tahun Member Mendatang</h2></div>
                {birthdayError && (<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{birthdayError}</p>)}
                {!birthdayError && birthdayItems && birthdayItems.length > 0 ? (<div className="max-w-2xl mx-auto space-y-4">{birthdayItems.map((member) => (<div key={member.url_key || member.name} className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-transparent hover:border-pink-300">{member.img && (<div className="relative w-16 h-16 sm:w-20 sm:h-20 mr-4 flex-shrink-0"><Image src={member.img} alt={member.name || "Foto member"} layout="fill" objectFit="cover" className="rounded-full border-2 border-slate-200 group-hover:border-pink-400 transition-colors duration-300"/></div>)}<div className="flex-grow"><h4 className="font-bold text-md sm:text-lg text-slate-800 group-hover:text-pink-600 transition-colors duration-200">{member.name || "Nama Member"}</h4><div className="flex items-center text-sm text-slate-500 mt-1 group-hover:text-purple-600 transition-colors duration-200"><FiGift className="mr-2 text-pink-500 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0" /><span>{formatDate(member.birthdate, false, true)}</span></div></div></div>))}</div>) : (!birthdayError && birthdayItems.length === 0 && <p className="text-center text-slate-500">Tidak ada member yang berulang tahun dalam waktu dekat.</p>)}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="inline-flex items-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-2px' }}>
                        <FiYoutube className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 mr-2 sm:mr-3 drop-shadow-sm" />
                        JKT48 di YouTube
                    </h2>
                </div>
                {youtubeError && (<p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{youtubeError}</p>)}
                {!youtubeError && youtubeItems && youtubeItems.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={16}
                        slidesPerView={1.3}
                        navigation
                        pagination={{ clickable: true, dynamicBullets: true }}
                        grabCursor={true}
                        breakpoints={{
                            640: { slidesPerView: 2.3, spaceBetween: 20 },
                            768: { slidesPerView: 2.5, spaceBetween: 20 },
                            1024: { slidesPerView: 3.5, spaceBetween: 30 },
                            1280: { slidesPerView: 4.2, spaceBetween: 30 },
                        }}
                        className="py-4 px-2 relative"
                    >
                        {youtubeItems.map((video) => (
                            <SwiperSlide key={video.videoId || video.title} className="h-auto pb-8"> 
                                <a href={video.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="block rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group bg-white">
                                    <div className="relative aspect-video bg-slate-200">
                                        {video.thumbnail ? (
                                            <Image 
                                                src={video.thumbnail} 
                                                alt={video.title || "Video thumbnail"} 
                                                layout="fill" 
                                                objectFit="cover" 
                                                onError={(e) => { 
                                                    const target = e.target; 
                                                    if (target.parentElement) target.parentElement.style.backgroundColor = '#e2e8f0';
                                                    target.style.display='none'; 
                                                    console.warn(`Gagal memuat thumbnail YouTube: ${video.thumbnail}`);
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center"><FiYoutube className="text-slate-400 w-12 h-12" /></div>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 flex items-center justify-center transition-opacity duration-300">
                                            <FiPlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-70 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                                        </div>
                                    </div>
                                    <div className="p-3 sm:p-4">
                                        <h4 className="font-semibold text-sm sm:text-base text-slate-800 group-hover:text-pink-600 transition-colors duration-200 line-clamp-2" title={video.title || "Judul Video"}>
                                            {video.title || "Judul Video"}
                                        </h4>
                                        {video.channelName && ( 
                                            <p className="text-xs text-slate-500 mt-1">{video.channelName}</p>
                                        )}
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (!youtubeError && youtubeItems.length === 0 && <p className="text-center text-slate-500">Tidak ada video YouTube untuk ditampilkan.</p>)}
              </section>

              <section className="py-12 md:py-16">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm relative" style={{ left: '-2px' }}>
                        Pertanyaan Umum (FAQ)
                    </h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
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
