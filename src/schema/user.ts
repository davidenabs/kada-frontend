import { z } from "zod";

export const nimcVwrifySchema = z.object({
  dob: z.string({ message: "Date of birth is required" }).trim().min(1, {
    message: "Date of birth is required",
  }),
  nin: z
    .string()
    .trim()
    .min(1, { message: "NIN is required" })
    .length(11, { message: "NIN must be 11 characters long" })
    .regex(/^\d+$/, { message: "NIN must be a number" }),
  userId: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export type nimcVwrifySchemaType = z.infer<typeof nimcVwrifySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().trim().min(1, { message: "Message is required" }),
  phoneNumber: z.string().optional(),
});

export type contactSchemaType = z.infer<typeof contactSchema>;

export const addUserSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  // password: z.string().trim().min(1, { message: "Password is required" }),
  userType: z.string().min(1, { message: "User type is required" }),
  phoneNumber: z
    .string()
    .trim()
    .min(11, { message: "Phone number must be 11 characters" })
    .max(11, { message: "Phone number must be 11 characters" }),
  lga: z.string().trim().min(1, { message: "LGA is required" }),
  ward: z.string().trim().min(1, { message: "Ward is required" }),
  zone: z.string().trim().min(1, { message: "Zone is required" }),
  community: z.string().trim().min(1, { message: "Community is required" }),
});

export type addUserSchemaType = z.infer<typeof addUserSchema>;

export const verifyOnboardingSchema = z
  .object({
    token: z.string().trim().min(1, { message: "Token is required" }),
    password: z.string().trim().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type verifyOnboardingSchemaType = z.infer<typeof verifyOnboardingSchema>;
