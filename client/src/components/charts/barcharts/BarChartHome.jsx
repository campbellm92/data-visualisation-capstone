// this contains the logic for the bar charts that I propose will be placed at the 'home'/'dashboard' endpoint which the user sees once they log in

import { useContext } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../../context/AuthProvider";
import { ThemeContext } from "../../../context/ThemeProvider";
import { useFetchLocalisData } from "../../../api/hooks/useFetchLocalisData";
import { getDataMonthlyAverage } from "../../../api/utils/getUtils";

// import { filterDataByLGA } from "../../../api/utils/filterUtils";

// consider moving the following definitions for display names and colors to a constants file or similar
const dataFieldDisplayNames = {
  average_booking_window: "Average Booking Window",
  average_daily_rate: "Average Daily Rate",
  average_historical_occupancy: "Average Historical Occupancy",
  average_length_of_stay: "Average Length of Stay",
};

const lgaColours = {
  Cairns: { light: "#15803d", dark: "#c88441" },
  Noosa: { light: "#7e22ce", dark: "#c88441" },
  Whitsunday: { light: "#0e7490", dark: "#c88441" },
  "Gold Coast": { light: "#c88441", dark: "#c88441" },
};

export default function BarChartHome({ year, dataField }) {
  const {
    loading: dataLoading,
    data,
    error,
  } = useFetchLocalisData("/combined_data");
  const { user, loading: userLoading } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  if (dataLoading || userLoading || !user || !data) {
    return <p>Loading...</p>;
  }

  const userLGA = user.lga || "";

  const filteredDataByLGA = data.filter((item) => {
    const itemLGA = item.lga_name || "";
    return itemLGA.trim().toLowerCase() === userLGA.trim().toLowerCase();
  });

  const monthlyAverageData = getDataMonthlyAverage(
    filteredDataByLGA,
    year,
    dataField
  );

  const displayName = dataFieldDisplayNames[dataField] || dataField;

  const fillColour = darkMode
    ? lgaColours[userLGA].dark
    : lgaColours[userLGA].light;

  return (
    <ResponsiveContainer width={400} height={400}>
      <BarChart width={500} height={300} data={monthlyAverageData}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis hide={true} />
        <Tooltip fill={"#E63946"} />
        <Legend />
        <Bar dataKey={dataField} fill={fillColour} name={displayName} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// issues: "value" should be whatever the data field is
// need to make it so the data is fetched for the user's LGA dynamically
//
