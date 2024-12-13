import { Activity, ICrop } from "./crop";

export interface ICreateFarmGalleryPayload {
  description: string;
  file: File;
}

export interface CreateFarmCroppingPayload {
  farmId: string;
  cropId: string;
  plantingDate: string | Date;
}

export interface IGeoLocation {
  type: "Polygon";
  coordinates: [
    [[number, number], [number, number], [number, number], [number, number]]
  ];
}

export interface ICreateFarmPayload {
  name: string;
  geoLocation: IGeoLocation;
  landArea: number; // Land area in square meters
  activeSeason: string;
  products: string[]; // IDs of related products
}

export interface IFarm {
  id: string;
  name: string;
  landArea: number;
  location?: string;
  activeSeason: string;
  lga?: string;
  crops?: ICrop[];
  geoLocation: IGeoLocation;
  imagePath: string;
  isVerified: boolean;
  farmerId: string;
  activityLogs?: IActivityLog[];
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

export interface IFarmGallery {
  id: string;
  description: string;
  imagePath: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IActivityLog {
  id: string;
  status: boolean;
  completedAt: string | null;
  notificationCount: number;
  createdAt: string;
  expiredAt: string;
  updatedAt: string;
  activity: Activity;
  crop?: ICrop;
}


