"use client";
import ApplicationPieChart from "@/components/shared/ApplicationPieChart";
import AppointmentBarChart from "@/components/shared/AppointmentBarChart";
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
  console.log(data);
  return (
    <div>
      <StatsCard
        title={"Total Patients"}
        value={data?.patientCount ?? 0}
        iconName={"User"}
        description={"Total number of patients"}
      />
      <AppointmentBarChart data={data?.barChartData ?? []} />
      <ApplicationPieChart data={data?.pieChartData ?? []} />
    </div>
  );
};

export default AdminDashboardContent;
