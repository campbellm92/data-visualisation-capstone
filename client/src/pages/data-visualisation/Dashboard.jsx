import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import BarChartHome from "../../components/charts/barcharts/BarChartHome";
import { SelectWithBorderSmall } from "../../components/ui/Selects";

export default function DashboardTestPage() {
  const [year, setYear] = useState(2023);
  // const [monthOrSeason, setMonthOrSeason] = useState("season");
  const { user } = useContext(AuthContext);
  const userLGA = user?.lga || "Unknown LGA";

  const fields = [
    "average_daily_rate",
    "average_booking_window",
    "average_historical_occupancy",
    "average_length_of_stay",
  ];

  return (
    <div className="barchart-section">
      <div className="pb-5">
        <h1 className="font-light text-xl">
          Overview for <span className="text-primary">{userLGA}</span>
        </h1>
      </div>
      <div className="pb-5 flex justify-end gap-2">
        <SelectWithBorderSmall
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </SelectWithBorderSmall>
        {/* <SelectWithBorderSmall
          onChange={(e) => setMonthOrSeason(e.target.value)}
        >
          <option value="month">Months</option>
          <option value="season">Seasons</option>
        </SelectWithBorderSmall> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => (
          <div key={field}>
            <BarChartHome
              year={year}
              // monthOrSeason={monthOrSeason}
              dataField={field}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
