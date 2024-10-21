import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { PostCard } from "../../../components/classroom/PostCard";
import GradedExercises from "@/components/classroom/GradedExercises";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExercisesTable from "@/components/classroom/ExerciseTable";
import ScoreChart from "@/components/classroom/ScoreChart";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchData from "@/utils/fetch-data.utils";
import { Class } from "../Dashboard/Dashboard";

interface ClassRes {
  message: string;
  statusCode: number;
  class: Class;
}

export function ClassroomDetail() {
  const { classSlug } = useParams();
  const {
    data: classRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["class", classSlug],
    queryFn: () =>
      fetchData<ClassRes>(`http://localhost:3000/classes/${classSlug}`),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading class</div>;
  const classData = classRes?.class;
  if (!classData) return <div>No class available</div>;

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header pathString="classroom/hello/world/damn" />
          <main className="grid flex-1 items-start gap-4 p-2 sm:px-4 md:px-6 lg:px-8">
            <div className="mx-auto grid w-full max-w-[1600px] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight sm:grow-0">
                  {classData.name}
                </h1>
                <Badge
                  variant={classData.is_done ? "destructive" : "default"}
                  className="ml-auto sm:ml-0"
                >
                  {classData.is_done ? "Closed" : "On-going"}
                </Badge>
              </div>
              <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="grid auto-rows-max items-start gap-4">
                  {classData.posts && classData.posts.length > 0 && (
                    <>
                      {classData.posts.map((post) => (
                        <PostCard teacher={classData.teacher} post={post} />
                      ))}
                    </>
                  )}
                </div>
                <div className="grid auto-rows-max items-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <ScoreChart />
                  <ExercisesTable />
                  <GradedExercises />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
