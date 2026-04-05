// 1. 기본 영화 정보 타입 (이게 정의되어 있어야 MovieDetail이 상속받을 수 있습니다)
export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// 2. 영화 상세 정보 타입 (Movie를 상속받음)
export interface MovieDetail extends Movie {
  tagline: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

// 3. 출연진 정보 타입
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
}

// 4. API 응답 타입들
export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: any[];
}