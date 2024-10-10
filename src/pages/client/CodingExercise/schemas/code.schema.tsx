import { z } from "zod";

export const codeSchema = z.object({
  language: z.string().min(1, "Must choose a language").max(50),
  code: z
    .string()
    .min(1, "Code must be written")
    .max(10000, "Code is too long"),
  fileName: z
    .string()
    .min(1, "fileName must exists")
    .max(255, "fileName cannot be too long")
    .regex(/^[a-zA-Z0-9_.-]+$/, "fileName is invalid"),
});

export const exerciseFormSchema = z.object({
  codes: z.array(codeSchema).min(1).max(10),
});

export type ExerciseFormSchemaType = z.infer<typeof exerciseFormSchema>;
