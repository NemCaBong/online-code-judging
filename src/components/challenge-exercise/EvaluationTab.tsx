import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function EvaluationTab({
  content,
  score,
}: {
  content: React.ReactNode;
  score?: string;
}) {
  return (
    <Card className="border-none">
      <CardContent className="pt-4 px-4">
        <div className="flex space-x-4">
          <Card className="flex-1 dark:bg-codeEditorDark">
            <CardHeader>
              <CardTitle>Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p>{content}</p>
              </div>
            </CardContent>
          </Card>
          {score && (
            <Card className="w-1/4 dark:bg-codeEditorDark">
              <CardHeader>
                <CardTitle>Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p>{score}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
