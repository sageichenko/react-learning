import {useEffect, useState} from "react";
import qs from 'qs'

const getFetchOptions = (fetcher: FetcherParameters): FetchMethodOptions => {
  const options: FetchMethodOptions = {
    method: fetcher.method
  };

  if (fetcher.headers) {
    options.headers = fetcher.headers;
  }

  if (fetcher.method.toLowerCase() !== 'get' && fetcher.params) {
    options.body = JSON.stringify(fetcher.params);
  }

  return options;
}

interface Fetch<T> {
  data: T | null,
  error: any,
  isLoading: boolean,
  refetch: () => void
}
export function useFetch<T>(
  url: string,
  fetcher: Fetcher<T>,
  initialData?: T
): Fetch<T> {
  const [data, setData] = useState<T|null>(initialData || null);
  const [error, setError] = useState<any|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchFunction: FetcherFunction<T>  = typeof fetcher === 'function' ? fetcher : (url: string) => {
    return fetch(
      [url, fetcher.method.toLowerCase() === 'get' ? qs.stringify(fetcher.params) : ''].filter(Boolean).join('/'),
      getFetchOptions(fetcher)
    ).then((res) => res.json())
  }

  const refetch = () => {
    setIsLoading(true);

    fetchFunction(url)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    console.log('[useFetch]: update url, fetcer', url, fetcher);
    refetch();
  }, [url, fetcher]);

  return {
    data,
    error,
    isLoading,
    refetch
  }
}
