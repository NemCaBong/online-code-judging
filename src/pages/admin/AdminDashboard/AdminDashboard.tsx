import { Code, FileJson2, School, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartDashboard } from "./components/BarChart";
import { PieChartDashboard } from "./components/PieChart";
import { AdminHeader } from "@/common/components/AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueries, useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetch-data.utils";
import { ENV } from "@/config/env.config";

interface TotalAndLastMonthRes {
  total: number;
  last_month_total: number;
  message: string;
  statusCode: number;
}

export interface TotalChallengeByDifficultyRes {
  message: string;
  statusCode: number;
  total: number;
}
export interface StatisticSubmission {
  month: string;
  accept: number;
  total: number;
}
interface SubmissionOverQuaterRes {
  message: string;
  statusCode: number;
  statistics: StatisticSubmission[];
}

export function AdminDashboard() {
  const results = useQueries({
    queries: ["classes", "users", "challenges", "exercises"].map(
      (queryKey) => ({
        queryKey: [`${queryKey}`],
        queryFn: () =>
          fetchData<TotalAndLastMonthRes>(
            `${ENV.API_URL}/${queryKey}/info/total-and-last-month`
          ),
      })
    ),
  });

  const pieChartQueries = useQueries({
    queries: ["easy", "medium", "hard"].map((queryKey) => ({
      queryKey: [`${queryKey}`],
      queryFn: () =>
        fetchData<TotalAndLastMonthRes>(
          `${ENV.API_URL}/challenges/info/total-${queryKey}`
        ),
    })),
  });

  const {
    data: statisticsData,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useQuery({
    queryKey: ["statistic"],
    queryFn: () =>
      fetchData<SubmissionOverQuaterRes>(
        `${ENV.API_URL}/challenges/info/submissions-last-quaterly`
      ),
  });

  const isLoading = [...pieChartQueries, ...results].some(
    (result) => result.isLoading
  );
  const isError = [...pieChartQueries, ...results].some(
    (result) => result.isError
  );
  const error = [...pieChartQueries, ...results].find(
    (result) => result.error
  )?.error;

  if (isLoading || isStatisticsLoading) {
    return <p>Loading ...</p>;
  }

  if (isError || isStatisticsError) {
    return <p>Error: {error?.message}</p>;
  }

  const [classes, students, challenges, exercises] = results.map(
    (result) => result.data
  );

  const [easy, medium, hard] = pieChartQueries.map((result) => result.data);

  const pieChartData = {
    easy: easy?.total || 0,
    medium: medium?.total || 0,
    hard: hard?.total || 0,
  };

  return (
    <ScrollArea className="h-[100vh]">
      <div className="flex min-h-screen w-full flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4 overflow-hidden h-[calc(100vh-64px)]">
          <h1 className="font-semibold text-2xl">Admin Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0" className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Classes
                </CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classes?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {(classes?.total && classes?.last_month_total
                    ? ((classes.total - classes.last_month_total) /
                        classes.last_month_total) *
                      100
                    : 0
                  ).toFixed(1)}
                  % from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students?.total}</div>
                <p className="text-xs text-muted-foreground">
                  {(students?.total && students?.last_month_total
                    ? ((students.total - students.last_month_total) /
                        students.last_month_total) *
                      100
                    : 0
                  ).toFixed(1)}{" "}
                  % from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Challenges
                </CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{challenges?.total}</div>
                <p className="text-xs text-muted-foreground">
                  {(challenges?.total && challenges?.last_month_total
                    ? ((challenges.total - challenges.last_month_total) /
                        challenges.last_month_total) *
                      100
                    : 0
                  ).toFixed(1)}
                  % from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Exercises
                </CardTitle>
                <FileJson2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exercises?.total}</div>
                <p className="text-xs text-muted-foreground">
                  {(exercises?.total && exercises?.last_month_total
                    ? ((exercises.total - exercises.last_month_total) /
                        exercises.last_month_total) *
                      100
                    : 0
                  ).toFixed(1)}
                  % since last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            <PieChartDashboard data={pieChartData} />
            <BarChartDashboard chartData={statisticsData?.statistics || []} />
          </div>
        </main>
      </div>
    </ScrollArea>
  );
}
