import { useEffect, useState } from "react"
import axios from "axios"
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams, useSearchParams } from "react-router-dom";

// API 호출 공통 설정 (v3 API Key 사용 방식)
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3/movie';
const getTmdbParams = (page: number) => ({
    api_key: import.meta.env.VITE_TMDB_KEY, // 보안을 위해 .env에 저장한 v3 Key 사용
    language: 'ko-KR',
    page: page
});

const categoryTitles: Record<string, string> = {
    popular: '인기 영화',
    now_playing: '현재 상영 중',
    top_rated: '평점 높은 영화',
    upcoming: '개봉 예정 영화',
};

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1); // 페이지 상태

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        const fetchMovies = async () => {
            // 페이지가 바뀔 때마다 로딩 스피너를 보여주기 위해 true 설정
            setIsLoading(true); 
            setIsError(false);

            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category || 'popular'}`,
                    {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_KEY,
                            language: 'ko-KR',
                            page: page // 현재 페이지 반영
                        }
                    }
                );
                setMovies(data.results);
            } catch {
                setIsError(true);
            } finally {
                // 데이터 로딩 완료 후 스피너 제거
                setIsLoading(false);
            }
        };

        fetchMovies();
        window.scrollTo(0, 0); // 페이지 이동 시 맨 위로 스크롤
    }, [page, category]);

    if (isError) return <div className="text-center py-20 text-red-500">에러가 발생했습니다.</div>;

    return (
        <>
            {/* 페이지네이션 컨트롤러 */}
            <div className='flex items-center justify-center gap-6 my-10'>
                <button
                    className="size-12 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg shadow-sm 
                    hover:bg-gray-300 transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    disabled={page === 1}
                    // 왼쪽 클릭 시 -1
                    onClick={() => setPage(prev => prev - 1)}>
                    {'<'}
                </button>

                {/* "N 페이지" 형식으로 표시 */}
                <span className="font-bold text-xl text-gray-800 min-w-[80px] text-center">
                    {page} 페이지
                </span>

                <button
                    className="size-12 flex items-center justify-center bg-[#dda5e3] text-white rounded-lg shadow-md 
                    hover:bg-[#b2dab1] transition-all cursor-pointer"
                    // 오른쪽 클릭 시 +1
                    onClick={() => setPage(prev => prev + 1)}>
                    {'>'}
                </button>
            </div>

            {/* 로딩 중일 때 스피너 표시 (세 번째 이미지 효과) */}
            {isLoading ? (
                <div className='flex items-center justify-center h-[60vh]'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}