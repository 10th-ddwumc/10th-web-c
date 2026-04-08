import type { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 aspect-[2/3]">
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 마우스 호버 시 정보창 (평점 부분 삭제됨) */}
        <div className="absolute inset-0 bg-black/70 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{movie.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{movie.release_date}</p>
          
          {/* 평점 표시가 있던 자리를 지웠습니다. */}
          
          <p className="text-xs text-gray-200 line-clamp-5 leading-relaxed">{movie.overview}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;