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
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.css";
import remarkMath from "remark-math";

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
          className="text-sm"
          rehypePlugins={[rehypeKatex]}
          remarkPlugins={[remarkMath]}
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
