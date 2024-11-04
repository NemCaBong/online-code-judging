import { z } from "zod";

export const addPostSchema = z.object({
  content: z.string().min(1, "Content is required"),
});
