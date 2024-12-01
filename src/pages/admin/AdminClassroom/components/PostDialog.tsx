import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { postSchema } from "../schemas/post.schema";
import { z } from "zod";
import { useEffect, useState } from "react";

type PostFormValues = z.infer<typeof postSchema>;

// const allowedFileTypes = [
//   "application/zip",
//   "text/plain",
//   "text/csv",
//   "text/javascript",
//   "text/typescript",
//   "text/python",
//   "text/java",
//   "text/c",
//   "text/cpp",
// ];

const initialValue = `# Markdown syntax guide

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

![Placeholder image](https://via.placeholder.com/300x200 "This is a placeholder image")

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
`;

export function PostDialog() {
  const [isOpen, setIsOpen] = useState(false);
  // const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const postForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: initialValue,
    },
  });

  function onPosting(values: PostFormValues) {
    console.log("Form submitted:", values);
    // Handle form submission here
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const invalidFiles = Array.from(files).filter(
  //       (file) => !allowedFileTypes.includes(file.type)
  //     );
  //     if (invalidFiles.length > 0) {
  //       setFileError("Only zip, txt, csv, or code files are allowed");
  //       postForm.setValue("files", undefined);
  //     } else {
  //       setFileError(null);
  //       postForm.setValue("files", files);
  //     }
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 h-10 block">Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[78vw] w-full max-h-[80vh]">
        <Form {...postForm}>
          <form
            onSubmit={postForm.handleSubmit(onPosting)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogDescription>
                Write a new post for your classroom here using the Markdown
                editor below.
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
                      height={400}
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder: "Write your post content here...",
                      }}
                      className="border border-input bg-background text-sm"
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
            {/* <FormField
              control={postForm.control}
              name="files"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className={fileError ? "text-destructive" : ""}>
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
                  {fileError && <FormMessage>{fileError}</FormMessage>}
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <DialogFooter>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
