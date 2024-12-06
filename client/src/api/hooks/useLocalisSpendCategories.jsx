//
//  IFQ717 Web Development Capstone
//
//  useLocalisSpendCategories.js - API function to get spending categories by Gary Cazzulino
//
//

import { useState, useEffect } from "react";
import { addDaysToDate } from "../utils/utils";
import { kAPI_URL, kDEFAULT_ERROR_MSG } from "../utils/constants";
import { getUrlFromCache, getUrlFromServer } from "../utils/utils";

// Retrieve Ranking data based on year and country from the external API
export function useLocalisSpendCategories(startDate, windowDays) {
  const [spendCatsLoading, setSpendCatsLoading] = useState(false);
  const [spendCats, setSpendCats] = useState();
  const [spendCatsError, setSpendCatsError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    let url = `${kAPI_URL}/spend_categories`;

    if (getUrlFromCache(cache, url)) {
      setSpendCatsLoading(false);
      setSpendCats(getUrlFromCache(cache, url));
      setSpendCatsError(null);
    } else {
      setSpendCatsLoading(true);
      getUrlFromServer(url, false)
        .then((returnedDataSet) => {
          setCache((prevCache) => ({ ...prevCache, [url]: returnedDataSet }));
          setSpendCats(getUrlFromCache(cache, url));
        })
        .catch((error) => {
          setSpendCatsError(error.message ?? kDEFAULT_ERROR_MSG);
        })
        .finally(() => {
          setSpendCatsLoading(false);
        });
    }
  }, [cache]);

  return {
    spendCatsLoading: spendCatsLoading,
    spendCats: spendCats,
    spendCatsError: spendCatsError,
  };
}
