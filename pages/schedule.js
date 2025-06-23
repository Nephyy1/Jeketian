import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCalendar, FiClock, FiUsers, FiGift, FiArrowLeft, FiExternalLink } from 'react-icons/fi';

export async function getServerSideProps() {
  let scheduleItems = [];
  let error = null;

  try {
    const response = await fetch('https://v2.jkt48connect.my.id/api/jkt48/theater?apikey=48-NEPHYY');
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: Status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data.theater) && data.theater.length > 0) {
      scheduleItems = data.theater;
    } else {
      error = "Tidak ada jadwal teater yang ditemukan.";
    }
  } catch (e) {
    error = e.message || "Terjadi kesalahan saat menghubungi API.";
  }

  return {
    props: {
      scheduleItems,
      error,
    },
  };
}

const ScheduleCard = ({ item }) => {
  const eventDate = new Date(item.date);
  const date = eventDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
  const time = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' });

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100 flex flex-col">
      <div className="aspect-w-16 aspect-h-9 relative">
        <Image
          src={item.banner}
          alt={`Banner for ${item.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        {item.seitansai && item.seitansai.length > 0 && (
          <div className="mb-3">
            <span className="inline-flex items-center bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">
              <FiGift className="mr-1.5" />
              Seitansai: {item.seitansai.map(m => m.name).join(', ')}
            </span>
          </div>
        )}
        <h3 className="text-lg font-bold text-slate-800 leading-tight flex-grow">
          {item.title}
        </h3>
        <div className="text-sm text-slate-500 mt-3 space-y-2">
          <div className="flex items-center">
            <FiCalendar className="mr-2 flex-shrink-0 text-slate-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 flex-shrink-0 text-slate-400" />
            <span>Pukul {time} WIB</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="mr-2 flex-shrink-0 text-slate-400" />
            <span>{item.member_count} Member</span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
           <Link href={`/theater/${item.id}`} legacyBehavior>
              <a className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-semibold transition-colors duration-300">
                Lihat Detail
                <FiExternalLink className="ml-1.5 h-4 w-4" />
              </a>
           </Link>
        </div>
      </div>
    </div>
  );
};


export default function SchedulePage({ scheduleItems, error }) {
  return (
    <>
      <Head>
        <title>Jadwal Teater - Jeketian</title>
        <meta name="description" content="Jadwal pertunjukan teater JKT48 terbaru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 drop-shadow-sm">
              Jadwal Teater JKT48
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
            <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg max-w-lg mx-auto shadow-sm">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {scheduleItems.map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
