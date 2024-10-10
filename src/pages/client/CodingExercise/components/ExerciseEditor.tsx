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
import CodeMirrorEditor, {
  LanguageType,
} from "../../CodingChallengeDetail/components/CodeMirrorEditor";
import { ExerciseFormSchemaType } from "../schemas/code.schema";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";

interface ExerciseEditorProps {
  form: UseFormReturn<ExerciseFormSchemaType>;
  codesFields: FieldArrayWithId<
    {
      codes: {
        language: string;
        code: string;
        fileName: string;
      }[];
    },
    "codes",
    "id"
  >[];
  onRun: (values: ExerciseFormSchemaType) => void;
  onSubmit: (values: ExerciseFormSchemaType) => void;
}

export default function ExerciseEditor({
  form,
  codesFields,
  onRun,
  onSubmit,
}: ExerciseEditorProps) {
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Code Editor</CardTitle>
            <div className="flex gap-4">
              <Button
                type="button"
                className="text-xs"
                onClick={form.handleSubmit(onRun)}
              >
                Run
              </Button>
              <Button
                type="submit"
                className="text-xs"
                variant="secondary"
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={codesFields[0].fileName}>
              <FormField
                control={form.control}
                name="codes"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <TabsList>
                        {codesFields.map((field) => (
                          <TabsTrigger key={field.id} value={field.fileName}>
                            {field.fileName}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </FormControl>
                  </FormItem>
                )}
              />
              {codesFields.map((field, index) => (
                <TabsContent key={field.id} value={field.fileName}>
                  <FormField
                    control={form.control}
                    name={`codes.${index}.code`}
                    render={({ field: codeField }) => (
                      <FormItem>
                        <FormControl>
                          <CodeMirrorEditor
                            value={codeField.value}
                            onChange={codeField.onChange}
                            language={field.language as LanguageType}
                            className="h-[40vh]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
