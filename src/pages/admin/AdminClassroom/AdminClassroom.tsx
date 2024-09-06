import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostCard } from "@/pages/client/ClassroomDetail/components/PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminHeader } from "@/common/components/AdminHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { addExerciseSchema } from "./schemas/add-exercise.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultipleSelector from "@/components/multi-select";
import { Option } from "@/components/multi-select";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const exampleExercises: Option[] = [
  {
    id: "0493f2f8-686d-4dcf-8945-9aaa9458de82",
    label: "xin chào",
    value: "xinchao",
  },
  {
    id: "79b6d896-d8c7-42f8-85cf-6fc8e15336d3",
    label: "tạm biệt",
    value: "tambiet",
  },
  {
    id: "686013cc-f240-482c-b30f-509b19f09286",
    label: "cảm ơn",
    value: "camon",
  },
  {
    id: "ec1fb459-03fd-424a-b077-6e13be5076b1",
    label: "làm ơn",
    value: "lamon",
  },
  {
    id: "0b1f49e8-6a2c-4b7b-8c28-6f2f4a1ab68f",
    label: "Xin lỗi",
    value: "xin-loi",
  },
  {
    id: "f536ea82-4983-4f50-9288-82c3a3682b8b",
    label: "Được",
    value: "duoc",
  },
  {
    id: "44cf3cc2-7d17-4f84-b3c6-499da8e4b582",
    label: "Không",
    value: "khong",
  },
  {
    id: "71c86e91-51b0-4d61-95c4-d9b1d0917581",
    label: "Thích",
    value: "thich",
  },
  {
    id: "88075e66-85f1-4a7f-9776-f3825704b9f0",
    label: "Yêu",
    value: "yeu",
  },
  {
    id: "db27ae8e-731d-4e2d-9d6a-cc8e02d49b75",
    label: "Ghét",
    value: "ghet",
  },
  {
    id: "36da9f09-2175-4420-9197-16e6be2dbead",
    label: "Hạnh phúc",
    value: "hanh-phuc",
  },
  {
    id: "a5cf7633-b4be-4fd8-9355-14b662cf1bcf",
    label: "Buồn",
    value: "buon",
  },
  {
    id: "1a179b29-e6a7-48ab-b9fe-130d2f1b7d61",
    label: "Sợ hãi",
    value: "so-hai",
  },
  {
    id: "e25c3303-3739-426d-9d3d-1030a2b89a3c",
    label: "Giận dữ",
    value: "gian-du",
  },
  {
    id: "bd394e9c-540e-454d-89e5-df6e0f946d8f",
    label: "Ngạc nhiên",
    value: "ngac-nhien",
  },
  {
    id: "c821b620-7a15-426c-8b6f-91c9e1fef274",
    label: "Thất vọng",
    value: "that-vong",
  },
  {
    id: "5b8cbb82-7ed7-4f1c-9f43-6b4f6d4f87aa",
    label: "Hy vọng",
    value: "hy-vong",
  },
  {
    id: "c869874d-dcf5-4b66-8351-107b6f3c1e8c",
    label: "Mệt mỏi",
    value: "met-moi",
  },
  {
    id: "b82ffdab-490d-4f82-a0e0-2511b529f013",
    label: "Vui vẻ",
    value: "vui-ve",
  },
  {
    id: "4c5fbc02-dc13-4f33-917b-e3766c3efb9d",
    label: "Nhớ",
    value: "nho",
  },
];

const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
  files: z.custom<FileList>().optional(),
  // .refine(
  //   (files) => {
  //     if (!files || files.length === 0) return true;
  //     return Array.from(files).every((file) =>
  //       allowedFileTypes.includes(file.type)
  //     );
  //   },
  //   { message: "Only zip, txt, csv, or code files are allowed" }
  // ),
});

type PostFormValues = z.infer<typeof postSchema>;

const allowedFileTypes = [
  "application/zip",
  "text/plain",
  "text/csv",
  "text/javascript",
  "text/typescript",
  "text/python",
  "text/java",
  "text/c",
  "text/cpp",
];

export function AdminClassroom() {
  const [fileError, setFileError] = useState<string | null>(null);
  const addExerciseForm = useForm<z.infer<typeof addExerciseSchema>>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: {
      exercises: [],
    },
  });

  function onAddingExercises(values: z.infer<typeof addExerciseSchema>) {
    console.log(values);
  }

  const postForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: `# Markdown syntax guide

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

![This is an alt text.](/image/sample.webp "This is a sample image.")

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

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.
`,
      files: undefined,
    },
  });

  function onPosting(values: PostFormValues) {
    console.log("Form submitted:", values);
    // Handle form submission here
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const invalidFiles = Array.from(files).filter(
        (file) => !allowedFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        setFileError("Only zip, txt, csv, or code files are allowed");
        postForm.setValue("files", undefined);
      } else {
        setFileError(null);
        postForm.setValue("files", files);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <AdminHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight sm:grow-0">
                Lập trình Java
              </h1>
              <Badge className="ml-auto sm:ml-0">On going</Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="h-10 py-4">
                      Add Exercise
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[50vh] h-max"
                    autoFocus={true}
                  >
                    <Form {...addExerciseForm}>
                      <form
                        onSubmit={addExerciseForm.handleSubmit(
                          onAddingExercises
                        )}
                      >
                        <DialogHeader className="mb-4">
                          <DialogTitle>Add Exercise</DialogTitle>
                          <DialogDescription>
                            Choose one or more exercises to assign to this
                            class.
                          </DialogDescription>
                        </DialogHeader>
                        <FormField
                          control={addExerciseForm.control}
                          name="exercises"
                          render={({ field }) => (
                            <>
                              <FormItem>
                                <FormLabel htmlFor="exercises">
                                  Exercises
                                </FormLabel>
                                <FormControl>
                                  <MultipleSelector
                                    options={exampleExercises}
                                    {...field}
                                    badgeClassName="text-sm"
                                    placeholder="Select exercises ..."
                                    hidePlaceholderWhenSelected={true}
                                    emptyIndicator={
                                      <p className="text-center text-base leading-6 text-gray-600 dark:text-gray-400">
                                        No results found.
                                      </p>
                                    }
                                    triggerSearchOnFocus={true}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />
                        <DialogFooter>
                          <Button className="mt-4" type="submit">
                            Save changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary" className="h-10 py-4">
                  Grade Exercises
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="px-4 h-10 block">Post</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] w-full">
                    <Form {...postForm}>
                      <form
                        onSubmit={postForm.handleSubmit(onPosting)}
                        className="space-y-6"
                      >
                        <DialogHeader>
                          <DialogTitle>Create a New Post</DialogTitle>
                          <DialogDescription>
                            Write a new post for your classroom here using the
                            Markdown editor below.
                          </DialogDescription>
                        </DialogHeader>
                        <FormField
                          control={postForm.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <MDEditor
                                  preview="edit"
                                  height={500}
                                  visibleDragbar={false}
                                  textareaProps={{
                                    placeholder:
                                      "Write your post content here...",
                                  }}
                                  className="border border-input bg-background"
                                  // {...field}
                                  value={field.value}
                                  onChange={(value: string | undefined) =>
                                    field.onChange(value || "")
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={postForm.control}
                          name="files"
                          render={({
                            field: { value, onChange, ...fieldProps },
                          }) => (
                            <FormItem>
                              <FormLabel
                                className={fileError ? "text-destructive" : ""}
                              >
                                Files
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Input
                                    type="file"
                                    multiple={true}
                                    id="file-upload"
                                    className="hidden"
                                    accept=".zip,.txt,.csv,.js,.ts,.py,.java,.c,.cpp"
                                    {...fieldProps}
                                    onChange={handleFileChange}
                                  />
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                  >
                                    Choose files
                                  </label>
                                  <span className="ml-3 text-sm text-gray-500">
                                    {value
                                      ? `${value.length} file(s) selected`
                                      : "No file chosen"}
                                  </span>
                                </div>
                              </FormControl>
                              {!fileError && (
                                <FormDescription>
                                  Upload one or more files related to your post.
                                </FormDescription>
                              )}
                              {fileError && (
                                <FormMessage>{fileError}</FormMessage>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit">Post</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_250px] xl:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 xl:col-span-2 lg:gap-8">
                <PostCard />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 min-w-64">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                    <CardDescription>All upload files are here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[520px]">
                      <div className="p-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>File Name</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead className="hidden xl:table-cell">
                                Uploaded At
                              </TableHead>
                              <TableHead>By</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {[...Array(30)].map((_, index) => (
                              <TableRow
                                key={index}
                                className={index % 2 === 1 ? "bg-accent" : " "}
                              >
                                <TableCell>File 1</TableCell>
                                <TableCell>1.2 MB</TableCell>
                                <TableCell className="hidden xl:table-cell">
                                  2021-09-01
                                </TableCell>
                                <TableCell>Nguyễn Minh Hoàng</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </ScrollArea>

                    {/* <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div> */}
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                            width="84"
                          />
                        </button>
                        <button>
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
