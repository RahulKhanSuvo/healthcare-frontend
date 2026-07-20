"use client";
import { ColumnDef } from "@tanstack/react-table";
import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";
import { IDoctor } from "@/types/doctors.type";
import TableData from "@/components/shared/table/TableData";

const DoctorsTable = () => {
  const doctorColums: ColumnDef<IDoctor>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "experience", header: "Experience" },
    { accessorKey: "rating", header: "Rating" },
  ];
  const { data: doctorDataResponse } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  console.log(doctorDataResponse);
  return <TableData data={doctorDataResponse ?? []} columns={doctorColums} />;
};

export default DoctorsTable;
