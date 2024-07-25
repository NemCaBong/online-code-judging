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

export function CodingChallengeDetail() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end">
            <div className="grid w-full max-w-7xl">
              <Card className="">
                <CardHeader>
                  <CardTitle>12. Two Sums</CardTitle>
                  <CardDescription>Easy question on LeetCode</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Magni, quibusdam voluptates nobis aspernatur pariatur
                    molestiae id quam numquam quisquam totam similique nemo
                    sequi nesciunt dolore exercitationem placeat. Voluptas,
                    minus enim.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi sunt, qui a obcaecati maiores numquam! Dolorum,
                    adipisci! Maxime magni, molestias, doloremque, nobis illum
                    quas ab sed ea saepe possimus modi.
                  </p>
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
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It's animated by default, but you can disable it if
                        you prefer.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeMirrorEditor
                    language="python"
                    className="h-[450px] min-h-[300px]"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="">
              <Card>
                <CardHeader></CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
