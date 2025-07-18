import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const jkt48Api = require('@jkt48/core');
  const apiKey = process.env.NEPHYY_APIKEY;
  let newsDetailData = null;
  let newsDetailError = null;

  console.log(`[news/${id}] Attempting to fetch news detail for ID:`, id);

  try {
    if (jkt48Api && typeof jkt48Api.newsDetail === 'function') {
      const response = await jkt48Api.newsDetail(id, apiKey);
      console.log(`[news/${id}] Raw newsDetail response:`, JSON.stringify(response, null, 2));
      if (response) {
        newsDetailData = response;
      } else {
        newsDetailError = "Berita tidak ditemukan atau format data tidak sesuai.";
      }
    } else {
      newsDetailError = "Metode newsDetail tidak tersedia pada package API.";
      console.error(`[news/${id}] 'jkt48Api.newsDetail' is not a function or jkt48Api is not defined.`);
    }
  } catch (error) {
    console.error(`[news/${id}] Error fetching news detail:`, error.message);
    newsDetailError = `Gagal memuat detail berita: ${error.message || "Kesalahan server."}`;
    if (error.response && error.response.status === 404) {
        newsDetailError = "Berita tidak ditemukan (404).";
    }
  }
  
  if (!newsDetailData && !newsDetailError) {
    newsDetailError = "Berita tidak ditemukan.";
  }

  return {
    props: {
      newsDetailData,
      newsDetailError,
      newsId: id,
    },
  };
}

export default function NewsDetailPage({ newsDetailData, newsDetailError, newsId }) {
  const router = useRouter();

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (router.isFallback) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>Memuat berita...</div>
        </div>
    );
  }

  if (newsDetailError) {
    return (
      <>
        <div className="container mx-auto px-4 py-24 min-h-screen">
          <Head>
            <title>Error Memuat Berita - Jeketian</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi Kesalahan</h1>
            <p className="text-slate-700 mb-6">{newsDetailError}</p>
            <p className="text-sm text-slate-500 mb-6">ID Berita: {newsId}</p>
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                <FiArrowLeft className="mr-2" /> Kembali ke Beranda
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  const detail = newsDetailData?.data?.[0] || newsDetailData;

  if (!detail || !detail.title) {
     return (
        <>
          <div className="container mx-auto px-4 py-24 min-h-screen text-center">
            <Head>
              <title>Berita Tidak Ditemukan - Jeketian</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-slate-700 mb-4">Berita Tidak Ditemukan</h1>
                <p className="text-slate-600 mb-6">Berita yang Anda cari dengan ID {newsId} tidak dapat ditemukan.</p>
                <Link href="/" legacyBehavior>
                <a className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    <FiArrowLeft className="mr-2" /> Kembali ke Beranda
                </a>
                </Link>
            </div>
          </div>
        </>
      );
  }

  const { title, date, content, image } = detail;
  const siteUrl = "https://jeketian.web.id";
  const canonicalUrl = `${siteUrl}/news/${newsId}`;
  const pageTitle = `${title} | Jeketian`;
  const metaDescription = content
    ? content.replace(/<[^>]*>?/gm, '').substring(0, 155) + '...'
    : `Baca berita JKT48 terbaru "${title}" di Jeketian.`;
  const socialBanner = image || `${siteUrl}/img/logo.jpg`;
  
  return (
    <>
      <div className="bg-gray-50 py-8 pt-24 min-h-screen">
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="author" content="Nephyy" />
          <meta name="keywords" content={`JKT48, Berita JKT48, Jeketian, ${title}`} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={socialBanner} />
          <meta property="og:site_name" content="Jeketian" />
          <meta property="article:published_time" content={date} />
          <meta property="article:author" content="Nephyy" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={socialBanner} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": canonicalUrl
                },
                "headline": title,
                "image": [socialBanner],
                "datePublished": date,
                "dateModified": date,
                "author": {
                  "@type": "Person",
                  "name": "Nephyy"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Jeketian",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/img/logo.jpg`
                  }
                },
                "description": metaDescription
              })
            }}
          />
        </Head>

        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" legacyBehavior>
                    <a className="inline-flex items-center text-pink-500 hover:text-pink-700 mb-8 group text-sm">
                    <FiArrowLeft className="mr-1.5 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Kembali ke Beranda
                    </a>
                </Link>
            </div>
            <article className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700 mb-3 leading-tight">
                {title || "Judul Berita Tidak Tersedia"}
            </h1>
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-500 mb-6 space-x-4">
                {date && (
                <span className="flex items-center whitespace-nowrap">
                    <FiCalendar className="mr-1.5 text-slate-400" /> {formatDate(date)}
                </span>
                )}
                <span className="flex items-center whitespace-nowrap">
                    <FiUser className="mr-1.5 text-slate-400" /> Jeketian - Nephyy
                </span>
            </div>

            {image && (
                <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-md">
                <Image src={image} alt={title || "Gambar Berita"} width={1200} height={675} layout="responsive" objectFit="cover" />
                </div>
            )}
            
            {content ? (
                <div
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-slate 
                            prose-img:rounded-xl prose-img:shadow-md prose-headings:font-semibold prose-headings:text-slate-800
                            prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-strong:text-slate-700"
                dangerouslySetInnerHTML={{ __html: content }}
                />
            ) : (
                <p className="text-slate-700">Konten berita tidak tersedia.</p>
            )}
            </article>
        </div>
      </div>
    </>
  );
}
