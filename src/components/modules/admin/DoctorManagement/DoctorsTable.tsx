"use client";

import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";

const DoctorsTable = () => {
  const { data:doctorDataResponse } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })
  console.log(doctorDataResponse)
  return (
    <div>

    </div>
  );
};

export default DoctorsTable;
