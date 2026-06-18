import { memo, useMemo } from 'react'
import type { Movie } from '../types/movie'
import { getImageUrl } from '../api/tmdb'

interface MovieCardProps {
  movie: Movie
  onClick: (movie: Movie) => void
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  const { ratingText, year, scoreColor, posterUrl } = useMemo(() => {
    const score = Math.round(movie.vote_average * 10)
    return {
      score,
      ratingText: movie.vote_count > 0 ? movie.vote_average.toFixed(1) : 'N/A',
      year: movie.release_date?.slice(0, 4) ?? '—',
      scoreColor:
        score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-[#E50914]',
      posterUrl: getImageUrl(movie.poster_path, 'w342'),
    }
  }, [movie])

  return (
    <div
      className="group relative cursor-pointer rounded overflow-hidden bg-[#181818]"
      onClick={() => onClick(movie)}
    >
      {/* 포스터 */}
      <div className="aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#222] gap-2">
            <svg className="w-8 h-8 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span className="text-[#555] text-xs">No Image</span>
          </div>
        )}
      </div>

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-white text-xs font-bold leading-snug line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${scoreColor}`}>{ratingText}</span>
          <span className="text-[#666] text-[10px]">/10</span>
          <span className="text-[#aaa] text-xs">{year}</span>
        </div>
      </div>

      {/* 배지들 (항상 표시) */}
      {movie.adult && (
        <span className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm tracking-wider z-10">
          19+
        </span>
      )}

      {/* 기본 상태 제목 (호버 전) */}
      <div className="p-2.5 group-hover:opacity-0 transition-opacity duration-200">
        <p className="text-white text-xs font-medium line-clamp-1">{movie.title}</p>
        <p className="text-[#777] text-[11px] mt-0.5">{year}</p>
      </div>
    </div>
  )
}

export default memo(MovieCard)
