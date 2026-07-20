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
