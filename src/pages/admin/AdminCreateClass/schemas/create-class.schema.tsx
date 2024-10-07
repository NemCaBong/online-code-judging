import { z } from "zod";

export const studentsSchema = z.object({
  label: z.string(),
  value: z.string(),
  id: z.string(),
});

export const createClassSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Class name must be at least 2 characters long",
    })
    .max(100, {
      message: "Class name must be at most 100 characters long",
    }),
  students: z.array(studentsSchema).nonempty({
    message: "Please select at least one student",
  }),
});
