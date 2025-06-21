import Link from 'next/link';
import { LuSparkles } from 'react-icons/lu';
import { FiYoutube, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center text-2xl font-brand text-white transition-colors duration-200 hover:text-pink-400">
                <LuSparkles className="mr-2 h-6 w-6 text-pink-500" />
                Jeketian
              </a>
            </Link>
            <p className="text-sm max-w-xs">
              Website komunitas fan-made yang didedikasikan untuk JKT48. Tidak berafiliasi dengan JKT48 Operation Team.
            </p>
          </div>

          <div className="md:mx-auto">
            <h3 className="font-semibold text-white tracking-wider mb-4">Navigasi</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" legacyBehavior><a className="hover:text-pink-400 transition-colors">Home</a></Link>
              <Link href="/news" legacyBehavior><a className="hover:text-pink-400 transition-colors">News</a></Link>
              <Link href="/live-reply" legacyBehavior><a className="hover:text-pink-400 transition-colors">Live & Reply</a></Link>
            </nav>
          </div>

          <div className="md:ml-auto">
            <h3 className="font-semibold text-white tracking-wider mb-4">Ikuti JKT48</h3>
            <div className="flex justify-center space-x-6 md:justify-start">
              <a href="https://www.youtube.com/user/JKT48" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-red-500 transition-colors"><FiYoutube /></a>
              <a href="https://www.x.com/officialJKT48" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-sky-400 transition-colors"><FiTwitter /></a>
              <a href="https://www.instagram.com/jkt48" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500 transition-colors"><FiInstagram /></a>
              <a href="https://www.tiktok.com/@jkt48.official" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white transition-colors"><FaTiktok /></a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-black bg-opacity-20 py-4">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Jeketian. Dibuat dengan ❤️ oleh Fans untuk Fans.
        </p>
      </div>
    </footer>
  );
}
