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
import { capitalizeFirstLetter } from "@/utils/string.utils";

type CodeEditorCardProps = {
  onRun: (values: z.infer<typeof codeEditorSchema>) => void;
  onSubmit: (values: z.infer<typeof codeEditorSchema>) => void;
  challengeDetails: {
    id: number;
    language_id: number;
    boilerplate_code: string;
  }[];
  availableLanguages: number[];
};

// Function to replace escape sequences
function formatBoilerplateCode(code: string): string {
  // Use a mapping of escape sequences to their replacements
  const escapeSequences: { [key: string]: string } = {
    "\\n": "\n",
    "\\t": "\t",
    "\\r": "\r",
    "\\\\": "\\",
    '\\"': '"',
    "\\'": "'",
  };

  // Use a regular expression to replace all escape sequences
  return code.replace(
    /\\[ntr\\'"]/g,
    (match) => escapeSequences[match] || match
  );
}

export function CodeEditorCard({
  onRun,
  onSubmit,
  challengeDetails,
  availableLanguages,
}: CodeEditorCardProps) {
  const form = useForm<z.infer<typeof codeEditorSchema>>({
    resolver: zodResolver(codeEditorSchema),
    defaultValues: {
      languageId: availableLanguages[0]?.toString() || "63",
      code: formatBoilerplateCode(
        challengeDetails.find(
          (detail) =>
            detail.language_id.toString() === availableLanguages[0]?.toString()
        )?.boilerplate_code || "// Your code here"
      ),
    },
  });

  const handleLanguageChange = (languageId: string) => {
    const selectedDetail = challengeDetails.find(
      (detail) => detail.language_id.toString() === languageId
    );
    form.setValue(
      "code",
      formatBoilerplateCode(
        selectedDetail?.boilerplate_code || "// Your code here"
      )
    );
  };

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
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleLanguageChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((languageId) => (
                      <SelectItem
                        key={languageId}
                        value={languageId.toString()}
                      >
                        {capitalizeFirstLetter(LanguageIdToTypeMap[languageId])}
                      </SelectItem>
                    ))}
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
