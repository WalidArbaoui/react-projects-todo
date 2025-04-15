import { useEffect, useState } from "react";

export function useCreate<T>(api: () => Promise<T>) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const createData = async () => {
    try {
      setError(null);
      const data = await api();
      setResponse(data);
    } catch (error) {
      let errorMsg = "Unknown Error Occured";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setError(errorMsg);
    }
  };

  return { response, error, createData };
}
