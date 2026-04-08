import { useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MoviePage() {
    const { category } = useParams<{ category: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    
    const { data, isLoading, isError } = useFetch<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category || 'popular'}`,
        {
            api_key: import.meta.env.VITE_TMDB_KEY,
            language: 'ko-KR',
            page: currentPage
        }
    );

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="text-white text-center py-20">에러가 발생했습니다.</div>;

    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {data?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            
        </div>
    );
}