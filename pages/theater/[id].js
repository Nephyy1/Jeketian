import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

export async function getServerSideProps(context) {
  return {
    props: {
      error: "Halaman detail untuk pertunjukan ini sedang dalam pengembangan atau tidak tersedia.",
    },
  };
}

export default function TheaterDetailPage({ error }) {
  return (
    <>
      <Head>
        <title>Konten Tidak Tersedia - Jeketian</title>
      </Head>
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 8rem)' }}>
          <div className="text-center">
            
            <FiAlertTriangle
              className="text-yellow-400 mx-auto"
              size={80}
            />
            
            <h1 className="mt-6 text-2xl md:text-3xl font-bold text-slate-800">
              Konten Belum Tersedia
            </h1>
            
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              {error}
            </p>

            <div className="mt-8">
              <Link href="/schedule" legacyBehavior>
                <a className="inline-flex items-center text-white font-bold px-6 py-3 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <FiArrowLeft className="mr-2" />
                  Kembali ke Jadwal
                </a>
              </Link>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
