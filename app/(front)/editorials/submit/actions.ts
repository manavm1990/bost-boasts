"use server";

import { flattenError } from "zod";
import { submissionSchema } from "@/lib/submission.schema";
import write from "@/sanity/lib/write";

export type SubmitState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string[]>;
  message?: string;
};

export async function submitEditorial(
  _prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  if (formData.get("company")) return { status: "success" }; // 🍯

  const sources = (formData.get("sources") as string | null)
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed = submissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    title: formData.get("title") || undefined,
    thesis: formData.get("thesis"),
    body: formData.get("body"),
    sources,
  });

  if (!parsed.success)
    return {
      status: "error",
      fieldErrors: flattenError(parsed.error).fieldErrors,
      message: "Please fix the highlighted fields and resubmit.",
    };

  try {
    await write.create({
      _type: "submission",
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again shortly.",
    };
  }

  return { status: "success" };
}
