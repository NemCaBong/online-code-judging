import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ClassInfo {
  id: number;
  name: string;
  created_at: string;
  slug: string;
  total_students: number;
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  is_done: boolean;
}

interface ClassesListBoardProps {
  classes: ClassInfo[];
}

export function ClassesListBoard({ classes }: ClassesListBoardProps) {
  return (
    <Card className="mt-2">
      <CardHeader className="px-7">
        <CardTitle>Classes</CardTitle>
        <CardDescription>All your coding classes</CardDescription>
      </CardHeader>
      <ScrollArea className="h-[55dvh]">
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead className="hidden sm:table-cell">Teacher</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Students
                </TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classInfo, index) => (
                <TableRow
                  className={index % 2 === 0 ? "bg-muted/40" : ""}
                  key={classInfo.id}
                >
                  <TableCell>
                    <div className="font-medium">{classInfo.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {classInfo.slug}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {classInfo.teacher.first_name} {classInfo.teacher.last_name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {classInfo.is_done ? (
                      <Badge className="text-xs" variant="secondary">
                        Done
                      </Badge>
                    ) : (
                      <Badge className="text-xs">Ongoing</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {classInfo.total_students}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(new Date(classInfo.created_at), "PP")}
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
