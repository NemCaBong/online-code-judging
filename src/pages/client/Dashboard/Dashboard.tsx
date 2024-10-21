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
import { useQueries, useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetch-data.utils";

export interface ChartRes {
  message: string;
  statusCode: number;
  done: number;
  total: number;
}

export interface Exercise {
  id: number;
  slug: string;
  created_at: string;
  name: string;
  classes_exercises: {
    due_at: string;
    class: {
      id: number;
      name: string;
    };
  }[];
  user_exercise_results: {
    status: string;
  }[];
}

export interface Class {
  id: number;
  name: string;
  is_done: boolean;
  created_at: string;
  slug: string;
  total_students: number;
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  posts: {
    id: number;
    content: string;
    created_at: string;
  }[];
}
interface ClassesResponse {
  message: string;
  statusCode: number;
  classes: Class[];
}

interface SoonDueExercisesResponse {
  message: string;
  statusCode: number;
  soon_due_exercises: Exercise[];
}

function getFirstThreeClasses(classes: Class[]): (Class | null)[] {
  if (classes.length < 3) {
    return [...classes, ...Array(3 - classes.length).fill(null)];
  }
  return classes;
}
export function Dashboard() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["challenges"],
        queryFn: () =>
          fetchData<ChartRes>(
            "http://localhost:3000/challenges/info/done-and-total"
          ),
      },
      {
        queryKey: ["exercises"],
        queryFn: () =>
          fetchData<ChartRes>(
            "http://localhost:3000/exercises/info/done-and-total"
          ),
      },
      {
        queryKey: ["classes"],
        queryFn: () =>
          fetchData<ChartRes>(
            "http://localhost:3000/classes/info/done-and-total"
          ),
      },
    ],
  });
  const {
    data: soonDueExercises,
    isLoading: isSoonDueLoading,
    isError: isSoonDueError,
  } = useQuery({
    queryKey: ["soonDueExercises"],
    queryFn: () =>
      fetchData<SoonDueExercisesResponse>(
        "http://localhost:3000/exercises/users/soon-due"
      ),
  });
  const {
    data: classesList,
    isLoading: isClassesLoading,
    isError: isClassesError,
  } = useQuery({
    queryKey: ["userClasses"],
    queryFn: () =>
      fetchData<ClassesResponse>("http://localhost:3000/classes/users"),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading || isSoonDueLoading || isClassesLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isSoonDueError || isClassesError) {
    return <div>Error loading data</div>;
  }

  const [challengesData, exercisesData, classesData] = results.map(
    (result) => result.data
  );
  const firstThreeClasses = getFirstThreeClasses(classesList?.classes || []);

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 grid-flow-dense">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 grid-flow-dense justify-items-end">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 w-full max-w-7xl">
                {firstThreeClasses.map((classInfo, index) => (
                  <DisplayCard
                    key={index}
                    classInfo={classInfo}
                    className={index === 0 ? "col-span-2" : ""}
                  />
                ))}
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
                <ClassesListBoard classes={classesList?.classes || []} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex-1 place-items-center rounded-xl border border-zinc-200 text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 min-w-72 max-w-2xl">
                <DashboardNotificationBoard
                  title="Notifications"
                  description="Recent notifications from your classes"
                  exercises={soonDueExercises?.soon_due_exercises || []}
                />
              </div>
              <div className="flex-1 max-w-2xl min-w-72">
                <DashboardChart
                  challenges={{
                    done: challengesData?.done || 0,
                    total: challengesData?.total || 0,
                  }}
                  classes={{
                    done: classesData?.done || 0,
                    total: classesData?.total || 0,
                  }}
                  exercises={{
                    done: exercisesData?.done || 0,
                    total: exercisesData?.total || 0,
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
