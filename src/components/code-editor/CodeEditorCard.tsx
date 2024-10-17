import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CodeMirrorEditor from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { codeEditorSchema } from "@/utils/code-editor.schemas";
import { LanguageIdToTypeMap } from "@/common/constants/supported-language";

type CodeEditorCardProps = {
  onRun: (values: z.infer<typeof codeEditorSchema>) => void;
  onSubmit: (values: z.infer<typeof codeEditorSchema>) => void;
};

export function CodeEditorCard({ onRun, onSubmit }: CodeEditorCardProps) {
  const form = useForm<z.infer<typeof codeEditorSchema>>({
    resolver: zodResolver(codeEditorSchema),
    defaultValues: {
      languageId: "63",
      code: "// Your code here",
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Code Editor</CardTitle>
        <div className="flex items-center gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="63">JavaScript</SelectItem>
                    <SelectItem value="71">Python</SelectItem>
                    <SelectItem value="54">Java</SelectItem>
                    <SelectItem value="62">C++</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Form>
          <Button className="text-xs" onClick={form.handleSubmit(onRun)}>
            Run
          </Button>
          <Button
            className="text-xs"
            variant="secondary"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CodeMirrorEditor
                      value={field.value}
                      language={
                        LanguageIdToTypeMap[
                          form.watch(
                            "languageId"
                          ) as keyof typeof LanguageIdToTypeMap
                        ]
                      }
                      className="h-[45vh]"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
