import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCalendar, FiExternalLink, FiMapPin } from 'react-icons/fi';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let eventItems = [];
  let eventError = null;

  try {
    if (jkt48Api && typeof jkt48Api.events === 'function') {
      const eventDataResponse = await jkt48Api.events(apiKey);
      if (eventDataResponse && Array.isArray(eventDataResponse)) {
        eventItems = eventDataResponse.slice(0, 20); // Ambil 20 event terbaru/mendatang
      } else {
        eventError = "Format data event tidak sesuai atau API event bermasalah.";
      }
    } else {
      eventError = "Metode event tidak tersedia.";
    }
  } catch (error) {
    eventError = `Gagal memuat event: ${error.message || "Kesalahan tidak diketahui"}`;
  }

  return {
    props: {
      eventItems,
      eventError,
    },
  };
}

export default function SchedulePage({ eventItems, eventError }) {
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "Tanggal tidak tersedia";
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
    }
    options.timeZone = 'Asia/Jakarta'; 
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <Head>
        <title>Jadwal Event - Jeketian</title>
        <meta name="description" content="Jadwal lengkap event dan pertunjukan JKT48." />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10 md:mb-12">
                <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
                    Jadwal Event JKT48
                </h1>
                <p className="mt-2 text-slate-500">Semua jadwal pertunjukan dan event spesial dari JKT48</p>
            </div>

            {eventError && (
              <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{eventError}</p>
            )}

            {!eventError && eventItems && eventItems.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {eventItems.map((event) => {
                  let localEventIconPath = null;
                  if (event.label && typeof event.label === 'string') {
                    const labelUrlParts = event.label.split('/');
                    const eventLabelFilename = labelUrlParts.pop();
                    if (eventLabelFilename) { localEventIconPath = `/img/${eventLabelFilename}`; }
                  }
                  return (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-400"></div>
                      <div className="p-5 space-y-3">
                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-pink-600 transition-colors duration-300 leading-tight">
                            {event.title || "Nama Event Tidak Tersedia"}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500">
                          <FiCalendar className="mr-2 text-pink-500 flex-shrink-0" />
                          <span>{formatDate(event.date, true)}</span>
                        </div>
                        {localEventIconPath && (
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-1.5">Kategori Event:</span>
                            <Image src={localEventIconPath} alt="Ikon Kategori Event" width={40} height={40} className="mr-1.5 object-contain" onError={(e) => { e.target.style.display = 'none'; }}/>
                          </div>
                        )}
                        {event.url && (
                          <a href={event.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-pink-600 hover:text-purple-700 font-medium transition-colors duration-300 mt-2 group/link">
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
              !eventError && eventItems.length === 0 && <p className="text-center text-slate-500">Tidak ada event yang dijadwalkan.</p>
            )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
