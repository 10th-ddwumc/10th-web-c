import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { data, isLoading, isError };
};

export default useCustomFetch;