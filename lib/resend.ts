import "server-only";

import { Resend } from "resend";

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getNewsletterSegmentId() {
  return process.env.RESEND_SEGMENT_ID?.trim() || null;
}
