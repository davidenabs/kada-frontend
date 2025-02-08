import { z } from "zod";

export const EditCooperaativeProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  about: z.string().min(1, { message: "About is required" }),
  eligibility: z.string().min(1, { message: "Eligibility is required" }),
  bankName: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankAddress: z.string(),
  joinAmount: z.number(),
});

export type EditCooperaativeProfileSchemaType = z.infer<
  typeof EditCooperaativeProfileSchema
>;


export const EditPartnerProfileSchema = z.object({
  businessName: z.string().min(1, { message: "Name is required" }),
  about: z.string().min(1, { message: "About is required" }),
});

export type EditPartnerProfileSchemaType = z.infer<
  typeof EditPartnerProfileSchema
>;
