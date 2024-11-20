import { z } from "zod";

export const marketSchema = z.object({
  name: z.string().min(1, "Market name is required"),
  address: z.string().min(1, "Market address is required"),
  localGovernmentArea: z.string().min(1, "Local government area is required"),
  ward: z.string().min(1, "Ward is required"),
  coordinates: z.string().min(1, "Coordinates is required"),
  size: z.enum(["Small", "Medium", "Large"]),
  openingDays: z.string().min(1, "Opening days are required"),
  openingTime: z.string().min(1, "Opening time is required"),
});

export type marketSchemaType = z.infer<typeof marketSchema>;
