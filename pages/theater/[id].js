import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiClock, FiGift, FiTicket, FiUsers } from 'react-icons/fi';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiKey = "48-NEPHYY";
  
  try {
    const response = await fetch(`https://v2.jkt48connect.my.id/api/jkt48/theater/${id}?apikey=${apiKey}`);
    
    if (!response.ok) {
      return { notFound: true };
    }
    
    const show = await response.json();
    
    if (!show || !show.title) {
        return { notFound: true };
    }

    return {
      props: {
        show,
        error: null,
      },
    };
  } catch (e) {
    return {
      props: {
        show: null,
        error: e.message || "Terjadi kesalahan saat menghubungi API.",
      },
    };
  }
}

const MemberPill = ({ member }) => {
  if (!member || !member.name) return null;

  return (
    <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
            {(member.img_alt || member.img) && (
                <Image
                    src={member.img_alt || member.img}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                />
            )}
        </div>
        <span className="font-semibold text-sm text-slate-700">{member.name}</span>
    </div>
  );
};

export default function TheaterDetailPage({ show, error }) {
  if (error || !show) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
        <div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Gagal Memuat Data</h1>
            <p className="text-slate-600 mb-6">{error || "Pertunjukan tidak ditemukan."}</p>
            <Link href="/schedule" legacyBehavior>
                <a className="inline-flex items-center text-sm text-pink-600 hover:text-pink-800 font-medium transition-colors duration-300 group">
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Jadwal
                </a>
            </Link>
        </div>
      </main>
    );
  }

  const eventDate = new Date(show.date);
  const date = eventDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
  const time = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' });

  return (
    <>
      <Head>
        <title>{show.title} - Jadwal Teater JKT48</title>
        <meta name="description" content={`Detail pertunjukan ${show.title} pada ${date}.`} />
      </Head>

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="relative h-64 md:h-80 w-full">
            <Image
                src={show.banner}
                alt={`Banner for ${show.title}`}
                layout="fill"
                objectFit="cover"
                className="brightness-50"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-8 text-white">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">{show.title}</h1>
                <div className="flex items-center text-lg mt-2 opacity-90 drop-shadow-md">
                    <FiCalendar className="mr-2"/>
                    <span>{date}</span>
                    <span className="mx-2">|</span>
                    <FiClock className="mr-2"/>
                    <span>{time} WIB</span>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <Link href="/schedule" legacyBehavior>
                    <a className="inline-flex items-center text-sm text-slate-600 hover:text-pink-600 font-medium transition-colors duration-300 group">
                        <FiArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Semua Jadwal
                    </a>
                </Link>
            </div>

            {show.seitansai && show.seitansai.length > 0 && (
                <div className="mb-10 p-5 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-xl shadow-lg text-center">
                    <div className="flex items-center justify-center text-xl font-bold">
                        <FiGift className="mr-3"/>
                        <span>Pesta Ulang Tahun untuk {show.seitansai.map(m => m.name).join(', ')}!</span>
                    </div>
                </div>
            )}
            
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Member yang Tampil ({show.members?.length || 0})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {show.members && show.members.filter(member => member).map(member => (
                        <MemberPill key={member.id} member={member} />
                    ))}
                </div>
            </div>
            
            <div className="mt-12 text-center">
                 <a 
                    href="https://jkt48.com/theater/schedule" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-white font-bold px-8 py-3 rounded-lg bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                    <FiTicket className="mr-3"/>
                    Lihat Info Tiket
                </a>
            </div>
        </div>
      </main>
    </>
  );
}
