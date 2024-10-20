// 
//  IFQ717 Web Development Capstone
//
//  api.js - Main app API function definitions
//
//

import { useState, useEffect } from 'react';
import { addDaysToDate } from '../../utils/utils';
import { kAPI_URL } from '../../utils/constants';
import { getUrlFromCache, getUrlFromServer } from '../../utils/utils';

// Retrieve Ranking data based on year and country from the external API
export function useLocalisData(startDate, windowDays) {

  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(addDaysToDate(startDate, windowDays));

  // console.log(startDateDate);
  // console.log(endDateDate);


  useEffect(() => {

    let url = `${kAPI_URL}/combined_data`; //?start=${startDate}&end=${addDaysToDate(startDate, windowDays)}`;

    if (getUrlFromCache(cache, url)) {

      setLoading(false);
      setDataSet(getUrlFromCache(cache, url).filter(sample => {
         const sampleDateDate = new Date(sample.sample_date);

         return (sampleDateDate >= startDateDate && sampleDateDate <= endDateDate); 

        }));
      setError(null);

    } else {

      setLoading(true);
      getUrlFromServer(url, false)
        .then((dataSet) => {
          setCache((prevCache) => ({ ...prevCache,  [url]: dataSet }));
          setDataSet(getUrlFromCache(cache, url).filter(sample => {
         const sampleDateDate = new Date(sample.sample_date);

         return (sampleDateDate >= startDateDate && sampleDateDate <= endDateDate); 
         
        }));
          //setDataSet(dataSet);

        })
        .catch((error) => {
          setError(error.message ?? kDEFAULT_ERROR_MSG);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [startDate, windowDays, cache]);

  return {
    loading: loading,
    dataSet: dataSet,
    error: error
  };

}
