import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, SquareCheckBig } from "lucide-react";

interface TestCaseProps {
  testCases: {
    id: number;
    input: string;
    expected_output: string;
  }[];
}

export default function TestCase({ testCases }: TestCaseProps) {
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
          <ScrollArea className="h-[24vh]">
            <Card className="h-full border-none pt-3">
              <CardContent className="h-full">
                <Tabs
                  defaultValue={`tab-${testCases[0]?.id}`}
                  className="w-full h-full"
                >
                  <ScrollArea className="w-full">
                    <TabsList className="inline-flex w-max">
                      {testCases.map((testCase, idx) => (
                        <TabsTrigger key={idx + 1} value={`tab-${idx + 1}`}>
                          Case {idx + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>
                  {testCases.map((testCase, idx) => (
                    <TabsContent
                      className="h-[85%]"
                      key={idx + 1}
                      value={`tab-${idx + 1}`}
                    >
                      <Card className="border-none dark:bg-codeEditorDark mt-4">
                        <CardContent className="pt-3">
                          <p>
                            <strong>Input:</strong>
                          </p>
                          <pre>
                            <code>{testCase.input}</code>
                          </pre>
                        </CardContent>
                      </Card>
                      <Card className="border-none dark:bg-codeEditorDark mt-4">
                        <CardContent className="pt-3">
                          <p>
                            <strong>Expected Output:</strong>
                          </p>
                          <pre>
                            <code>{testCase.expected_output}</code>
                          </pre>
                        </CardContent>
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
