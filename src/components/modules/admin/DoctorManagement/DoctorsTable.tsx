"use client";
import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";
import { IDoctor } from "@/types/doctors.type";
import TableData from "@/components/shared/table/TableData";
import { doctorColums } from "./doctorColum";

const DoctorsTable = () => {
  const { data: doctorDataResponse } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const handleView = (doctor: IDoctor) => {
    console.log(doctor);
  };
  const handleEdit = (doctor: IDoctor) => {
    console.log(doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    console.log(doctor);
  };
  return (
    <TableData
      data={doctorDataResponse ?? []}
      columns={doctorColums}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
    />
  );
};

export default DoctorsTable;
