import axios from 'axios'
import type { SearchMoviesResponse, SearchParams } from '../types/movie'

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
})

export const searchMovies = async ({
  query,
  include_adult,
  language,
  page = 1,
}: SearchParams): Promise<SearchMoviesResponse> => {
  const { data } = await tmdb.get<SearchMoviesResponse>('/search/movie', {
    params: { query, include_adult, language, page },
  })
  return data
}

export const getImageUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w342') => {
  if (!path) return null
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`
}
