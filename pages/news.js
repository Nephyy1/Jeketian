import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCalendar, FiChevronRight } from 'react-icons/fi';

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

const NewsCard = ({ item }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const iconBaseUrl = 'https://jkt48.com';

  return (
    <Link href={`/news/${item.id}`} legacyBehavior>
      <a className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex-shrink-0 w-full sm:w-28 h-24 sm:h-full flex items-center justify-center bg-slate-50 group-hover:bg-pink-50 transition-colors duration-300 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-subtle-grid bg-cover opacity-30"></div>
            {item.label && (
                <Image 
                    src={`${iconBaseUrl}${item.label}`} 
                    alt="Ikon Kategori" 
                    width={64} 
                    height={64} 
                    objectFit="contain"
                    className="transform group-hover:scale-110 transition-transform duration-300"
                />
            )}
          </div>
          <div className="flex-grow p-5">
            <h3 className="text-md md:text-lg font-bold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mt-2 flex items-center">
              <FiCalendar className="mr-2 text-slate-400" />
              {formatDate(item.date)}
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center p-6 text-slate-300 group-hover:text-pink-500 transition-colors duration-300">
            <FiChevronRight size={24} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default function NewsPage({ newsItems, error }) {
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
          <div className="text-center mb-10 md:mb-12">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Arsip Berita JKT48
            </h1>
          </div>

          {error ? (
            <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg max-w-lg mx-auto shadow-sm">
              <p>{error}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-5">
              {newsItems.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
