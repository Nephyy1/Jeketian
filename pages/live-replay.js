import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiRadio, FiRewind, FiYoutube, FiVideo, FiExternalLink } from 'react-icons/fi';

export async function getServerSideProps() {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  
  let liveStreams = [];
  let replays = [];
  let liveError = null;
  let replayError = null;

  try {
    const liveData = await jkt48Api.live(apiKey);
    if (Array.isArray(liveData) && liveData.length > 0) {
      liveStreams = liveData;
    } else {
      liveError = "Tidak ada yang sedang live saat ini.";
    }
  } catch (e) {
    liveError = "Gagal memuat data live stream.";
  }

  try {
    const replayData = await jkt48Api.replay(apiKey);
    if (Array.isArray(replayData) && replayData.length > 0) {
      replays = replayData;
    } else {
      replayError = "Tidak ada siaran ulang yang tersedia.";
    }
  } catch (e) {
    replayError = "Gagal memuat data replay.";
  }

  return {
    props: {
      liveStreams,
      replays,
      liveError,
      replayError,
    },
  };
}

const PlatformIcon = ({ platform }) => {
  const lowerCasePlatform = platform?.toLowerCase() || '';

  if (lowerCasePlatform.includes('youtube')) {
    return <FiYoutube className="text-red-500" title="YouTube" />;
  }
  if (lowerCasePlatform.includes('showroom')) {
    return <FiVideo className="text-sky-500" title="Showroom" />;
  }
  if (lowerCasePlatform.includes('idn')) {
    return <FiVideo className="text-orange-500" title="IDN Live" />;
  }
  return <FiVideo className="text-slate-400" title={platform} />;
};

const LiveCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100">
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="aspect-w-16 aspect-h-9 relative">
        <Image
          src={item.image}
          alt={`Thumbnail for ${item.member.name}`}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full mr-1.5"></div>
          LIVE
        </div>
      </div>
    </a>
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <Image
          src={item.member.img}
          alt={item.member.name}
          width={48}
          height={48}
          className="rounded-full border-2 border-slate-200"
        />
        <div className="flex-grow">
          <h3 className="font-bold text-slate-800 leading-tight">{item.member.name}</h3>
          <div className="flex items-center text-sm text-slate-500 mt-1">
            <PlatformIcon platform={item.platform} />
            <span className="ml-1.5">{item.platform}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReplayCard = ({ item }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100">
            <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                src={item.image}
                alt={`Thumbnail for ${item.title}`}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4 flex flex-col h-full">
                <h3 className="font-bold text-slate-800 leading-tight flex-grow">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-2">{formatDate(item.date)}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-pink-500 hover:text-pink-700 font-semibold transition-colors duration-300">
                        Tonton Ulang
                        <FiExternalLink className="ml-1.5 h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function LiveReplyPage({ liveStreams, replays, liveError, replayError }) {
  return (
    <>
      <Head>
        <title>Live & Reply - Jeketian</title>
        <meta name="description" content="Tonton streaming langsung dan siaran ulang dari member JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Live & Reply
            </h1>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <FiRadio className="mr-3 text-red-500"/> Sedang Live Saat Ini
              </h2>
              {liveError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                  <p>{liveError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {liveStreams.map((item) => <LiveCard key={item.member.url} item={item} />)}
                </div>
              )}
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <FiRewind className="mr-3 text-purple-500"/> Tonton Ulang (Replay)
              </h2>
              {replayError ? (
                <div className="text-center text-slate-500 bg-slate-100 p-6 rounded-lg shadow-sm">
                  <p>{replayError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {replays.map((item, index) => <ReplayCard key={item.url || index} item={item} />)}
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
