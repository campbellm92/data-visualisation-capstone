import { useState } from "react";
import BarChartHome from "../../../components/charts/Barcharts/BarChartHome";
import { SelectWithBorderSmall } from "../../../components/ui/Selects";
import { fields } from "../../../api/utils/constants";
import GraphInfoIcon from "../../../components/ui/GraphInfoIcon";
import LLMResponse from "../../../components/layout/LLMResponse";
import Map from "../../../components/ui/Map";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useFetchLLMResponse } from "../../../api/hooks/useFetchLLMResponse";

export default function DashboardBarChartsSection() {
  const [year, setYear] = useState(2023);
  const { loading, responseFromLLM, error } = useFetchLLMResponse("Please write 100 words describing the rental market in Noosa", []); // getLLMResponseFromServer("Why is water wet?", []);

  return (
    <div className="barchart-section mb-5">
      <div className="pb-5 flex justify-end gap-2">
        <SelectWithBorderSmall
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </SelectWithBorderSmall>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-10">
        <div className="shadow-md border-1 rounded p-2 w-[430px] h-[325px]">
          <Map location="Noosa"></Map>
        </div>
        <div className="flex items-center">
          {!loading && !error ?
            <div className="overflow-scroll shadow-md border-1 rounded mb-3 bg-base-300 h-[325px]">
              <LLMResponse content={responseFromLLM} ></LLMResponse>
            </div> : <LoadingSpinner></LoadingSpinner>}
        </div>
      </div>

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
