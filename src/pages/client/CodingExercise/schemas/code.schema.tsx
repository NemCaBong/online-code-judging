import { z } from "zod";

export const exerciseDetailsSchema = z.object({
  language_id: z.number().min(1, "Must choose a language"),
  boilerplate_code: z.string(),
  file_name: z
    .string()
    .min(1, "file_name must exists")
    .max(255, "file_name cannot be too long")
    .regex(/^[a-zA-Z0-9_.-]+$/, "fileName is invalid"),
});

export const exerciseFormSchema = z.object({
  codes: z.array(exerciseDetailsSchema).min(1).max(10),
});

export type ExerciseFormSchemaType = z.infer<typeof exerciseFormSchema>;
