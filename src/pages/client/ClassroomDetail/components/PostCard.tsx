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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import MDEditor from "@uiw/react-md-editor";

type Post = {
  content: string;
};

export function PostCard({
  className,
  post,
}: {
  className?: string;
  post?: Post;
}) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <CardTitle className="leading-1">Phạm Thảo</CardTitle>
                  <Badge
                    variant="secondary"
                    className="ml-3 leading-1.5 text-xs font-semibold"
                  >
                    Teacher
                  </Badge>
                </div>
                <p className="leading-none text-sm font-normal hidden md:inline">
                  25/07/2024
                </p>
              </div>
              <CardDescription>thaopham@neu.edu.vn</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="ml-14">
            <MDEditor.Markdown source={post?.content ?? "# Hello world!"} />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
