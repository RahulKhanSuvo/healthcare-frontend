import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDoctors } from "./_actions";
import DoctorList from "@/components/modules/consultation/DoctorList";

async function ConsultationPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorList />
    </HydrationBoundary>
  );
}

export default ConsultationPage;
