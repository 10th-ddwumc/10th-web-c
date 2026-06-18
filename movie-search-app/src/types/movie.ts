export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  popularity: number
  original_language: string
}

export interface SearchMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Language = 'ko-KR' | 'en-US' | 'ja-JP'

export interface SearchParams {
  query: string
  include_adult: boolean
  language: Language
  page?: number
}
