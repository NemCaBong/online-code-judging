import { Card } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DescriptionTab from "@/components/challenge-exercise/DescriptionTab";
import EvaluationTab from "@/components/challenge-exercise/EvaluationTab";

interface ExerciseDescriptionCardProps {
  title: string;
  description: string;
  markdownContent: string;
  evaluationContent?: React.ReactNode;
  accordionItems?: { trigger: string; content: string }[];
}

export default function ExerciseDescriptionCard({
  title,
  description,
  markdownContent,
  evaluationContent,
  accordionItems,
}: ExerciseDescriptionCardProps) {
  return (
    <Card className="grid w-full max-w-7xl border-none h-[91vh]">
      <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
        <Tabs defaultValue="description" className="w-full h-full">
          <TabsList className="m-4 mb-0">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <DescriptionTab
              title={title}
              description={description}
              markdownContent={markdownContent}
              accordionItems={accordionItems}
            />
          </TabsContent>
          <TabsContent value="evaluation">
            <EvaluationTab content={evaluationContent} />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </Card>
  );
}
