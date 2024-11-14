// bare data fields for use within components
export const fields = [
  "average_daily_rate",
  "average_booking_window",
  "average_historical_occupancy",
  "average_length_of_stay",
];

// convert database field names to display names that are better for displaying the data
export const dataFieldDisplayNames = {
  average_booking_window: "Average Booking Window",
  average_daily_rate: "Average Daily Rate",
  average_historical_occupancy: "Average Historical Occupancy",
  average_length_of_stay: "Average Length of Stay",
};

// colour scheme for the graphs for different LGAs
// note: because of Recharts restrictions, this cannot be handled in tailwind.config.js
export const lgaColours = {
  Cairns: { light: "#15803d", dark: "#c88441" },
  Noosa: { light: "#ab274f", dark: "#c88441" },
  Whitsunday: { light: "#0e7490", dark: "#c88441" },
  "Gold Coast": { light: "#c88441", dark: "#c88441" },
};
