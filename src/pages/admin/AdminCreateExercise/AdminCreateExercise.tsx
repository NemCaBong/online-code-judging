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
import { Option } from "@/components/multi-select";
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
import { CalendarIcon, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Class } from "@/pages/client/Dashboard/Dashboard";
import fetchData from "@/utils/fetch-data.utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { ENV } from "@/config/env.config";

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
  { label: "C++", value: "cpp" },
];

interface ClassesTeacherRes {
  message: string;
  statusCode: number;
  classes: Class[];
}

export function AdminCreateExercise() {
  const LANGUAGE_FILE_EXTENSIONS = {
    javascript: [".js"],
    python: [".py"],
    java: [".java"],
    cpp: [".cpp"],
  };

  const form = useForm<z.infer<typeof createExerciseSchema>>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: "",
      class_id: 0,
      markdownContent: markdownContent,
      boilerplate_codes: [
        {
          language: "javascript",
          code: "",
          fileName: "index.js",
        },
      ],
      due_at: (() => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return today;
      })(),
    },
  });

  const {
    data: classesTeacherRes,
    isLoading: isLoadingClassesTeacher,
    isError: isErrorClassesTeacher,
  } = useQuery({
    queryKey: ["classesTeacher"],
    queryFn: () =>
      fetchData<ClassesTeacherRes>(`${ENV.API_URL}/classes/teachers/all`),
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

  const createNewExerciseMutation = useMutation<
    AxiosResponse<{ message: string; statusCode: number }>,
    Error,
    z.infer<typeof createExerciseSchema>
  >({
    mutationFn: (newExercise: z.infer<typeof createExerciseSchema>) => {
      return axios.post(`${ENV.API_URL}/exercises/create`, newExercise, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    },
    onSuccess: async (_) => {
      toast.success("Successfully create a new exercise for your class.", {
        position: "top-right",
        autoClose: 5000,
      });
    },
    onError: (error) => {
      toast.error(`Error creating a new class. ${error}`, {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error running code:", error);
    },
  });

  if (isLoadingClassesTeacher) {
    return <div>Loading...</div>;
  }
  if (isErrorClassesTeacher) {
    return <div>Error</div>;
  }

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
    createNewExerciseMutation.mutate(values);
  }

  const handleRemoveTab = (index: number) => {
    removeBoilerplate(index);
    setActiveTab(Math.max(0, parseInt(activeTab) - 1).toString());
  };

  const classes = classesTeacherRes?.classes || [];
  const transformedClasses: Option[] = classes.map((classItem) => ({
    id: classItem.id,
    label: classItem.name,
    value: classItem.slug,
  }));

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

                  {/* Class selection */}
                  <FormField
                    control={form.control}
                    name="class_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedClass = transformedClasses.find(
                              (c) => c.value === value
                            );
                            field.onChange(selectedClass?.id);
                          }}
                          value={
                            transformedClasses.find((c) => c.id === field.value)
                              ?.value
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                          <SelectContent>
                            {transformedClasses.map((classItem) => (
                              <SelectItem
                                key={classItem.value}
                                value={classItem.value}
                              >
                                {classItem.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                            overflow={true}
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
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      // Get current filename
                                      const currentFileName = form.getValues(
                                        `boilerplate_codes.${index}.fileName`
                                      );
                                      // Get valid extensions for selected language
                                      const validExtensions =
                                        LANGUAGE_FILE_EXTENSIONS[
                                          value as keyof typeof LANGUAGE_FILE_EXTENSIONS
                                        ];
                                      // Check if current extension is valid
                                      const hasValidExtension =
                                        validExtensions.some((ext) =>
                                          currentFileName.endsWith(ext)
                                        );

                                      if (!hasValidExtension) {
                                        // Set default filename for selected language
                                        const defaultExt = validExtensions[0];
                                        const baseName =
                                          currentFileName.split(".")[0] ||
                                          "Main";
                                        form.setValue(
                                          `boilerplate_codes.${index}.fileName`,
                                          `${baseName}${defaultExt}`
                                        );
                                      }
                                    }}
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
                                      className="h-[60vh]"
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

                  {/* due_at component */}
                  <FormField
                    control={form.control}
                    name="due_at"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-xl font-semibold">
                          Due At{" "}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP 'at' HH:mm")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  // Set time to 23:59:59
                                  const dueDate = new Date(date);
                                  dueDate.setHours(23, 59, 59);
                                  field.onChange(dueDate);
                                }
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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
      <ToastContainer />
    </ScrollArea>
  );
}
