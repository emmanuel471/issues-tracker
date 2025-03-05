import { z } from "zod";

const createIssuesSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(255, { message: "Must not be more than 255 characters long" }),
  description: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" }),
});

export default createIssuesSchema;
