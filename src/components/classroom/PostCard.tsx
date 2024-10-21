import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";

export function PostCard({
  className,
  teacher,
  post,
}: {
  className?: string;
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  post: {
    id: number;
    content: string;
    created_at: string;
  };
}) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>
                {`${teacher.first_name} ${teacher.last_name}`
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <CardTitle className="leading-1">
                    {teacher.first_name + " " + teacher.last_name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="ml-3 leading-1.5 text-xs font-semibold"
                  >
                    Teacher
                  </Badge>
                </div>
                <p className="leading-none text-sm font-normal hidden md:inline">
                  {format(new Date(post.created_at), "PPpp")}
                </p>
              </div>
              <CardDescription>{teacher.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="ml-14">
            <MDEditor.Markdown source={post.content ?? "# Hello world!"} />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
