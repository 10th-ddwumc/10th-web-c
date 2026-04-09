import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { MovieDetail } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MovieDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();

  // 커스텀 훅 사용: 상세 정보를 가져옵니다.
  const { data: detail, isLoading, isError } = useFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      api_key: import.meta.env.VITE_TMDB_KEY,
      language: 'ko-KR',
      append_to_response: 'credits,videos'
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError || !detail) return <div className="text-white text-center py-20">정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* detail 데이터를 활용하여 상세 UI 렌더링 */}
      <h1>{detail.title}</h1>
      <p>{detail.overview}</p>
    </div>
  );
}
