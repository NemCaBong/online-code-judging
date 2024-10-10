import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OutputCard() {
  return (
    <Card className="h-full border-none flex flex-col ">
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent className="dark:bg-codeEditorDark rounded-md flex-grow m-6 mt-0 h-[21vh] pr-0 pb-0 pt-2">
        <ScrollArea className="h-full">
          {[...Array(25)].map((_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla.
            </p>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
