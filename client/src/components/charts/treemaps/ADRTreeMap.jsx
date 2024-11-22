import { Treemap, ResponsiveContainer } from "recharts";
import { useFetchLocalisData } from "../../../api/hooks/useFetchLocalisData";
import { filterDataByLGA } from "../../../api/utils/filterUtils";
import { getDataMonthlyAverages } from "../../../api/utils/getUtils";

// a tree map representing averages by month for ADR - Average daily rate

export default function ADRTreeMap({ lgaName, year }) {
  const { loading, data, error } = useFetchLocalisData("/combined_data");

  const filteredDataByLGA = data ? filterDataByLGA(data, lgaName) : null;

  const monthlyAverageData = getDataMonthlyAverages(
    filteredDataByLGA,
    year,
    "average_daily_rate"
  );
  console.log(monthlyAverageData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        width={400}
        height={200}
        data={monthlyAverageData}
        dataKey="value"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  );
}

// steps:

// 1. Function for converting numeric date to string (CHECK)
// 2. Function for getting the average ADR figure per month
// 3. Function for isolating LGA_name (CHECK)

/*

What I want/need to do:
I want to have the dates converted to strings so they can be represented as such.
I need to group the data by month. Is this not already done with the dateToString func? 
-- perhaps not because then I'd need to hard code if statements for getting month.. if (month === "January") ... 
The numeric data to str function ONLY converts to string. 


*/
