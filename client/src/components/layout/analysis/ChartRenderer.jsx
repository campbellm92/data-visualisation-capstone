import BarChartHome from "../../../components/charts/barcharts/BarChartHome";
import QuadrantScatterHome from "../../charts/scattercharts/QuadrantScatterHome";

const ChartRenderer = ({ chartType, ...props }) => {
  switch (chartType) {
    case "bar":
      return <BarChartHome {...props} />;
    case "scatter":
      return <QuadrantScatterHome {...props} />;
  }
};

export default ChartRenderer;
