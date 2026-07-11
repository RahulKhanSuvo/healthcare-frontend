"use client";

import { getDoctors } from "@/app/(common layout)/consultation/_actions";
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
