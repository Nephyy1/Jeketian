import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiArrowLeft, FiClock, FiEye, FiZap, FiYoutube, FiVideo, FiPlayCircle, FiRadio } from 'react-icons/fi';

export async function getServerSideProps() {
  let recentLives = [];
  let error = null;

  try {
    const response = await fetch(`https://api.jkt48connect.my.id/api/recent?api_key=48-NEPHYY&limit=12`);
    if (!response.ok) throw new Error('Gagal memuat data aktivitas terkini');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      recentLives = data;
    } else {
      error = "Tidak ada data siaran langsung terkini.";
    }
  } catch (e) {
    error = e.message || "Gagal memuat data siaran langsung terkini.";
  }

  return {
    props: {
      recentLives,
      error,
    },
  };
}

const PlatformIcon = ({ type }) => {
    const lowerType = type?.toLowerCase() || '';
    if (lowerType.includes('youtube')) return <FiYoutube className="text-red-500" title="YouTube" />;
    if (lowerType.includes('showroom')) return <FiVideo className="text-sky-500" title="Showroom" />;
    if (lowerType.includes('idn')) return <FiPlayCircle className="text-orange-500" title="IDN Live" />;
    return <FiRadio className="text-slate-400" title={type} />;
};

const RecentLiveCard = ({ item }) => {
    const formatDuration = (ms) => {
        if (!ms) return 'N/A';
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        if (hours > 0) return `${hours}j ${minutes}m`;
        return `${minutes}m`;
    };

    const thumbnailUrl = item.idn?.image || item.member?.img;

    return (
         <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100 flex flex-col">
            <div className="aspect-w-16 aspect-h-9 relative bg-slate-200">
                {thumbnailUrl &&
                    <Image
                        src={thumbnailUrl}
                        alt={`Thumbnail for ${item.member.name}`}
                        layout="fill"
                        objectFit="cover"
                    />
                }
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 leading-tight flex-grow">
                    {item.member.name}
                </h3>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-3 border-t pt-3">
                     <div className="flex items-center" title="Durasi">
                        <FiClock className="mr-1.5" />
                        <span>{formatDuration(item.live_info.duration)}</span>
                    </div>
                    <div className="flex items-center" title="Penonton">
                        <FiEye className="mr-1.5" />
                        <span>{item.live_info.viewers.num.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center">
                        <PlatformIcon type={item.type} />
                        <span className="ml-1.5 capitalize">{item.type}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default function HistoryPage({ recentLives, error }) {
  return (
    <>
      <Head>
        <title>Riwayat Siaran - Jeketian</title>
        <meta name="description" content="Arsip dan riwayat aktivitas live streaming member JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 drop-shadow-sm">
              Riwayat Siaran
            </h1>
          </div>
          
          <div className="text-center mb-10">
            <Link href="/live" legacyBehavior>
              <a className="inline-flex items-center text-sm text-slate-600 hover:text-pink-600 font-medium transition-colors duration-300 group">
                <FiArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                Kembali ke Halaman Live
              </a>
            </Link>
          </div>

           <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <FiZap className="mr-3 text-yellow-500"/> Aktivitas Live Terkini
              </h2>
              {error ? (
                <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                  <p>{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recentLives.map((item) => <RecentLiveCard key={item._id} item={item} />)}
                </div>
              )}
            </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
