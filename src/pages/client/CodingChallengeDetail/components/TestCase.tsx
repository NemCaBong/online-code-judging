import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, SquareCheckBig } from "lucide-react";

export default function TestCase() {
  return (
    <Card className="h-full border-none">
      <Tabs defaultValue="test-case">
        <TabsList
          className="w-full justify-start"
          style={{
            borderRadius: "0.75rem 0.75rem 0 0",
          }}
        >
          <TabsTrigger value="test-case">
            <SquareCheckBig className="text-sm pr-2" />
            Test Cases
          </TabsTrigger>
          <TabsTrigger value="result">
            <Terminal className="text-sm pr-2" />
            Result
          </TabsTrigger>
        </TabsList>
        <TabsContent value="test-case" className="h-[85%]">
          <ScrollArea className="h-[27vh]">
            <Card className="h-full border-none pt-3">
              <CardContent className="h-full">
                <Tabs defaultValue="tab-0" className="w-full h-full">
                  <ScrollArea className="w-full">
                    <TabsList className="inline-flex w-max">
                      {[...Array(5)].map((_, index) => (
                        <TabsTrigger key={index} value={`tab-${index}`}>
                          Case {index + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>
                  {[...Array(5)].map((_, index) => (
                    <TabsContent
                      className="h-[85%]"
                      key={index}
                      value={`tab-${index}`}
                    >
                      <Card className="border-none dark:bg-codeEditorDark">
                        <CardHeader>Tab ${index}</CardHeader>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
