import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeleton = ({ rows = 15 }: { rows?: number }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%] text-center">ID</TableHead>
          <TableHead className="w-[30%] text-center">Type</TableHead>
          <TableHead className="text-center">CreateTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="px-10">
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell className="px-10">
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell className="px-10">
              <Skeleton className="h-5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
