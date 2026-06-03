// api.ts
import axios from 'axios';

export const axiosClient = axios.create({
    // 동적 쿼리 파라미터 적용을 위해 기본 주소만 명시합니다.
    baseURL: 'https://api.themoviedb.org/3/search/movie',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_KEY}`,
    },
});

// useFetch.ts
import { useState, useEffect, useCallback } from 'react';
import { axiosClient } from './api';

export const useFetch = <T>(url: string, params: object) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    // 불필요한 재호출 방지를 위해 params를 문자열화하여 의존성 관리
    const stringifiedParams = JSON.stringify(params);

    const fetchData = useCallback(async () => {
        // 검색어가 없을 때는 요청하지 않음
        if (!(params as any).query) {
            setData(null);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosClient.get(url, { params });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, stringifiedParams]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};