"use client";
export const formCache = new Map<string, Record<string, string>>();
const isBrowser = typeof window !== "undefined";
export const saveDraft = (stepId: string, values: Record<string, string>) => {
  try {
    formCache.set(stepId, values);
    const cacheObject: Record<string, Record<string, string>> = {};
    formCache.forEach((values, stepId) => {
      cacheObject[stepId] = values;
    });
    localStorage.setItem("job-application-draft", JSON.stringify(cacheObject));
  } catch (error) {
    if (error instanceof Error) {
      return { name: error.name, error: error.message };
    } else {
      return { name: "Error", error: "Failed to save draft" };
    }
  }
};
export const loadDraft = (stepId: string): Record<string, string> => {
  return formCache.get(stepId) ?? {};
};
export const loadFromStorage = () => {
  try {
    if (!isBrowser) return;
    const raw = localStorage.getItem("job-application-draft");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([stepId, value]) => {
      formCache.set(stepId, value as Record<string, string>);
    });
  } catch {
    localStorage.removeItem("job-application-draft");
  }
};

// clears one specific step — call this if user resets a single step
export const clearStepDraft = (stepId: string) => {
  formCache.delete(stepId);
  // re-save storage without this step
  const cacheObject: Record<string, Record<string, string>> = {};
  formCache.forEach((values, id) => {
    cacheObject[id] = values;
  });
  localStorage.setItem("job-application-draft", JSON.stringify(cacheObject));
};

export const clearAllDrafts = () => {
  try {
    formCache.clear();
    localStorage.removeItem("job-application-draft");
  } catch (error) {
    if (error instanceof Error) {
      return { name: error.name, error: error.message };
    } else {
      return { name: "Error", error: "Failed to clear all draft" };
    }
  }
};
if (typeof window !== "undefined") {
  loadFromStorage();
}
