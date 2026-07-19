import { ColumnDef } from "@tanstack/react-table";
interface DataTableAction<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}
interface TableDataProps<TData> {
  data: TData;
  columns: ColumnDef<TData>[];
  actions?: React.ReactNode;
}
const TableData = () => {
  return <>children</>;
};
export default TableData;
