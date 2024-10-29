import { useState } from "react";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardNav from "../dashboard/DashboardNav";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  return (
    <div className="flex h-screen">
      <DashboardSidebar isCollapsed={isCollapsed} />
      <div className="flex flex-col flex-1">
        <DashboardNav toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 bg-base-300">{children}</main>
      </div>
    </div>
  );
}

//src: https://dev.to/chintanonweb/from-zero-to-hero-building-a-scalable-react-admin-dashboard-layout-53p9
