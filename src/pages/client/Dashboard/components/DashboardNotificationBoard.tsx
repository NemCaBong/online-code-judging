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

interface Exercise {
  id: number;
  slug: string;
  created_at: string;
  name: string;
  classExercises: {
    due_at: string;
    class: {
      id: number;
      name: string;
    };
  }[];
  userExerciseResult: {
    status: string;
  }[];
}

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
  return (
    <Card className="xl:col-span-2 max-w-2xl min-w-72">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/tasks">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
                    <div className="font-medium">{exercise.name}</div>
                    <div className="text-sm text-muted-foreground md:inline">
                      {exercise.classExercises[0].class.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className="text-xs"
                      variant={
                        exercise.userExerciseResult[0].status === "done"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {exercise.userExerciseResult[0].status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {format(new Date(exercise.classExercises[0].due_at), "PP")}
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
