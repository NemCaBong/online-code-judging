import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface OutputCardProps {
  isLoading?: boolean;
  output?: string;
  isError?: boolean;
  time?: string;
  memory?: number;
  status?: {
    id: number;
    description: string;
  };
}

export default function OutputCard({
  isLoading,
  output,
  isError,
  time,
  memory,
  status,
}: OutputCardProps) {
  return (
    <Card className="h-full border-none flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Output</CardTitle>
        {status && (
          <Badge variant={status.id === 3 ? "default" : "destructive"}>
            {status.description}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-4 pb-0">
        <ScrollArea className="h-[22vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Running code...</span>
            </div>
          ) : (
            <>
              {output ? (
                <Card className="dark:bg-codeEditorDark p-2 mb-4">
                  <pre className="whitespace-pre-wrap break-words">
                    <code
                      className={`inline-block min-w-0 w-full text-sm ${
                        isError ? "text-red-500" : ""
                      }`}
                    >
                      {output}
                    </code>
                  </pre>
                </Card>
              ) : (
                <Card className="dark:bg-codeEditorDark p-2 mb-4 h-[20vh] flex items-center justify-center">
                  <span className="text-sm text-muted-foreground text-white">
                    No output available
                  </span>
                </Card>
              )}
              <div className="flex mt-4 space-x-4">
                {time && (
                  <Card className="dark:bg-codeEditorDark p-2 flex-1">
                    <span className="text-sm text-white">
                      Execution time: {parseFloat(time) * 1000} ms
                    </span>
                  </Card>
                )}
                {memory && (
                  <Card className="dark:bg-codeEditorDark p-2 flex-1">
                    <span className="text-sm text-white">
                      Memory used: {Math.round(memory / 1024)} MB
                    </span>
                  </Card>
                )}
              </div>
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
