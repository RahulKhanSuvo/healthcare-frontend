import DoctorsTable from "@/components/modules/admin/DoctorManagement/DoctorsTable";
import { getDoctors } from "@/services/doctor.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const DoctorsManagementPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  return (
    <div>
      {" "}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DoctorsTable />
      </HydrationBoundary>
    </div>
  );
};
export default DoctorsManagementPage;
