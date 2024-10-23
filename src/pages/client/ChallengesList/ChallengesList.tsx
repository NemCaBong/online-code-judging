import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { DataTable } from "./components/DataTable";
import SummaryChart from "./components/SummaryChart";
import fetchData from "@/utils/fetch-data.utils";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ChartRes } from "../Dashboard/Dashboard";
import TodoChallengeBoard from "./components/TodoChallengeBoard";

export interface Todo {
  id: number;
  created_at: Date;
  is_done: boolean;
  challenge: {
    id: number;
    name: string;
    difficulty: "HARD" | "MEDIUM" | "EASY";
    slug: string;
  };
}

interface TodoRes {
  message: string;
  statusCode: number;
  todos: Todo[];
}

export interface ChallengeWithUserStatus {
  id: number;
  name: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  slug: string;
  created_at: Date;
  user_challenge_results: {
    status: "done" | "to-do" | "not-done";
  }[];
  tags: { id: number; name: string }[];
  total_attempts: number;
  accepted_results: number;
}
interface ChallengesWithUserStatusRes {
  message: string;
  statusCode: number;
  challenges: ChallengeWithUserStatus[];
}

export function ChallengesList() {
  const results = useQueries({
    queries: ["easy", "medium", "hard"].map((difficulty) => ({
      queryKey: ["challengeData", difficulty],
      queryFn: () =>
        fetchData<ChartRes>(
          `http://localhost:3000/challenges/info/done-and-total-${difficulty}`
        ),
    })),
  });

  const {
    data: todoChallenges,
    isLoading: isTodoLoading,
    isError: isTodoError,
  } = useQuery({
    queryKey: ["to-do"],
    queryFn: () =>
      fetchData<TodoRes>("http://localhost:3000/challenges/to-do/all"),
  });

  const {
    data: challengesList,
    isLoading: isChallengesLoading,
    isError: isErrorChallengeList,
  } = useQuery({
    queryKey: ["challenges"],
    queryFn: () =>
      fetchData<ChallengesWithUserStatusRes>(
        "http://localhost:3000/challenges/users/list"
      ),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.find((result) => result.error)?.error;

  if (isLoading || isTodoLoading || isChallengesLoading) {
    return <p>Loading ...</p>;
  }

  if (isError || isTodoError || isErrorChallengeList) {
    return (
      <p>Error: {error?.message || "An error occurred while fetching data."}</p>
    );
  }

  const [easyData, mediumData, hardData] = results.map((res) => res.data);

  const summaryData = {
    easy: easyData?.done || 0,
    medium: mediumData?.done || 0,
    hard: hardData?.done || 0,
  };
  const activityData = [
    {
      activity: "easy",
      value: easyData?.total ? (summaryData.easy / easyData.total) * 100 : 0,
      label: `${summaryData.easy} / ${easyData?.total || 0}`,
      fill: "var(--color-easy)",
    },
    {
      activity: "medium",
      value: mediumData?.total
        ? (summaryData.medium / mediumData.total) * 100
        : 0,
      label: `${summaryData.medium} / ${mediumData?.total || 0}`,
      fill: "var(--color-medium)",
    },
    {
      activity: "hard",
      value: hardData?.total ? (summaryData.hard / hardData.total) * 100 : 0,
      label: `${summaryData.hard} / ${hardData?.total || 0}`,
      fill: "var(--color-hard)",
    },
  ];

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header pathString="challenges-list" />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 grid-flow-dense">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 grid-flow-dense justify-items-end">
              <div className="w-full max-w-7xl">
                <DataTable challenges={challengesList?.challenges || []} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex-1 place-items-center rounded-xl border border-zinc-200 text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 min-w-72 max-w-2xl">
                <TodoChallengeBoard
                  title="Todos"
                  description="Manage your todos"
                  todos={todoChallenges?.todos || []}
                />
              </div>
              <div className="flex-1 max-w-2xl min-w-72">
                <SummaryChart
                  activityData={activityData}
                  summaryData={summaryData}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
