import { AdminHeader } from "@/components/common/AdminHeader";
import MDEditor from "@uiw/react-md-editor";
import "./styles/MDEditor.css";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChallengeSchema } from "@/utils/zod.schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/multi-select";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
];

const initialMarkdownContent = `
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

export function AdminCreateChallenge() {
  // const [markdownContent, setMarkdownContent] = React.useState();

  const form = useForm<z.infer<typeof createChallengeSchema>>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      name: "",
      tags: [],
      markdownContent: initialMarkdownContent,
      inputAndOutput: [
        {
          input: "",
          output: "",
        },
      ],
      hints: [
        {
          hintQuestion: "",
          hintAnswer: "",
        },
      ],
      timeLimit: 0,
      spaceLimit: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inputAndOutput",
  });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({
    control: form.control,
    name: "hints",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createChallengeSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <AdminHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              {/* <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button> */}
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:grow-0">
                Create Coding Challenge
              </h1>
              {/* <Badge className="ml-auto sm:ml-0">On going</Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="secondary" className="h-10 py-4">
                  Grade Exercises
                </Button>
                <Button className="px-4 h-10 block">Post</Button>
              </div> */}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-[95%] mx-auto"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter name challenge here ...."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter name challenge</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={OPTIONS}
                          placeholder="Select tags ..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              No results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Select tags for this challenge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="markdownContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markdown Content</FormLabel>
                      <FormControl>
                        <MDEditor
                          value={field.value}
                          visibleDragbar={false}
                          height="100%"
                          onChange={(value: string | undefined) =>
                            field.onChange(value || "")
                          }
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>Enter markdown content</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full border rounded-sm py-2">
                  <h2 className="text-lg p-2 font-semibold">Test Cases</h2>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex w-full p-2 flex-wrap gap-4"
                    >
                      <FormField
                        control={form.control}
                        name={`inputAndOutput.${index}.input`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter input here ...."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Enter input</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inputAndOutput.${index}.output`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Output</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter output here ...."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Enter output</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={
                          // nếu chỉ có 1 test case thì không cho xóa
                          fields.length === 1 ? undefined : () => remove(index)
                        }
                        className="mt-8"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    className="mt-8 m-2"
                    variant="secondary"
                    onClick={() => append({ input: "", output: "" })}
                  >
                    Add Test Case
                  </Button>

                  <FormMessage />
                </div>

                <div className="w-full border rounded-sm py-2">
                  <h2 className="text-lg p-2 font-semibold">Hints</h2>

                  {form.watch("hints").map((_, index) => (
                    <div
                      key={index}
                      className="flex w-full p-2 flex-wrap gap-4"
                    >
                      <FormField
                        control={form.control}
                        name={`hints.${index}.hintQuestion`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hint Question</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter hint question here ...."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter hint question
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hints.${index}.hintAnswer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hint Answer</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter hint answer here ...."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Enter hint answer</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={
                          // nếu chỉ có 1 hint thì không cho xóa
                          hintFields.length === 1
                            ? undefined
                            : () => removeHint(index)
                        }
                        className="mt-8"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    className="mt-8 m-2"
                    variant="secondary"
                    onClick={() =>
                      appendHint({ hintQuestion: "", hintAnswer: "" })
                    }
                  >
                    Add Hint
                  </Button>

                  <FormMessage />
                </div>

                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Limit (MS)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter time limit here ...."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter time limit</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spaceLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Space Limit (MB)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter space limit here ...."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter space limit</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
            {/* <div data-color-mode="dark">
              <MDEditor
                value={markdownContent}
                visibleDragbar={false}
                height="100%"
                onChange={(value: string | undefined) =>
                  setMarkdownContent(value || "")
                }
                className="w-full"
              />
            </div> */}
            {/* <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <PostCard />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 min-w-64">
                <MDEditor.Markdown
                  source={markdownContent}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
