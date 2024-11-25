import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function EvaluationTab({
  content,
  score,
}: {
  content: React.ReactNode;
  score?: string;
}) {
  // Function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"; // High score
    if (score >= 50) return "text-yellow-500"; // Medium score
    return "text-red-500"; // Low score
  };

  // Parse score to a number
  const scoreValue = score ? parseFloat(score) : null;

  return (
    <Card className="border-none">
      <CardContent className="pt-4 px-4">
        <div className="flex flex-col space-y-4">
          {score && (
            <Card className="w-full dark:bg-codeEditorDark">
              <CardHeader>
                <CardTitle>Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p
                    className={
                      scoreValue !== null ? getScoreColor(scoreValue) : ""
                    }
                  >
                    {score}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
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
        </div>
      </CardContent>
    </Card>
  );
}
