import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import DashboardChart from "@/pages/client/Dashboard/components/DashboardChart";
import { DisplayCard } from "@/pages/client/Dashboard/components/DisplayCard";
import DashboardNotificationBoard from "./components/DashboardNotificationBoard";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { ClassesListBoard } from "./components/ClassesListBoard";
import { ScrollArea } from "@/components/ui/scroll-area";

const activityData = [
  {
    activity: "classes",
    value: (8 / 12) * 100,
    label: "8 / 12",
    fill: "var(--color-classes)",
  },
  {
    activity: "exercises",
    value: (46 / 60) * 100,
    label: "46 / 60",
    fill: "var(--color-exercises)",
  },
  {
    activity: "challenges",
    value: (245 / 360) * 100,
    label: "245 / 360",
    fill: "var(--color-challenges)",
  },
];

const summaryData = {
  challenges: 245,
  exercises: 46,
  classes: 8,
};

const classData = {
  id: 4,
  name: "Advanced JavaScript",
  created_at: "2024-10-13T04:10:11.380Z",
  slug: "adv-javascript",
  total_students: 30,
  teacher: {
    id: 2,
    first_name: "Tuấn",
    last_name: "Nguyễn",
    email: "tuan.nguyen@example.com",
  },
};

const classes = [
  {
    id: 4,
    name: "Advanced JavaScript",
    created_at: "2024-10-13T04:10:11.380Z",
    slug: "adv-javascript",
    total_students: 30,
    teacher: {
      id: 2,
      first_name: "Tuấn",
      last_name: "Nguyễn",
      email: "tuan.nguyen@example.com",
    },
    is_done: true,
  },
  {
    id: 2,
    name: "Lập trình web",
    created_at: "2024-10-13T01:05:23.287Z",
    slug: "lap-trinh-web",
    total_students: 30,
    teacher: {
      id: 2,
      first_name: "Tuấn",
      last_name: "Nguyễn",
      email: "tuan.nguyen@example.com",
    },
    is_done: false,
  },
];

const soonDueExercises = [
  {
    id: 1,
    slug: "basic-array-manipulation",
    created_at: "2024-10-13T01:05:23.287Z",
    name: "Basic Array Manipulation",
    classExercises: [
      {
        due_at: "2024-10-13T01:15:14.171Z",
        class: {
          id: 2,
          name: "Lập trình web",
        },
      },
    ],
    userExerciseResult: [
      {
        status: "done",
      },
    ],
  },
  {
    id: 2,
    slug: "string-reversal",
    created_at: "2024-10-13T01:05:23.287Z",
    name: "String Reversal",
    classExercises: [
      {
        due_at: "2024-10-13T01:15:14.171Z",
        class: {
          id: 2,
          name: "Lập trình web",
        },
      },
    ],
    userExerciseResult: [
      {
        status: "not-done",
      },
    ],
  },
];

const progressData = {
  challenges: {
    done: 1,
    total: 10,
  },
  classes: {
    done: 0,
    total: 2,
  },
  exercises: {
    done: 1,
    total: 2,
  },
};

export function Dashboard() {
  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 grid-flow-dense">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 grid-flow-dense justify-items-end">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 w-full max-w-7xl">
                <DisplayCard className="sm:col-span-2" classInfo={classData} />
                <DisplayCard classInfo={classData} />
                <DisplayCard classInfo={classData} />
              </div>
              <div className="w-full max-w-7xl">
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        ASC
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>DESC</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <ClassesListBoard classes={classes} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex-1 place-items-center rounded-xl border border-zinc-200 text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 min-w-72 max-w-2xl">
                <DashboardNotificationBoard
                  title="Notifications"
                  description="Recent notifications from your classes"
                  exercises={soonDueExercises}
                />
              </div>
              <div className="flex-1 max-w-2xl min-w-72">
                <DashboardChart
                  challenges={progressData.challenges}
                  classes={progressData.classes}
                  exercises={progressData.exercises}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
