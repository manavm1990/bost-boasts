export const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export type ImageValidation =
  | { ok: true; file: File | null }
  | { ok: false; error: string };

export function validateOptionalImage(
  value: FormDataEntryValue | null,
): ImageValidation {
  if (!(value instanceof File) || value.size === 0)
    return { ok: true, file: null };

  if (!ACCEPTED_IMAGE_TYPES.has(value.type))
    return {
      ok: false,
      error: "Use a JPEG, PNG, or WebP image under 2 MB.",
    };

  if (value.size > MAX_IMAGE_BYTES)
    return {
      ok: false,
      error: "Image must be 2 MB or smaller.",
    };

  return { ok: true, file: value };
}
