import { z } from "zod";

const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const invalidMessage = "Not valid exercise";

export const gradingSubmittedExerciseSchema = z.object({
  chosenExercise: z.object({
    id: z
      .string()
      .length(36, {
        message: invalidMessage,
      })
      .regex(uuidV4Regex, {
        message: invalidMessage,
      }),
    name: z.string().min(5, {
      message: invalidMessage,
    }),
  }),
});

export const gradingExerciseSchema = z.object({
  score: z.coerce
    .number()
    .min(0, { message: "Score must be at least 0" })
    .max(10, { message: "Score must be at most 10" }),
  code: z.string().min(10, { message: "Code must be at least 10 characters" }),
  review: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});
