import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetail, MovieCredits } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        // 실제 API 호출 시 본인의 API_KEY와 BASE_URL을 사용하세요
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`);
        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`);
        
        if (!movieRes.ok || !creditsRes.ok) throw new Error('데이터를 불러오지 못했습니다.');

        setMovie(await movieRes.json());
        setCredits(await creditsRes.json());
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) return <div className="text-white text-center mt-20">로딩 중...</div>;
  if (error || !movie) return <div className="text-red-500 text-center mt-20">영화를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 상단 히어로 섹션 */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute bottom-10 left-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex gap-4 text-sm mb-4">
            <span>평점 {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime}분</span>
          </div>
          <p className="text-gray-300 leading-relaxed line-clamp-3">{movie.overview}</p>
        </div>
      </div>

      {/* 출연진/제작진 섹션 */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-6">
          {credits?.cast.slice(0, 16).map((person) => (
            <div key={person.id} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-700">
                {person.profile_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} 
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs">No Image</div>
                )}
              </div>
              <p className="text-sm font-medium w-full truncate">{person.name}</p>
              <p className="text-xs text-gray-400 w-full truncate">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;