import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCalendar, FiClock, FiStar, FiAward } from 'react-icons/fi';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let theaterSchedules = [];
  let specialEvents = [];
  let theaterError = null;
  let eventsError = null;

  try {
    const theaterData = await jkt48Api.theater(apiKey);
    if (Array.isArray(theaterData)) {
      theaterSchedules = theaterData;
    } else {
      theaterError = "Saat ini tidak ada jadwal teater reguler.";
    }
  } catch (e) {
    theaterError = "Gagal memuat jadwal teater.";
  }

  try {
    const eventsData = await jkt48Api.events(apiKey);
    if (Array.isArray(eventsData)) {
      specialEvents = eventsData;
    } else {
      eventsError = "Saat ini tidak ada event spesial.";
    }
  } catch (e) {
    eventsError = "Gagal memuat event spesial.";
  }

  return {
    props: {
      theaterSchedules,
      specialEvents,
      theaterError,
      eventsError,
    },
  };
}

const ScheduleCard = ({ item }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Waktu tidak tersedia";
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleTimeString('id-ID', options);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden border border-slate-100">
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 mb-3">
          {item.title || "Judul Acara Tidak Tersedia"}
        </h3>
        <div className="flex items-center text-slate-600 space-x-6">
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-pink-500 flex-shrink-0" />
            <span>{formatDate(item.date)}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 text-purple-500 flex-shrink-0" />
            <span>Pukul {formatTime(item.date)} WIB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SchedulePage({ theaterSchedules, specialEvents, theaterError, eventsError }) {
  return (
    <>
      <Head>
        <title>Jadwal Acara & Teater - Jeketian</title>
        <meta name="description" content="Jadwal lengkap acara spesial dan pertunjukan teater JKT48 terbaru." />
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

          <div className="max-w-4xl mx-auto space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center"><FiStar className="mr-3 text-yellow-500"/> Jadwal Teater Reguler</h2>
              {theaterError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-4 rounded-lg">{theaterError}</div>
              ) : (
                <div className="space-y-6">
                  {theaterSchedules.map((item, index) => <ScheduleCard key={`theater-${index}`} item={item} />)}
                </div>
              )}
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center"><FiAward className="mr-3 text-red-500"/> Event Spesial Lainnya</h2>
              {eventsError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-4 rounded-lg">{eventsError}</div>
              ) : (
                 <div className="space-y-6">
                  {specialEvents.map((item, index) => <ScheduleCard key={`event-${index}`} item={item} />)}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
