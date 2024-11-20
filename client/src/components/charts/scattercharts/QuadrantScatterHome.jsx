import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeProvider";
import { lgaColours } from "../../../utils/constants";
import { useChartDataConfig } from "../../../api/hooks/useChartDataConfig";
import { useContext } from "react";

export default function QuadrantScatterHome({ year }) {
  const dataField = ["average_daily_rate", "average_length_of_stay"];

  const { loading, data, error, user } = useChartDataConfig({
    endpoint: "/combined_data",
    year,
    dataField,
    chartType: "quadrantScatter",
  });

  const { darkMode } = useContext(ThemeContext);

  const userLGA = user.lga || "";

  const fillColour = darkMode
    ? lgaColours[userLGA].dark
    : lgaColours[userLGA].light;

  const scatterData =
    data?.map((item) => ({
      x: item.average_daily_rate,
      y: item.average_length_of_stay,
    })) || [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Average Daily Rate" unit="$" />
        <YAxis
          type="number"
          dataKey="y"
          name="Average Length of Stay"
          unit="days"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          name="Average Daily Rate vs Average Length of Stay"
          data={scatterData}
          fill={fillColour}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
