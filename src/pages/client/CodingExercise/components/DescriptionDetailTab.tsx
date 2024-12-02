import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DescriptionDetailTab({
  title,
  markdownContent,
  userStatus,
  submittedAt,
}: {
  title: string;
  markdownContent: string;
  userStatus: string;
  submittedAt?: string;
}) {
  return (
    <ScrollArea className="w-[81vh]">
      <Card className="border-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {title}
              <Badge
                className="ml-6"
                variant={
                  userStatus === "not-done"
                    ? "destructive"
                    : userStatus === "graded"
                    ? "default"
                    : "secondary"
                }
              >
                {userStatus}
              </Badge>
            </CardTitle>
            {submittedAt && (
              <span className="text-sm text-gray-500">
                Submitted At: {format(new Date(submittedAt), "PPpp")}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <MDEditor.Markdown
            source={markdownContent}
            className="text-sm"
            style={{
              overflow: "auto",
              wordWrap: "break-word",
            }}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </ScrollArea>
  );
}
