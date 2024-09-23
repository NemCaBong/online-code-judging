import React from "react";
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
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Exercise {
  id: string;
  name: string;
  dueDate: string;
  status: string;
}

const exercises: Exercise[] = [
  {
    id: "1",
    name: "Java Basics",
    dueDate: "2024-03-20",
    status: "Not Started",
  },
  {
    id: "2",
    name: "OOP Concepts",
    dueDate: "2024-03-25",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Exception Handling",
    dueDate: "2024-03-30",
    status: "Completed",
  },
];

export function ExercisesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Exercises</CardTitle>
        <CardDescription>All exercises for this class</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px] lg:h-[520px]">
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Due Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercises.map((exercise, index) => (
                  <TableRow
                    key={exercise.id}
                    className={index % 2 === 1 ? "bg-accent" : " "}
                  >
                    <TableCell className="font-medium">
                      {exercise.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {exercise.dueDate}
                    </TableCell>
                    <TableCell>{exercise.status}</TableCell>
                    <TableCell>
                      <Button asChild size="sm" className="ml-auto gap-1">
                        <Link to={`/exercises/${exercise.id}`}>
                          View
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
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
