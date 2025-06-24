import Head from 'next/head';
import Link from 'next/link';
import { FiHome, FiCompass } from 'react-icons/fi';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404: Halaman Tidak Ditemukan - Jeketian</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan." />
      </Head>
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 8rem)' }}>
          <div className="text-center">
            <div className="relative inline-block">
              <FiCompass
                className="absolute -top-8 -left-8 text-pink-100 transform rotate-12"
                size={100}
              />
              <h1 className="relative text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
                404
              </h1>
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-800">
              Halaman Tidak Ditemukan
            </h2>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak pernah ada.
            </p>
            <div className="mt-8">
              <Link href="/" legacyBehavior>
                <a className="inline-flex items-center text-white font-bold px-6 py-3 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <FiHome className="mr-2" />
                  Kembali ke Halaman Utama
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
