import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/multi-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addExerciseSchema } from "../schemas/add-exercise.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type AddExerciseFormValues = z.infer<typeof addExerciseSchema>;

interface AddExercisesDialogProps {
  exercises: Option[];
}

export function AddExercisesDialog({ exercises }: AddExercisesDialogProps) {
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: {
      exercises: [],
      dueDate: setMilliseconds(
        setSeconds(setMinutes(setHours(new Date(), 23), 59), 59),
        999
      ),
    },
  });

  function onAddExercises(values: z.infer<typeof addExerciseSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-10 py-4">
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vh] h-max" autoFocus={true}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddExercises)}>
            <DialogHeader className="mb-4">
              <DialogTitle>Add Exercise</DialogTitle>
              <DialogDescription>
                Choose one or more exercises to assign to this class.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-4">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[250px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "do MMM yy 'at' HH:mm")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            const endOfDay = setMilliseconds(
                              setSeconds(
                                setMinutes(setHours(date, 23), 59),
                                59
                              ),
                              999
                            );
                            field.onChange(endOfDay);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exercises"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel htmlFor="exercises">Exercises</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      options={exercises}
                      {...field}
                      badgeClassName="text-sm"
                      placeholder="Select exercises ..."
                      hidePlaceholderWhenSelected={true}
                      emptyIndicator={
                        <p className="text-center text-base leading-6 text-gray-600 dark:text-gray-400">
                          No results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="mt-4" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
