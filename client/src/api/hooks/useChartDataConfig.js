import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useFetchLocalisData } from "./useFetchLocalisData";
import { getDataMonthlyAverages } from "../utils/getUtils";

// function for processing bar chart data:
function processBarChartData(data, userLGA, year, dataFields) {
  const filteredData = data.filter(
    (item) =>
      item.lga_name.trim().toLowerCase() === userLGA.trim().toLowerCase()
  );
  return getDataMonthlyAverages(filteredData, year, dataFields);
}

// function for processing X chart data:

function processQuadrantScatterChartData(data, userLGA, year, dataFields) {
  const filteredData = data.filter(
    (item) =>
      item.lga_name.trim().toLowerCase() === userLGA.trim().toLowerCase()
  );
  return getDataMonthlyAverages(filteredData, year, dataFields);
}

// hook for chart data config, including fetch call, user state

export function useChartDataConfig({ endpoint, year, dataFields, chartType }) {
  const { loading: dataLoading, data, error } = useFetchLocalisData(endpoint);
  const { user, loading: userLoading } = useContext(AuthContext);

  const processedData = useMemo(() => {
    if (dataLoading || userLoading || !user || !data) return null;

    const userLGA = user.lga || "";

    // add other cases here (e.g. scatterplot, heatmap, etc etc) as appropriate
    switch (chartType) {
      case "bar":
        return processBarChartData(data, userLGA, year, dataFields);
      case "quadrantScatter":
        return processQuadrantScatterChartData(data, userLGA, year, dataFields);

      default:
        return data;
    }
  }, [data, dataLoading, user, userLoading, year, dataFields, chartType]);
  return {
    loading: dataLoading || userLoading,
    data: processedData,
    error,
    user,
  };
}
