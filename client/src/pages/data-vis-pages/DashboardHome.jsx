import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import DashboardBarChartsSection from "../../sections/data-vis-sections/dashboard/DashboardBarChartsSection";
import DashboardQuadrantScatterSection from "../../sections/data-vis-sections/dashboard/DashboardQuadrantScatterSection";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const userLGA = user?.lga || "Unknown LGA";

  return (
    <div>
      <div className="pb-5">
        <h1 className="font-light text-xl text-primary-content">
          Overview for{" "}
          <span className="font-bold text-primary-content underline underline-offset-2 decoration-primary decoration-4">
            {userLGA}
          </span>
        </h1>
      </div>
      <DashboardBarChartsSection />
      <DashboardQuadrantScatterSection />
    </div>
  );
}
