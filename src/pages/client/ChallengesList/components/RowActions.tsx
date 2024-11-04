import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChallengeWithUserStatus } from "../ChallengesList";
import { ArrowUpRight, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";

export function DataTableRowActions({
  challenge,
  onMarkedTodo,
}: {
  challenge: ChallengeWithUserStatus;
  onMarkedTodo: (challengeId: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onMarkedTodo(challenge.id)}>
          Marked As Todo <ListTodo className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/challenges/${challenge.slug}`} className="flex w-full">
            Go to
            <ArrowUpRight className="ml-auto h-4 w-4" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
