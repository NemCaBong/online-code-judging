import { z } from "zod";

export const codeSchema = z.object({
  language: z.string().min(1).max(50),
  code: z.string().min(1).max(10000),
  fileName: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-zA-Z0-9_.-]+$/),
});

export const exerciseFormSchema = z.object({
  codes: z.array(codeSchema).min(1).max(10),
});

export type ExerciseFormSchemaType = z.infer<typeof exerciseFormSchema>;
