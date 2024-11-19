import { z } from "zod";

export const activitySchema = z.object({
  description: z.string().min(1, "Activity description is required"),
});

export const seasonSchema = z.object({
  name: z.string().min(1, "Season name is required"),
  period: z.string().min(1, "Period is required"),
  isRecommended: z.boolean(),
  activities: z.array(activitySchema).nonempty({
    message: "At least one activity is required",
  }),
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
  seasons: z
    .array(seasonSchema)
    .nonempty({ message: "At least one season is required" }),
  stages: z
    .array(stageSchema)
    .nonempty({ message: "At least one stage is required" }),
});

export type cropSchemaType = z.infer<typeof cropSchema>;
