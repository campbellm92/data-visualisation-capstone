import { useState } from "react";
import QuadrantScatterHome from "../../../components/charts/scattercharts/QuadrantScatterHome";

export default function DashboardQuadrantScatterSection() {
  const [year, setYear] = useState("2023");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="quadrant-scatter-section">
      <div className="year-selector">
        <label htmlFor="year">Select Year:</label>
        <select id="year" value={year} onChange={handleYearChange}>
          <option value="2023">2023</option>
        </select>
      </div>
      <QuadrantScatterHome year={year} />
    </div>
  );
}
