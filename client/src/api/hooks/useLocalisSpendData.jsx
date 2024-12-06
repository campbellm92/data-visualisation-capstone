//
//  IFQ717 Web Development Capstone
//
//  useLocalisSpendingData.js - API function to get spending data by Gary Cazzulino
//
//

import { useState, useEffect } from "react";
import { addDaysToDate } from "../utils/utils";
import { kAPI_URL, kDEFAULT_ERROR_MSG } from "../utils/constants";
import { getUrlFromCache, getUrlFromServer } from "../utils/utils";

// Retrieve Ranking data based on year and country from the external API
export function useLocalisSpendingData(startDate, endDate) {
  const [spendingDataLoading, setSpendingDataLoading] = useState(false);
  const [spendingDataSet, setSpendingDataSet] = useState();
  const [spendingDataError, setSpendingDataError] = useState(null);
  const [cache, setCache] = useState({});
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);


  // console.log(startDateDate);
  // console.log(endDateDate);

  useEffect(() => {
    let url = `${kAPI_URL}/spend_data`; //?start=${startDate}&end=${addDaysToDate(startDate, windowDays)}`;

    if (getUrlFromCache(cache, url)) {
      setSpendingDataLoading(false);
      setSpendingDataSet(
        getUrlFromCache(cache, url).filter((sample) => {
          const sampleDateDate = new Date(sample.week_commencing);

          return (
            sampleDateDate >= startDateDate && sampleDateDate <= endDateDate
          );
        })
      );
      setSpendingDataError(null);
    } else {
      setSpendingDataLoading(true);
      getUrlFromServer(url, false)
        .then((returnedDataSet) => {
          setCache((prevCache) => ({ ...prevCache, [url]: returnedDataSet }));
          setSpendingDataSet(
            getUrlFromCache(cache, url).filter((sample) => {
              const sampleDateDate = new Date(sample.week_commencing);

              return (
                sampleDateDate >= startDateDate && sampleDateDate <= endDateDate
              );
            })
          );
          //setSpendingDataSet(spendingDataSet);
        })
        .catch((error) => {
          setSpendingDataError(error.message ?? kDEFAULT_ERROR_MSG);
        })
        .finally(() => {
          setSpendingDataLoading(false);
        });
    }
  }, [startDate, endDate, cache]);

  // console.log(`All spend data = ${JSON.stringify(spendingDataSet)}`);
  // console.table(spendingDataSet);
  return {
    spendingDataLoading: spendingDataLoading,
    spendingDataSet: spendingDataSet,
    spendingDataError: spendingDataError,
  };
}
