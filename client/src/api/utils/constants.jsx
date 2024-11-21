//
//  IFQ717 Web Development Capstone
//
//  constants.js - constants defined and used throughout the app
//
//

export const kAPI_URL = "http://localhost:3000/api";
export const kDEFAULT_ERROR_MSG = "API Error - an unspecified error occurred";
export const kGraphLineStyle = "smooth";
export const kOriginDate = "2023-01-01";
export const kGraphColours = {
  "Gold Coast": "#ff0000",
  /*`rgb(var(--tw-primary))`,*/ Noosa: "#00ff00",
  Whitsunday: "#0000ff",
  Cairns: "#ff00ff",
};
export const kDefaultResponse =
  "Hi there, please select a default prompt or enter a custom prompt above and then click Analyse to pass your prompt and the selected data to an LLM for analysis.";

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
