import { AdminHeader } from "@/common/components/AdminHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import "@/common/styles/MDEditor.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClassSchema } from "./schemas/create-class.schema";

const studentsData: Option[] = [
  { label: "Nguyễn Văn An", value: "nguyen_van_an", id: "std001" },
  { label: "Trần Thị Bình", value: "tran_thi_binh", id: "std002" },
  { label: "Lê Hoàng Cường", value: "le_hoang_cuong", id: "std003" },
  { label: "Phạm Minh Dung", value: "pham_minh_dung", id: "std004" },
  { label: "Hoàng Thị Em", value: "hoang_thi_em", id: "std005" },
];

// const markdownContent = `
// # Markdown \`syntax guide\`
// Here is some \`inline code\` with the word \`markdown\` inside it.

// ## Headers

// # This is a Heading h1
// ## This is a Heading h2
// ###### This is a Heading h6

// ## Emphasis

// *This text will be italic*
// _This will also be italic_

// **This text will be bold**
// __This will also be bold__

// _You **can** combine them_

// ## Lists

// ### Unordered

// * Item 1
// * Item 2
// * Item 2a
// * Item 2b

// ### Ordered

// 1. Item 1
// 2. Item 2
// 3. Item 3
//     1. Item 3a
//     2. Item 3b

// ## Images

// ![This is an alt text.](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqglKDy3Z9-zDvnfRFQIGeQft28uRVTHoGQ&s "This is a sample image.")

// ## Links

// You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

// ## Blockquotes

// > Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
// >
// >> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

// ## Tables

// | Left columns  | Right columns |
// | ------------- |:-------------:|
// | left foo      | right foo     |
// | left bar      | right bar     |
// | left baz      | right baz     |

// ## Blocks of code

// \`\`\`javascript
// import React from "react";
// import ReactDOM from "react-dom";
// import MEDitor from '@uiw/react-md-editor';
// \`\`\`

// ## Inline code

// This web site is using \`markedjs/marked\`.
// `;

export function AdminCreateClass() {
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
      students: [],
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof createClassSchema>) {
    console.log(values);
  }

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4">
          <AdminHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:grow-0 mb-10">
                  Create Class
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
                          Class Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter class's name here ...."
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormDescription>Name of this class</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="students"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Students
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            defaultOptions={studentsData}
                            {...field}
                            badgeClassName="text-sm"
                            placeholder="Select students ..."
                            hidePlaceholderWhenSelected={true}
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                No results found.
                              </p>
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Add students to this class
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
    </ScrollArea>
  );
}
