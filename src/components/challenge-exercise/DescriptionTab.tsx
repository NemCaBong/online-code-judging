import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MDEditor from "@uiw/react-md-editor";

export default function DescriptionTab({
  title,
  description,
  markdownContent,
  accordionItems,
}: {
  title: string;
  description: string;
  markdownContent: string;
  accordionItems?: { trigger: string; content: string }[];
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <MDEditor.Markdown
          source={markdownContent}
          style={{ fontSize: "14px" }}
        />
      </CardContent>
      {accordionItems && (
        <CardFooter>
          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
