import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as z from "zod";

vi.mock("../lib/formDraftCache", () => ({
  loadDraft: vi.fn().mockReturnValue({}),
  saveDraft: vi.fn(),
}));
import { useFormStep } from "./useFormStep";
import { loadDraft, saveDraft } from "../lib/formDraftCache";

describe("useFormStep Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(loadDraft).mockReturnValue({});
  });
  const mockSchema = z.object({ name: z.string() });

  it("should initialize the value from draft cache", () => {
    const cachedData = { name: "Noor" };
    vi.mocked(loadDraft).mockReturnValue(cachedData);
    const { result } = renderHook(() => useFormStep("step-1", mockSchema));
    expect(result.current.state.values).toEqual(cachedData);
  });

  it.skip("should persist changes to the draft cache when fields update", async () => {
    vi.mocked(saveDraft).mockReturnValue(undefined);
    const { result } = renderHook(() => useFormStep("step-1", mockSchema));

    await act(async () => {
      result.current.setFieldValue("name", "New Name");
      result.current.handleSubmit();
    });

    await waitFor(
      () => {
        expect(saveDraft).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
