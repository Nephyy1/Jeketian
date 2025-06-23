import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCalendar, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

export async function getServerSideProps() {
  let newsItems = [];
  let error = null;

  try {
    const response = await fetch('https://v2.jkt48connect.my.id/api/jkt48/news?apikey=48-NEPHYY');
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: Status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data.news) && data.news.length > 0) {
      newsItems = data.news;
    } else {
      error = "Tidak ada berita yang ditemukan.";
    }
  } catch (e) {
    error = e.message || "Terjadi kesalahan saat menghubungi API.";
  }

  return {
    props: {
      newsItems,
      error,
    },
  };
}

export default function NewsPage({ newsItems, error }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <Head>
        <title>Arsip Berita - Jeketian</title>
        <meta name="description" content="Kumpulan berita dan pengumuman resmi terbaru dari JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Arsip Berita JKT48
            </h1>
          </div>

          <div className="text-center mb-10">
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center text-sm text-slate-600 hover:text-pink-600 font-medium transition-colors duration-300 group">
                <FiArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                Kembali ke Halaman Utama
              </a>
            </Link>
          </div>

          {error ? (
            <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg max-w-lg mx-auto shadow-sm">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {newsItems.map((item) => {
                const iconBaseUrl = 'https://jkt48.com';
                let localIconPath = item.label ? `${iconBaseUrl}${item.label}` : null;
                
                return (
                  <div key={item.id} className="p-0.5 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                    <div className="bg-white rounded-lg p-5 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-colors duration-300 leading-tight min-h-[5rem] sm:min-h-[7rem]">
                          {item.title || "Judul tidak tersedia"}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3 flex items-center">
                          <FiCalendar className="mr-2 text-slate-400" />
                          {formatDate(item.date)}
                        </p>
                        {localIconPath && (
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Image 
                              src={localIconPath} 
                              alt="Ikon Kategori Berita" 
                              width={32} 
                              height={32} 
                              className="inline-block object-contain" 
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <Link href={`/news/${item.id}`} legacyBehavior>
                          <a className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-medium transition-colors duration-300">
                            Baca Selengkapnya
                            <FiExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
