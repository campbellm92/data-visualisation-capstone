import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import DashboardBarChartsSection from "../../sections/data-vis-sections/dashboard/DashboardBarChartsSection";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const userLGA = user?.lga || "Unknown LGA";

  return (
    <div>
      {/* Page Header */}
      <div className="pb-5">
        <h1 className="font-light text-xl">
          Overview for <span className="text-primary">{userLGA}</span>
        </h1>
      </div>

      {/* BarChart Section */}
      <DashboardBarChartsSection />
    </div>
  );
}
