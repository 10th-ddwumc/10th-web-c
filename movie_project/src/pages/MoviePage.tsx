import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; // useEffect 추가
import MovieCard from '../components/MovieCard';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieResponse } from '../types/movie';

const MoviesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const endpoint = category?.replace('-', '_') || 'popular';
  const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
    `/movie/${endpoint}?language=ko-KR&page=${page}`
  );

  if (isLoading) return <div className="text-center py-20 text-red-600 font-bold">로딩 중...</div>;
  if (isError) return <div className="text-center py-20 text-red-500 font-bold">에러 발생!</div>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center items-center gap-6 py-6 border-b border-zinc-800">
        <button 
          onClick={() => setPage(p => p - 1)} 
          disabled={page === 1} 
          className="px-4 py-1.5 bg-zinc-800 rounded-md disabled:opacity-30 hover:bg-zinc-700 transition-colors"
        >
          이전
        </button>
        
        <span className="font-bold text-lg text-white">{page} 페이지</span>
        
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={data?.total_pages === page}
          className="px-4 py-1.5 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
        >
          다음
        </button>
      </div>  
      

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;