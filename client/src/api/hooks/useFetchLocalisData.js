// a more generalist fetch hook

import { useState, useEffect } from "react";
import { kAPI_URL, kDEFAULT_ERROR_MSG } from "../utils/constants";
import { getUrlFromCache, getUrlFromServer } from "../utils/utils";

export function useFetchLocalisData(endpoint) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url = `${kAPI_URL}${endpoint}`;

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
          setError(error.message ?? kDEFAULT_ERROR_MSG);
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
