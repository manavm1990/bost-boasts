import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  title: z.string().trim().max(120).optional(),
  thesis: z.string().trim().min(1, "One-sentence point is required").max(400),
  body: z.string().trim().min(1, "Draft text is required").max(12000),
  sources: z
    .array(z.string().trim().min(1))
    .min(1, "At least one source is required"),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
