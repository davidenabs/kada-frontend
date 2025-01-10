export enum ActivityPhases {
  START = "START",
  MID = "MID",
  END = "END",
}

export interface ICreateCropActivityDetail {
  description?: string | null;
  quantity: number;
  unit: string;
  unit_cost: number;
  total_cost: number;
}
export interface Activity {
  id: string;
  name: string;
  phase: ActivityPhases;
  subtotal?: number;
  details: ICreateCropActivityDetail[];
}

export interface Season {
  id: string;
  name: string;
  period: string;
  from: string;
  to: string;
  isRecommended: boolean;
  stages: Stage[];
}

export interface Task {
  id: string;
  description: string;
}

export interface Stage {
  id: string;
  name: string;
  start: number;
  stop: number;
  duration_unit: string;
  description: string;
  isRecommended: boolean;
  tasks: { description: string }[];
  activities: Activity[];
}

export interface ICrop {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imagePath: string | null;
  idealTemperature: string;
  waterRequirements: string;
  soilType: string;
  createdAt: string;
  updatedAt: string;
  seasons: Season[];
  // stages: Stage[];
  farms: any[];
  // activities: Activity[];
}
