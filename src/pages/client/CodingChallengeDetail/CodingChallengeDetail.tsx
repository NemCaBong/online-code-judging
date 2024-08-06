import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CodeMirrorEditor from "./components/CodeMirrorEditor";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function CodingChallengeDetail() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end">
            <div className="grid w-full max-w-7xl">
              <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
                <Card className="border-hidden">
                  <CardHeader>
                    <CardTitle>12. Two Sums</CardTitle>
                    <CardDescription>Easy question on LeetCode</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {[...Array(15)].map(() => (
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni, quibusdam voluptates nobis aspernatur
                        pariatur molestiae id quam numquam quisquam totam
                        similique nemo sequi nesciunt dolore exercitationem
                        placeat. Voluptas, minus enim.
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    {" "}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that matches the
                          other components&apos; aesthetic.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It's animated by default, but you can disable it
                          if you prefer.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardFooter>
                </Card>{" "}
              </ScrollArea>
            </div>
          </div>
          <div className="flex flex-col justify-between h-[91vh] gap-2">
            <Card className="">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Code Editor</CardTitle>
                <div className="flex gap-4">
                  <Button className="text-xs">Run</Button>
                  <Button className="text-xs" variant="secondary">
                    Submit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CodeMirrorEditor
                  language="python"
                  className="max-h-[400px] h-[400px]"
                />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-3 h-full">
                <Tabs defaultValue="tab-0" className="w-full h-full">
                  <TabsList>
                    {[...Array(5)].map((_, index) => (
                      <TabsTrigger key={index} value={`tab-${index}`}>
                        Case {index + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {[...Array(5)].map((_, index) => (
                    <TabsContent
                      className="h-[85%]"
                      key={index}
                      value={`tab-${index}`}
                    >
                      <Card className="border-none dark:bg-codeEditorDark h-full">
                        <CardHeader>Tab ${index}</CardHeader>
                        <CardContent></CardContent>
                        <CardFooter></CardFooter>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
