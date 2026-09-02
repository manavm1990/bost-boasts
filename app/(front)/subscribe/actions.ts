"use server";

import { z } from "zod";
import { EDITOR_EMAIL } from "@/lib/site-info";
import { subscribeToNewsletter } from "@/lib/subscribe";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Enter a valid email address" })),
  firstName: z.string().trim().max(80).optional(),
});

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
  email?: string;
  firstName?: string;
  formKey?: string;
};

export async function subscribeNewsletter(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  if (formData.get("company")) return { status: "success" }; // 🍯

  const email = String(formData.get("email") ?? "");
  const firstNameRaw = String(formData.get("firstName") ?? "").trim();
  const values = {
    email,
    firstName: firstNameRaw || undefined,
  };

  const parsed = subscribeSchema.safeParse(values);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      status: "error",
      email,
      firstName: firstNameRaw,
      formKey: crypto.randomUUID(),
      message: issue?.message ?? "Check your email and try again.",
    };
  }

  try {
    await subscribeToNewsletter(parsed.data);
    return {
      status: "success",
      message: "You're on the list. Watch for the next Dispatch.",
    };
  } catch (err) {
    console.error("[subscribe] failed", err);
    return {
      status: "error",
      email: parsed.data.email,
      firstName: firstNameRaw,
      formKey: crypto.randomUUID(),
      message: `We couldn't add you right now. Try again shortly, or email ${EDITOR_EMAIL}.`,
    };
  }
}
