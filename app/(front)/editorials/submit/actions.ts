"use server";

import { after } from "next/server";
import { flattenError } from "zod";
import { notifyEditorialSubmission } from "@/lib/email";
import { submissionSchema } from "@/lib/submission.schema";
import { validateOptionalImage } from "@/lib/submission-image";
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

  const imageResult = validateOptionalImage(formData.get("image"));
  if (!imageResult.ok)
    return {
      status: "error",
      fieldErrors: { image: [imageResult.error] },
      message: "Please fix the highlighted fields and resubmit.",
    };

  try {
    const image = imageResult.file
      ? await uploadAuthorImage(imageResult.file)
      : undefined;

    const doc = await write.create({
      _type: "submission",
      ...parsed.data,
      ...(image ? { image } : {}),
      submittedAt: new Date().toISOString(),
    });

    after(() =>
      notifyEditorialSubmission({
        submission: parsed.data,
        documentId: doc._id,
      }),
    );
  } catch {
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again shortly.",
    };
  }

  return { status: "success" };
}

async function uploadAuthorImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await write.assets.upload("image", buffer, {
    filename: file.name || "author-photo",
    contentType: file.type,
  });

  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}
