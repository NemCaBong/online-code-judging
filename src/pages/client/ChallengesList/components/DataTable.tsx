import React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table/Pagination";
import { DataTableToolbar } from "./ToolBar";
import { columns } from "../data/columns";

export type Challenge = {
  id: string;
  title: string;
  status: "done" | "todo" | "not done" | null;
  tags: string[];
  acceptanceRate: number;
  difficulty: "easy" | "medium" | "hard";
};

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Two Sum",
    status: "done",
    tags: ["Array", "Hash Table"],
    difficulty: "easy",
    acceptanceRate: 0.48,
  },
  {
    id: "2",
    title: "Reverse Linked List",
    status: "todo",
    tags: ["Linked List", "Recursion"],
    difficulty: "medium",
    acceptanceRate: 0.69,
  },
  {
    id: "3",
    title: "Binary Tree Inorder Traversal",
    status: null,
    tags: ["Stack", "Tree", "Depth-First Search"],
    difficulty: "easy",
    acceptanceRate: 0.71,
  },
  {
    id: "4",
    title: "Valid Parentheses",
    status: null,
    tags: ["String", "Stack"],
    acceptanceRate: 0.4,
    difficulty: "easy",
  },
  {
    id: "5",
    title: "Merge Two Sorted Lists",
    status: "done",
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 0.59,
    difficulty: "easy",
  },
  {
    id: "6",
    title: "Maximum Subarray",
    status: "todo",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    acceptanceRate: 0.49,
    difficulty: "hard",
  },
  {
    id: "7",
    title: "Climbing Stairs",
    status: null,
    tags: ["Math", "Dynamic Programming"],
    acceptanceRate: 0.51,
    difficulty: "easy",
  },
  {
    id: "8",
    title: "Best Time to Buy and Sell Stock",
    status: "done",
    tags: ["Array", "Dynamic Programming"],
    acceptanceRate: 0.54,
    difficulty: "medium",
  },
  {
    id: "9",
    title: "Valid Palindrome",
    status: "not done",
    tags: ["Two Pointers", "String"],
    acceptanceRate: 0.41,
    difficulty: "hard",
  },
  {
    id: "10",
    title: "Invert Binary Tree",
    status: "todo",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search"],
    acceptanceRate: 0.72,
    difficulty: "hard",
  },
  {
    id: "11",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    status: null,
    tags: ["Tree", "Depth-First Search", "Binary Search Tree"],
    acceptanceRate: 0.58,
    difficulty: "medium",
  },
  {
    id: "12",
    title: "Implement Queue using Stacks",
    status: "done",
    tags: ["Stack", "Design", "Queue"],
    acceptanceRate: 0.56,
    difficulty: "easy",
  },
  {
    id: "13",
    title: "First Unique Character in a String",
    status: "todo",
    tags: ["Hash Table", "String"],
    acceptanceRate: 0.57,
    difficulty: "easy",
  },
  {
    id: "14",
    title: "Fizz Buzz",
    status: "done",
    tags: ["Math", "String", "Simulation"],
    acceptanceRate: 0.66,
    difficulty: "easy",
  },
  {
    id: "15",
    title: "Merge Intervals",
    status: "not done",
    tags: ["Array", "Sorting"],
    acceptanceRate: 0.45,
    difficulty: "hard",
  },
  {
    id: "16",
    title: "Group Anagrams",
    status: null,
    tags: ["Hash Table", "String", "Sorting"],
    acceptanceRate: 0.63,
    difficulty: "easy",
  },
  {
    id: "17",
    title: "Permutations",
    status: "todo",
    tags: ["Array", "Backtracking"],
    acceptanceRate: 0.71,
    difficulty: "easy",
  },
  {
    id: "18",
    title: "Rotate Image",
    status: "done",
    tags: ["Array", "Math", "Matrix"],
    acceptanceRate: 0.65,
    difficulty: "medium",
  },
  {
    id: "19",
    title: "Longest Palindromic Substring",
    status: "not done",
    tags: ["String", "Dynamic Programming"],
    acceptanceRate: 0.32,
    difficulty: "hard",
  },
  {
    id: "20",
    title: "Unique Paths",
    status: null,
    tags: ["Math", "Dynamic Programming", "Combinatorics"],
    acceptanceRate: 0.6,
    difficulty: "easy",
  },
  {
    id: "21",
    title: "Word Break",
    status: "todo",
    tags: ["Hash Table", "String", "Dynamic Programming", "Trie"],
    acceptanceRate: 0.44,
    difficulty: "medium",
  },
  {
    id: "22",
    title: "Coin Change",
    status: "done",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    acceptanceRate: 0.4,
    difficulty: "medium",
  },
  {
    id: "23",
    title: "Product of Array Except Self",
    status: "not done",
    tags: ["Array", "Prefix Sum"],
    acceptanceRate: 0.64,
    difficulty: "easy",
  },
  {
    id: "24",
    title: "Valid Sudoku",
    status: null,
    tags: ["Array", "Hash Table", "Matrix"],
    acceptanceRate: 0.55,
    difficulty: "medium",
  },
  {
    id: "25",
    title: "Longest Consecutive Sequence",
    status: "todo",
    tags: ["Array", "Hash Table", "Union Find"],
    acceptanceRate: 0.48,
    difficulty: "easy",
  },
  {
    id: "26",
    title: "Implement Trie (Prefix Tree)",
    status: "done",
    tags: ["Hash Table", "String", "Design", "Trie"],
    acceptanceRate: 0.58,
    difficulty: "easy",
  },
  {
    id: "27",
    title: "Find Median from Data Stream",
    status: "not done",
    tags: [
      "Two Pointers",
      "Design",
      "Sorting",
      "Heap (Priority Queue)",
      "Data Stream",
    ],
    acceptanceRate: 0.5,
    difficulty: "hard",
  },
  {
    id: "28",
    title: "Serialize and Deserialize Binary Tree",
    status: null,
    tags: [
      "String",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Design",
      "Binary Tree",
    ],
    acceptanceRate: 0.53,
    difficulty: "hard",
  },
  {
    id: "29",
    title: "Trapping Rain Water",
    status: "todo",
    tags: [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack",
      "Monotonic Stack",
    ],
    acceptanceRate: 0.57,
    difficulty: "easy",
  },
  {
    id: "30",
    title: "Median of Two Sorted Arrays",
    status: "done",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptanceRate: 0.35,
    difficulty: "medium",
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: challenges,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 9, // Set this to the number of rows you want to display
      },
    },
  });

  return (
    <Card className="flex flex-col min-h-[90vh]">
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
        <CardDescription>All your coding challenges</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="w-full ">
          <DataTableToolbar table={table} />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div> */}
          <DataTablePagination table={table} className="mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}
