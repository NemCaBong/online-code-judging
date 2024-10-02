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
import CodeMirrorEditor, {
  LanguageType,
} from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { codeEditorSchema } from "@/utils/code-editor.schemas";

type CodeEditorCardProps = {
  onRun: (values: z.infer<typeof codeEditorSchema>) => void;
  onSubmit: (values: z.infer<typeof codeEditorSchema>) => void;
};

export function CodeEditorCard({ onRun, onSubmit }: CodeEditorCardProps) {
  const form = useForm<z.infer<typeof codeEditorSchema>>({
    resolver: zodResolver(codeEditorSchema),
    defaultValues: {
      language: "javascript",
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
              name="language"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
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
                      language={form.watch("language") as LanguageType}
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
