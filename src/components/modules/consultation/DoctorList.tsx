"use client";

import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";

const DoctorList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });
  console.log(data);
  return <div>DoctorList</div>;
};
export default DoctorList;
