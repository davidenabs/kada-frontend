import { z } from "zod";

// export const activitySchema = z.object({
//   description: z.string().min(1, "Activity description is required"),
// });

// Define the schema for activity details
const activityDetailsSchema = z.object({
  description: z.string(),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  unit_cost: z.number().positive("Unit cost must be greater than 0"),
  total_cost: z.number().positive("Total cost must be greater than 0"),
});


const activitySchema = z.object({
  // phase: z.string().min(1, "Phase is required"),
  name: z.string().min(1, "Activity name is required"),
  details: z
    .array(activityDetailsSchema)
    .nonempty("At least one detail is required for the activity"),
});


export const seasonSchema = z.object({
  name: z.string().min(1, "Season name is required"),
  period: z.string().min(1, "Period is required"),
  isRecommended: z.boolean(),
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
  activities: z
    .array(activitySchema)
    .nonempty({ message: "At least one activity is required" }),
  // seasons: z
  //   .array(seasonSchema)
  //   .nonempty({ message: "At least one season is required" }),
  // stages: z
  //   .array(stageSchema)
  //   .nonempty({ message: "At least one stage is required" }),
});

export type cropSchemaType = z.infer<typeof cropSchema>;
