import { z } from "zod";
const uuidV4Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const addExerciseSchema = z.object({
  exercises: z
    .array(
      z.object({
        id: z.string().refine((val) => uuidV4Regex.test(val), {
          message: "Invalid UUIDv4 format",
        }),
        value: z.string().min(1, { message: "value error" }),
        label: z.string().min(1, { message: "label error" }),
      })
    )
    .min(1, { message: "At least one exercise must be selected" }),
  dueDate: z.date().min(new Date(), "Expiration date must be in the future"),
});
