import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>JKT48 Fan Hub</title>
        <meta name="description" content="Website fan-made JKT48" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pt-20 min-h-screen bg-custom-gradient">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center py-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Selamat Datang di JKT48 Fan Hub!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Temukan informasi terbaru, jadwal, dan aktivitas member JKT48.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
              Jelajahi Sekarang
            </button>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-bold text-center text-slate-700 mb-12">
              Konten Utama
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">Judul Konten {item}</h3>
                  <p className="text-slate-600">
                    Ini adalah deskripsi singkat untuk konten yang akan ditampilkan.
                    Anda bisa mengisi dengan data dari API JKT48 di sini.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-800 text-white text-center p-6">
        <p>&copy; {new Date().getFullYear()} JKT48 Fan Hub. Dibuat dengan ❤️</p>
      </footer>
    </>
  );
}