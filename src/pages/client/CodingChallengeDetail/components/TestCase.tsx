import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, SquareCheckBig } from "lucide-react";
import { useEffect, useState } from "react";

interface Submission {
  stderr: string | null;
  stdout: string | null;
  time: string;
  memory: number;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

interface TestCaseProps {
  testCases: {
    id: number;
    input: string;
    expected_output: string;
  }[];
  submissions?: Submission[];
  submission?: Submission; // Add a prop for results
  errorTestCase?: {
    id: number;
    input: string;
    expected_output: string;
    challenge_id: number;
    is_sampled: boolean;
  }; // Add a prop for error test case
}

export default function TestCase({
  testCases,
  submissions,
  errorTestCase,
  submission,
}: TestCaseProps) {
  const [activeTab, setActiveTab] = useState("test-case");

  useEffect(() => {
    if (
      (submissions && submissions.length > 0) ||
      submission ||
      errorTestCase
    ) {
      setActiveTab("result");
    }
  }, [submissions, submission, errorTestCase]);

  return (
    <Card className="h-full border-none">
      <Tabs
        defaultValue="test-case"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
        }}
      >
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
            {/* {isRunTestResult && (
              <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
            )} */}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="test-case" className="h-[85%]">
          {testCases.length <= 0 ? (
            <CardContent className="pt-4">
              No sampled test cases available
            </CardContent>
          ) : (
            <ScrollArea className="h-[24vh]">
              <Card className="h-full border-none pt-3">
                <CardContent className="h-full">
                  <Tabs
                    defaultValue={`tab-${testCases[0]?.id}`}
                    className="w-full h-full"
                  >
                    <ScrollArea className="w-full">
                      <TabsList className="inline-flex w-max">
                        {testCases.map((_, idx) => (
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
          )}
        </TabsContent>
        <TabsContent value="result" className="h-[85%]">
          <ScrollArea className="h-[24vh]">
            <Card className="h-full border-none pt-3">
              <CardContent className="h-full">
                {submissions ? (
                  <Tabs defaultValue={`result-tab-1`} className="w-full h-full">
                    <TabsList className="inline-flex w-max">
                      {submissions.map((submission, idx) => (
                        <TabsTrigger key={idx} value={`result-tab-${idx + 1}`}>
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              submission.status.id === 3
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          Case {idx + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {submissions.map((sub, idx) => (
                      <TabsContent key={idx} value={`result-tab-${idx + 1}`}>
                        <Card className="border-none dark:bg-codeEditorDark mt-4">
                          <CardContent className="pt-3">
                            <p>
                              <strong>Status: </strong>
                              <span
                                className={
                                  sub.status.id === 3
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {sub.status.description}
                              </span>
                            </p>
                            <p>
                              <strong>Time: </strong>{" "}
                              {(parseFloat(sub.time) * 1000).toFixed(2)} ms
                            </p>
                            <p>
                              <strong>Memory: </strong>{" "}
                              {(sub.memory / 1024).toFixed(2)} MB
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border-none dark:bg-codeEditorDark mt-4">
                          <CardContent className="pt-3">
                            <p>
                              <strong>Input:</strong>
                            </p>
                            <pre>
                              <code>{testCases[idx]?.input}</code>
                            </pre>
                          </CardContent>
                        </Card>
                        <Card className="border-none dark:bg-codeEditorDark mt-4">
                          <CardContent className="pt-3">
                            <p>
                              <strong>Expected Output:</strong>
                            </p>
                            <pre>
                              <code>{testCases[idx]?.expected_output}</code>
                            </pre>
                          </CardContent>
                        </Card>
                        <Card className="border-none dark:bg-codeEditorDark mt-4">
                          <CardContent className="pt-3">
                            <p>
                              <strong>Output:</strong>
                            </p>
                            <pre>
                              <code>{sub.stdout}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : errorTestCase && submission ? (
                  <div>
                    <Card className="border-none dark:bg-codeEditorDark mt-4">
                      <CardContent className="pt-3">
                        <p>
                          <strong>Status: </strong>
                          <span
                            className={
                              submission?.status.id === 3
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {submission.status.description}
                          </span>
                        </p>
                        <p>
                          <strong>Time: </strong>{" "}
                          {(parseFloat(submission.time || "0") * 1000).toFixed(
                            2
                          )}{" "}
                          ms
                        </p>
                        <p>
                          <strong>Memory: </strong>{" "}
                          {(submission.memory / 1024).toFixed(2)} MB
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-none dark:bg-codeEditorDark mt-4">
                      <CardContent className="pt-3">
                        <p>
                          <strong>Input:</strong>
                        </p>
                        <pre>
                          <code>{errorTestCase.input}</code>
                        </pre>
                      </CardContent>
                    </Card>
                    <Card className="border-none dark:bg-codeEditorDark mt-4">
                      <CardContent className="pt-3">
                        <p>
                          <strong>Expected Output:</strong>
                        </p>
                        <pre>
                          <code>{errorTestCase.expected_output}</code>
                        </pre>
                      </CardContent>
                    </Card>
                    {submission.stdout && (
                      <Card className="border-none dark:bg-codeEditorDark mt-4">
                        <CardContent className="pt-3">
                          <p>
                            <strong>Output:</strong>
                          </p>
                          <pre>
                            <code>{submission.stdout}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                    {submission.stderr && (
                      <Card className="border-none dark:bg-codeEditorDark mt-4">
                        <CardContent className="pt-3">
                          <p>
                            <strong>Error:</strong>
                          </p>
                          <pre>
                            <code className="text-sm">{submission.stderr}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                    {submission.compile_output && (
                      <Card className="border-none dark:bg-codeEditorDark mt-4">
                        <CardContent className="pt-3">
                          <p>
                            <strong>Compile Error:</strong>
                          </p>
                          <pre>
                            <code className="text-sm">
                              {submission.compile_output}
                            </code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <p>No results available.</p>
                )}
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
