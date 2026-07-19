import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal, SplinePointer } from "lucide-react";
interface DataTableAction<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}
interface TableDataProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableAction<TData>;
  emptyMessage?: string;
  isLoading?: boolean;
}
const TableData = <TData,>({
  data,
  columns,
  actions,
  emptyMessage,
  isLoading,
}: TableDataProps<TData>) => {
  const tableColums = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions?.onView && (
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      <span>View</span>
                    </DropdownMenuItem>
                  )}
                  {actions?.onEdit && (
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      <span>Edit</span>
                    </DropdownMenuItem>
                  )}
                  {actions?.onDelete && (
                    <DropdownMenuItem onClick={() => actions.onDelete?.(rowData)}>
                      <span>Delete</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        } as ColumnDef<TData>,
      ]
    : columns;
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns: tableColums,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50">
          <div className="flex justify-center items-center h-full">
            <SplinePointer className="animate-spin" />
          </div>
        </div>
      )}
      <div>
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
      </div>
    </div>
  );
};
export default TableData;
