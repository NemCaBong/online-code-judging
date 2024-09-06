import { AdminHeader } from "@/common/components/AdminHeader";
import MDEditor from "@uiw/react-md-editor";
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
import { Textarea } from "@/components/ui/textarea";
import CodeMirrorEditor from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import "@/common/styles/MDEditor.css";

const OPTIONS: Option[] = [
  { label: "NextJS", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
];

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

export function AdminCreateChallenge() {
  const form = useForm<z.infer<typeof createChallengeSchema>>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      name: "",
      tags: [],
      markdownContent: markdownContent,
      boilerplate_code: "",
      inputAndExpectedOutput: [
        {
          input: "",
          expected_output: "",
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

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control: form.control,
    name: "inputAndExpectedOutput",
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
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:grow-0 mb-10">
                Create Coding Challenge
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-[100dvh] mx-auto"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter challenge's name here ...."
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>Name of this challenge</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <MultipleSelector
                          defaultOptions={OPTIONS}
                          {...field}
                          badgeClassName="text-sm"
                          placeholder="Select tags ..."
                          hidePlaceholderWhenSelected={true}
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
                      <FormLabel className="text-xl font-semibold">
                        Markdown Content
                      </FormLabel>
                      <FormControl>
                        <MDEditor
                          visibleDragbar={false}
                          height="100%"
                          value={field.value}
                          onChange={(value: string | undefined) =>
                            field.onChange(value || "")
                          }
                          className="w-full text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Boilerplate_code component */}
                <FormField
                  control={form.control}
                  name="boilerplate_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Boilerplate Code
                      </FormLabel>
                      <FormControl>
                        <CodeMirrorEditor
                          value={field.value}
                          language="javascript"
                          className="h-[500px]"
                          onChange={(value: string | undefined) =>
                            field.onChange(value || "")
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Boilerplate code for this challenge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Test cases component */}
                <div>
                  <h2 className="text-xl font-semibold pb-2">Test Cases</h2>
                  <div className="w-full border rounded-md py-2 px-3">
                    {testCaseFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex w-full p-2 flex-wrap gap-4 justify-between items-center"
                      >
                        <FormField
                          control={form.control}
                          name={`inputAndExpectedOutput.${index}.input`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">Input</FormLabel>
                              <FormControl>
                                {/* <Input
                                placeholder="Enter input here ...."
                                {...field}
                              /> */}
                                <Textarea
                                  className="w-[40vh]"
                                  placeholder="Enter input here ...."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name={`inputAndExpectedOutput.${index}.expected_output`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">
                                  Expected Output
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    className="w-[40vh]"
                                    placeholder="Enter expected output ...."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={
                              // nếu chỉ có 1 test case thì không cho xóa
                              testCaseFields.length === 1
                                ? undefined
                                : () => removeTestCase(index)
                            }
                            className="mt-8"
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="mt-8 m-2"
                      onClick={() =>
                        appendTestCase({ input: "", expected_output: "" })
                      }
                    >
                      Add Test Case
                    </Button>
                  </div>
                </div>

                {/* Hints */}
                <div>
                  <h2 className="text-xl font-semibold pb-2">Hints</h2>
                  <div className="w-full border rounded-md py-2 px-3">
                    {hintFields.map((hint, index) => (
                      <div
                        key={hint.id}
                        className="flex w-full p-2 flex-wrap gap-4 justify-between items-center"
                      >
                        <FormField
                          control={form.control}
                          name={`hints.${index}.hintQuestion`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Hint Question
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="w-[40vh] h-11"
                                  placeholder="Enter hint question here ...."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name={`hints.${index}.hintAnswer`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base">
                                  Hint Answer
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="w-[40vh] h-11"
                                    placeholder="Enter hint answer here ...."
                                    {...field}
                                  />
                                </FormControl>
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
                      </div>
                    ))}

                    <Button
                      type="button"
                      className="mt-8 m-2"
                      onClick={() =>
                        appendHint({ hintQuestion: "", hintAnswer: "" })
                      }
                    >
                      Add Hint
                    </Button>

                    <FormMessage />
                  </div>
                </div>

                {/* Space & Time limit */}
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Time Limit (MS)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter time limit here ...."
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Time limit of this challenge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spaceLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-semibold">
                        Space Limit (MB)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter space limit here ...."
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Space limit of this challenge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
