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