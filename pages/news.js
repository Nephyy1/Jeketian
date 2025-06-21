import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { FiCalendar, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export async function getServerSideProps({ query }) {
  const jkt48Api = require('@jkt48/core');
  const apiKey = "48-NEPHYY";
  const page = parseInt(query.page) || 1;

  let newsItems = [];
  let pagination = {};
  let newsError = null;

  try {
    const newsDataResponse = await jkt48Api.news(apiKey, { page: page });
    if (newsDataResponse && newsDataResponse.news && Array.isArray(newsDataResponse.news)) {
      newsItems = newsDataResponse.news;
      pagination = {
        page: newsDataResponse.page || page,
        perPage: newsDataResponse.perpage || newsItems.length,
        totalCount: newsDataResponse.total_count || 0,
        totalPages: newsDataResponse.total_count && newsDataResponse.perpage ? Math.ceil(newsDataResponse.total_count / newsDataResponse.perpage) : 1
      };
    } else {
      newsError = "Format data berita tidak sesuai.";
    }
  } catch (error) {
    newsError = `Gagal memuat berita: ${error.message || "Kesalahan tidak diketahui"}`;
  }

  return {
    props: {
      newsItems,
      newsError,
      pagination,
    },
  };
}


export default function NewsPage({ newsItems, newsError, pagination }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const { currentPage, totalPages } = pagination;

  return (
    <>
      <Head>
        <title>Semua Berita - Jeketian</title>
        <meta name="description" content="Kumpulan berita dan pengumuman terbaru dari JKT48." />
      </Head>

      <Navbar />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10 md:mb-12">
              <h1 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-pink-500 to-purple-600 drop-shadow-sm">
                Arsip Berita JKT48
              </h1>
              <p className="mt-2 text-slate-500">Semua pengumuman dan berita terbaru dari JKT48</p>
            </div>

            {newsError && (
              <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{newsError}</p>
            )}

            {!newsError && newsItems && newsItems.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {newsItems.map((item) => {
                    let localIconPath = null;
                    if (item.label) {
                      const labelParts = item.label.split('/');
                      const filename = labelParts.pop();
                      if (filename) { localIconPath = `/img/${filename}`; }
                    }
                    return (
                      <div 
                        key={item.id || item.title}
                        className="p-0.5 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="bg-white rounded-lg p-5 h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-colors duration-300 leading-tight min-h-[3.5rem]">
                              {item.title || "Judul tidak tersedia"}
                            </h3>
                            <p className="text-xs text-slate-500 mb-3 flex items-center">
                              <FiCalendar className="mr-2 text-slate-400" />
                              {formatDate(item.date)}
                            </p>
                            {localIconPath && (
                              <div className="mt-2 flex items-center text-xs text-gray-500">
                                <span className="mr-1.5">Kategori:</span>
                                <Image
                                  src={localIconPath}
                                  alt="Ikon Kategori Berita"
                                  width={40}
                                  height={40}
                                  className="inline-block object-contain"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-4">
                            {item.id ? (
                              <Link href={`/news/${item.id}`} legacyBehavior>
                                <a className="inline-flex items-center text-sm text-pink-500 group-hover:text-pink-700 font-medium transition-colors duration-300">
                                  Baca Selengkapnya
                                  <FiExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Link>
                            ) : (
                              <span className="inline-flex items-center text-sm text-gray-400 font-medium">
                                (Detail tidak tersedia)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center items-center mt-12 space-x-4">
                  {currentPage > 1 ? (
                    <Link href={`/news?page=${currentPage - 1}`} legacyBehavior>
                      <a className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg shadow-sm hover:bg-slate-100 transition">
                        <FiChevronLeft className="mr-2 h-5 w-5" />
                        Sebelumnya
                      </a>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 bg-slate-200 border border-slate-300 text-slate-400 rounded-lg cursor-not-allowed">
                        <FiChevronLeft className="mr-2 h-5 w-5" />
                        Sebelumnya
                    </span>
                  )}

                  <span className="text-slate-700 font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  {currentPage < totalPages ? (
                    <Link href={`/news?page=${currentPage + 1}`} legacyBehavior>
                      <a className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg shadow-sm hover:bg-slate-100 transition">
                        Berikutnya
                        <FiChevronRight className="ml-2 h-5 w-5" />
                      </a>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 bg-slate-200 border border-slate-300 text-slate-400 rounded-lg cursor-not-allowed">
                        Berikutnya
                        <FiChevronRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </div>
              </>
            ) : (
              !newsError && <p className="text-center text-slate-500">Tidak ada berita untuk ditampilkan.</p>
            )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
