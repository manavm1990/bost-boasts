"use server";

import { after } from "next/server";
import { flattenError } from "zod";
import { submissionSchema } from "@/lib/submission.schema";
import { validateOptionalImage } from "@/lib/submission-image";
import write from "@/sanity/lib/write";

export type SubmitValues = {
  name: string;
  email: string;
  title: string;
  thesis: string;
  body: string;
  sources: string;
};

export type SubmitState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string[]>;
  message?: string;
  values?: SubmitValues;
  formKey?: string;
};

function readValues(formData: FormData): SubmitValues {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    title: String(formData.get("title") ?? ""),
    thesis: String(formData.get("thesis") ?? ""),
    body: String(formData.get("body") ?? ""),
    sources: String(formData.get("sources") ?? ""),
  };
}

function errorState(
  values: SubmitValues,
  partial: Pick<SubmitState, "fieldErrors" | "message">,
): SubmitState {
  return {
    status: "error",
    values,
    formKey: crypto.randomUUID(),
    ...partial,
  };
}

export async function submitEditorial(
  _prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  if (formData.get("company")) return { status: "success" }; // 🍯

  const values = readValues(formData);

  const sources = values.sources
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed = submissionSchema.safeParse({
    name: values.name,
    email: values.email,
    title: values.title || undefined,
    thesis: values.thesis,
    body: values.body,
    sources,
  });

  if (!parsed.success)
    return errorState(values, {
      fieldErrors: flattenError(parsed.error).fieldErrors,
      message: "Please fix the highlighted fields and resubmit.",
    });

  const imageResult = validateOptionalImage(formData.get("image"));
  if (!imageResult.ok)
    return errorState(values, {
      fieldErrors: { image: [imageResult.error] },
      message: "Please fix the highlighted fields and resubmit.",
    });

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[submit] SANITY_API_WRITE_TOKEN is not set");
    return errorState(values, {
      message: "Something went wrong on our end. Please try again shortly.",
    });
  }

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

    after(async () => {
      try {
        const { notifyEditorialSubmission } = await import("@/lib/email");
        await notifyEditorialSubmission({
          submission: parsed.data,
          documentId: doc._id,
        });
      } catch (err) {
        console.error("[submit] email notify failed", err);
      }
    });
  } catch (err) {
    console.error("[submit] Sanity write failed", err);
    return errorState(values, {
      message: "Something went wrong on our end. Please try again shortly.",
    });
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
