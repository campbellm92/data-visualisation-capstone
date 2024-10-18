// 
//  IFQ717 Web Development Capstone
//
//  api.js - Main app API function definitions - please see comments below
//
//

import { useState, useEffect } from 'react';
import { kAPI_KEY, kAPI_URL, kALL_VALUES, kTOKEN_NAME, kDEFAULT_ERROR_MSG } from './constants';

// Given a cache array and a specific URL string, getUrlFromCache will return the previous
// API response for that URL if it exists in the cache, filtered by an optionally provided filter
function getUrlFromCache(cache, url, filter = (element) => true) {
  return cache[url];// ? cache[url].filter(filter) : cache[url];
}

// A helper function to consistently perform server API calls, handling errors as appropriate
// Take a url and authenticate boolean. If authenticate is true then the user's JWT is 
// passed in the request header
function getUrlFromServer(url, authenticate) {

  console.log(`api url = ${url}`);

  return fetch(url, {
    method: "GET",
    headers: authenticate ?
      ({
        "Content-Type": "application/json",
        "X-API-KEY": kAPI_KEY,
        "Authorization": "Bearer " + localStorage.getItem(kTOKEN_NAME)
      })
      :
      ({
        "Content-Type": "application/json",
        "X-API-KEY": kAPI_KEY
      }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw (data);
      }
      console.log("received data =");
      //console.table(data['combined_data']);
      return data['combined_data'];
    });
}

// Retrieve Factor data based on year and country from the external API
export function useWHRDataFactors(year, country) {

  const [loading, setLoading] = useState(false);
  const [factors, setFactors] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {

    let url = `${kAPI_URL}/factors/${year}`;

    if (country !== kALL_VALUES && getUrlFromCache(cache, url)) {
      setLoading(false);
      setFactors(getUrlFromCache(cache, url, (element) => element.country === country));
      setError(null);

    } else {

      // Turns out UX is better if all data is retreived for the year and then filtered client-side by country
      // Therfore commenting out the below
      // if (country !== kALL_VALUES) {
      //   url = `${kAPI_URL}/factors/${year}?country=${country}`;
      // }

      if (getUrlFromCache(cache, url)) {

        setLoading(false);
        setFactors(getUrlFromCache(cache, url));
        setError(null);

      } else {

        setLoading(true);
        getUrlFromServer(url, true)
          .then((factors) => {
            // Store the response for the URL in the cache
            setCache((prevCache) => ({ ...prevCache, [url]: factors }));
            // If country is specified filter response before returning
            // Turns out UX is better if all data is retreived for the year and then filtered client-side by country
            setFactors(getUrlFromCache(cache, url, country === kALL_VALUES ? null : (element) => element.country === country));
          })
          .catch((error) => {
            setError(error.message ?? kDEFAULT_ERROR_MSG);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [year, country, cache]);

  return {
    loading: loading,
    factors: factors,
    error: error,
  };

}

export function addDaysToDate(dateString, daysToAdd) {
  
  const date = new Date(dateString);

  date.setDate(date.getDate() + daysToAdd);

  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, '0');
  const newDay = String(date.getDate()).padStart(2, '0');

  const newDateString = `${newYear}-${newMonth}-${newDay}`;

  return newDateString;
}


export function daysBetweenDates(startDate, endDate) {
  
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);


  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = (endDateDate - startDateDate) / millisecondsPerDay;

  console.log(`days between ${startDate} and ${endDate} = ${dayDifference}`);


  // Return the number of whole days
  return Math.floor(dayDifference);



  return endDateDate - startDateDate + 1;
}

// Retrieve Ranking data based on year and country from the external API
export function useLocalisDataOccupancy(startDate, windowDays) {

  const [loading, setLoading] = useState(false);
  const [occupancy, setOccupancy] = useState();
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
      setOccupancy(getUrlFromCache(cache, url).filter(sample => {
         const sampleDateDate = new Date(sample.sample_date);

         return (sampleDateDate >= startDateDate && sampleDateDate <= endDateDate); 

        }));
      setError(null);

    } else {

      setLoading(true);
      getUrlFromServer(url, false)
        .then((occupancyData) => {
          setCache((prevCache) => ({ ...prevCache,  [url]: occupancyData }));
          setOccupancy(getUrlFromCache(cache, url).filter(sample => {
         const sampleDateDate = new Date(sample.sample_date);

         return (sampleDateDate >= startDateDate && sampleDateDate <= endDateDate); 
         
        }));
          //setOccupancy(occupancyData);

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
    occupancy: occupancy,
    error: error
  };

}

// Retrieve Ranking data based on year and country from the external API
export function useWHRDataRankings(year, country) {

  const [loading, setLoading] = useState(false);
  const [rankings, setRankings] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {

    let url = `${kAPI_URL}/rankings/?year=${year}`;

    if (country !== kALL_VALUES && getUrlFromCache(cache, url)) {
      setLoading(false);
      setRankings(getUrlFromCache(cache, url, (element) => element.country === country));
      setError(null);

    } else {

      if (country !== kALL_VALUES) {
        if (year !== kALL_VALUES) {
          url = `${kAPI_URL}/rankings/?year=${year}&country=${country}`;
        } else {
          url = `${kAPI_URL}/rankings/?country=${country}`;
        }
      }

      if (getUrlFromCache(cache, url)) {

        setLoading(false);
        setRankings(getUrlFromCache(cache, url));
        setError(null);

      } else {

        setLoading(true);
        getUrlFromServer(url, false)
          .then((rankings) => {
            // Store the response for the URL in the cache sorting it differently based
            // on whether year is "All Years"
            setCache((prevCache) => ({ ...prevCache, [url]: year === kALL_VALUES ? rankings.toReversed() : rankings }))
            setRankings(getUrlFromCache(cache, url));
          })
          .catch((error) => {
            setError(error.message ?? kDEFAULT_ERROR_MSG);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

  }, [year, country, cache]);

  return {
    loading: loading,
    rankings: rankings,
    error: error,
  };

}

// Retrieve the list of Countries from the external API
export function useCountries() {

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState();
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {

    const url = `${kAPI_URL}/countries`;

    setCountries(['Noosa', 'Gold Coast']);
    /*
    if (getUrlFromCache(cache, url)) {

      setLoading(false);
      setCountries(getUrlFromCache(cache, url));
      setError(null);

    } else {

      setLoading(true);
      getUrlFromServer(url, false)
        .then((countries) => {
          // Store the response for the URL in the cache
          setCache((prevCache) => ({ ...prevCache, [url]: countries }));
          setCountries(getUrlFromCache(cache, url));
        })
        .catch((error) => {
          setError(error.message ?? kDEFAULT_ERROR_MSG);
        })
        .finally(() => {
          setLoading(false);
        });
    }*/
  }, [cache]);

  return {
    loading: loading,
    countries: countries,
    error: error,
  };
}

// get width changes from the UI
export const useWindowWidthResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const listener = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return {
    width
  };
};