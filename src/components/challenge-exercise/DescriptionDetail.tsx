import { Card } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DescriptionTab from "./DescriptionTab";
import EvaluationTab from "./EvaluationTab";
import SubmissionTab from "./SubmissionTab";

type ChallengeType = "challenge" | "exercise";

interface ChallengeDescriptionCardProps {
  type: ChallengeType;
  title: string;
  description: string;
  markdownContent: string;
  submissionContent?: React.ReactNode;
  evaluationContent?: React.ReactNode;
  accordionItems?: { trigger: string; content: string }[];
}

export default function ChallengeDescriptionCard({
  type,
  title,
  description,
  markdownContent,
  submissionContent,
  evaluationContent,
  accordionItems,
}: ChallengeDescriptionCardProps) {
  const tabs = [
    {
      value: "description",
      label: "Description",
      content: (
        <DescriptionTab
          title={title}
          description={description}
          markdownContent={markdownContent}
          accordionItems={accordionItems}
        />
      ),
    },
    type === "challenge"
      ? {
          value: "submission",
          label: "Submission",
          content: <SubmissionTab content={submissionContent} />,
        }
      : {
          value: "evaluation",
          label: "Evaluation",
          content: <EvaluationTab content={evaluationContent} />,
        },
  ];

  return (
    <Card className="grid w-full max-w-7xl border-none h-[91vh]">
      <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
        <Tabs defaultValue={tabs[0].value} className="w-full h-full">
          <TabsList className="m-4 mb-0">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </ScrollArea>
    </Card>
  );
}
