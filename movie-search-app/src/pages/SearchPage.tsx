import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import { searchMovies } from '../api/tmdb'
import type { Language, Movie, SearchParams } from '../types/movie'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', searchParams],
    queryFn: () => searchMovies(searchParams!),
    enabled: !!searchParams,
    staleTime: 1000 * 60 * 5,
  })

  // setSearchParams는 안정적인 참조이므로 deps 빈 배열
  const handleSearch = useCallback((query: string, include_adult: boolean, language: Language) => {
    setSearchParams({ query, include_adult, language, page: 1 })
  }, [])

  // 인라인 화살표 함수 대신 useCallback — MovieModal의 memo가 실제로 동작하게 함
  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  // selectedMovie 상태 변경으로 SearchPage가 리렌더될 때
  // movies 배열 참조가 유지되어 memo된 MovieCard들이 리렌더를 건너뜀
  const movies = useMemo(() => data?.results ?? [], [data])

  // 표시용 텍스트도 data가 바뀔 때만 재계산
  const totalResultsText = useMemo(
    () => (data ? data.total_results.toLocaleString() : null),
    [data],
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
          🎬 Movie Search
        </h1>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-10">
          {(isLoading || isFetching) && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {isError && (
            <p className="text-center text-red-400 py-20">
              검색 중 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          )}

          {!isLoading && !isFetching && data && (
            <>
              <p className="text-gray-400 text-sm mb-4">
                총 <span className="text-white font-semibold">{totalResultsText}</span>개의 결과
              </p>

              {movies.length === 0 ? (
                <p className="text-center text-gray-500 py-20">검색 결과가 없습니다.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movies.map((movie) => (
                    // setSelectedMovie는 useState setter로 이미 안정적인 참조
                    <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
                  ))}
                </div>
              )}
            </>
          )}

          {!searchParams && (
            <p className="text-center text-gray-600 py-20">검색어를 입력해보세요.</p>
          )}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}
