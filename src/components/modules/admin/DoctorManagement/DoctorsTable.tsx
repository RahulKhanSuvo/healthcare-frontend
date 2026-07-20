"use client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getDoctors } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: doctorDataResponse ?? [],
    columns: doctorColums,
    getCoreRowModel: getCoreRowModel(),
  });
  getHeaderGroups();
  getRowModel();
  return <TableData data={doctorDataResponse ?? []} columns={doctorColums}></TableData>;
};

export default DoctorsTable;
