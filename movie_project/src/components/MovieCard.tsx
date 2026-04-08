import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

const MovieCard = ({ movie }: { movie: Movie }) => {
  // 포스터 URL
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

return (
    // div -> Link 로 변경
    <Link to={`/movies/${movie.id}`} className="block relative group overflow-hidden rounded-lg cursor-pointer">
      {/* 영화 포스터 */}
      <img 
        src={posterUrl} 
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
      />

      {/* 호버 시 나타나는 검은색 오버레이 */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
        <h3 className="text-white text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-4">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;