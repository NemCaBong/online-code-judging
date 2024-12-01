import { AdminHeader } from "@/common/components/AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CardHeader,
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeMirrorEditor from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { gradingExerciseSchema } from "./schemas/grading.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "react-router-dom";
import fetchData from "@/utils/fetch-data.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Exercise,
  UserExerciseResults,
} from "@/pages/client/Dashboard/Dashboard";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageIdToTypeMap } from "@/common/constants/supported-language";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ENV } from "@/config/env.config";

interface ExercisesOfClassRes {
  message: string;
  statusCode: number;
  exercises: Exercise[];
}

interface UserExerciseResultsRes {
  message: string;
  statusCode: number;
  user_exercise_results: UserExerciseResults[];
  class: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ExerciseRes {
  message: string;
  statusCode: number;
  exercise: Exercise;
}

export function AdminGradingPage() {
  const { classSlug } = useParams();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null
  );
  const [selectedResult, setSelectedResult] =
    useState<UserExerciseResults | null>(null);

  const {
    data: exercisesOfClass,
    isLoading: isLoadingExercisesOfClass,
    isError: isErrorExercisesOfClass,
  } = useQuery({
    queryKey: ["exercisesOfClass", classSlug],
    queryFn: () =>
      fetchData<ExercisesOfClassRes>(
        `${ENV.API_URL}/exercises/classes/${classSlug}/get-all`
      ),
  });

  const {
    data: userExerciseResultsRes,
    isLoading: isLoadingUserExerciseResultsRes,
    isError: isErrorUserExerciseResultsRes,
    refetch: refetchExerciseDetails,
  } = useQuery({
    queryKey: ["exerciseDetails", selectedExerciseId],
    queryFn: () =>
      fetchData<UserExerciseResultsRes>(
        `${ENV.API_URL}/exercises/${selectedExerciseId}/classes/${classSlug}/user-exercise-results`
      ),
    enabled: !!selectedExerciseId,
  });

  const {
    data: exerciseRes,
    isLoading: isLoadingExerciseRes,
    isError: isErrorExerciseRes,
    refetch: refetchExercise,
  } = useQuery({
    queryKey: ["exercise", selectedExerciseId],
    queryFn: () =>
      fetchData<ExerciseRes>(`${ENV.API_URL}/exercises/${selectedExerciseId}`),
    enabled: !!selectedExerciseId,
  });

  const gradingExerciseForm = useForm<z.infer<typeof gradingExerciseSchema>>({
    resolver: zodResolver(gradingExerciseSchema),
    defaultValues: {
      score: "",
      evaluation: "",
    },
  });

  const evaluateExerciseMutation = useMutation({
    mutationFn: (values: z.infer<typeof gradingExerciseSchema>) =>
      axios
        .post(
          `${ENV.API_URL}/exercises/${selectedExerciseId}/classes/${classSlug}/user-exercise-results/${selectedResult?.id}/evaluate`,
          {
            evaluation: values.evaluation,
            score: values.score,
          },
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
    onSuccess: () => {
      toast.success("Exercise graded successfully");
      gradingExerciseForm.reset({ evaluation: "", score: "" });
      refetchExerciseDetails();
    },
    onError: (error) => {
      toast.error(`Error grading exercise: ${error.message}`);
      console.error(error);
    },
  });

  useEffect(() => {
    if (exercisesOfClass && exercisesOfClass.exercises.length > 0) {
      setSelectedExerciseId(exercisesOfClass.exercises[0].id.toString());
    }
  }, [exercisesOfClass]);

  useEffect(() => {
    if (
      userExerciseResultsRes &&
      userExerciseResultsRes.user_exercise_results.length > 0
    ) {
      setSelectedResult(userExerciseResultsRes.user_exercise_results[0]);
    }
  }, [userExerciseResultsRes]);

  if (
    isLoadingExercisesOfClass ||
    isLoadingUserExerciseResultsRes ||
    isLoadingExerciseRes
  ) {
    return <div>Loading...</div>;
  }

  if (
    isErrorExercisesOfClass ||
    isErrorUserExerciseResultsRes ||
    isErrorExerciseRes
  ) {
    return <div>Error</div>;
  }

  const handleSelectChange = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    refetchExerciseDetails();
    refetchExercise();
  };
  const handleSelectResult = (result: UserExerciseResults) => {
    setSelectedResult(result);
    gradingExerciseForm.reset({ evaluation: "", score: "" });
  };

  function onGradingExercise(values: z.infer<typeof gradingExerciseSchema>) {
    console.log(values);
    if (!selectedResult) {
      toast.error("Cannot grade exercise without selecting a submission");
      return;
    }
    if (!gradingExerciseForm.getValues().score) {
      toast.error("Score must be at least 0");
      return;
    }
    gradingExerciseForm.reset({ evaluation: "", score: "" });
    evaluateExerciseMutation.mutate(values);
  }

  const handleExportToZip = async () => {
    if (!selectedExerciseId) {
      toast.error("Please select an exercise to export.");
      return;
    }

    try {
      const response = await axios.get(
        `${ENV.API_URL}/exercises/export-to-zip?exerciseId=${selectedExerciseId}`,
        {
          responseType: "blob", // Important for downloading files
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `exercises_${selectedExerciseId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error exporting exercise: ${error.message ?? "Unknown"}`);
      console.error(error);
    }
  };

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4">
          <AdminHeader />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-7  sm:px-6 sm:py-0">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3 md:col-span-1 grid-flow-dense justify-items-end">
              <div className="grid w-full max-w-7xl">
                <ScrollArea className="h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
                  <Card className="border-hidden">
                    <CardHeader className="flex flex-row justify-between items-center pb-7">
                      <div>
                        <CardTitle className="text-base">
                          Exercises List
                        </CardTitle>
                        <CardDescription className="text-sm">
                          In {userExerciseResultsRes?.class.name || ""}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleExportToZip} className="w-28">
                          Export to zip
                        </Button>
                        <Select
                          defaultValue={selectedExerciseId || undefined}
                          onValueChange={(value) => handleSelectChange(value)}
                        >
                          <SelectTrigger className="w-56">
                            <SelectValue placeholder="Select an exercise" />
                          </SelectTrigger>
                          {exercisesOfClass &&
                          exercisesOfClass.exercises &&
                          exercisesOfClass.exercises.length > 0 ? (
                            <SelectContent>
                              {exercisesOfClass.exercises.map((exercise) => (
                                <SelectItem
                                  key={exercise.id}
                                  value={exercise.id.toString()}
                                >
                                  {exercise.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          ) : (
                            <SelectContent>
                              <SelectItem value="no-exercises" disabled>
                                No exercises available
                              </SelectItem>
                            </SelectContent>
                          )}
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {userExerciseResultsRes &&
                      userExerciseResultsRes?.user_exercise_results &&
                      userExerciseResultsRes.user_exercise_results.length ===
                        0 ? (
                        <p>Don't have any exercise submitted yet</p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {userExerciseResultsRes?.user_exercise_results?.map(
                            (item) => (
                              <button
                                key={item.id}
                                className={cn(
                                  "flex flex-col items-start gap-2 rounded-lg border text-left text-sm transition-all hover:bg-muted/40 p-4",
                                  selectedResult?.id === item.id && "bg-muted"
                                )}
                                onClick={() => handleSelectResult(item)}
                              >
                                <div className="flex w-full flex-col gap-1">
                                  <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                      {item.user ? (
                                        <div className="font-semibold">
                                          {item.user.first_name}{" "}
                                          {item.user.last_name}
                                        </div>
                                      ) : (
                                        <div className="font-semibold">
                                          Unknown User
                                        </div>
                                      )}
                                      {!(item.status === "graded") && (
                                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                      )}
                                    </div>
                                    <div
                                      className={cn(
                                        "ml-auto text-xs",
                                        selectedResult?.id === item.id
                                          ? "text-foreground"
                                          : "text-muted-foreground"
                                      )}
                                    >
                                      {item.submitted_at
                                        ? formatDistanceToNow(
                                            new Date(item.submitted_at),
                                            {
                                              addSuffix: true,
                                            }
                                          )
                                        : "Not done yet"}
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="text-xs font-medium">
                                      {item.user && item.user.email
                                        ? item.user.email
                                        : "Unknown email"}
                                    </div>
                                    <div className="ml-auto text-xs">
                                      Due:{" "}
                                      {exerciseRes?.exercise.due_at
                                        ? format(
                                            new Date(
                                              exerciseRes.exercise.due_at
                                            ),
                                            "PPpp"
                                          )
                                        : "No due date"}
                                    </div>
                                  </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                  {item.evaluation
                                    ? item.evaluation.substring(0, 300)
                                    : "No description"}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                  <Badge
                                    variant={
                                      item.status === "graded"
                                        ? "default"
                                        : item.status === "submitted"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                  <div
                                    className={cn(
                                      "text-xs font-semibold",
                                      parseFloat(item.score) >= 8
                                        ? "text-green-600"
                                        : parseFloat(item.score) >= 5
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    )}
                                  >
                                    Score: {item.score ?? "N/A"}
                                  </div>
                                </div>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col justify-between h-[91vh] gap-2 lg:col-span-4 md:col-span-1">
              <Form {...gradingExerciseForm}>
                <form
                  onSubmit={gradingExerciseForm.handleSubmit(onGradingExercise)}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-start">
                        <div className="flex items-start gap-4 text-base">
                          <Avatar>
                            <AvatarImage
                              alt={
                                (selectedResult?.user?.first_name ||
                                  "Unknown User") +
                                  " " +
                                  selectedResult?.user?.last_name || ""
                              }
                            />
                            <AvatarFallback>
                              {selectedResult?.user?.first_name?.charAt(0) ||
                                "U" +
                                  selectedResult?.user?.last_name?.charAt(0) ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <div className="font-semibold text-md">
                              {(selectedResult?.user?.first_name ||
                                "Unknown User") +
                                " " +
                                selectedResult?.user?.last_name || ""}{" "}
                            </div>
                            <div className="line-clamp-1 text-base">
                              {selectedResult?.user?.email || "Unknown email"}
                            </div>
                            {/* <div className="line-clamp-1 text-sm">11218459</div> */}
                          </div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {selectedResult?.submitted_at
                            ? format(
                                new Date(selectedResult.submitted_at),
                                "PPpp"
                              )
                            : "Not done yet"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[60vh] pb-0">
                      {selectedResult &&
                      selectedResult.user_exercise_details &&
                      selectedResult.user_exercise_details.length > 0 ? (
                        <Tabs
                          defaultValue={
                            selectedResult.user_exercise_details[0].file_name
                          }
                        >
                          <TabsList>
                            {selectedResult.user_exercise_details.map(
                              (detail) => (
                                <TabsTrigger
                                  key={detail.id}
                                  value={detail.file_name}
                                >
                                  {detail.file_name}
                                </TabsTrigger>
                              )
                            )}
                          </TabsList>
                          {selectedResult.user_exercise_details.map(
                            (detail) => (
                              <TabsContent
                                key={detail.id}
                                value={detail.file_name}
                              >
                                <CodeMirrorEditor
                                  value={detail.code}
                                  language={
                                    LanguageIdToTypeMap[detail.language_id]
                                  }
                                  className="h-[53vh]"
                                  editable={false}
                                />
                              </TabsContent>
                            )
                          )}
                        </Tabs>
                      ) : (
                        <p>No code details available.</p>
                      )}
                    </CardContent>
                    <Separator />
                    <CardFooter className="block h-[19.5vh] pb-0">
                      <div className="pt-4">
                        <div className="grid gap-4">
                          <FormField
                            control={gradingExerciseForm.control}
                            name="evaluation"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    className="p-4 h-[8vh] resize-none"
                                    placeholder={`Review ${
                                      selectedResult?.user?.first_name || "User"
                                    }'s submission...`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center">
                            <div className="ml-auto"></div>
                            <FormField
                              control={gradingExerciseForm.control}
                              name="score"
                              render={({ field }) => (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Grade</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Grade submission
                                      </DialogTitle>
                                      <DialogDescription>
                                        Score this submission from 0 to 10.
                                        Click send when you're done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">
                                          Score
                                        </FormLabel>
                                        <Input
                                          id="score"
                                          className="col-span-3"
                                          type="number"
                                          {...field}
                                        />
                                      </div>
                                      <FormMessage />
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          variant="secondary"
                                        >
                                          Close
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            />{" "}
                            <Button type="submit" className="ml-4">
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </ScrollArea>
  );
}
