import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCalendar, FiClock } from 'react-icons/fi';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let scheduleItems = [];
  let error = null;

  try {
    scheduleItems = await jkt48Api.theater(apiKey);
    if (!Array.isArray(scheduleItems)) {
      error = "Format data jadwal tidak sesuai atau API bermasalah.";
      scheduleItems = [];
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

export default function SchedulePage({ scheduleItems, error }) {
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
    <>
      <Head>
        <title>Jadwal Teater - Jeketian</title>
        <meta name="description" content="Jadwal pertunjukan teater JKT48 terbaru." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 drop-shadow-sm">
              Jadwal Teater JKT48
            </h1>
          </div>
          
          {error && (
            <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg max-w-lg mx-auto">
              {error}
            </div>
          )}

          {!error && scheduleItems && scheduleItems.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {scheduleItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden border border-slate-100">
                  <div className="p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 mb-3">
                      {item.title || "Judul Show Tidak Tersedia"}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center text-slate-600 space-y-2 sm:space-y-0 sm:space-x-6 mb-5">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-pink-500 flex-shrink-0" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2 text-purple-500 flex-shrink-0" />
                        <span>Pukul {formatTime(item.date)} WIB</span>
                      </div>
                    </div>
                    
                    {item.members && item.members.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">Member Tampil:</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.members.map((member, memberIndex) => (
                                    <span key={memberIndex} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full group-hover:bg-pink-100 group-hover:text-pink-800 transition-colors duration-200">
                                        {member.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !error && <p className="text-center text-slate-500">Tidak ada jadwal teater yang akan datang.</p>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
