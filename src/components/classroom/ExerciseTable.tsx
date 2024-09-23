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
  {
    id: "4",
    name: "Collections Framework",
    dueDate: "2024-04-05",
    status: "Not Started",
  },
  {
    id: "5",
    name: "Generics",
    dueDate: "2024-04-10",
    status: "In Progress",
  },
  {
    id: "6",
    name: "Lambda Expressions",
    dueDate: "2024-04-15",
    status: "Completed",
  },
  {
    id: "7",
    name: "Stream API",
    dueDate: "2024-04-20",
    status: "Not Started",
  },
  {
    id: "8",
    name: "File I/O",
    dueDate: "2024-04-25",
    status: "In Progress",
  },
  {
    id: "9",
    name: "Concurrency",
    dueDate: "2024-04-30",
    status: "Completed",
  },
  {
    id: "10",
    name: "Networking",
    dueDate: "2024-05-05",
    status: "Not Started",
  },
  {
    id: "11",
    name: "JDBC",
    dueDate: "2024-05-10",
    status: "In Progress",
  },
  {
    id: "12",
    name: "JavaFX",
    dueDate: "2024-05-15",
    status: "Completed",
  },
  {
    id: "13",
    name: "Spring Framework",
    dueDate: "2024-05-20",
    status: "Not Started",
  },
  {
    id: "14",
    name: "Hibernate",
    dueDate: "2024-05-25",
    status: "In Progress",
  },
  {
    id: "15",
    name: "Microservices",
    dueDate: "2024-05-30",
    status: "Completed",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Not Started":
      return <Badge variant="secondary">Not Started</Badge>;
    case "In Progress":
      return <Badge variant="default">In Progress</Badge>;
    case "Completed":
      return <Badge variant="destructive">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

function ExercisesTable() {
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
                {exercises.map((exercise, index) => (
                  <TableRow
                    key={exercise.id}
                    className={index % 2 === 1 ? "bg-accent" : " "}
                  >
                    <TableCell className="font-medium">
                      {exercise.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(exercise.dueDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(exercise.status)}</TableCell>
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

export default ExercisesTable;
