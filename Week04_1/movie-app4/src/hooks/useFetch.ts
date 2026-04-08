//데이터 요청/취소/에러 관리
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch<T>(url: string, params?: object) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData =async () => {
            setIsLoading(true);
            setIsError(false);
            try{
                const response=await axios.get<T>(url, { params });
                setData(response.data);
            }catch(error){
                setIsError(true);       
            }finally{
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url, JSON.stringify(params)]);

    return { data, isLoading, isError };
}