import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
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
}

interface DisplayCardProps {
  className?: string;
  classInfo: ClassInfo;
}

export function DisplayCard({ className, classInfo }: DisplayCardProps) {
  const formattedDate = format(new Date(classInfo.created_at), "PP");

  return (
    <Card
      className={`${className} flex flex-col h-full`}
      x-chunk="dashboard-05-chunk-1"
    >
      <div className="flex-grow">
        <CardHeader className="pb-0 flex justify-between">
          <CardTitle className="text-xl">{classInfo.name}</CardTitle>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        </CardHeader>
        <CardContent></CardContent>
      </div>
      <CardFooter className="mt-auto">
        <div className="w-full">
          <div className="text-sm text-muted-foreground">
            Teacher: {classInfo.teacher.first_name}{" "}
            {classInfo.teacher.last_name}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
