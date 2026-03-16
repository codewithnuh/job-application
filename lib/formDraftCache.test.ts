import { it, describe, expect, beforeEach, vi } from "vitest";
import {
  clearAllDrafts,
  clearStepDraft,
  formCache,
  loadDraft,
  loadFromStorage,
  saveDraft,
} from "./formDraftCache";
import { JetBrains_Mono } from "next/font/google";

describe("formDataCache", () => {
  beforeEach(() => {
    formCache.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });
  it("should store draft both in formCache and local storage", () => {
    const stepId = "step-1";
    const data = { name: "Noor ul hassan" };
    saveDraft(stepId, data);
    expect(loadDraft(stepId)).toEqual(data);
    const stored = JSON.parse(
      localStorage.getItem("job-application-draft") || "{}",
    );
    expect(stored[stepId]).toEqual(data);
  });
  it("should load data from local storage", () => {
    const userDetails = {
      username: "codewithnuh",
      password: "12345679",
    };
    const mockData = {
      "step-3": userDetails,
    };
    localStorage.setItem("job-application-draft", JSON.stringify(mockData));
    loadFromStorage();
    expect(loadDraft("step-3")).toEqual(userDetails);
  });
  it("should clear all drafts correctly", () => {
    // Arrange
    saveDraft("step-1", { a: "1" });

    // Act
    clearAllDrafts();

    // Assert
    expect(loadDraft("step-1")).toEqual({});
    expect(localStorage.getItem("job-application-draft")).toBeNull();
  });
  it("should handle localStorage errors gracefully", () => {
    // Arrange: Force localStorage.setItem to throw an error
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

    const result = saveDraft("test", { x: "y" });

    // Assert: It should return the error object instead of crashing
    expect(result).toHaveProperty("error");
    expect(result?.name).toBe("Error");

    spy.mockRestore(); // Clean up the spy
  });
});
