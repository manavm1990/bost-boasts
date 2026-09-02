import "server-only";

import { Resend } from "resend";
import SubmissionAckEmail from "@/emails/submission-ack";
import SubmissionAlertEmail from "@/emails/submission-alert";
import { EDITOR_EMAIL, SITE_NAME } from "@/lib/site-info";
import { getSiteUrl } from "@/lib/site-url";
import type { SubmissionInput } from "@/lib/submission.schema";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.EMAIL_FROM?.trim() || `${SITE_NAME} <noreply@il12dispatch.org>`
  );
}

function getEditorsInbox() {
  return process.env.EMAIL_ALERT_TO?.trim() || EDITOR_EMAIL;
}

function studioSubmissionUrl(documentId: string) {
  const base = getSiteUrl();
  // Intent URL opens the submission doc when the editor is signed into Studio.
  return `${base}/studio/intent/edit/id=${encodeURIComponent(documentId)};type=submission`;
}

export async function notifyEditorialSubmission({
  submission,
  documentId,
}: {
  submission: SubmissionInput;
  documentId: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.error(
      "[email] RESEND_API_KEY is not set; skipped submission emails",
    );
    return;
  }

  const from = getFromAddress();
  const siteUrl = getSiteUrl();
  const editors = getEditorsInbox();
  const subjectLabel = submission.title?.trim() || "untitled editorial";

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: submission.email,
      replyTo: EDITOR_EMAIL,
      subject: `We received your submission — ${SITE_NAME}`,
      react: SubmissionAckEmail({
        name: submission.name,
        title: submission.title,
        siteUrl,
      }),
    }),
    resend.emails.send({
      from,
      to: editors,
      replyTo: submission.email,
      subject: `New editorial submission: ${subjectLabel}`,
      react: SubmissionAlertEmail({
        name: submission.name,
        email: submission.email,
        title: submission.title,
        thesis: submission.thesis,
        body: submission.body,
        sources: submission.sources,
        documentId,
        studioUrl: studioSubmissionUrl(documentId),
      }),
    }),
  ]);

  results.forEach((result, index) => {
    const kind = index === 0 ? "ack" : "alert";

    if (result.status === "rejected") {
      console.error(`[email] ${kind} send failed`, result.reason);
      return;
    }

    if (result.value.error)
      console.error(`[email] ${kind} send error`, result.value.error);
  });
}
