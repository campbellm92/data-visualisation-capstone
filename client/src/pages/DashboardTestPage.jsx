import BarChartHome from "../components/charts/barcharts/BarChartHome";

export default function DashboardTestPage() {
  return (
    <div>
      <BarChartHome
        lgaName={"Cairns"}
        year={2023}
        dataField={"average_daily_rate"}
      />
      <BarChartHome
        lgaName={"Whitsunday"}
        year={2023}
        dataField={"average_booking_window"}
      />
    </div>
  );
}
