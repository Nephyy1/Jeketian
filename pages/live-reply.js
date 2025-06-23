import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiRadio, FiYoutube, FiVideo, FiPlayCircle, FiArrowLeft, FiClock } from 'react-icons/fi';

export async function getServerSideProps() {
  let liveStreams = [];
  let error = null;

  try {
    const response = await fetch('https://v2.jkt48connect.my.id/api/jkt48/live?apikey=48-NEPHYY');
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: Status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data) && data.length > 0) {
      liveStreams = data;
    } else {
      error = "Tidak ada yang sedang live saat ini.";
    }
  } catch (e) {
    error = e.message || "Terjadi kesalahan saat menghubungi API.";
  }

  return {
    props: {
      liveStreams,
      error,
    },
  };
}

const PlatformIcon = ({ type }) => {
    const lowerType = type?.toLowerCase() || '';
  
    if (lowerType.includes('youtube')) {
      return <FiYoutube className="text-red-500" title="YouTube" />;
    }
    if (lowerType.includes('showroom')) {
      return <FiVideo className="text-sky-500" title="Showroom" />;
    }
    if (lowerType.includes('idn')) {
      return <FiPlayCircle className="text-orange-500" title="IDN Live" />;
    }
    return <FiRadio className="text-slate-400" title={type} />;
};

const LiveCard = ({ item }) => {
    const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' };
        return new Date(dateString).toLocaleTimeString('id-ID', options);
    };

    const getWatchUrl = (item) => {
        const lowerType = item.type?.toLowerCase();
        if (lowerType === 'showroom') {
            return `https://www.showroom-live.com/r/${item.url_key}`;
        }
        if (lowerType === 'idn') {
            return `https://www.idn.app/${item.url_key}`;
        }
        return '#';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100 flex flex-col">
            <a href={getWatchUrl(item)} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-w-16 aspect-h-9 relative bg-slate-200">
                    <Image
                        src={item.img}
                        alt={`Thumbnail for ${item.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-1.5"></div>
                        LIVE
                    </div>
                </div>
            </a>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 leading-tight flex-grow group-hover:text-pink-600 transition-colors">
                    {item.name}
                </h3>
                <div className="flex justify-between items-center text-sm text-slate-500 mt-3">
                    <div className="flex items-center">
                        <PlatformIcon type={item.type} />
                        <span className="ml-2 capitalize">{item.type}</span>
                    </div>
                    <div className="flex items-center">
                        <FiClock className="mr-1.5" />
                        <span>Mulai {formatTime(item.started_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function LiveReplyPage({ liveStreams, error }) {
  return (
    <>
      <Head>
        <title>Live Streaming - Jeketian</title>
        <meta name="description" content="Tonton streaming langsung dari member JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Live Streaming
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveStreams.map((item, index) => <LiveCard key={item.room_id || index} item={item} />)}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
