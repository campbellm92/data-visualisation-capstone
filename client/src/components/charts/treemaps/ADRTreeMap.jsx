import { Treemap, ResponsiveContainer } from "recharts";
import { useLocalisData } from "../../../api/hooks/useLocalisData";

// a tree map representing averages by month for ADR - Average daily rate

export default function ADRTreeMap() {
  const { loading, dataSet, error } = useLocalisData();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        width={400}
        height={200}
        data={dataSet}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  );
}
