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
  ], {
    errorMap: () => ({ message: "Please select a valid audience (Publish to is required)" }),
  }),
  // isPublished: z.boolean({ message: "Published status is required" }).optional(),
  type: z.enum([PostType.opportunity, PostType.program, PostType.interventions]).optional(),
  keywords: z.array(z.string()).optional(),
  applicationDate: z.preprocess((val) => (val === "" || val === null ? undefined : val), z.date().optional()),
  closingDate: z.preprocess((val) => (val === "" || val === null ? undefined : val), z.date().optional()),
  image: z
    .custom<File>()
    .nullable()
    .optional()
    .refine((file) => !file || file instanceof File, "Must be a valid file")
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `File size should be less than 5MB`
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, .webp and .pdf files are accepted"
    ),
  lga: z.array(z.string()).optional(),
  ward: z.array(z.string()).optional(),
  zone: z.array(z.string()).optional(),
  applicationLimit: z.string().optional(),
});

export type OpportunitySchemaType = z.infer<typeof opportunitySchema>;
