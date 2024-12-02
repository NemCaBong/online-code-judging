import { Card } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EvaluationTab from "@/components/challenge-exercise/EvaluationTab";
import DescriptionDetailTab from "./DescriptionDetailTab";
import { useEffect, useState } from "react";

interface ExerciseDescriptionCardProps {
  title: string;
  markdownContent: string;
  evaluationContent?: React.ReactNode;
  userStatus: string;
  submittedAt?: string;
  score?: string;
}

export default function ExerciseDescriptionCard({
  title,
  markdownContent,
  evaluationContent,
  userStatus,
  submittedAt,
  score,
}: ExerciseDescriptionCardProps) {
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (userStatus === "graded") {
      setActiveTab("evaluation");
    }
  }, [userStatus]);

  return (
    <Card className="grid w-full max-w-7xl border-none h-[91vh] overflow-auto">
      <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow w-full max-w-7xl overflow-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full"
        >
          <TabsList className="m-4 mb-0">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <DescriptionDetailTab
              title={title}
              markdownContent={markdownContent}
              userStatus={userStatus}
              submittedAt={submittedAt}
            />
          </TabsContent>
          <TabsContent value="evaluation">
            <EvaluationTab content={evaluationContent} score={score} />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </Card>
  );
}
