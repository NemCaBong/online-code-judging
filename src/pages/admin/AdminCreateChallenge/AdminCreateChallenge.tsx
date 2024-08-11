import React from "react";
import { AdminHeader } from "@/components/common/AdminHeader";
import MDEditor from "@uiw/react-md-editor";

export function AdminCreateChallenge() {
  const [markdownContent, setMarkdownContent] = React.useState(`
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
`);
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
              {/* <Badge className="ml-auto sm:ml-0">On going</Badge> */}
              {/* <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="secondary" className="h-10 py-4">
                  Grade Exercises
                </Button>
                <Button className="px-4 h-10 block">Post</Button>
              </div> */}
            </div>
            <div data-color-mode="dark">
              <MDEditor
                value={markdownContent}
                visibleDragbar={false}
                height="100%"
                onChange={(value: string) => setMarkdownContent(value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                {/* <PostCard /> */}
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 min-w-64">
                {/* <MDEditor.Markdown
                  source={markdownContent}
                  style={{ whiteSpace: "pre-wrap" }}
                /> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
