//
//  IFQ717 Web Development Capstone
//
//  api.js - Main app API function definitions
//
//

export function average(arr) {
  return Math.trunc((arr.reduce((p, c) => p + c, 0) / arr.length) * 10.0) / 10.0;
}

// Given a cache array and a specific URL string, getUrlFromCache will return the previous
// API response for that URL if it exists in the cache, filtered by an optionally provided filter
export function getUrlFromCache(cache, url, filter = (element) => true) {
  return cache[url]; // ? cache[url].filter(filter) : cache[url];
}

// A helper function to consistently perform server API calls, handling errors as appropriate
// Take a url and authenticate boolean. If authenticate is true then the user's JWT is
// passed in the request header
export function getUrlFromServer(url, authenticate) {
  console.log(`api url = ${url}`);

  return fetch(url, {
    method: "GET",
    headers: authenticate
      ? {
          "Content-Type": "application/json",
          //"X-API-KEY": kAPI_KEY,
          //"Authorization": "Bearer " + localStorage.getItem(kTOKEN_NAME)
        }
      : {
          "Content-Type": "application/json",
          //"X-API-KEY": kAPI_KEY
        },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data;
      }
      console.log("Full response data:", data);
      //console.table(data['combined_data']);
      return data["combined_data"];
    });
}

export function addDaysToDate(dateString, daysToAdd) {
  const date = new Date(dateString);

  date.setDate(date.getDate() + daysToAdd);

  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newDay = String(date.getDate()).padStart(2, "0");

  const newDateString = `${newYear}-${newMonth}-${newDay}`;

  return newDateString;
}

export function daysBetweenDates(startDate, endDate) {
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = (endDateDate - startDateDate) / millisecondsPerDay;

  return Math.floor(dayDifference);
}

export function convertToLabel(name) {
  return name.replace(' ', '_').toLowerCase();
}
