import { z } from "zod";

export const EditVendorProfileSchema = z.object({
  vendorName: z.string().min(1, { message: "Vendor name is required" }),
  about: z.string().min(1, { message: "About is required" }),
  productService: z.string().min(1, { message: "Product/Service is required" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  dateEstablished: z.string().min(1, { message: "Date established is required" }),
});

export type EditVendorProfileSchemaType = z.infer<
  typeof EditVendorProfileSchema
>;