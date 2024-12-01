import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Exercise } from "@/pages/client/Dashboard/Dashboard";
import { Link } from "react-router-dom";

function ExercisesTable({
  assignedExercises,
  classSlug,
}: {
  assignedExercises: Exercise[];
  classSlug: string;
}) {
  return (
    <Card className="overflow-auto">
      <CardHeader>
        <CardTitle>Assigned Exercises</CardTitle>
        <CardDescription>All exercises for this class</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px] lg:h-[520px]">
          <div className="p-2">
            <Table className="overflow-y-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Due Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-auto">
                {assignedExercises.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <p className="text-xl font-semibold text-gray-500">
                        No exercises available at the moment
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Check back later for new assignments
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  assignedExercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/classes/${classSlug}/exercises/${exercise.id}`}
                          className="text-foreground hover:text-primary transition-colors duration-200"
                        >
                          {exercise.name}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(exercise.due_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {exercise.user_exercise_results[0] &&
                          exercise.user_exercise_results[0].status && (
                            <Badge
                              variant={
                                exercise.user_exercise_results[0].status ===
                                "done"
                                  ? "secondary"
                                  : exercise.user_exercise_results[0].status ===
                                    "overdue"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {exercise.user_exercise_results[0].status ||
                                "not-done"}
                            </Badge>
                          )}
                        {!exercise.user_exercise_results[0] && (
                          <Badge variant="outline">not-done</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ExercisesTable;
