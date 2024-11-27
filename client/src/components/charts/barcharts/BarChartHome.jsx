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
import { dataFieldDisplayNames } from "../../../api/utils/constants";
import { lgaColours } from "../../../api/utils/graphColourConfig";
import { useChartDataConfig } from "../../../api/hooks/useChartDataConfig";
import CustomTooltip from "../CustomTooltips/CustomTooltip";

export default function BarChartHome({ year, dataField, data, loading, user }) {
  // const { loading, data, error, user } = useChartDataConfig({
  //   endpoint: "/combined_data",
  //   year,
  //   dataFields: [dataField],
  //   chartType: "bar",
  // });

  const { darkMode } = useContext(ThemeContext);

  const userLGA = user.lga || "";

  const displayName = dataFieldDisplayNames[dataField] || dataField;

  const colours = lgaColours[userLGA]?.[darkMode ? "dark" : "light"];

  const fillColour = colours.primary;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="p-4 flex justify-center items-center flex-1 min-w-[300px] max-w-[400px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              style={{
                fill: colours["primary-content"],
              }}
            />
            <YAxis hide={true} />
            <Tooltip
              content={<CustomTooltip userLGA={userLGA} chartType="bar" />}
            />
            <Legend iconType="circle" />
            <Bar dataKey={dataField} fill={fillColour} name={displayName} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
