import { z } from "zod";

export const EditCooperaativeProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  about: z.string().min(1, { message: "About is required" }),
  eligibility: z.string().min(1, { message: "Eligibility is required" }),
});

export type EditCooperaativeProfileSchemaType = z.infer<
  typeof EditCooperaativeProfileSchema
>;
