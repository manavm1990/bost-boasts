import { describe, expect, it } from "bun:test";
import { submissionSchema } from "./submission.schema";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  thesis: "Rep. Bost's vote on X contradicts his 2022 statement.",
  body: "Full draft text goes here.",
  sources: ["https://clerk.house.gov/some-roll-call"],
};

describe("submissionSchema", () => {
  it("accepts a valid payload", () => {
    const result = submissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("allows title to be omitted", () => {
    const { title: _title, ...withoutTitle } = { ...validPayload, title: "x" };
    const result = submissionSchema.safeParse(withoutTitle);
    expect(result.success).toBe(true);
  });

  it("trims whitespace from string fields", () => {
    const result = submissionSchema.safeParse({
      ...validPayload,
      name: "  Jane Doe  ",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Jane Doe");
  });

  it("rejects a missing name", () => {
    const { name: _name, ...rest } = validPayload;
    const result = submissionSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = submissionSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty sources array", () => {
    const result = submissionSchema.safeParse({
      ...validPayload,
      sources: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects blank-string sources", () => {
    const result = submissionSchema.safeParse({
      ...validPayload,
      sources: ["   "],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing thesis or body", () => {
    expect(
      submissionSchema.safeParse({ ...validPayload, thesis: "" }).success,
    ).toBe(false);
    expect(
      submissionSchema.safeParse({ ...validPayload, body: "" }).success,
    ).toBe(false);
  });
});
