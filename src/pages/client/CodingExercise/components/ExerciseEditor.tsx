// src/pages/client/CodingExercise/components/ExerciseEditor.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeMirrorEditor from "../../CodingChallengeDetail/components/CodeMirrorEditor";
import { ExerciseFormSchemaType } from "../schemas/code.schema";
import { UseFormReturn } from "react-hook-form";
import { LanguageIdToTypeMap } from "@/common/constants/supported-language";

interface ExerciseEditorProps {
  form: UseFormReturn<ExerciseFormSchemaType>;
  codesFields: {
    id: number;
    file_name: string;
    language_id: number;
    boilerplate_code: string;
  }[];
  onRun: (values: ExerciseFormSchemaType) => void;
  onSubmit: (values: ExerciseFormSchemaType) => void;
  userExerciseResults: {
    score: string;
    status: string;
    evaluation: string;
    user_id: number;
    exercise_id: number;
    class_id: number;
    submitted_at: string;
    id: number;
    user_exercise_details?: {
      id: number;
      user_exercise_id: number;
      code: string;
      file_name: string;
      language_id: number;
    }[];
  }[];
}

export default function ExerciseEditor({
  form,
  codesFields,
  onRun,
  onSubmit,
  userExerciseResults,
}: ExerciseEditorProps) {
  const isSubmitted =
    (userExerciseResults.length > 0 &&
      (userExerciseResults[0].status === "submitted" ||
        userExerciseResults[0].status === "graded")) ||
    false;
  console.log("isSubmitted: ", userExerciseResults.length > 0);
  const cannotBeSubmitted = codesFields.length <= 0;

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Code Editor</CardTitle>
            <div className="flex gap-4">
              <Button
                disabled={isSubmitted || cannotBeSubmitted}
                type="button"
                className="text-xs"
                onClick={() => {
                  const formValues = form.getValues();
                  onRun(formValues);
                }}
              >
                Run
              </Button>
              <Button
                disabled={isSubmitted || cannotBeSubmitted}
                type="submit"
                className="text-xs"
                variant="secondary"
                onClick={() => {
                  const formValues = form.getValues();
                  onSubmit(formValues);
                }}
              >
                Submit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {codesFields.length <= 0 ? (
              <p>No exercise details found. Try again later!</p>
            ) : (
              <Tabs defaultValue={codesFields[0].file_name}>
                <FormField
                  control={form.control}
                  name="codes"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <TabsList>
                          {codesFields.map((field) => (
                            <TabsTrigger key={field.id} value={field.file_name}>
                              {field.file_name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {codesFields.map((field, index) => (
                  <TabsContent key={field.id} value={field.file_name}>
                    <FormField
                      control={form.control}
                      name={`codes.${index}.boilerplate_code`}
                      render={({ field: codeField }) => (
                        <FormItem>
                          <FormControl>
                            <CodeMirrorEditor
                              value={codeField.value}
                              onChange={codeField.onChange}
                              language={LanguageIdToTypeMap[field.language_id]}
                              className="h-[40vh]"
                              editable={!isSubmitted}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
