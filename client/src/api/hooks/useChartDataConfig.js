import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useFetchLocalisData } from "./useFetchLocalisData";
import { getDataMonthlyAverage } from "../utils/getUtils";

// function for processing bar chart data:
function processBarChartData(data, userLGA, year, dataField) {
  const filteredData = data.filter(
    (item) =>
      item.lga_name.trim().toLowerCase() === userLGA.trim().toLowerCase()
  );
  return getDataMonthlyAverage(filteredData, year, dataField);
}

// function for processing X chart data:

function processQuadrantScatterChartData(data, userLGA, year, dataField) {
  const filteredData = data.filter(
    (item) =>
      item.lga_name.trim().toLowerCase() === userLGA.trim().toLowerCase()
  );
  return getDataMonthlyAverage(filteredData, year, dataField);
}

// hook for chart data config, including fetch call, user state

export function useChartDataConfig({ endpoint, year, dataField, chartType }) {
  const { loading: dataLoading, data, error } = useFetchLocalisData(endpoint);
  const { user, loading: userLoading } = useContext(AuthContext);

  const processedData = useMemo(() => {
    if (dataLoading || userLoading || !user || !data) return null;

    const userLGA = user.lga || "";

    // add other cases here (e.g. scatterplot, heatmap, etc etc) as appropriate
    switch (chartType) {
      case "bar":
        return processBarChartData(data, userLGA, year, dataField);
      case "quadrantScatter":
        return processQuadrantScatterChartData(data, userLGA, year, dataField);

      default:
        return data;
    }
  }, [data, dataLoading, user, userLoading, year, dataField, chartType]);
  return {
    loading: dataLoading || userLoading,
    data: processedData,
    error,
    user,
  };
}
