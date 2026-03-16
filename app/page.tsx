"use client";
import { StepOne } from "@/components/StepOne";
import { StepThree } from "@/components/StepThree";
import { StepTwo } from "@/components/StepTwo";
import { ApplicationData } from "@/lib/schema";
import { submitApplication } from "@/lib/submitApplication";
import { useState } from "react";

const stepTitles: Record<number, string> = {
  1: "Personal Information",
  2: "Experience",
  3: "Account Setup",
};

const stepDescriptions: Record<number, string> = {
  1: "Tell us a bit about yourself to get started.",
  2: "Share your professional background.",
  3: "Set up your account credentials.",
};

export default function Home() {
  const [submittedData, setSubmittedData] = useState<ApplicationData | null>(
    null,
  );

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  async function handleFinalSubmit() {
    try {
      setSubmitError(null);
      const data = await submitApplication();
      setSubmittedData(data);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }
  function completeStep(stepNumber: number) {
    setCompletedSteps((prev) => new Set(prev).add(stepNumber));
    setStep(stepNumber + 1);
  }

  function goBack() {
    setStep((prev) => prev - 1);
  }

  const progress = step === 1 ? "0%" : step === 2 ? "50%" : "75%";
  // success screen
  if (submitted && submittedData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="w-full max-w-md px-4 py-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Application Submitted
              </h1>
              <p className="text-sm text-gray-500">We will be in touch soon.</p>
            </div>
          </div>

          <div className="space-y-3 text-sm border rounded-lg p-4 bg-gray-50 dark:bg-zinc-800">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{submittedData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{submittedData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Job Title</span>
              <span className="font-medium">{submittedData.jobTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Username</span>
              <span className="font-medium">{submittedData.username}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setSubmittedData(null);
              setStep(1);
              setCompletedSteps(new Set());
            }}
            className="mt-6 w-full h-10 border border-gray-300 text-gray-700 text-sm
              font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Start New Application
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="mb-8 w-full max-w-md px-4">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
          Step {step} of 3
        </span>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
          {stepTitles[step]}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{stepDescriptions[step]}</p>
        <div className="mt-4 h-1 w-full bg-gray-100 rounded-full">
          <div
            style={{ width: progress }}
            className="h-1 bg-blue-600 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {step === 1 && (
        <StepOne
          isCompleted={completedSteps.has(1)}
          onNextAction={() => completeStep(1)}
        />
      )}
      {step === 2 && (
        <StepTwo
          isCompleted={completedSteps.has(2)}
          onBackAction={goBack}
          onNextAction={() => completeStep(2)}
        />
      )}
      {step === 3 && (
        <StepThree
          isCompleted={completedSteps.has(3)}
          onNextAction={handleFinalSubmit}
          onBackAction={goBack}
        />
      )}
    </div>
  );
}
