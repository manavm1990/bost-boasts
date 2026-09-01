import { describe, expect, it } from "bun:test";
import { MAX_IMAGE_BYTES, validateOptionalImage } from "./submission-image";

function makeFile(bytes: number, type: string, name = "photo.png"): File {
  return new File([new Uint8Array(bytes)], name, { type });
}

describe("validateOptionalImage", () => {
  it("accepts missing or empty file input", () => {
    expect(validateOptionalImage(null)).toEqual({ ok: true, file: null });
    expect(validateOptionalImage("")).toEqual({ ok: true, file: null });
    expect(validateOptionalImage(makeFile(0, "image/png"))).toEqual({
      ok: true,
      file: null,
    });
  });

  it("accepts jpeg, png, and webp under the size cap", () => {
    for (const type of ["image/jpeg", "image/png", "image/webp"] as const) {
      const file = makeFile(128, type);
      const result = validateOptionalImage(file);
      expect(result).toEqual({ ok: true, file });
    }
  });

  it("rejects unsupported mime types", () => {
    const result = validateOptionalImage(makeFile(128, "image/gif", "x.gif"));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("JPEG, PNG, or WebP");
  });

  it("rejects files over 2 MB", () => {
    const result = validateOptionalImage(
      makeFile(MAX_IMAGE_BYTES + 1, "image/png"),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("2 MB");
  });
});
