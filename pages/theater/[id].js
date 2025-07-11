import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiClock, FiGift, FiTicket, FiUsers } from 'react-icons/fi';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiKey = process.env.NEPHYY_APIKEY;
  
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
        showId: id,
      },
    };
  } catch (e) {
    return { notFound: true };
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

export default function TheaterDetailPage({ show, showId }) {
  const eventDate = new Date(show.date);
  const date = eventDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
  const time = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' });

  const siteUrl = "https://jeketian.web.id";
  const pageTitle = `${show.title} - Jadwal Teater JKT48`;
  const description = `Detail jadwal dan member yang tampil pada pertunjukan teater JKT48 "${show.title}" pada tanggal ${date}.`;
  const canonicalUrl = `${siteUrl}/theater/${showId}`;
  const socialBanner = show.banner || `${siteUrl}/img/logo.jpg`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialBanner} />
        <meta property="og:site_name" content="Jeketian" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialBanner} />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TheaterEvent",
                "name": show.title,
                "startDate": new Date(show.date).toISOString(),
                "location": {
                  "@type": "Place",
                  "name": "Teater JKT48",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "fX Sudirman, Lantai 4",
                    "addressLocality": "Jakarta",
                    "addressCountry": "ID"
                  }
                },
                "image": [socialBanner],
                "description": description,
                "performer": show.members?.map(member => ({
                  "@type": "Person",
                  "name": member.name
                })) || [],
                "offers": {
                  "@type": "Offer",
                  "url": "https://jkt48.com/theater/schedule",
                  "price": "0",
                  "priceCurrency": "IDR",
                  "availability": "https://schema.org/InStock",
                  "validFrom": new Date().toISOString()
                }
              })
            }}
        />
      </Head>

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="relative h-64 md:h-80 w-full">
            <Image
                src={show.banner}
                alt={`Banner untuk ${show.title}`}
                layout="fill"
                objectFit="cover"
                className="brightness-50"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 text-white">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">{show.title}</h1>
                <div className="flex items-center text-lg mt-2 opacity-90 drop-shadow-md">
                    <FiCalendar className="mr-2"/>
                    <span>{date}</span>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <Link href="/schedule" legacyBehavior>
                    <a className="inline-flex items-center text-sm text-slate-600 hover:text-pink-600 font-medium transition-colors duration-300 group">
                        <FiArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Semua Jadwal
                    </a>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {show.seitansai && show.seitansai.length > 0 && (
                        <div className="mb-8 p-5 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-xl shadow-lg">
                            <div className="flex items-center text-xl font-bold">
                                <FiGift className="mr-3"/>
                                <span>Pesta Ulang Tahun untuk {show.seitansai.map(m => m.name).join(', ')}!</span>
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Member yang Tampil ({show.members?.length || 0})</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {show.members && show.members.filter(member => member).map(member => (
                                <MemberPill key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-3">Detail Pertunjukan</h3>
                        <div className="space-y-4 text-slate-600">
                             <div className="flex items-start">
                                 <FiClock className="mr-3 mt-1 flex-shrink-0 text-slate-400" />
                                 <span>Pukul {time} WIB</span>
                             </div>
                             <div className="flex items-start">
                                 <FiUsers className="mr-3 mt-1 flex-shrink-0 text-slate-400" />
                                 <span>{show.member_count} Member Tampil</span>
                             </div>
                        </div>
                         <div className="mt-6">
                            <a 
                                href="https://jkt48.com/theater/schedule" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full inline-flex items-center justify-center text-white font-bold px-6 py-3 rounded-lg bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <FiTicket className="mr-3"/>
                                Info Tiket
                            </a>
                         </div>
                    </div>
                </aside>
            </div>
        </div>
      </main>
    </>
  );
}
