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
import { UserExerciseResult } from "@/pages/client/ClassroomDetail/ClassroomDetail";

const getScoreBadge = (score: number) => {
  if (score >= 8) return <Badge>{score} / 10</Badge>;
  if (score >= 6) return <Badge variant="secondary">{score} / 10</Badge>;
  return <Badge variant="destructive">{score} / 10</Badge>;
};

export default function GradedExercises({
  gradedUserExerciseRes,
}: {
  gradedUserExerciseRes: UserExerciseResult[];
}) {
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
                {gradedUserExerciseRes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      No graded exercises found.
                    </TableCell>
                  </TableRow>
                ) : (
                  gradedUserExerciseRes.map((userExRes) => (
                    <TableRow key={userExRes.id}>
                      <TableCell>
                        <Link
                          to={`/exercise/${userExRes.exercise.slug}`}
                          className="text-foreground hover:text-primary transition-colors duration-200"
                        >
                          {userExRes.exercise.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        {userExRes.score &&
                          getScoreBadge(parseFloat(userExRes.score))}
                        {!userExRes.score && (
                          <Badge variant="secondary">unknown</Badge>
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
