import { useState } from "react";
import BarChartHome from "../../../components/charts/barcharts/BarChartHome";
import { SelectWithBorderSmall } from "../../../components/ui/Selects";
import { fields } from "../../../utils/constants";
import GraphInfoIcon from "../../../components/ui/GraphInfoIcon";

export default function DashboardBarChartsSection() {
  const [year, setYear] = useState(2023);

  return (
    <div className="barchart-section">
      {/* Year Selector */}
      <div className="pb-5 flex justify-end gap-2">
        <SelectWithBorderSmall
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </SelectWithBorderSmall>
      </div>

      {/* Bar Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => (
          <div
            key={field}
            className="relative p-4 bg-base-300 rounded-md shadow-md"
          >
            <BarChartHome year={year} dataField={field} />
            {field && (
              <div className="absolute top-2 right-2 pointer-events-auto">
                <GraphInfoIcon
                  info={
                    "Average daily rate refers to how much money a room makes on average per day."
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
