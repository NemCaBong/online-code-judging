import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "../components/RowActions";
import { Task } from "../TaskBoard";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <Link
          to={`/task/${task.slug}`}
          className="transition-colors duration-200 ease-in-out hover:text-primary hover:underline"
        >
          {task.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "assignment" ? "default" : "secondary"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-center">
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "over due"
                ? "destructive"
                : "secondary"
            }
          >
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full justify-center"
      >
        Class
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <Link
          to={`/class/${task.class}`}
          className="transition-colors duration-200 ease-in-out hover:text-primary hover:underline"
        >
          {task.class}
        </Link>
      );
    },
  },
  {
    accessorKey: "dueAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full justify-center"
      >
        Due Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dueAt = parseISO(row.getValue("dueAt"));
      return (
        <div className="text-center">
          {format(dueAt, "MMM d, yy 'at' HH:mm")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
