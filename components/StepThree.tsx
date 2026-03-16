"use client";
import { useFormStep } from "@/hooks/useFormStep";
import { accountSchema } from "@/lib/schema";
import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldError } from "./StepOne";

type StepThreeParams = {
  onBackAction?: () => void;
  onNextAction: () => void;
  isCompleted?: boolean;
};

export const StepThree = ({
  onBackAction,
  onNextAction,
  isCompleted,
}: StepThreeParams) => {
  const form = useFormStep("step-3", accountSchema, onNextAction);

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
        <form.Field name="username">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                id={field.name}
                value={field.state.value}
                type="text"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="codewithnuh "
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

        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password must be at least 8 digits long"
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
            {([canSubmit, isSubmitting]) => (
              <button
                type={"submit"}
                disabled={(isSubmitting as boolean) || (!canSubmit as boolean)}
                className=" w-full h-10 bg-blue-600 text-white text-sm font-medium rounded-lg
                  hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Validating..." : "Submit Final Application →"}
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};
