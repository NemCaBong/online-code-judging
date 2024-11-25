import { AdminHeader } from "@/common/components/AdminHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/multi-select";
import "@/common/styles/MDEditor.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClassSchema } from "./schemas/create-class.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";
import fetchData from "@/utils/fetch-data.utils";
import { ENV } from "@/config/env.config";

type CreateClass = z.infer<typeof createClassSchema>;

interface StudentsDataRes {
  message: string;
  statusCode: number;
  students: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }[];
}

interface TeachersDataRes {
  message: string;
  statusCode: number;
  teachers: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
}

export function AdminCreateClass() {
  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () =>
      fetchData<StudentsDataRes>(`${ENV.API_URL}/users/students/list`),
  });

  const {
    data: teachersData,
    isLoading: isLoadingTeachers,
    isError: isErrorTeachers,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      fetchData<TeachersDataRes>(`${ENV.API_URL}/users/teachers/list`),
  });

  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
      students: [],
      teacher_id: "",
    },
  });

  const createClassMutation = useMutation<
    AxiosResponse<{ message: string; statusCode: number }>,
    Error,
    CreateClass
  >({
    mutationFn: (newClass: CreateClass) => {
      return axios.post(`${ENV.API_URL}/classes/create`, newClass, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    },
    onSuccess: async (_) => {
      toast.success("Successfully create a new class.", {
        position: "top-right",
        autoClose: 5000,
      });
    },
    onError: (error) => {
      toast.error(`Error creating a new class. ${error}`, {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error running code:", error);
    },
  });

  if (isLoadingStudents || isLoadingTeachers) {
    return <div>Loading...</div>;
  }

  if (isErrorStudents || isErrorTeachers) {
    return <div>Error loading students data</div>;
  }

  const studentOptions: Option[] =
    studentsData?.students.map((student) => ({
      label: `${student.first_name} ${student.last_name} - ${student.email}`,
      value: student.id.toString(),
      id: student.id,
    })) || [];

  const teacherOptions: Option[] =
    teachersData?.teachers.map((teacher) => ({
      label: `${teacher.first_name} ${teacher.last_name}`,
      value: teacher.id.toString(),
      id: teacher.id,
    })) || [];

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof createClassSchema>) {
    createClassMutation.mutate(values);
  }

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4">
          <AdminHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:grow-0 mb-10">
                  Create Class
                </h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-[100dvh] mx-auto"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Class Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter class's name here ...."
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormDescription>Name of this class</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="students"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Students
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            defaultOptions={studentOptions}
                            {...field}
                            badgeClassName="text-sm"
                            placeholder="Select students ..."
                            hidePlaceholderWhenSelected={true}
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                No results found.
                              </p>
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Add students to this class
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teacher_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold">
                          Teacher
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a teacher" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {teacherOptions.length > 0 ? (
                                teacherOptions.map((teacher) => (
                                  <SelectItem
                                    key={teacher.id as number}
                                    value={teacher.value}
                                  >
                                    {teacher.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="" disabled>
                                  No teachers available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Add teacher to this class
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
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
