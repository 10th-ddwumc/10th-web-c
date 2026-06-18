import { memo, useMemo, useEffect } from 'react'
import type { Movie } from '../types/movie'
import { getImageUrl } from '../api/tmdb'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const STAR_COUNT = 5

const StarRating = memo(function StarRating({ score }: { score: number }) {
  const filled = Math.round((score / 100) * STAR_COUNT)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < filled ? 'text-[#E50914]' : 'text-[#333]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
})

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  const { score, ratingText, scoreColor, posterUrl, imdbSearchUrl, formattedDate } = useMemo(() => {
    const score = Math.round(movie.vote_average * 10)
    return {
      score,
      ratingText: movie.vote_count > 0 ? movie.vote_average.toFixed(1) : 'N/A',
      scoreColor:
        score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-[#E50914]',
      posterUrl: getImageUrl(movie.poster_path, 'w500'),
      imdbSearchUrl: `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`,
      formattedDate: formatDate(movie.release_date),
    }
  }, [movie])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#181818] rounded-lg overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/80 border border-[#2a2a2a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-[#aaa] hover:text-white hover:bg-[#E50914] transition-colors"
          aria-label="닫기"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex flex-col sm:flex-row">
          {/* 포스터 */}
          <div className="sm:w-52 flex-shrink-0 bg-[#111]">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover sm:min-h-[22rem]"
              />
            ) : (
              <div className="w-full h-48 sm:h-full flex items-center justify-center text-[#444]">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
            )}
          </div>

          {/* 정보 */}
          <div className="flex flex-col gap-4 p-6 flex-1">
            {/* 제목 */}
            <div>
              <h2 className="text-white text-xl font-bold leading-snug tracking-tight">
                {movie.title}
              </h2>
              {movie.original_title !== movie.title && (
                <p className="text-[#777] text-sm mt-1 tracking-wide">{movie.original_title}</p>
              )}
              {movie.adult && (
                <span className="inline-block mt-2 bg-[#E50914] text-white text-[10px] font-black px-2 py-0.5 rounded-sm tracking-widest">
                  19+
                </span>
              )}
            </div>

            {/* 평점 & 날짜 */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <StarRating score={score} />
                <span className={`text-lg font-black tabular-nums ${scoreColor}`}>
                  {ratingText}
                </span>
                <span className="text-[#555] text-xs self-end pb-0.5">/10</span>
                <span className="text-[#555] text-xs self-end pb-0.5">
                  ({movie.vote_count.toLocaleString()}명)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#aaa] text-sm">
                <svg className="w-3.5 h-3.5 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
            </div>

            {/* 줄거리 */}
            <div className="border-t border-[#2a2a2a] pt-4">
              {movie.overview ? (
                <p className="text-[#ccc] text-sm leading-relaxed">{movie.overview}</p>
              ) : (
                <p className="text-[#555] text-sm italic">줄거리 정보가 없습니다.</p>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex gap-2.5 mt-auto pt-2">
              <a
                href={imdbSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#f5c518] hover:bg-[#e6b800] text-black font-black text-xs rounded tracking-wider transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.31 9.588v.005c-.077-.048-1.798-1.084-1.798-1.084v7.069l1.966.001V9.589zM3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zm4.28 2.406H5.75v8.688h1.53V7.656zm3.703 0H9.23v8.688h1.421V11.16l1.257 3.56h.953l1.255-3.507v5.131h1.423V7.656h-1.74l-1.395 3.99-1.423-3.99zm7.735 0h-1.54v8.688h1.54V7.656z" />
                </svg>
                IMDb 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#444] hover:border-[#E50914] text-[#aaa] hover:text-white text-xs font-medium rounded tracking-wider transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MovieModal)
