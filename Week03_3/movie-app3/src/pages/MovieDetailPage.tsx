import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { MovieDetail, CreditsResponse, Cast, VideoResponse } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';

export default function MovieDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const params = {
          api_key: import.meta.env.VITE_TMDB_KEY,
          language: 'ko-KR',
        };

        // 상세 정보, 출연진, 비디오 데이터를 동시에 요청
        const [detailRes, creditsRes, videoRes] = await Promise.all([
          axios.get<MovieDetail>(`${TMDB_BASE_URL}/${movieId}`, { params }),
          axios.get<CreditsResponse>(`${TMDB_BASE_URL}/${movieId}/credits`, { params }),
          axios.get<VideoResponse>(`${TMDB_BASE_URL}/${movieId}/videos`, { params }),
        ]);

        setDetail(detailRes.data);
        setCast(creditsRes.data.cast);

        // 유튜브 예고편 찾기
        const trailer = videoRes.data.results.find(
          (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        );
        if (trailer) setVideoKey(trailer.key);

      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
    window.scrollTo(0, 0);
  }, [movieId]);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-black"><LoadingSpinner /></div>;
  if (isError || !detail) return <div className="text-white text-center py-20 bg-black h-screen">데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      {/* 1. 상단 배너 섹션 */}
      <div className="relative h-[600px] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`} 
          className="w-full h-full object-cover" 
          alt="backdrop" 
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 max-w-4xl">
          <h1 className="text-6xl font-extrabold mb-4">{detail.title}</h1>
          <div className="flex items-center gap-4 text-xl mb-4 text-gray-300">
            <span className='text-[#b2dab1] font-bold'>평점 {detail.vote_average.toFixed(1)}</span>
            <span>{detail.release_date.substring(0, 4)}</span>
            <span>{detail.runtime}분</span>
          </div>
          <p className="text-2xl italic font-semibold mb-6 text-[#dda5e3]">{detail.tagline && `"${detail.tagline}"`}</p>
          <p className="text-lg leading-relaxed text-gray-200 line-clamp-5">{detail.overview}</p>
        </div>
      </div>

      {/* 2. 예고편 섹션 (추가 요청) */}
      <div className="max-w-6xl mx-auto px-10 py-16">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-[#dda5e3] pl-4">공식 예고편</h2>
        {videoKey ? (
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="h-64 bg-gray-900 rounded-2xl flex items-center justify-center text-gray-500">재생 가능한 예고편이 없습니다.</div>
        )}
      </div>

      {/* 3. 감독/출연 섹션 */}
      <div className="max-w-[1400px] mx-auto px-10">
        <h2 className="text-3xl font-bold mb-10 border-l-4 border-[#b2dab1] pl-4">감독/출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {cast.slice(0, 20).map((person) => (
            <div key={person.id} className="flex flex-col items-center text-center group">
              <div className="size-24 rounded-full overflow-hidden border-2 border-gray-800 mb-3 group-hover:border-[#dda5e3] transition-all">
                <img 
                  src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x185?text=No+Image'} 
                  alt={person.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <p className="text-sm font-bold truncate w-full px-1">{person.name}</p>
              <p className="text-xs text-gray-500 truncate w-full px-1">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}