import { numericDateToString, convertMonthsToSeasons } from "./dateUtils";

// get a monthly average of the ADR value
// could also add getDataSeasonalAverage
export function getDataMonthlyAverage(data, year, dataField) {
  // dataField = average daily rate, etc
  const monthlyData = {};

  data?.forEach((item) => {
    const { month, year: itemYear } = numericDateToString(item.sample_date);

    if (itemYear !== year) {
      return;
    }

    if (!monthlyData[month]) {
      monthlyData[month] = { month, totalADR: 0, count: 0 };
    }

    monthlyData[month].totalADR += parseFloat(item[dataField]);
    monthlyData[month].count += 1;
  });
  return Object.values(monthlyData).map((item) => ({
    name: item.month,
    value: item.totalADR / item.count,
  }));
}

export function getDataSeasonalAverage(data, year, dataField) {
  // dataField = average daily rate, etc
  const seasonalData = {};

  data?.forEach((item) => {
    const { month, year: itemYear } = numericDateToString(item.sample_date);

    if (itemYear !== year) {
      return;
    }

    const season = convertMonthsToSeasons(month);

    if (!seasonalData[season]) {
      seasonalData[season] = { season, total: 0, count: 0 };
    }

    seasonalData[season].total += parseFloat(item[dataField]);
    seasonalData[season].count += 1;
  });

  return Object.values(seasonalData).map((item) => ({
    name: item.season,
    value: item.total / item.count,
  }));
}

// function for retrieving url from cache in fetch requests to data endpoint
export function getUrlFromCache(cache, url, filter = (element) => true) {
  return cache[url] ? cache[url].filter(filter) : null;
}

// function for retrieving url from server in fetch requests to data endpoint
export async function getUrlFromServer(url) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!res.ok) {
      throw new Error("No response from server ");
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.message || "Failed to fetch user data.");
    }
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
