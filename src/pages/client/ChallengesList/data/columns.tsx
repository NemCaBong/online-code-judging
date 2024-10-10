import { ColumnDef } from "@tanstack/react-table";
import { Challenge } from "../components/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, ClipboardList, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "../components/RowActions";

export const columns: ColumnDef<Challenge>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const challenge = row.original;
      const tags = challenge.tags;
      const displayTags = tags.slice(0, 3);
      const remainingTags = tags.length > 3 ? tags.length - 3 : 0;

      return (
        <div>
          <div className="font-medium">
            {challenge.id}. {challenge.title}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {displayTags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
            {remainingTags > 0 && (
              <Badge variant="secondary">+{remainingTags}</Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string | null;
      return (
        <div className="flex justify-center">
          {status === "done" && <Check className="h-5 w-5 text-green-500" />}
          {status === "todo" && (
            <ClipboardList className="h-5 w-5 text-yellow-500" />
          )}
          {(status === "not done" || status === null) && (
            <X className="h-5 w-5 text-red-500" />
          )}
        </div>
      );
    },
    filterFn: (row, columnName, filterValue) => {
      return filterValue.includes(row.getValue(columnName));
    },
  },
  {
    accessorKey: "acceptanceRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-full justify-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Acceptance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rate = row.getValue("acceptanceRate") as number;
      return <div className="text-center">{(rate * 100).toFixed(1)}%</div>;
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full justify-center"
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      return (
        <div
          className={`font-medium text-center ${
            difficulty === "easy"
              ? "text-green-500"
              : difficulty === "medium"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      const diffA = rowA.getValue(columnId) as keyof typeof difficultyOrder;
      const diffB = rowB.getValue(columnId) as keyof typeof difficultyOrder;
      return difficultyOrder[diffA] - difficultyOrder[diffB];
    },
    filterFn: (row, columnName, filterValue) => {
      return filterValue.includes(row.getValue(columnName));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => <DataTableRowActions />,
  },
];
