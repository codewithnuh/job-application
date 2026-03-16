"use client";
import { useFormStep } from "@/hooks/useFormStep";
import { personalInfoSchema } from "@/lib/schema";
import type { AnyFieldApi } from "@tanstack/react-form";

type StepOneParams = {
  onNextAction: () => void;
  isCompleted?: boolean;
};

export function FieldError({ field }: { field: AnyFieldApi }) {
  const canShow =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;
  if (!canShow) return null;
  return (
    <p className="text-sm text-red-500 mt-1">
      {field.state.meta.errors[0].message as string}
    </p>
  );
}

export const StepOne = ({ onNextAction, isCompleted }: StepOneParams) => {
  const form = useFormStep("step-1", personalInfoSchema, onNextAction);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Noor ul Hassan"
                className={`h-10 px-3 rounded-lg border text-sm outline-none transition-colors
                  ${
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@example.com"
                className={`h-10 px-3 rounded-lg border text-sm outline-none transition-colors
                  ${
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Age */}
        <form.Field name="age">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="25"
                className={`h-10 px-3 rounded-lg border text-sm outline-none transition-colors
                  ${
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <form.Subscribe selector={(state) => state.isDirty}>
          {(isDirty) => (
            <p className="text-xs text-gray-400 mt-2">
              isDirty: {String(isDirty)}
            </p>
          )}
        </form.Subscribe>
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
            state.values,
          ]}
        >
          {([canSubmit, isSubmitting, isDirty]) => (
            <button
              type={isCompleted && !isDirty ? "button" : "submit"}
              onClick={isCompleted && !isDirty ? onNextAction : undefined}
              disabled={(isSubmitting as boolean) || (!canSubmit as boolean)}
              className="mt-2 w-full h-10 bg-blue-600 text-white text-sm font-medium rounded-lg
                hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Validating..." : "Continue →"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};
