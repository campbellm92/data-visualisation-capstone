import { useState } from "react";
import QuadrantScatterHome from "../../../components/charts/Scattercharts/QuadrantScatterHome";
import { SelectWithBorderSmall } from "../../../components/ui/Selects";

export default function DashboardQuadrantScatterSection() {
  const [year, setYear] = useState(2023);

  return (
    <div className="quadrant-scatter-section mb-5s">
      <div className="pb-5 flex justify-end gap-2">
        <SelectWithBorderSmall
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </SelectWithBorderSmall>
      </div>
      <div className="p-4 bg-base-300 rounded-md shadow-md">
        <QuadrantScatterHome year={year} />
      </div>
    </div>
  );
}
