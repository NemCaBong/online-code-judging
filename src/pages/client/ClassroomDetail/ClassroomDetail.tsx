import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { PostCard } from "../../../components/classroom/PostCard";
import GradedExercises from "@/components/classroom/GradedExercises";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExercisesTable from "@/components/classroom/ExerciseTable";
import ScoreChart from "@/components/classroom/ScoreChart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import fetchData from "@/utils/fetch-data.utils";
import { Class, Exercise } from "../Dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { AddPostDialog } from "./components/AddPostDialog";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

interface ClassRes {
  message: string;
  statusCode: number;
  class: Class;
}

interface ExerciseRes {
  message: string;
  statusCode: number;
  assigned_exercises: Exercise[];
}

export interface UserExerciseResult {
  id: number;
  status: string;
  score: string;
  evaluation: string;
  user_id: number;
  exercise_id: number;
  class_id: number;
  submitted_at: Date;
  exercise: Exercise;
}

interface GradedExercisesRes {
  message: string;
  statusCode: number;
  graded_exercises: UserExerciseResult[];
}

interface ScoreChartRes {
  message: string;
  statusCode: number;
  avg_score: number;
}

export function ClassroomDetail() {
  const { classSlug } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: classRes,
    isLoading,
    error,
    refetch: refetchClass,
  } = useQuery({
    queryKey: ["class", classSlug],
    queryFn: () =>
      fetchData<ClassRes>(`http://localhost:3000/classes/${classSlug}`),
  });

  const {
    data: assignedExercisesRes,
    isLoading: isLoadingAssigned,
    error: isErrorAssigned,
  } = useQuery({
    queryKey: ["exercises", classSlug],
    queryFn: () =>
      fetchData<ExerciseRes>(
        `http://localhost:3000/exercises/users/classes/${classSlug}/assigned`
      ),
  });

  const {
    data: gradedExercisesRes,
    isLoading: isLoadingGraded,
    error: isErrorGraded,
  } = useQuery({
    queryKey: ["graded-exercises", classSlug],
    queryFn: () =>
      fetchData<GradedExercisesRes>(
        `http://localhost:3000/exercises/users/classes/${classSlug}/graded`
      ),
  });

  const {
    data: scoreChartRes,
    isLoading: isLoadingScoreChart,
    error: isErrorScoreChart,
  } = useQuery({
    queryKey: ["score-chart", classSlug],
    queryFn: () =>
      fetchData<ScoreChartRes>(
        `http://localhost:3000/exercises/users/classes/${classSlug}/avg-score`
      ),
  });

  const addPostMutation = useMutation({
    mutationFn: (newPost: { content: string }) =>
      axios
        .post(
          `http://localhost:3000/posts/create?classSlug=${classSlug}`,
          newPost,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          return res.data;
        }),
    onSuccess: () => {
      toast.success("Post created successfully!");
      refetchClass();
    },
    onError: (error) => {
      toast.error(`Error creating post: ${error.message}`);
      console.log(error);
    },
  });

  if (isLoading || isLoadingAssigned || isLoadingGraded || isLoadingScoreChart)
    return <div>Loading...</div>;

  if (error || isErrorAssigned || isErrorGraded || isErrorScoreChart)
    return <div>Error loading class</div>;

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
                {["TEACHER"].includes(user?.role) && (
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Link
                      to={`/admin/create-exercise`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="secondary">Add Exercise</Button>
                    </Link>
                    <Link to={`/admin/classes/${classSlug}/grading`}>
                      <Button variant="secondary" className="h-10 py-4">
                        Grade Exercises
                      </Button>
                    </Link>
                    <AddPostDialog onSubmitPost={addPostMutation.mutate} />
                  </div>
                )}
              </div>
              <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="grid auto-rows-max items-start gap-4">
                  {classData.posts && classData.posts.length > 0 && (
                    <>
                      {classData.posts.map((post, idx) => (
                        <PostCard
                          key={idx}
                          teacher={classData?.teacher || null}
                          post={post}
                        />
                      ))}
                    </>
                  )}
                </div>
                <div className="grid auto-rows-max items-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <ScoreChart avg_score={scoreChartRes?.avg_score || 0} />
                  <ExercisesTable
                    assignedExercises={
                      assignedExercisesRes?.assigned_exercises || []
                    }
                  />
                  <GradedExercises
                    gradedUserExerciseRes={
                      gradedExercisesRes?.graded_exercises || []
                    }
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </ScrollArea>
  );
}
