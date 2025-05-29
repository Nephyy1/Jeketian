import { useEffect, useState } from 'react';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [news, setNews] = useState([]);

  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const [errorMembers, setErrorMembers] = useState(null);
  const [errorNews, setErrorNews] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch('/api/members');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Error: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          setMembers([]);
        }
      } catch (err) {
        setErrorMembers(err.message);
      } finally {
        setLoadingMembers(false);
      }
    }

    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Error: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
      } catch (err) {
        setErrorNews(err.message);
      } finally {
        setLoadingNews(false);
      }
    }

    fetchMembers();
    fetchNews();
  }, []);

  return (
    <div>
      <section>
        <h1>Daftar Member JKT48</h1>
        {loadingMembers && <p>Memuat daftar member...</p>}
        {errorMembers && <p>Gagal memuat data member: {errorMembers}</p>}
        {!loadingMembers && !errorMembers && members.length > 0 ? (
          <ul>
            {members.map((member, index) => (
              <li key={member.id || member.name || index}>{member.name}</li>
            ))}
          </ul>
        ) : (
          !loadingMembers && !errorMembers && <p>Tidak ada data member.</p>
        )}
      </section>

      <hr />

      <section>
        <h1>Berita Terbaru JKT48</h1>
        {loadingNews && <p>Memuat berita...</p>}
        {errorNews && <p>Gagal memuat berita: {errorNews}</p>}
        {!loadingNews && !errorNews && news.length > 0 ? (
          <ul>
            {news.map((item, index) => (
              <li key={item.id || item.title || index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                {item.date && <p><small>{new Date(item.date).toLocaleDateString()}</small></p>}
              </li>
            ))}
          </ul>
        ) : (
          !loadingNews && !errorNews && <p>Tidak ada berita terbaru.</p>
        )}
      </section>
    </div>
  );
}
