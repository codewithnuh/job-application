// lib/submitApplication.ts

import { formCache } from "@/lib/formDraftCache";
import { clearAllDrafts } from "@/lib/formDraftCache";
import { ApplicationData } from "./schema";

export async function submitApplication(): Promise<ApplicationData> {
  const step1 = formCache.get("step-1") ?? {};
  const step2 = formCache.get("step-2") ?? {};
  const step3 = formCache.get("step-3") ?? {};

  const data = { ...step1, ...step2, ...step3 } as ApplicationData;

  // fake API call — replace with real endpoint later
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  clearAllDrafts();
  return data;
}
