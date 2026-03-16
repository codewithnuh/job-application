"use client";
import { useFormStep } from "@/hooks/useFormStep";
import { experienceSchema } from "@/lib/schema";
import { FieldError } from "./StepOne";

type StepTwoParams = {
  onNextAction: () => void;
  onBackAction?: () => void;
  isCompleted: boolean;
};

export const StepTwo = ({
  onNextAction,
  onBackAction,
  isCompleted,
}: StepTwoParams) => {
  const form = useFormStep("step-2", experienceSchema, onNextAction);

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
        <form.Field name="jobTitle">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Job Title:
              </label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Software engineer "
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

        <form.Field name="years">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Years
              </label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="6 years"
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

        <form.Field name="skills">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Next js, DATABASES"
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
        <div className="flex  items-center gap-3 mt-2">
          {onBackAction && (
            <button
              type="button"
              onClick={onBackAction}
              className="w-full h-10 border border-gray-300 text-gray-700 text-sm
                font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
          )}
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDirty,
            ]}
          >
            {([canSubmit, isSubmitting, isDirty]) => (
              <button
                type={isCompleted && !isDirty ? "button" : "submit"}
                onClick={isCompleted && !isDirty ? onNextAction : undefined}
                disabled={(isSubmitting as boolean) || (!canSubmit as boolean)}
                className=" w-full h-10 bg-blue-600 text-white text-sm font-medium rounded-lg
                  hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Validating..." : "Continue →"}
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};
