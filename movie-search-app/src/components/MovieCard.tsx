import { memo, useMemo } from 'react'
import type { Movie } from '../types/movie'
import { getImageUrl } from '../api/tmdb'

interface MovieCardProps {
  movie: Movie
  onClick: (movie: Movie) => void
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  // movie prop이 바뀔 때만 파생값 재계산
  const { score, year, scoreColor, posterUrl } = useMemo(() => {
    const score = Math.round(movie.vote_average * 10)
    return {
      score,
      year: movie.release_date?.slice(0, 4) ?? '—',
      scoreColor:
        score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400',
      posterUrl: getImageUrl(movie.poster_path, 'w342'),
    }
  }, [movie])

  return (
    <div
      className="flex flex-col bg-gray-800 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl hover:shadow-black/50 transition-transform duration-200 cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] bg-gray-700">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            포스터 없음
          </div>
        )}
        {movie.adult && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            19+
          </span>
        )}
        <div className={`absolute top-2 right-2 bg-gray-900/80 text-xs font-bold px-1.5 py-0.5 rounded ${scoreColor}`}>
          {movie.vote_count > 0 ? `${score}%` : 'N/A'}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">{year}</p>
        {movie.overview && (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mt-1">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  )
}

// movie와 onClick 참조가 모두 동일할 때 리렌더 생략
export default memo(MovieCard)
