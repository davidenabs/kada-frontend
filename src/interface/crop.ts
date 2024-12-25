export enum ActivityPhases {
  START = 'START',
  MID = 'MID',
  END = 'END',
}

export interface ICreateCropActivityDetail {
  description?: string |null;
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
  isRecommended: boolean;
  activities: Activity[];
}

export interface Task {
  id: string;
  description: string;
}

export interface Stage {
  id: string;
  name: string;
  duration: string;
  description: string;
  tasks: Task[];
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
  // seasons: Season[];
  // stages: Stage[];
  farms: any[];
  activities: Activity[];
}