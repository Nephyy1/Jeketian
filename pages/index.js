import { useEffect, useState } from 'react';

export default function Home() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/api/members?group=J-D55B')
      .then(res => res.json())
      .then(setMembers);
  }, []);

  return (
    <div>
      <h1>Daftar Member JKT48</h1>
      <ul>
        {members.map((m, i) => (
          <li key={i}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}