import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiRadio, FiYoutube, FiVideo, FiPlayCircle, FiArrowLeft, FiClock, FiEye, FiZap } from 'react-icons/fi';

export async function getServerSideProps() {
  const apiKey = "48-NEPHYY";
  
  let liveStreams = [];
  let showroomLives = [];
  let recentLives = [];
  let liveError = null;
  let showroomError = null;
  let recentError = null;

  try {
    const liveResponse = await fetch(`https://v2.jkt48connect.my.id/api/jkt48/live?apikey=${apiKey}`);
    if (!liveResponse.ok) throw new Error('Gagal memuat data live');
    const liveData = await liveResponse.json();
    if (liveData && Array.isArray(liveData) && liveData.length > 0) {
      liveStreams = liveData;
    } else {
      liveError = "Tidak ada yang sedang live saat ini.";
    }
  } catch (e) {
    liveError = e.message || "Gagal memuat data live stream.";
  }

  try {
    const showroomResponse = await fetch(`https://api.jkt48connect.my.id/api/live/showroom?api_key=${apiKey}`);
    if (!showroomResponse.ok) throw new Error('Gagal memuat data Showroom');
    const showroomData = await showroomResponse.json();
    if (showroomData.success && Array.isArray(showroomData.lives) && showroomData.lives.length > 0) {
      showroomLives = showroomData.lives;
    } else {
      showroomError = "Tidak ada member yang live di Showroom saat ini.";
    }
  } catch (e) {
    showroomError = e.message || "Gagal memuat data Showroom.";
  }

  try {
    const recentResponse = await fetch(`https://api.jkt48connect.my.id/api/recent?api_key=${apiKey}&limit=8`);
    if (!recentResponse.ok) throw new Error('Gagal memuat data recent live');
    const recentData = await recentResponse.json();
    if (Array.isArray(recentData) && recentData.length > 0) {
      recentLives = recentData;
    } else {
      recentError = "Tidak ada data siaran langsung terkini.";
    }
  } catch (e) {
    recentError = e.message || "Gagal memuat data siaran langsung terkini.";
  }

  return {
    props: {
      liveStreams,
      showroomLives,
      recentLives,
      liveError,
      showroomError,
      recentError,
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

const ShowroomCard = ({ item }) => {
    const watchUrl = `https://www.showroom-live.com/r/${item.roomUrlKey}`;

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100 flex flex-col">
            <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-w-16 aspect-h-9 relative bg-slate-200">
                    <Image
                        src={item.thumbnailUrl}
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
                        <PlatformIcon type="showroom" />
                        <span className="ml-2">Showroom</span>
                    </div>
                    <div className="flex items-center" title="Penonton">
                        <FiEye className="mr-1.5" />
                        <span>{item.viewers.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecentLiveCard = ({ item }) => {
    const formatEndTime = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        });
    };

    const formatDuration = (ms) => {
        if (!ms) return 'N/A';
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}j ${minutes}m`;
        }
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
}

export default function LiveReplyPage({ liveStreams, showroomLives, recentLives, liveError, showroomError, recentError }) {
  return (
    <>
      <Head>
        <title>Live Streaming & Aktivitas Terkini - Jeketian</title>
        <meta name="description" content="Tonton streaming langsung dan lihat aktivitas terkini dari member JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Live & Aktivitas Terkini
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

          <div className="max-w-7xl mx-auto space-y-16">
            <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                    <FiRadio className="mr-3 text-red-500"/> Live di Berbagai Platform
                </h2>
                {liveError ? (
                    <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                    <p>{liveError}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {liveStreams.map((item, index) => <LiveCard key={item.room_id || index} item={item} />)}
                    </div>
                )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <FiVideo className="mr-3 text-sky-500"/> JKT48 Showroom
              </h2>
              {showroomError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                  <p>{showroomError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {showroomLives.map((item) => <ShowroomCard key={item.roomId} item={item} />)}
                </div>
              )}
            </section>

             <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <FiZap className="mr-3 text-yellow-500"/> Aktivitas Live Terkini
              </h2>
              {recentError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                  <p>{recentError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recentLives.map((item) => <RecentLiveCard key={item._id} item={item} />)}
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
