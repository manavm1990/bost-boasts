import "server-only";

import { getNewsletterSegmentId, getResend } from "@/lib/resend";

export type SubscribeInput = {
  email: string;
  firstName?: string;
};

export async function subscribeToNewsletter({
  email,
  firstName,
}: SubscribeInput) {
  const resend = getResend();
  const segmentId = getNewsletterSegmentId();

  if (!resend) throw new Error("RESEND_API_KEY is not configured");
  if (!segmentId) throw new Error("RESEND_SEGMENT_ID is not configured");

  const { data, error } = await resend.contacts.create({
    email,
    firstName: firstName || undefined,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });

  if (!error) return { contactId: data?.id };

  const message = error.message?.toLowerCase() ?? "";
  const looksLikeDuplicate =
    message.includes("already") ||
    message.includes("exist") ||
    message.includes("duplicate") ||
    error.name === "validation_error";

  if (!looksLikeDuplicate) throw new Error(error.message || "Subscribe failed");

  const added = await resend.contacts.segments.add({
    email,
    segmentId,
  });

  if (added.error) {
    const addMsg = added.error.message?.toLowerCase() ?? "";
    if (
      addMsg.includes("already") ||
      addMsg.includes("exist") ||
      addMsg.includes("duplicate")
    )
      return { contactId: undefined, alreadySubscribed: true as const };

    throw new Error(added.error.message || "Could not add to newsletter list");
  }

  return { contactId: added.data?.id, alreadySubscribed: true as const };
}
