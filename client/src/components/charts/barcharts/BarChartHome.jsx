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
import { ThemeContext } from "../../../context/ThemeProvider";
import { dataFieldDisplayNames, lgaColours } from "../../../utils/constants";
import { useChartDataConfig } from "../../../api/hooks/useChartDataConfig";

export default function BarChartHome({ year, dataField }) {
  const { loading, data, error, user } = useChartDataConfig({
    endpoint: "/combined_data",
    year,
    dataField,
    chartType: "bar",
  });

  const { darkMode } = useContext(ThemeContext);

  const userLGA = user.lga || "";

  const displayName = dataFieldDisplayNames[dataField] || dataField;

  const fillColour = darkMode
    ? lgaColours[userLGA].dark
    : lgaColours[userLGA].light;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="p-4 flex justify-center items-center flex-1 min-w-[300px] max-w-[400px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
