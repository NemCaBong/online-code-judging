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
import { Link } from "react-router-dom";

interface Exercise {
  id: string;
  slug: string;
  name: string;
  score: number;
}

const exercises: Exercise[] = [
  { id: "1", slug: "assignment-1", name: "Assignment 1", score: 8.5 },
  { id: "2", slug: "project-report", name: "Project Report", score: 9.2 },
  { id: "3", slug: "presentation", name: "Presentation", score: 7.8 },
  { id: "4", slug: "code-sample", name: "Code Sample", score: 9.5 },
  { id: "5", slug: "data-analysis", name: "Data Analysis", score: 8.8 },
  { id: "5", slug: "data-engineering", name: "Data Engineering", score: 5 },
];

const getScoreBadge = (score: number) => {
  if (score >= 8) return <Badge>{score} / 10</Badge>;
  if (score >= 6) return <Badge variant="secondary">{score} / 10</Badge>;
  return <Badge variant="destructive">{score} / 10</Badge>;
};

export default function GradedExercises() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Graded Exercises</CardTitle>
        <CardDescription>
          Click on to see the details of the exercise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px] lg:h-[520px]">
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercises.map((exercise, index) => (
                  <TableRow
                    key={exercise.id}
                    className={index % 2 === 1 ? "bg-accent" : " "}
                  >
                    <TableCell>
                      <Link
                        to={`/exercise/${exercise.slug}`}
                        className="text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {exercise.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      {getScoreBadge(exercise.score)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
