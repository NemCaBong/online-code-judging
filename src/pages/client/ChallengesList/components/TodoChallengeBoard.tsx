import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Todo } from "../ChallengesList";
import { Link } from "react-router-dom";

interface TodoChallengeBoardProps {
  title: string;
  description: string;
  todos: Todo[];
}

export default function TodoChallengeBoard({
  title,
  description,
  todos,
}: TodoChallengeBoardProps) {
  return (
    <Card className="xl:col-span-2 max-w-2xl min-w-72">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <ScrollArea className="h-[50vh]">
        <CardContent>
          {todos.length <= 0 ? (
            "Don't have any to do challenges"
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Difficulty</TableHead>
                  <TableHead className="text-right">Mark Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <div className="font-medium">
                        <Link to={`/challenges/${todo.slug}`}>{todo.name}</Link>
                      </div>
                      <div className="text-sm text-muted-foreground md:inline">
                        {todo.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className="text-xs"
                        variant={
                          todo.difficulty === "MEDIUM"
                            ? "default"
                            : todo.difficulty === "HARD"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {todo.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {format(
                        new Date(todo.user_challenge_results[0].created_at),
                        "PP"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
