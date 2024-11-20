import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./farm";

export const createCatalogSchema = z.object({
  name: z.string().min(1, { message: "Catalog name is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  // products or services
  type: z
    .string()
    .min(1, { message: "Type is required" })
    .refine((value) => value === "products" || value === "services", {
      message: "Type must be products or services",
    }),
  category: z.string(),
  file: z
    .custom<File>()
    .nullable()
    .refine((file) => file instanceof File, "Must be a valid file")
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `File size should be less than 5MB`
    )
    .refine(
      (file) => file && ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp and .pdf files are accepted"
    ),
  isNew: z.boolean(),
});

export type CreateCatalogSchemaType = z.infer<typeof createCatalogSchema>;
