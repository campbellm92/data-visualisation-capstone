// convert dates in YYYY-MM-DD format to Month and year string
export function numericDateToString(date) {
  const dateToConvert = new Date(date);

  const month = dateToConvert.toLocaleString("default", {
    month: "long",
  });

  const year = dateToConvert.getFullYear();

  return { month, year };
}

// will return (for example) January 2023
