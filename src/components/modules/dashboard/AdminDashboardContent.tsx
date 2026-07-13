"use client";
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
  return <div>AdminDashboardContent</div>;
};

export default AdminDashboardContent;
