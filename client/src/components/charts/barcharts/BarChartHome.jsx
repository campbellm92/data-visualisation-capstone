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
import { useFetchLocalisData } from "../../../api/hooks/useFetchLocalisData";
import { getDataMonthlyAverage } from "../../../api/utils/getUtils";
import { filterDataByLGA } from "../../../api/utils/filterUtils";

export default function BarChartHome({ lgaName, year, dataField }) {
  const { loading, data, error } = useFetchLocalisData("/combined_data");

  //   const { user } = useContext(AuthContext);

  const filteredDataByLGA = data ? filterDataByLGA(data, lgaName) : null;

  //   const filteredData = data?.filter((item) => item.lga === user?.lga);

  const monthlyAverageData = getDataMonthlyAverage(
    filteredDataByLGA,
    year,
    dataField
  );
  console.log(monthlyAverageData);

  return (
    <ResponsiveContainer width={400} height={400}>
      <BarChart width={500} height={300} data={monthlyAverageData}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis hide={true} /> {/* Hides the Y-axis entirely */}
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// issues: "value" should be whatever the data field is
// need to make it so the data is fetched for the user's LGA dynamically
//
