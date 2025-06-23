import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { 
    FiArrowLeft, FiTwitter, FiInstagram, FiVideo, FiPlayCircle, FiYoutube
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export async function getServerSideProps() {
  let members = [];
  let error = null;

  try {
    const response = await fetch('https://v2.jkt48connect.my.id/api/jkt48/members?apikey=48-NEPHYY');
    
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: Status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      let activeMembers = data.filter(member => !member.is_graduate && member.group !== 'official');
      
      const getGenNumber = (genString) => {
        if (!genString) return 0;
        const match = genString.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
      };

      activeMembers.sort((a, b) => {
        const genA = getGenNumber(a.generation);
        const genB = getGenNumber(b.generation);
        return genB - genA;
      });

      members = activeMembers;

    } else {
      error = "Tidak ada data member yang ditemukan.";
    }
  } catch (e) {
    error = e.message || "Terjadi kesalahan saat menghubungi API.";
  }

  return {
    props: {
      members,
      error,
    },
  };
}

const SocialIcon = ({ title, url }) => {
    const lowerTitle = title.toLowerCase();
    let icon;

    switch (lowerTitle) {
        case 'x':
        case 'twitter':
            icon = <FiTwitter className="text-sky-500" />;
            break;
        case 'instagram':
            icon = <FiInstagram className="text-pink-600" />;
            break;
        case 'tiktok':
            icon = <FaTiktok className="text-purple-600" />;
            break;
        case 'showroom':
            icon = <FiVideo className="text-teal-500" />;
            break;
        case 'idn':
            icon = <FiPlayCircle className="text-orange-500" />;
            break;
        case 'youtube':
            icon = <FiYoutube className="text-red-600" />;
            break;
        default:
            return null;
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl text-slate-500 hover:text-slate-800 hover:scale-125 transition-transform duration-200">
            {icon}
        </a>
    );
};


const MemberCard = ({ member }) => {
  const generationText = member.generation ? member.generation.replace('gen', 'Gen ').replace('-jkt48', '') : '';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1.5 overflow-hidden border border-slate-100 flex flex-col">
      <div className="aspect-w-3 aspect-h-4 relative">
        <Image
          src={member.img_alt}
          alt={`Foto ${member.name}`}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3">
            <h3 className="text-lg font-bold text-white tracking-wide drop-shadow-lg">{member.name}</h3>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold bg-pink-100 text-pink-800 px-3 py-1 rounded-full">{generationText}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {member.socials.map(social => (
            <SocialIcon key={social.title} title={social.title} url={social.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MembersPage({ members, error }) {
  return (
    <>
      <Head>
        <title>Daftar Member - Jeketian</title>
        <meta name="description" content="Daftar lengkap member aktif JKT48." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
              Member JKT48
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
            <div className="text-center text-red-500 bg-red-100 p-6 rounded-lg max-w-lg mx-auto shadow-sm">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
