import { Header } from "@/common/components/Header";
import { Sidebar } from "@/common/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseFormSchemaType,
  exerciseFormSchema,
} from "./schemas/code.schema";
import OutputCard from "./components/OutputCard";
import ExerciseEditor from "./components/ExerciseEditor";
import ExerciseDescriptionCard from "./components/ExerciseDescriptionCard";

export function CodingExercise() {
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

  const boilerplateCodes = [
    {
      language: "javascript",
      code: "console.log('Hello from JavaScript!');",
      fileName: "index.js",
    },
    {
      language: "python",
      code: "print('Hello from Python!')",
      fileName: "main.py",
    },
    {
      language: "java",
      code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java!");\n  }\n}',
      fileName: "Main.java",
    },
  ];

  const form = useForm<ExerciseFormSchemaType>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      codes: boilerplateCodes,
    },
  });
  const { fields: codesFields } = useFieldArray({
    control: form.control,
    name: "codes",
  });

  function onRun(values: ExerciseFormSchemaType) {
    console.log("Running code:", values);
    // Send data to backend for running
  }

  function onSubmit(values: ExerciseFormSchemaType) {
    console.log("Submitting code:", values);
    // Send data to backend for submission
  }

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
          <Header />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0 h-[91vh]">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end h-full">
              <ExerciseDescriptionCard
                title="12. Two Sums"
                description="Easy question on LeetCode"
                markdownContent={markdownContent}
                accordionItems={[
                  {
                    trigger: "Is it accessible?",
                    content: "Yes. It adheres to the WAI-ARIA design pattern.",
                  },
                  {
                    trigger: "Is it styled?",
                    content:
                      "Yes. It comes with default styles that matches the other components' aesthetic.",
                  },
                  {
                    trigger: "Is it animated?",
                    content:
                      "Yes. It's animated by default, but you can disable it if you prefer.",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col justify-between h-full min-h-[50vh] gap-2">
              <ExerciseEditor
                form={form}
                onRun={onRun}
                onSubmit={onSubmit}
                codesFields={codesFields}
              />
              <OutputCard />
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
