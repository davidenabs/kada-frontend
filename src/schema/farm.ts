import { z } from "zod";
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export const createFarmSchema = z.object({
  name: z.string().min(1, { message: "Farm name is required" }),
  landArea: z.string().min(1, { message: "Land area is required" }),
  geoLocation: z.object({
    type: z.string().min(1, { message: "Geo location is required" }),
    coordinates: z.array(z.array(z.array(z.number()))).min(1, {
      message: "Coordinates are required",
    }),
  }),
  activeSeason: z.string().min(1, { message: "Active season is required" }),
  products: z.array(z.any()).min(1, { message: "Minimum 1 item required!" }),
  lga: z
    .string()
    .min(1, { message: "LGA is required" }),
});

export type CreateFarmSchemaType = z.infer<typeof createFarmSchema>;

export const createGallerySchema = z.object({
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
  description: z.string().min(1, { message: "Description is required" }),
});

export type CreateGallerySchemaType = z.infer<typeof createGallerySchema>;
