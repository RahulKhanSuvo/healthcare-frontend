import { IDoctor } from "@/types/doctors.type";
import { ColumnDef } from "@tanstack/react-table";

export const doctorColums: ColumnDef<IDoctor>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "specialization", header: "Specialization" },
  { accessorKey: "experience", header: "Experience" },
  { accessorKey: "rating", header: "Rating" },
];
