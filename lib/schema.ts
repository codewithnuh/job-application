import * as z from "zod";

export const personalInfoSchema = z.object({
  name: z.string({ error: "Minimum 2 characters required" }).min(2, {
    error: "Minimum 2 characters required",
  }),
  email: z.email({ error: "Please provide an email like example@domain.com" }),
  age: z.string({ error: "Age is required" }),
});

export const experienceSchema = z.object({
  jobTitle: z.string({ error: "Job title is required" }).min(2, {
    error: "Job title is required",
  }),
  years: z.string({ error: "Years are required" }),
  skills: z.string({ error: "Skills are required" }).min(2, {
    error: "Skills are required",
  }),
});

export const accountSchema = z.object({
  username: z.string({ error: "User name is required" }).min(3, {
    error: "User name must be at least 3 characters",
  }),
  password: z.string({ error: "Password is required" }).min(8, {
    error: "Password must be at least 8 characters",
  }),
});

export const fullFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...experienceSchema.shape,
  ...accountSchema.shape,
});

export type FullFormValues = z.infer<typeof fullFormSchema>;
