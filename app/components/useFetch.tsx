import { useState, useEffect } from 'react';

// Use a Generic <T> so the user can specify what kind of data they expect
const useFetch = <T,>(url: string) => {
  // data can be T (the type you want) or null initially
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json() as Promise<T>;
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setIsPending(false);
          setError((err as Error).message);
        }
      });

    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isPending, error };
}

export default useFetch;