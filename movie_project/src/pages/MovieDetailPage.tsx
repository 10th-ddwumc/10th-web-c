import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch'; 
import type { MovieDetail, Credits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  //  영화 상세 정보 가져오기
  const { 
    data: movie, 
    isLoading: isMovieLoading, 
    isError: isMovieError 
  } = useCustomFetch<MovieDetail>(`/movie/${movieId}?language=ko-KR`);

  //  출연진 정보 가져오기
  const { 
    data: credits, 
    isLoading: isCastLoading 
  } = useCustomFetch<Credits>(`/movie/${movieId}/credits?language=ko-KR`);

  // 로딩 상태 처리
  if (isMovieLoading || isCastLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-bold text-zinc-400">상세 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 에러 상태 처리
  if (isMovieError || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-2xl font-bold text-red-500">데이터 로딩에 실패했습니다. </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white bg-zinc-950">
      {/* 배경 포스터 (블러 처리) */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover blur-md opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
      </div>

      {/* 영화 정보 섹션 */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 flex flex-col md:flex-row gap-10">
        {/* 포스터 이미지 */}
        <div className="w-full md:w-[300px] shrink-0">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl border border-zinc-800"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">{movie.title}</h1>
          <p className="italic text-zinc-400 text-lg">{movie.tagline}</p>
          
          <div className="flex items-center gap-4 text-sm md:text-base text-zinc-300">
            <span>{movie.release_date.split('-')[0]}년</span>
            <span>•</span>
            <span className="text-yellow-500 font-bold">평점 {movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.runtime}분</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-zinc-800/80 rounded-full text-xs font-medium">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-lg leading-relaxed text-zinc-200 mt-6 max-w-3xl">
            {movie.overview || "등록된 줄거리가 없습니다."}
          </p>
        </div>
      </div>

      {/* 출연진 섹션 */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 mt-20 pb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-red-600 rounded-full"></span>
          주요 출연진
        </h2>
        
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {credits?.cast.slice(0, 12).map((person) => (
            <div key={person.id} className="min-w-[120px] flex flex-col items-center gap-3">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-zinc-800 hover:border-red-600 transition-colors duration-300">
                <img 
                  src={person.profile_path 
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}` 
                    : 'https://via.placeholder.com/185x185?text=No+Image'} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm line-clamp-1">{person.name}</p>
                <p className="text-xs text-zinc-500 line-clamp-1">{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;