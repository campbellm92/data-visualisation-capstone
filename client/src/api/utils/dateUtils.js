// convert dates in YYYY-MM-DD format to month and year string (e.g. January 2023)
export function numericDateToString(date) {
  const dateToConvert = new Date(date);

  const month = dateToConvert.toLocaleString("default", {
    month: "narrow",
  });

  const year = dateToConvert.getFullYear();

  return { month, year };
}
//output: January 2023

// convert numeric dates to season names (Summer, Autumn, etc)
export function convertMonthsToSeasons(month, year) {
  switch (month) {
    case "December":
      return `Summer ${year}`;
    case "January":
    case "February":
      return `Summer ${year}`;
    case "March":
    case "April":
    case "May":
      return `Autumn ${year}`;
    case "June":
    case "July":
    case "August":
      return `Winter ${year}`;
    case "September":
    case "October":
    case "November":
      return `Spring ${year}`;
    default:
      return null;
  }
}
