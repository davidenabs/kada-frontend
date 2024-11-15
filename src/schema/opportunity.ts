import { UserType } from "@/interface/user";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./farm";

export const opportunitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  shortDescription: z.string().optional(),
  cta: z
    .string()
    .min(1, { message: "Link is required" })
    .url({ message: "Invalid URL" }),
  userType: z.enum([UserType.FARMER, UserType.COOPERATIVE, UserType.VENDOR]),
  hasComment: z.boolean(),
  isPublished: z.boolean({ message: "Published status is required" }),
  isFeatured: z.boolean(),
  type: z.enum(["post", "opportunity"]),
  categoryId: z.number().nullable(),

  keywords: z.array(z.string()),
  seoTitle: z.string(),
  seoDescription: z.string(),
  date: z.string().optional(),

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
});

export type OpportunitySchemaType = z.infer<typeof opportunitySchema>;
