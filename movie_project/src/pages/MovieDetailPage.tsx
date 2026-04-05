import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'; 
import type { MovieDetail, Cast } from '../types/movie'; 

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); 

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const [detailRes, creditsRes] = await Promise.all([
          axiosInstance.get(`/movie/${movieId}?language=ko-KR`),
          axiosInstance.get(`/movie/${movieId}/credits?language=ko-KR`)
        ]);

        setMovie(detailRes.data);
        setCast(creditsRes.data.cast);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-bold">영화 상세 정보를 불러오는 중... </p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-2xl font-bold text-red-500 mb-4">영화를 찾을 수 없거나 에러가 발생했습니다. </p>
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
  <div className="relative min-h-screen text-white pb-20 bg-zinc-950"> 
    <div 
      className="absolute inset-0 bg-cover bg-center -z-20 opacity-40 blur-sm"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
    />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent -z-10" />
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 flex flex-col md:flex-row gap-10">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full md:w-80 rounded-2xl shadow-2xl self-start"
        />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-5xl font-black">{movie.title}</h1>
          <div className="flex items-center gap-4 text-zinc-400 font-medium">
            <span>{movie.release_date.split('-')[0]}</span>
            <span>•</span>
            <span className="text-yellow-500 font-bold">평점 {movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className="text-lg leading-relaxed text-zinc-200 mt-4 max-w-2xl">
            {movie.overview || "등록된 줄거리가 없습니다."}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 mt-20">
        <h2 className="text-2xl font-bold mb-8">주요 출연진</h2>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {cast.slice(0, 12).map((person) => (
            <div key={person.id} className="min-w-[120px] flex flex-col gap-2">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-zinc-800">
                <img 
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x185?text=No+Image'} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm truncate">{person.name}</p>
                <p className="text-xs text-zinc-500 truncate">{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;