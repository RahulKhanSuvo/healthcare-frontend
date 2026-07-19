import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
          cell: ({ row }: { row: { original: TData } }) => {
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
  const table = useReactTable({
    data,
    columns: tableColums,
    getCoreRowModel: getCoreRowModel(),
  });
  return <div></div>;
};
export default TableData;
