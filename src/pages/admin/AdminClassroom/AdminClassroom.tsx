import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { PostCard } from "@/components/classroom/PostCard";
import { AdminHeader } from "@/common/components/AdminHeader";
import { Option } from "@/components/multi-select";
import { AddExercisesDialog } from "./components/AddExercisesDialog";
import { PostDialog } from "./components/PostDialog";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScoreChart from "@/components/classroom/ScoreChart";
// import GradedExercises from "@/components/classroom/GradedExercises";
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

export function AdminClassroom() {
  return (
    <ScrollArea className="h-[100dvh]">
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
                  <AddExercisesDialog exercises={exampleExercises} />
                  <Link
                    to="/admin/classes/grading"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="h-10 py-4">
                      Grade Exercises
                    </Button>
                  </Link>
                  <PostDialog />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 xl:col-span-2 lg:gap-8">
                  {/* <PostCard post={{ content: initialValue }} /> */}
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-1">
                  {/* <ScoreChart /> */}
                  {/* <GradedExercises /> */}
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
    </ScrollArea>
  );
}
