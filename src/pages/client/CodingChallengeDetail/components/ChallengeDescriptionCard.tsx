import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DescriptionTab from "@/components/challenge-exercise/DescriptionTab";
import { SubmissionResult } from "../CodingChallengeDetail";

interface ChallengeDescriptionCardProps {
  title: string;
  description: string;
  markdownContent: string;
  accordionItems?: { trigger: string; content: string }[];
  submissionData: SubmissionResult | null;
}

export default function ChallengeDescriptionCard({
  title,
  description,
  markdownContent,
  accordionItems,
  submissionData,
}: ChallengeDescriptionCardProps) {
  return (
    <Card className="grid w-full max-w-7xl border-none h-[91vh]">
      <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
        <Tabs defaultValue="description" className="w-full h-full">
          <TabsList className="m-4 mb-0">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="submission">Submission</TabsTrigger>
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
                {submissionData && (
                  <div>
                    {!submissionData.errorTestCase && (
                      <p className="text-2xl">
                        <strong>Message:</strong>
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
                              <strong>Average Time:</strong>
                              {submissionData.averageTime} ms
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="flex-1 border-none dark:bg-codeEditorDark mt-4 pt-4">
                          <CardContent>
                            <p>
                              <strong>Average Memory:</strong>
                              {submissionData.averageMemory} MB
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
                                  <pre>
                                    <code>
                                      {submissionData.submission.stderr}
                                    </code>
                                  </pre>
                                </CardContent>
                              </Card>
                            )}
                            <Card className="border-none dark:bg-codeEditorDark mt-4">
                              <CardContent className="pt-3">
                                <p>
                                  <strong>Time: </strong>
                                  {(
                                    parseFloat(submissionData.submission.time) *
                                    1000
                                  ).toFixed(2)}
                                  ms
                                </p>
                                <p>
                                  <strong>Memory: </strong>
                                  {(
                                    submissionData.submission.memory / 1024
                                  ).toFixed(2)}
                                  MB
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </Card>
  );
}
