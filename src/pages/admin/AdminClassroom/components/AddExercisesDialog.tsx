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

type AddExerciseFormValues = z.infer<typeof addExerciseSchema>;

interface AddExercisesDialogProps {
  exercises: Option[];
}

export function AddExercisesDialog({ exercises }: AddExercisesDialogProps) {
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: {
      exercises: [],
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
              name="exercises"
              render={({ field }) => (
                <FormItem>
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
                      triggerSearchOnFocus={true}
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
