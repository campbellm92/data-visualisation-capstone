import BarChartHome from "../components/charts/barcharts/BarChartHome";

export default function DashboardTestPage() {
  const fields = [
    "average_daily_rate",
    "average_booking_window",
    "average_historical_occupancy",
    "average_length_of_stay",
  ];

  return (
    <div>
      <div className="pb-10">
        <h1 className="text-xl">
          Overview for <span className="text-primary">Whitsunday</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {fields.map((field) => (
          <div key={field}>
            <BarChartHome year={2023} dataField={field} />
          </div>
        ))}
      </div>
    </div>
  );
}
