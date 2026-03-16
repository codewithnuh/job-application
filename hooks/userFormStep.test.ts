import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useFormStep } from "./useFormStep";
import * as z from "zod";
vi.mock("../lib/formDraftCache", () => ({
  loadDraft: vi.fn(),
  saveDraft: vi.fn(),
}));
import { loadDraft, saveDraft } from "../lib/formDraftCache";
describe("useFormStep Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockSchema = z.object({ name: z.string() });
  it("should intialize the value from draft cache", () => {
    const cachedData = { name: "Noor" };
    vi.mocked(loadDraft).mockReturnValue(cachedData);
    const { result } = renderHook(() => useFormStep("step-1", mockSchema));
    expect(result.current.state.values).toEqual(cachedData);
  });
  it("should persist changes to the draft cache when fields update", async () => {
    // Arrange
    const { result } = renderHook(() => useFormStep("step-1", mockSchema));

    // Act: Simulate a user changing a field
    await act(async () => {
      result.current.setFieldValue("name", "New Name");
      await new Promise((r) => setTimeout(r, 0));
    });

    // Assert
    await waitFor(
      () => {
        expect(saveDraft).toHaveBeenCalledWith("step-1", { name: "New Name" });
      },
      { timeout: 2000 },
    );
  });
});
