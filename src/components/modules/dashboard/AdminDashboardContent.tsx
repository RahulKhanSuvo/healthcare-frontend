"use client";
import { StatsCard } from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardContent = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true,
  });

  // Now dashboardData is ApiResponse<IAdminDashboardData>
  const data = dashboardData?.data;
  return (
    <div>
      <StatsCard
        title={"Total Patients"}
        value={data?.patientCount ?? 0}
        iconName={"User"}
        description={"Total number of patients"}
      />
    </div>
  );
};

export default AdminDashboardContent;
