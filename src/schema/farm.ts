import { z } from "zod";

export const createFarmSchema = z.object({
  name: z.string().nonempty("Farm name is required"),
  landArea: z.string().nonempty("Farm land area is required"),
  geoLocation: z.object({
    type: z.string(),
    coordinates: z.array(z.array(z.array(z.number()))),
  }),
  activeSeason: z.string(),
  products: z.array(z.string()).min(1, { message: "Minimum 1 item required!" }),
});

export type CreateFarmSchemaType = z.infer<typeof createFarmSchema>;
