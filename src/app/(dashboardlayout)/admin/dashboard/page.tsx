import AdminDashboardContent from "@/components/modules/dashboard/AdminDashboardContent";
import { getDashboardData } from "@/services/dashboard.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
  })
  const dashboardData = await queryClient.getQueryData(["admin-dashboard-data"]);
  console.log("dashbord",dashboardData)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  );
};
export default AdminDashboardPage;
