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
