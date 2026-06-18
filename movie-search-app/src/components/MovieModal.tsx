import { memo, useMemo, useEffect } from 'react'
import type { Movie } from '../types/movie'
import { getImageUrl } from '../api/tmdb'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const STAR_COUNT = 5

// memo: score prop이 바뀔 때만 리렌더
const StarRating = memo(function StarRating({ score }: { score: number }) {
  const filled = Math.round((score / 100) * STAR_COUNT)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < filled ? 'text-yellow-400' : 'text-gray-600'}`}
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
  // movie prop이 바뀔 때만 파생값 재계산
  const { score, scoreColor, posterUrl, imdbSearchUrl, formattedDate } = useMemo(() => {
    const score = Math.round(movie.vote_average * 10)
    return {
      score,
      scoreColor:
        score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400',
      posterUrl: getImageUrl(movie.poster_path, 'w500'),
      imdbSearchUrl: `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`,
      formattedDate: formatDate(movie.release_date),
    }
  }, [movie])

  // onClose가 useCallback으로 안정화되어 있어 불필요한 effect 재등록 없음
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900/80 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex flex-col sm:flex-row">
          <div className="sm:w-56 flex-shrink-0 bg-gray-700">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover sm:min-h-[22rem]"
              />
            ) : (
              <div className="w-full h-48 sm:h-full flex items-center justify-center text-gray-500 text-sm">
                포스터 없음
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 flex-1">
            <div>
              <h2 className="text-white text-xl font-bold leading-snug">{movie.title}</h2>
              {movie.original_title !== movie.title && (
                <p className="text-gray-400 text-sm mt-0.5">{movie.original_title}</p>
              )}
              {movie.adult && (
                <span className="inline-block mt-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  19+
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <StarRating score={score} />
                <span className={`font-bold ${scoreColor}`}>
                  {movie.vote_count > 0 ? `${score}%` : 'N/A'}
                </span>
                <span className="text-gray-500 text-xs">({movie.vote_count.toLocaleString()}명)</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
            </div>

            {movie.overview ? (
              <p className="text-gray-300 text-sm leading-relaxed">{movie.overview}</p>
            ) : (
              <p className="text-gray-500 text-sm italic">줄거리 정보가 없습니다.</p>
            )}

            <div className="flex gap-3 mt-auto pt-2">
              <a
                href={imdbSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.31 9.588v.005c-.077-.048-1.798-1.084-1.798-1.084v7.069l1.966.001V9.589zM3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zm4.28 2.406H5.75v8.688h1.53V7.656zm3.703 0H9.23v8.688h1.421V11.16l1.257 3.56h.953l1.255-3.507v5.131h1.423V7.656h-1.74l-1.395 3.99-1.423-3.99zm7.735 0h-1.54v8.688h1.54V7.656z" />
                </svg>
                IMDb에서 검색하기
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
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

// movie와 onClose 참조가 모두 동일할 때 리렌더 생략
export default memo(MovieModal)
