export const formCache = new Map<string, Record<string, string>>();
export const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("job-application-draft");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([stepId, value]) => {
      formCache.set(stepId, value as Record<string, string>);
    });
  } catch (error) {
    localStorage.removeItem("job-application-draft");
  }
};

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
