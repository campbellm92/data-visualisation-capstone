import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeProvider";
import { lgaColours } from "../../../utils/constants";
import { useChartDataConfig } from "../../../api/hooks/useChartDataConfig";
import { useContext } from "react";

export default function QuadrantScatterHome({ year }) {
  const dataFields = ["average_daily_rate", "average_length_of_stay"];

  const { loading, data, error, user } = useChartDataConfig({
    endpoint: "/combined_data",
    year,
    dataFields,
    chartType: "quadrantScatter",
  });

  const { darkMode } = useContext(ThemeContext);

  const userLGA = user?.lga || "";

  const fillColour = darkMode
    ? lgaColours[userLGA]?.dark || "#8884d8"
    : lgaColours[userLGA]?.light || "#82ca9d";

  let scatterData = [];
  let xMin = 0;
  let xMax = 0;
  let xTicks = [];

  if (!loading && data) {
    scatterData = data
      .map((item) => {
        const x = parseFloat(item["average_daily_rate"]);
        const y = parseFloat(item["average_length_of_stay"]);
        if (isNaN(x) || isNaN(y)) {
          return null;
        }
        return {
          x,
          y,
          month: item.month,
        };
      })
      .filter((item) => item !== null);

    // Calculate x-axis min, max, and ticks
    const xValues = scatterData.map((point) => point.x);
    xMin = Math.floor(Math.min(...xValues) / 10) * 10;
    xMax = Math.ceil(Math.max(...xValues) / 10) * 10;

    // Ensure xMin and xMax are valid
    if (xMin === xMax) {
      xMin -= 10;
      xMax += 10;
    }

    // Generate ticks in increments of 10
    for (let i = xMin; i <= xMax; i += 10) {
      xTicks.push(i);
    }
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : scatterData.length > 0 ? (
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name="Average Daily Rate"
              unit="(AUD)"
              domain={[xMin, xMax]}
              ticks={xTicks}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Average Length of Stay"
              unit=" days"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="Average Daily Rate vs Average Length of Stay"
              data={scatterData}
              fill={fillColour}
            />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the selected year.</p>
      )}
    </div>
  );
}
