import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCalendar, FiClock, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let scheduleItems = [];
  let error = null;

  try {
    const eventsData = await jkt48Api.events(apiKey);
    if (Array.isArray(eventsData) && eventsData.length > 0) {
      scheduleItems = eventsData;
    } else {
      error = "Saat ini tidak ada jadwal yang tersedia.";
    }
  } catch (e) {
    error = `Gagal memuat jadwal: ${e.message || "Kesalahan tidak diketahui"}`;
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
  const day = eventDate.toLocaleDateString('id-ID', { day: '2-digit', timeZone: 'Asia/Jakarta' });
  const month = eventDate.toLocaleDateString('id-ID', { month: 'short', timeZone: 'Asia/Jakarta' }).toUpperCase();
  const time = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' });

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100">
      <div className="h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 p-5 text-center bg-slate-50 md:w-32 flex md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-1">
          <p className="text-xl md:text-3xl font-bold text-pink-600 tracking-tighter">{day}</p>
          <p className="text-md md:text-lg font-semibold text-slate-600">{month}</p>
        </div>
        <div className="border-t md:border-t-0 md:border-l border-slate-200"></div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-colors duration-300 leading-tight flex-grow">
            {item.title || "Judul Acara Tidak Tersedia"}
          </h3>
          <div className="flex items-center text-slate-500 mt-3 text-sm">
            <FiClock className="mr-2 text-slate-400 flex-shrink-0" />
            <span>Pukul {time} WIB</span>
          </div>
          {item.url && (
            <div className="mt-4 pt-4 border-t border-slate-100 self-start">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm text-pink-500 hover:text-pink-700 font-semibold transition-colors duration-300"
              >
                Lihat Detail Event
                <FiExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function SchedulePage({ scheduleItems, error }) {
  return (
    <>
      <Head>
        <title>Jadwal Acara & Teater - Jeketian</title>
        <meta name="description" content="Jadwal acara dan pertunjukan teater JKT48 terbaru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 drop-shadow-sm">
              Jadwal Acara & Teater
            </h1>
          </div>
          
          {error ? (
            <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg max-w-lg mx-auto shadow-sm">
              <p>{error}</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {scheduleItems.map((item, index) => (
                <ScheduleCard key={item.id || index} item={item} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
