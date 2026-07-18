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

  return (
    <Table>
      <TableHeader>
        {getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DoctorsTable;
