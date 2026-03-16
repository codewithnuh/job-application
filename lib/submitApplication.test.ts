import { it, describe, expect, beforeEach, vi } from "vitest";
import { submitApplication } from "./submitApplication";
import { formCache, clearAllDrafts } from "./formDraftCache";

describe("submitApplication", () => {
  beforeEach(() => {
    formCache.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should combine data from all steps and submit", async () => {
    formCache.set("step-1", { name: "Noor", email: "noor@test.com", age: "25" });
    formCache.set("step-2", { jobTitle: "Developer", years: "3", skills: "JS" });
    formCache.set("step-3", { username: "noor", password: "password123" });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await submitApplication();

    expect(result).toEqual({
      name: "Noor",
      email: "noor@test.com",
      age: "25",
      jobTitle: "Developer",
      years: "3",
      skills: "JS",
      username: "noor",
      password: "password123",
    });
  });

  it("should use empty object for missing steps", async () => {
    formCache.set("step-1", { name: "Noor" });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await submitApplication();

    expect(result.name).toBe("Noor");
    expect(result.email).toBeUndefined();
  });

  it("should throw error when fetch fails", async () => {
    formCache.set("step-1", { name: "Noor" });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(submitApplication()).rejects.toThrow("Failed to submit application");
  });

  it("should clear all drafts after successful submission", async () => {
    formCache.set("step-1", { name: "Noor" });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await submitApplication();

    expect(formCache.size).toBe(0);
  });
});
