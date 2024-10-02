import { z } from "zod";

export const codeEditorSchema = z.object({
  language: z.string(),
  code: z.string().min(10, "Code is required"),
});
