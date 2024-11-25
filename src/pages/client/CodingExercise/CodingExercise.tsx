import { Header } from "@/common/components/Header";
import { Sidebar } from "@/common/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseFormSchemaType,
  exerciseFormSchema,
} from "./schemas/code.schema";
import OutputCard from "./components/OutputCard";
import ExerciseEditor from "./components/ExerciseEditor";
import ExerciseDescriptionCard from "./components/ExerciseDescriptionCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/fetch-data.utils";
import { Exercise } from "../Dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { LanguageIdToTypeMap } from "@/common/constants/supported-language";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { ENV } from "@/config/env.config";

interface IExerciseRes {
  message: string;
  statusCode: number;
  exercise: Exercise;
}

interface RunExerciseRes {
  message: string;
  statusCode: number;
  result: {
    stdout: string | null;
    time: string;
    memory: number;
    stderr: string | null;
    token: string;
    compile_output: string | null;
    message: string | null;
    status: {
      id: number;
      description: string;
    };
  };
}

interface ISuccessRes {
  message: string;
  statusCode: number;
}

export function CodingExercise() {
  const { classSlug, exerciseId } = useParams();
  const {
    data: exerciseRes,
    isLoading: isLoadingExercise,
    isError: isErrorExercise,
    refetch: refetchExercise,
  } = useQuery({
    queryKey: ["exercise"],
    queryFn: () =>
      fetchData<IExerciseRes>(
        `${ENV.API_URL}/classes/${classSlug}/exercises/${exerciseId}`
      ),
  });

  const runCodeMutation = useMutation({
    mutationFn: (values: ExerciseFormSchemaType) =>
      axios
        .post<RunExerciseRes>(
          `${ENV.API_URL}/exercises/${exerciseId}/run`,
          { codes: values.codes },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          return response.data;
        }),
    onSuccess: (_) => {
      toast.success("Code run successfully");
    },
    onError: (error) => {
      toast.error(`Error running code: ${error.message}`);
    },
  });

  const submitExerciseCodeMutation = useMutation({
    mutationFn: (values: ExerciseFormSchemaType) =>
      axios
        .post<ISuccessRes>(
          `${ENV.API_URL}/exercises/${exerciseId}/classes/${classSlug}/submit`,
          { codes: values.codes },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          console.log("submitData: ", response.data);
          return response.data;
        }),
    onSuccess: (data) => {
      toast.success(
        "Submission successful, you must wait for teacher to grade your submission"
      );
      console.log("Submission successfully:", data);
      refetchExercise();
    },
    onError: (error) => {
      toast.error(`Error submit code: ${error.message}. Try again later!`);
      console.error("Error submitting code: ", error);
    },
  });

  const codes = (
    exerciseRes?.exercise.user_exercise_results[0]?.status === "submitted" ||
    exerciseRes?.exercise.user_exercise_results[0]?.status === "graded"
      ? exerciseRes?.exercise.user_exercise_results[0]?.user_exercise_details ||
        []
      : exerciseRes?.exercise.exercise_details || []
  ).map((detail) => ({
    id: detail.id,
    language_id: detail.language_id,
    boilerplate_code:
      "boilerplate_code" in detail ? detail.boilerplate_code : detail.code,
    file_name:
      detail.file_name || `main.${LanguageIdToTypeMap[detail.language_id]}`,
  }));

  const form = useForm<ExerciseFormSchemaType>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      codes,
    },
  });

  useEffect(() => {
    if (exerciseRes) {
      form.reset({
        codes: (exerciseRes?.exercise.user_exercise_results[0]?.status ===
          "submitted" ||
        exerciseRes?.exercise.user_exercise_results[0]?.status === "graded"
          ? exerciseRes?.exercise.user_exercise_results[0]
              ?.user_exercise_details || []
          : exerciseRes?.exercise.exercise_details || []
        ).map((detail) => ({
          id: detail.id,
          language_id: detail.language_id,
          boilerplate_code:
            "boilerplate_code" in detail
              ? detail.boilerplate_code
              : detail.code,
          file_name:
            detail.file_name ||
            `main.${LanguageIdToTypeMap[detail.language_id]}`,
        })),
      });
    }
  }, [exerciseRes, form]);

  if (isLoadingExercise) {
    return <div>Loading...</div>;
  }
  if (isErrorExercise) {
    return <div>Error...</div>;
  }
  if (!exerciseRes) {
    return <div>No exercise found</div>;
  }

  function onRun(values: ExerciseFormSchemaType) {
    runCodeMutation.mutate(values);
  }

  function onSubmit(values: ExerciseFormSchemaType) {
    submitExerciseCodeMutation.mutate(values);
    console.log("Submitting code:", values);
  }

  console.log("exerciseRes", exerciseRes);

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
          <Header pathString={`classes/${classSlug}/exercises`} />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0 h-[91vh]">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end h-full">
              <ExerciseDescriptionCard
                title={exerciseRes.exercise.name}
                markdownContent={exerciseRes.exercise.description}
                evaluationContent={
                  exerciseRes.exercise.user_exercise_results[0]?.evaluation ||
                  "No evaluation available"
                }
                score={exerciseRes.exercise.user_exercise_results[0]?.score}
                userStatus={
                  (exerciseRes.exercise.user_exercise_results.length > 0 &&
                    exerciseRes.exercise?.user_exercise_results[0]?.status) ||
                  "not-done"
                }
                submittedAt={
                  (exerciseRes.exercise.user_exercise_results.length > 0 &&
                    exerciseRes.exercise?.user_exercise_results[0]
                      ?.submitted_at) ||
                  undefined
                }
              />
            </div>
            <div className="flex flex-col justify-between h-full min-h-[50vh] gap-2">
              <ExerciseEditor
                form={form}
                onRun={onRun}
                onSubmit={onSubmit}
                codesFields={codes}
                userExerciseResults={exerciseRes.exercise.user_exercise_results}
              />
              <OutputCard
                isLoading={runCodeMutation.isPending}
                output={
                  runCodeMutation.data?.result.stderr ||
                  runCodeMutation.data?.result.stdout ||
                  runCodeMutation.data?.result.compile_output ||
                  undefined
                }
                isError={!!runCodeMutation.data?.result.stderr}
                time={runCodeMutation.data?.result.time}
                memory={runCodeMutation.data?.result.memory}
                status={runCodeMutation.data?.result.status}
              />
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </ScrollArea>
  );
}
