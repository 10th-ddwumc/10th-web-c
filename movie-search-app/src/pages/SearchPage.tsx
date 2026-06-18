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

  const handleSearch = useCallback((query: string, include_adult: boolean, language: Language) => {
    setSearchParams({ query, include_adult, language, page: 1 })
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  const movies = useMemo(() => data?.results ?? [], [data])

  const totalResultsText = useMemo(
    () => (data ? data.total_results.toLocaleString() : null),
    [data],
  )

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* 헤더 */}
      <header className="border-b border-[#1f1f1f] bg-[#141414]/95 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#E50914] text-2xl font-black tracking-tighter">MOVIE</span>
            <span className="text-white text-2xl font-black tracking-tighter">SEARCH</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* 검색 영역 */}
        <div className="mb-12">
          <p className="text-[#aaa] text-sm text-center mb-6 tracking-wide">
            수백만 편의 영화를 검색해보세요
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 결과 영역 */}
        <div>
          {(isLoading || isFetching) && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-2 border-[#333] border-t-[#E50914] rounded-full animate-spin" />
              <p className="text-[#555] text-sm tracking-wider">검색 중...</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-[#aaa] text-sm">오류가 발생했습니다. 다시 시도해주세요.</p>
            </div>
          )}

          {!isLoading && !isFetching && data && (
            <>
              <div className="flex items-center justify-between mb-5 border-b border-[#1f1f1f] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#E50914] rounded-full" />
                  <span className="text-white text-sm font-bold tracking-wide">검색 결과</span>
                </div>
                <span className="text-[#555] text-xs">
                  총 <span className="text-[#aaa]">{totalResultsText}</span>편
                </span>
              </div>

              {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <svg className="w-10 h-10 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-[#555] text-sm">검색 결과가 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
                  ))}
                </div>
              )}
            </>
          )}

          {!searchParams && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="text-[#222] text-7xl font-black tracking-tighter select-none">
                MOVIE
              </div>
              <p className="text-[#444] text-sm tracking-widest uppercase">
                검색어를 입력해 시작하세요
              </p>
            </div>
          )}
        </div>
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}
