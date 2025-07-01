import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiUser, FiMail, FiHeart, FiCode, FiAlertTriangle } from 'react-icons/fi';

export default function InformationPage() {
  const siteUrl = "https://jeketian.web.id";
  const pageTitle = "Informasi & Dukungan - Jeketian";
  const description = "Informasi mengenai pengembangan website Jeketian, cara menghubungi kami, dan bagaimana Anda bisa memberikan dukungan untuk pengembangan.";
  const socialBanner = `${siteUrl}/img/logo.jpg`;
  const canonicalUrl = `${siteUrl}/information`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialBanner} />
        <meta property="og:site_name" content="Jeketian" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialBanner} />
      </Head>

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-6">
            <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 drop-shadow-sm">
              Informasi & Dukungan
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

          <div className="max-w-4xl mx-auto space-y-10">
            <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <FiUser className="mr-3 text-pink-500"/> Dibuat Oleh
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Website ini dirancang dan dikembangkan oleh <strong>Nephyy</strong> sebagai sebuah proyek personal (fan-made project) yang didedikasikan untuk para penggemar JKT48. Tujuannya adalah untuk menyediakan platform yang mudah diakses dan informatif.
              </p>
            </section>
            
            <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <FiMail className="mr-3 text-purple-500"/> Kontak
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Jika Anda memiliki pertanyaan, masukan, atau menemukan bug/kesalahan pada website, jangan ragu untuk menghubungi melalui email di bawah ini. Setiap masukan sangat kami hargai.
              </p>
              <div className="mt-4">
                <a href="mailto:admin@jeketian.my.id" className="font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                  kontak@emailanda.com
                </a>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <FiHeart className="mr-3 text-red-500"/> Dukungan & Donasi
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Jeketian adalah proyek non-profit yang dikelola secara independen. Jika Anda merasa website ini bermanfaat dan ingin mendukung biaya server serta pengembangan fitur-fitur baru di masa depan, Anda bisa memberikan donasi melalui tautan di bawah ini.
              </p>
              <div className="text-center space-y-6">
                  <a 
                    href="https://payment.nephyy.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center text-white font-bold px-8 py-3 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Beri Dukungan
                  </a>
                  <div>
                    <p className="text-slate-500 mb-4">Atau pindai QRIS di bawah ini:</p>
                    <div className="max-w-xs mx-auto bg-white p-2 rounded-lg shadow-inner">
                         <Image
                            src="/img/qris.jpg"
                            alt="QRIS Donasi"
                            width={300}
                            height={300}
                            layout="responsive"
                            className="rounded-md"
                         />
                    </div>
                  </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <FiCode className="mr-3 text-teal-500"/> Teknologi
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Website ini dibangun menggunakan teknologi modern untuk memastikan kecepatan dan pengalaman pengguna yang baik, di antaranya:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-slate-600">
                <li><strong>Next.js</strong> - Framework React untuk performa tinggi.</li>
                <li><strong>Tailwind CSS</strong> - Utilitas CSS untuk desain yang cepat dan responsif.</li>
                <li><strong>Vercel</strong> - Platform hosting untuk deployment yang optimal.</li>
              </ul>
            </section>
            
            <section className="bg-pink-50 border border-pink-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-pink-800 mb-4 flex items-center">
                <FiAlertTriangle className="mr-3 text-pink-600"/> Disclaimer
              </h2>
              <p className="text-pink-700 leading-relaxed">
                Jeketian adalah situs web buatan penggemar dan tidak berafiliasi secara resmi dengan JKT48, Dentsu, atau pihak terkait manapun. Semua data, gambar, dan merek dagang adalah milik dari pemiliknya masing-masing.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
