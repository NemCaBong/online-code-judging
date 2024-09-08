import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
  files: z.custom<FileList>().optional(),
});
