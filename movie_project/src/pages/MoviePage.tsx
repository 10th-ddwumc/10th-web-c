import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/movie';

const MoviesPage = () => {
  // 굳이 하나씩 페이지를 만들 필요 X -> URL 파라미터로 카테고리를 받아서 하나의 컴포넌트로 처리
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 카테고리가 바뀜 -> 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        //  category 변수를 사용해서 API 주소를 동적으로 변경
        const endpoint = category?.replace('-', '_'); 
        const { data } = await axiosInstance.get(`/movie/${endpoint}?language=ko-KR&page=${page}`);
        
        setMovies(data.results);
      } catch (error) {
        console.error("영화 로딩 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [category, page]); // 카테고리나 페이지가 바뀔 때마다 실행

  if (isLoading) return <div className="flex items-center justify-center min-h-[50vh] animate-bounce">데이터 로딩 중...</div>;
  if (isError) return <div className="text-red-500 text-center py-20">에러 발생!</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center items-center gap-6 py-6 border-b border-zinc-800">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="px-4 py-1.5 bg-zinc-800 rounded-md disabled:opacity-30">이전</button>
        <span className="font-bold text-lg">{page} 페이지</span>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-1.5 bg-zinc-800 rounded-md">다음</button>
      </div>  
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MoviesPage;