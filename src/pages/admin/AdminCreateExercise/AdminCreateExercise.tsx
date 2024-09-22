import { AdminHeader } from "@/common/components/AdminHeader";
import MDEditor from "@uiw/react-md-editor";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExerciseSchema } from "@/utils/zod.schemas";
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
import CodeMirrorEditor, {
  LanguageType,
} from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import "@/common/styles/MDEditor.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

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

const LANGUAGE_OPTIONS: Option[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  // Add more languages as needed
];

export function AdminCreateExercise() {
  const form = useForm<z.infer<typeof createExerciseSchema>>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: "",
      topics: [],
      markdownContent: markdownContent,
      boilerplate_codes: [
        {
          language: "javascript",
          code: "",
          fileName: "index.js",
        },
      ],
      hints: [
        {
          hintQuestion: "",
          hintAnswer: "",
        },
      ],
    },
  });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({
    control: form.control,
    name: "hints",
  });

  const {
    fields: boilerplateFields,
    append: appendBoilerplate,
    remove: removeBoilerplate,
  } = useFieldArray({
    control: form.control,
    name: "boilerplate_codes",
  });

  const [activeTab, setActiveTab] = useState("0");

  const handleAddTab = () => {
    const newIndex = boilerplateFields.length.toString();
    appendBoilerplate({
      language: "javascript",
      code: "",
      fileName: "index.js",
    });
    setActiveTab(newIndex);
  };

  function onSubmit(values: z.infer<typeof createExerciseSchema>) {
    console.log(values);
  }

  const handleRemoveTab = (index: number) => {
    removeBoilerplate(index);
    setActiveTab(Math.max(0, parseInt(activeTab) - 1).toString());
  };

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4">
          <AdminHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:grow-0 mb-10">
                  Create Coding Exercise
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
                        <FormDescription>
                          Name of this challenge
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="topics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Topics
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={OPTIONS}
                            placeholder="Select topics ..."
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                No results found.
                              </p>
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Select topics for this challenge
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
                            value={field.value}
                            visibleDragbar={false}
                            height="100%"
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
                  {/* <FormField
                    control={form.control}
                    name="boilerplate_code.code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Boilerplate Code
                        </FormLabel>
                        <FormControl>
                          <CodeMirrorEditor
                            value={field.value}
                            language={form.getValues(
                              "boilerplate_code.language"
                            )}
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
                  /> */}
                  {/* <div>
                    <h2 className="text-xl font-semibold pb-2">
                      Boilerplate Codes
                    </h2>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <div className="flex items-center">
                        <TabsList>
                          {boilerplateFields.map((field, index) => (
                            <TabsTrigger
                              key={field.id}
                              value={index.toString()}
                            >
                              {`Code ${index + 1}`}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleAddTab}
                          className="ml-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      {boilerplateFields.map((field, index) => (
                        <TabsContent key={field.id} value={index.toString()}>
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.fileName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>File Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter file name"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.language`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Language</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {LANGUAGE_OPTIONS.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.code`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Code</FormLabel>
                                  <FormControl>
                                    <CodeMirrorEditor
                                      value={field.value}
                                      language={form.watch(
                                        `boilerplate_codes.${index}.language`
                                      )}
                                      className="h-[300px]"
                                      onChange={(value: string | undefined) =>
                                        field.onChange(value || "")
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                removeBoilerplate(index);
                                setActiveTab("0");
                              }}
                            >
                              Remove This Code
                            </Button>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div> */}
                  <div>
                    <h2 className="text-xl font-semibold pb-2">
                      Boilerplate Codes
                    </h2>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <div className="flex items-center">
                        <TabsList>
                          {boilerplateFields.map((field, index) => (
                            <TabsTrigger
                              key={field.id}
                              value={index.toString()}
                            >
                              {`Code ${index + 1}`}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleAddTab}
                          className="ml-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        {boilerplateFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleRemoveTab(parseInt(activeTab))}
                            className="ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {boilerplateFields.map((field, index) => (
                        <TabsContent key={field.id} value={index.toString()}>
                          <div className="space-y-4">
                            {/* File Name input */}
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.fileName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>File Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter file name"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            {/* Language selection */}
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.language`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Language</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {LANGUAGE_OPTIONS.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            {/* Code editor */}
                            <FormField
                              control={form.control}
                              name={`boilerplate_codes.${index}.code`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Code</FormLabel>
                                  <FormControl>
                                    <CodeMirrorEditor
                                      value={field.value}
                                      language={
                                        form.watch(
                                          `boilerplate_codes.${index}.language`
                                        ) as LanguageType
                                      }
                                      className="h-[300px]"
                                      onChange={(value: string | undefined) =>
                                        field.onChange(value || "")
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
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

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
