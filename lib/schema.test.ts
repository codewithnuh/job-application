import { describe, it, expect } from "vitest";
import { accountSchema, personalInfoSchema } from "./schema";
describe("accountSchema", () => {
  it("should accept valid data", () => {
    const validData = { username: "codewithnuh", password: "password123" };
    const result = accountSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
  it("should reject a password shorter than 8 characters", () => {
    const invalidData = { codewithnuh: "codewithnuh", password: "123" };
    const result = accountSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
  it("should not validate empty fields", () => {
    const invalidData = { codewithnuh: "codewithnuh", password: "123" };
    const result = accountSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
describe("personalInfoSchema", () => {
  it("should accept the valid data", () => {
    const validData = {
      name: "Noor ul hassan",
      email: "codewithnuh@gmail.com",
      age: "24",
    };
    const result = personalInfoSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
  it("should not accept the invalid data", () => {
    const invalidData = { name: "", email: "codewithnuh@gmail.com" };
    const result = personalInfoSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
