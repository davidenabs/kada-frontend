import { UserType } from "@/interface/user";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./farm";
import { PostType } from "@/interface/cms";

export const opportunitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required" }),
  // cta: z
  //   .string()
  //   .min(1, { message: "Link is required" })
  //   .url({ message: "Invalid URL" }).optional(),
  userType: z.enum([
    "ALL",
    UserType.FARMER,
    UserType.COOPERATIVE,
    UserType.VENDOR,
  ]).optional(),
  // isPublished: z.boolean({ message: "Published status is required" }).optional(),
  type: z.enum([PostType.opportunity, PostType.program, PostType.interventions]).optional(),
  keywords: z.array(z.string()).optional(),
  applicationDate: z.date().optional(),
  closingDate: z.date().optional(),
  image: z
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
  lga: z.string().trim().min(1, { message: "LGA is required" }).optional(),
  ward: z.string().trim().min(1, { message: "Ward is required" }).optional(),
  zone: z.string().trim().min(1, { message: "Zone is required" }).optional(),
  applicationLimit: z.string().optional(),
});

export type OpportunitySchemaType = z.infer<typeof opportunitySchema>;
