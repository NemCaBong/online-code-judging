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

const studentsData: Option[] = [
  { label: "Nguyễn Văn An", value: "1", id: 1 },
  { label: "Trần Thị Bình", value: "2", id: 2 },
  { label: "Lê Hoàng Cường", value: "3", id: 3 },
  { label: "Phạm Minh Dung", value: "4", id: 4 },
  { label: "Hoàng Thị Em", value: "5", id: 5 },
];

const teachersData: Option[] = [
  { label: "Nguyễn Văn A", value: "10", id: 10 },
  { label: "Trần Thị B", value: "8", id: 8 },
  { label: "Lê Hoàng C", value: "13", id: 13 },
];

export function AdminCreateClass() {
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
      students: [],
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof createClassSchema>) {
    console.log(values);
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
                            defaultOptions={studentsData}
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
                          Students
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a teacher" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {teachersData.map((teacher) => (
                                <SelectItem
                                  key={teacher.id as number}
                                  value={teacher.value}
                                >
                                  {teacher.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Add students to this class
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
    </ScrollArea>
  );
}
