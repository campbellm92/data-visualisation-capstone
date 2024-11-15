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
import { dataFieldDisplayNames, lgaColours } from "../../../utils/constants";

export default function BarChartHome({ year, dataField }) {
  const {
    loading: dataLoading,
    data,
    error,
  } = useFetchLocalisData("/combined_data");
  const { user, loading: userLoading } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  console.log("User Object:", user);

  if (dataLoading || userLoading || !user || !data) {
    return <p>Loading...</p>;
  }

  const userLGA = user.lga || "";

  const filteredDataByLGA = data.filter((item) => {
    const itemLGA = item.lga_name || "";
    return itemLGA.trim().toLowerCase() === userLGA.trim().toLowerCase();
  });

  const displayedData = getDataMonthlyAverage(
    filteredDataByLGA,
    year,
    dataField
  );

  console.log("Displayed Data:", displayedData);

  const displayName = dataFieldDisplayNames[dataField] || dataField;

  const fillColour = darkMode
    ? lgaColours[userLGA].dark
    : lgaColours[userLGA].light;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="p-4 flex justify-center items-center flex-1 min-w-[300px] max-w-[400px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={displayedData}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis hide={true} />
            <Tooltip />
            <Legend iconType="circle" />
            <Bar dataKey={dataField} fill={fillColour} name={displayName} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
