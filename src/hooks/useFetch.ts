import { useEffect, useState } from "react";

export function useFetch<T>(api: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api();
        setData(data);
      } catch (error) {
        let errorMsg = "Unknown Error Occured";
        if (error instanceof Error) {
          errorMsg = error.message;
        }
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  return { data, isLoading, error, setRefresh };
}
