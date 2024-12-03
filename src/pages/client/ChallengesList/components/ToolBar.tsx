import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "../../../../components/data-table/FacetedFilter";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { SquareFunction, SquarePlus, SquareSigma } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses = [
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "not-done",
    label: "Not Done",
    icon: CrossCircledIcon,
  },
];

const difficulties = [
  {
    label: "Easy",
    value: "EASY",
    icon: SquarePlus,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: SquareFunction,
  },
  {
    label: "Hard",
    value: "HARD",
    icon: SquareSigma,
  },
];

const tagData = [
  "Array",
  "String",
  "Dynamic Programming",
  "Graph",
  "Tree",
  "Sorting",
  "Searching",
  "Greedy",
  "Backtracking",
  "Bit Manipulation",
  "Math",
  "Recursion",
  "Linked List",
  "Stack",
  "Queue",
  "Heap",
  "Hash Table",
  "Binary Search",
  "Two Pointers",
  "Sliding Window",
  "Depth-First Search",
  "Breadth-First Search",
  "Divide and Conquer",
  "Union Find",
  "Trie",
  "Segment Tree",
  "Binary Indexed Tree",
  "Topological Sort",
  "Shortest Path",
  "Minimum Spanning Tree",
  "Knapsack",
  "Floyd-Warshall",
  "Dijkstra",
  "Bellman-Ford",
  "Kruskal",
  "Prim",
  "Network Flow",
  "Geometry",
  "Game Theory",
  "Combinatorics",
  "Monotonic Stack",
  "String Matching",
];

const tagOptions = tagData.map((tag) => ({
  value: `${tag}`,
  label: tag,
}));

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("user_challenge_results") && (
          <DataTableFacetedFilter
            column={table.getColumn("user_challenge_results")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("difficulty") && (
          <DataTableFacetedFilter
            column={table.getColumn("difficulty")}
            title="Difficulty"
            options={difficulties}
          />
        )}
        {table.getColumn("tags") && (
          <DataTableFacetedFilter
            column={table.getColumn("tags")}
            title="Tags"
            options={tagOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
