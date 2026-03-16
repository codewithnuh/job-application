"use client";
import { useForm } from "@tanstack/react-form";
import { saveDraft, loadDraft } from "@/lib/formDraftCache";
import * as z from "zod";

export const useFormStep = <
  S extends z.ZodType<Record<string, string>, any, any>,
>(
  stepId: string,
  schema: S,
  onStepComplete?: () => void,
) => {
  const defaultValues = loadDraft(stepId);

  const form = useForm({
    defaultValues,
    onSubmit: async () => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(0);
          onStepComplete?.();
        }, 5000);
      });
    },
    validators: {
      onMount: schema,
      onSubmit: schema,
      onChange: schema,
    },
    listeners: {
      onChange({ formApi }) {
        saveDraft(stepId, formApi.state.values);
      },
    },
  });

  return form;
};
