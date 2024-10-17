import { SupportedLanguageId } from "@/common/constants/supported-language";
import { z } from "zod";

const supportedLanguageKeys = Object.keys(SupportedLanguageId).map(Number);

export const codeEditorSchema = z.object({
  languageId: z
    .string()
    .refine((id) => supportedLanguageKeys.includes(Number(id)), {
      message: "Invalid language ID",
    }),
  code: z.string().min(10, "Code is required"),
});
