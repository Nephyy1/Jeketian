import { useEffect, useState } from 'react';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            setMembers([]); // Atau tangani jika struktur data berbeda
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) {
    return <p>Memuat daftar member...</p>;
  }

  if (error) {
    return <p>Gagal memuat data: {error}</p>;
  }

  return (
    <div>
      <h1>Daftar Member JKT48</h1>
      {members.length > 0 ? (
        <ul>
          {members.map((member, index) => (
            <li key={member.id || member.name || index}>{member.name}</li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada data member.</p>
      )}
    </div>
  );
}
