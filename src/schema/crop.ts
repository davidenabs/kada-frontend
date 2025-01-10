import { z } from "zod";

// export const activitySchema = z.object({
//   description: z.string().min(1, "Activity description is required"),
// });

// Define the schema for activity details
const activityDetailsSchema = z.object({
  description: z.string(),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  unit_cost: z.coerce.number().positive("Unit cost must be greater than 0"),
  total_cost: z.coerce.number().positive("Total cost must be greater than 0"),
});

const activitySchema = z.object({
  name: z.string().min(1, "Activity name is required"),
  phase: z.string().min(1, "Phase is required"),
  subtotal: z.coerce.number().positive("Subtotal must be greater than 0"),
  details: z
    .array(activityDetailsSchema)
    .nonempty("At least one detail is required for the activity"),
});

const stagesSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
  start: z.coerce.number().min(1, "Start date is required"),
  stop: z.coerce.number().min(1, "End date is required"),
  duration_unit: z.string().min(1, "Duration unit is required"),
  description: z.string().min(1, "Description is required"),
  tasks: z
    .array(
      z.object({
        description: z.string().min(1, "Task description is required"),
      })
    )
    .nonempty("At least one task is required"),
  activities: z.array(activitySchema).nonempty({
    message: "At least one activity is required",
  }),
});

export const seasonSchema = z.object({
  name: z.string().min(1, "Season name is required"),
  period: z.string(),
  isRecommended: z.boolean(),
  from: z.string().min(1, "From is required"),
  to: z.string().min(1, "To is required"),
  stages: z.array(stagesSchema).nonempty({
    message: "At least one stage is required",
  }),
  // activities: z.array(activitySchema).nonempty({
  //   message: "At least one activity is required",
  // }),
});

export const taskSchema = z.object({
  description: z.string().min(1, "Task description is required"),
});

export const stageSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Stage description is required"),
  tasks: z
    .array(taskSchema)
    .nonempty({ message: "At least one task is required" }),
});

export const cropSchema = z.object({
  name: z.string().min(1, "Name is required"),
  scientificName: z.string().min(1, "Scientific name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  idealTemperature: z.string().min(1, "Ideal temperature is required"),
  waterRequirements: z.string().min(1, "Water requirements are required"),
  soilType: z.string().min(1, "Soil type is required"),
  // activities: z
  //   .array(activitySchema)
  //   .nonempty({ message: "At least one activity is required" }),
  // seasons: z
  //   .array(seasonSchema)
  //   .nonempty({ message: "At least one season is required" }),
  // stages: z
  //   .array(stageSchema)
  //   .nonempty({ message: "At least one stage is required" }),
  seasons: z.array(seasonSchema).nonempty({
    message: "At least one season is required",
  }),
});

export type cropSchemaType = z.infer<typeof cropSchema>;
