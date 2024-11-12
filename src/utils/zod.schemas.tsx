import { z } from "zod";

const optionSchema = z.object({
  label: z.string({
    message: "label must be a string",
  }),
  value: z.string({
    message: "value must be a string",
  }),
  id: z.number({
    message: "id must be a number",
  }),
});

export const createChallengeSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(100, {
      message: "Name must be at most 100 characters long",
    }),
  tags: z.array(optionSchema).nonempty({
    message: "Please select at least one tag",
  }),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  markdownContent: z.string().min(1, {
    message: "Please enter some content",
  }),
  boilerplate_codes: z.array(
    z.object({
      language: z.string().min(1, {
        message: "Please select a language",
      }),
      code: z.string().min(1, {
        message: "Please enter some code",
      }),
    })
  ),
  testCasesFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/zip", {
      message: "File must be a ZIP archive",
    }),
  hints: z
    .array(
      z.object({
        hintQuestion: z.string().min(1, {
          message: "Please enter some hint question",
        }),
        hintAnswer: z.string().min(1, {
          message: "Please enter some hint answer",
        }),
      })
    )
    .nonempty({
      message: "Please enter at least one hint",
    }),
  timeLimit: z.coerce.number().positive(),
  spaceLimit: z.coerce.number().positive(),
});

export const createExerciseSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(100, {
      message: "Name must be at most 100 characters long",
    }),
  class_id: z.number().positive(),
  markdownContent: z.string().min(1, {
    message: "Please enter some content",
  }),
  boilerplate_codes: z.array(
    z.object({
      language: z.string(),
      code: z.string(),
      fileName: z.string(),
    })
  ),
  due_at: z.coerce.date(),
});
