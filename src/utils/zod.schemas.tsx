import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
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
  markdownContent: z.string().min(1, {
    message: "Please enter some content",
  }),
  boilerplate_code: z.string().min(10, {
    message: "Please enter some boilerplate code",
  }),
  inputAndExpectedOutput: z
    .array(
      z.object({
        input: z.string().min(1, {
          message: "Please enter input",
        }),
        expected_output: z.string().min(1, {
          message: "Please enter expected output",
        }),
      })
    )
    .nonempty({
      message: "Please enter at least one test case",
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
