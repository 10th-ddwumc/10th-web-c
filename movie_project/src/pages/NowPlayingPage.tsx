import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie'; 

const NowPlayingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`, 
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2E5ZTYyOGU4MDg3YmMzMTQ4MDVlYzNlN2MzOTE5ZSIsIm5iZiI6MTc3NTA0NjgxNy4wMiwic3ViIjoiNjljZDEwYTFiYTRiNTNiNjNlMjdmMWQzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZI8K1VWf2PpkGaLRm3i4hqUvx02tY0cU-7KVyEUKQrc` } }
      );
      setMovies(data.results);
    } catch (error) {
        console.error("영화 로딩 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold animate-bounce">데이터를 불러오는 중... </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-red-500">에러가 발생했습니다! </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-zinc-800 rounded"
        >
          새로고침 하기
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-5">
        {/* 페이지네이션 버튼 추가 위치 */}
    <div className="flex justify-center items-center gap-6 py-6 border-b border-zinc-800">
      <button 
        onClick={() => setPage(p => p - 1)} 
        disabled={page === 1}
        className="px-4 py-1.5 bg-zinc-800 rounded-md disabled:opacity-30 hover:bg-zinc-700 transition-colors"
      >
        이전
      </button>
      
      <span className="font-bold text-lg">{page} 페이지</span>
      
      <button 
        onClick={() => setPage(p => p + 1)}
        className="px-4 py-1.5 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
      >
        다음
      </button>
    </div>  
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      
    </div>
  );
};

export default NowPlayingPage;