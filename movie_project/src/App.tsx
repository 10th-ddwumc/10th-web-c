import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from './types/movie';
import MovieCard from './components/MovieCard';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2E5ZTYyOGU4MDg3YmMzMTQ4MDVlYzNlN2MzOTE5ZSIsIm5iZiI6MTc3NTA0NjgxNy4wMiwic3ViIjoiNjljZDEwYTFiYTRiNTNiNjNlMjdmMWQzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZI8K1VWf2PpkGaLRm3i4hqUvx02tY0cU-7KVyEUKQrc`, 
            },
          }
        );
        setMovies(data.results);
      } catch (error) {
        console.error("데이터 로딩 실패!", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    </div>
  );
};

export default App;