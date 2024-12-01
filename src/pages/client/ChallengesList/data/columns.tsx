import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CircleCheckBig, RotateCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "../components/RowActions";
import { ChallengeWithUserStatus } from "../ChallengesList";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const columns = (
  onMarkedTodo: (challengeId: number) => void
): ColumnDef<ChallengeWithUserStatus>[] => [
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
      const challenge = row.original;
      const tags = challenge.tags;
      const displayTags = tags.slice(0, 3);
      const remainingTags = tags.length > 3 ? tags.length - 3 : 0;

      return (
        <div>
          <div className="font-medium">
            <Link
              to={`/challenges/${challenge.slug}`}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {challenge.id}. {challenge.name}
            </Link>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {displayTags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag.name}
              </Badge>
            ))}
            {remainingTags > 0 && (
              <Badge variant="secondary">+{remainingTags}</Badge>
            )}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "user_challenge_results",
    header: "Status",
    filterFn: (row, _, value) => {
      const status =
        row.original.user_challenge_results[0]?.status || "not-done";
      return value.includes(status);
    },
    cell: ({ row }) => {
      const status =
        row.original.user_challenge_results[0]?.status || "not-done";
      return (
        <div className="flex justify-center">
          {status === "done" && (
            <HoverCard>
              <HoverCardTrigger>
                <CircleCheckBig className="h-4 w-4 text-green-500" />
              </HoverCardTrigger>
              <HoverCardContent className="w-20">
                <p>Done</p>
              </HoverCardContent>
            </HoverCard>
          )}
          {(status === "failed" || status === "pending") && (
            <HoverCard>
              <HoverCardTrigger>
                <RotateCw className="h-4 w-4 text-pink-400" />
              </HoverCardTrigger>
              <HoverCardContent className="w-22">
                <p>Attempted</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      );
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
      const acceptedResults = row.original.accepted_results;
      const totalAttempts = row.original.total_attempts;
      const rate =
        totalAttempts > 0 ? (acceptedResults / totalAttempts) * 100 : 0;
      return <div className="text-center">{rate.toFixed(1)}%</div>;
    },
    sortingFn: (rowA, rowB) => {
      const rateA =
        rowA.original.total_attempts > 0
          ? (rowA.original.accepted_results / rowA.original.total_attempts) *
            100
          : 0;
      const rateB =
        rowB.original.total_attempts > 0
          ? (rowB.original.accepted_results / rowB.original.total_attempts) *
            100
          : 0;
      return rateA - rateB;
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
            difficulty === "EASY"
              ? "text-green-500"
              : difficulty === "MEDIUM"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const difficultyOrder = { EASY: 0, MEDIUM: 1, HARD: 2 };
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
    cell: ({ row }) => (
      <DataTableRowActions
        challenge={row.original}
        onMarkedTodo={onMarkedTodo}
      />
    ),
  },
];
