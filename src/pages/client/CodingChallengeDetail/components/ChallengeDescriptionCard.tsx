import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DescriptionTab from "@/components/challenge-exercise/DescriptionTab";
import { SubmissionResult, UserChallengeRes } from "../CodingChallengeDetail";
import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { Clock, Cpu, X } from "lucide-react";
import CodeMirrorEditor from "./CodeMirrorEditor";
import { LanguageIdToTypeMap } from "@/common/constants/supported-language";
import { cn } from "@/lib/utils";

interface ChallengeDescriptionCardProps {
  title: string;
  description: string;
  markdownContent: string;
  accordionItems?: { trigger: string; content: string }[];
  submissionData: SubmissionResult | null;
  onChooseHistory: (history: UserChallengeRes | null) => void;
  historySub: UserChallengeRes | null;
}

export default function ChallengeDescriptionCard({
  title,
  description,
  markdownContent,
  accordionItems,
  submissionData,
  onChooseHistory,
  historySub,
}: ChallengeDescriptionCardProps) {
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (submissionData) {
      setActiveTab("submission");
    }
  }, [submissionData]);

  useEffect(() => {
    if (historySub) {
      setActiveTab("history-detail");
    }
  }, [historySub]);

  return (
    <Card className="grid w-full max-w-7xl border-none h-[91vh]">
      <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
        <Tabs
          defaultValue="description"
          value={activeTab}
          className="w-full h-full"
          onValueChange={(value) => {
            setActiveTab(value);
          }}
        >
          <TabsList className="m-4 mb-0">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="submission">
              Submission
              {/* {submissionData && showSubmissionIndicator && (
                <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
              )} */}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            {historySub && (
              <TabsTrigger value="history-detail">
                {historySub.message}
                <button
                  className="ml-2 hover:bg-muted/70"
                  onClick={() => {
                    onChooseHistory(null);
                    setActiveTab("history");
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="description">
            <DescriptionTab
              title={title}
              description={description}
              markdownContent={markdownContent}
              accordionItems={accordionItems}
            />
          </TabsContent>
          <TabsContent value="submission">
            <Card className="border-none pt-3">
              <CardContent>
                {submissionData ? (
                  <div>
                    {!submissionData.errorTestCase && (
                      <p className="text-2xl">
                        <strong>Message: </strong>
                        <span className="text-green-500">
                          {submissionData.message}
                        </span>
                      </p>
                    )}
                    {submissionData.statusCode === 200 ? (
                      <div className="flex space-x-4">
                        <Card className="flex-1 border-none dark:bg-codeEditorDark mt-4 pt-4">
                          <CardContent>
                            <p>
                              <strong>Average Time: </strong>
                              {submissionData.averageTime
                                ? (
                                    parseFloat(
                                      String(submissionData.averageTime)
                                    ) * 1000
                                  ).toFixed(2)
                                : "0.00"}{" "}
                              ms
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="flex-1 border-none dark:bg-codeEditorDark mt-4 pt-4">
                          <CardContent>
                            <p>
                              <strong>Average Memory: </strong>
                              {submissionData.averageMemory
                                ? (submissionData.averageMemory / 1024).toFixed(
                                    2
                                  )
                                : "0.00"}
                              MB
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl">
                          <strong>Error: </strong>
                          <span className="text-red-500">
                            {submissionData.error}
                          </span>
                        </p>
                        {submissionData.submission && (
                          <>
                            {submissionData.submission.stdout && (
                              <Card className="border-none dark:bg-codeEditorDark mt-4">
                                <CardContent className="pt-3">
                                  <p>
                                    <strong>Your Output:</strong>
                                  </p>
                                  <pre>
                                    <code>
                                      {submissionData.submission.stdout}
                                    </code>
                                  </pre>
                                </CardContent>
                              </Card>
                            )}
                            {submissionData.submission.stderr && (
                              <Card className="border-none dark:bg-codeEditorDark mt-4">
                                <CardContent className="pt-3">
                                  <p>
                                    <strong>Error:</strong>
                                  </p>
                                  <ScrollArea className="h-[300px] w-full rounded-md">
                                    <pre className="whitespace-pre-wrap break-words">
                                      <code className="text-sm">
                                        {submissionData.submission.stderr}
                                      </code>
                                    </pre>
                                  </ScrollArea>
                                </CardContent>
                              </Card>
                            )}
                            {submissionData.submission.compile_output && (
                              <Card className="border-none dark:bg-codeEditorDark mt-4">
                                <CardContent className="pt-3">
                                  <p>
                                    <strong>Compile Error:</strong>
                                  </p>
                                  <ScrollArea className="h-[300px] w-full rounded-md">
                                    <pre className="whitespace-pre-wrap break-words">
                                      <code className="text-sm">
                                        {
                                          submissionData.submission
                                            .compile_output
                                        }
                                      </code>
                                    </pre>
                                  </ScrollArea>
                                </CardContent>
                              </Card>
                            )}
                            <Card className="border-none dark:bg-codeEditorDark mt-4">
                              <CardContent className="pt-3">
                                <p>
                                  <strong>Time: </strong>
                                  {submissionData.submission.time
                                    ? (
                                        parseFloat(
                                          String(submissionData.submission.time)
                                        ) * 1000
                                      ).toFixed(2) + " ms"
                                    : "N/A"}
                                </p>
                                <p>
                                  <strong>Memory: </strong>
                                  {submissionData.submission.memory
                                    ? (
                                        submissionData.submission.memory / 1024
                                      ).toFixed(2) + " MB"
                                    : "N/A"}
                                </p>
                              </CardContent>
                            </Card>
                          </>
                        )}
                        {submissionData.errorTestCase && (
                          <div>
                            <Card className="border-none dark:bg-codeEditorDark mt-4">
                              <CardContent className="pt-3">
                                <p>
                                  <strong>Input:</strong>
                                </p>
                                <pre>
                                  <code>
                                    {submissionData.errorTestCase.input}
                                  </code>
                                </pre>
                              </CardContent>
                            </Card>
                            <Card className="border-none dark:bg-codeEditorDark mt-4">
                              <CardContent className="pt-3">
                                <p>
                                  <strong>Expected Output:</strong>
                                </p>
                                <pre>
                                  <code>
                                    {
                                      submissionData.errorTestCase
                                        .expected_output
                                    }
                                  </code>
                                </pre>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <p>You not submit yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <HistoryCard onChooseHistory={onChooseHistory} />
          </TabsContent>
          {historySub && (
            <TabsContent value="history-detail">
              <Card className="border-none pt-3">
                <CardHeader className="pt-2">
                  <CardTitle
                    className={cn(
                      "text-xl",
                      historySub.status_id === 3
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {historySub.message}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {historySub.stderr && (
                    <>
                      <h3 className="font-semibold mb-2 block">Error</h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4 mb-4">
                        <CardContent>
                          <div className="flex items-center">
                            <pre className="whitespace-pre-wrap break-words">
                              <code className="text-sm">
                                {historySub.stderr}
                              </code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {historySub.compile_output && (
                    <>
                      <h3 className="font-semibold mb-2 block">
                        Compile Output
                      </h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4 mb-4">
                        <CardContent>
                          <div className="flex items-center">
                            <pre className="whitespace-pre-wrap break-words">
                              <code className="text-sm">
                                {historySub.compile_output}
                              </code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {historySub.stdout && (
                    <>
                      <h3 className="font-semibold mb-2 block">Output</h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4 mb-4">
                        <CardContent>
                          <div className="flex items-center">
                            <pre className="whitespace-pre-wrap break-words">
                              <code className="text-sm">
                                {historySub.stdout}
                              </code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {historySub.error_testcase && (
                    <>
                      <h3 className="font-semibold mb-2 block">Input</h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4 mb-4">
                        <CardContent className="">
                          <pre className="whitespace-pre-wrap break-words">
                            <code className="text-sm">
                              {historySub.error_testcase.input}
                            </code>
                          </pre>
                        </CardContent>
                      </Card>
                      <h3 className="font-semibold mb-2 block">
                        Expected Output
                      </h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4 mb-4">
                        <CardContent>
                          <pre className="whitespace-pre-wrap break-words">
                            <code className="text-sm">
                              {historySub.error_testcase.expected_output}
                            </code>
                          </pre>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  <div className="flex space-x-4 mb-4">
                    {/* First Half */}
                    <div className="w-1/2">
                      <h3 className="font-semibold mb-2 block">Time</h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4">
                        <CardContent>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            <p className="text-sm font-semibold">
                              {historySub.time
                                ? `${(
                                    parseFloat(historySub.time) * 1000
                                  ).toFixed(2)} ms`
                                : "N/A"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Second Half */}
                    <div className="w-1/2">
                      <h3 className="font-semibold mb-2 block">Memory</h3>
                      <Card className="border-none dark:bg-codeEditorDark pt-4">
                        <CardContent>
                          <div className="flex items-center">
                            <Cpu className="h-5 w-5 mr-2" />
                            <p className="text-sm font-semibold">
                              {historySub.memory
                                ? `${(historySub.memory / 1024).toFixed(2)} MB`
                                : "N/A"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-2 block">History Code</h3>
                  <CodeMirrorEditor
                    value={historySub.code}
                    editable={false}
                    language={LanguageIdToTypeMap[historySub.language_id]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </ScrollArea>
    </Card>
  );
}
