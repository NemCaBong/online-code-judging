import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Exercise } from "../Dashboard";

interface DashboardNotificationBoardProps {
  title: string;
  description: string;
  exercises: Exercise[];
}

export default function DashboardNotificationBoard({
  title,
  description,
  exercises,
}: DashboardNotificationBoardProps) {
  const displayViewAll = false;
  return (
    <Card className="xl:col-span-2 max-w-2xl min-w-72 overflow-hidden">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1" disabled={true}>
          {displayViewAll ? (
            <Link to="/tasks">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            "View All"
          )}
        </Button>
      </CardHeader>
      <ScrollArea className="h-[50vh]">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell>
                    <div className="font-medium">
                      <Link
                        to={`/classes/${exercise.class.slug}/exercises/${exercise.id}`}
                        className="text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {exercise.name}
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground md:inline">
                      {exercise.class.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {exercise.user_exercise_results.length === 0 && (
                      <Badge className="text-xs" variant="destructive">
                        not-done
                      </Badge>
                    )}
                    {exercise.user_exercise_results[0]?.status && (
                      <Badge
                        className="text-xs"
                        variant={
                          exercise.user_exercise_results[0].status === "done"
                            ? "secondary"
                            : exercise.user_exercise_results[0].status ===
                              "graded"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {exercise.user_exercise_results[0].status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(new Date(exercise.due_at), "dd-MM-yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
