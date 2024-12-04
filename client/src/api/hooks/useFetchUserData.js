// hook for fetching user data

import { useState, useEffect } from "react";
import { getUrlFromCache, getUrlFromServer } from "../utils/utils";

export function useFetchUserData(endpoint) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url = `http://localhost:3000${endpoint}`;

      const cachedData = getUrlFromCache(cache, url);

      if (cachedData) {
        setLoading(false);
        setData(cachedData);
        setError(null);
      } else {
        try {
          const dataSet = await getUrlFromServer(url, false);
          setCache((prevCache) => ({ ...prevCache, [url]: dataSet }));
          setData(dataSet);
          setError(null);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [endpoint]);

  return {
    loading,
    data,
    error,
  };
}
