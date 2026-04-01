import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const API_KEY = 'f0b3be1c82842a04473786875fd68885'; // 발급받은 키 확인!
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`);
        setMovies(res.data.results);
      } catch (err) {
        console.error("데이터 로드 실패", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>인기 영화 목록</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
            <div style={{ padding: '10px' }}>
              <h3 style={{ fontSize: '16px' }}>{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;