import { Header } from "@/common/components/Header";
import { Sidebar } from "@/common/components/Sidebar";
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
import MDEditor from "@uiw/react-md-editor";
import { SquareCheckBig, Terminal } from "lucide-react";

export function CodingChallengeDetail() {
  const markdownContent = `
# Markdown \`syntax guide\`
Here is some \`inline code\` with the word \`markdown\` inside it.

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqglKDy3Z9-zDvnfRFQIGeQft28uRVTHoGQ&s "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.
`;

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0 h-[91vh]">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end h-full">
            {/* <div className="grid w-full max-w-7xl"> */}
            <Card className="grid w-full max-w-7xl border-none h-[91vh]">
              <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
                <Tabs defaultValue="description" className="w-full h-full">
                  <TabsList className="m-4 mb-0">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="submission">Submission</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <Card className="border-hidden">
                      <CardHeader>
                        <CardTitle>12. Two Sums</CardTitle>
                        <CardDescription>
                          Easy question on LeetCode
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <MDEditor.Markdown
                          source={markdownContent}
                          style={{ fontSize: "14px" }}
                        />
                      </CardContent>
                      <CardFooter>
                        {" "}
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              Is it accessible?
                            </AccordionTrigger>
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
                              Yes. It's animated by default, but you can disable
                              it if you prefer.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardFooter>
                    </Card>{" "}
                  </TabsContent>
                </Tabs>
              </ScrollArea>
              {/* <ScrollArea className="max-h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
                <Card className="border-hidden">
                  <CardHeader>
                    <CardTitle>12. Two Sums</CardTitle>
                    <CardDescription>Easy question on LeetCode</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MDEditor.Markdown
                      source={markdownContent}
                      style={{ fontSize: "14px" }}
                    />
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
              </ScrollArea> */}
              {/* </div> */}
            </Card>
          </div>
          <div className="flex flex-col justify-between h-full gap-2">
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
                  value="/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  nums.sort()
  for(let i = 0; i < nums.length; i++){
      if (nums[i] === nums[i+1]){
          i++;
      } else {
          return nums[i + 1]
      }
  }
};"
                  language="javascript"
                  className="h-[45vh]"
                />
              </CardContent>
            </Card>
            <Card className="h-full border-none">
              <Tabs defaultValue="test-case">
                <TabsList
                  className="w-full justify-start"
                  style={{
                    borderRadius: "0.75rem 0.75rem 0 0",
                  }}
                >
                  <TabsTrigger value="test-case">
                    <SquareCheckBig className="text-sm pr-2" />
                    Test Cases
                  </TabsTrigger>
                  <TabsTrigger value="result">
                    <Terminal className="text-sm pr-2" />
                    Result
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="test-case" className="h-[85%]">
                  <Card className="h-full border-none pt-3">
                    <CardContent className="h-full">
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
                            <Card className="border-none dark:bg-codeEditorDark">
                              <CardHeader>Tab ${index}</CardHeader>
                            </Card>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
