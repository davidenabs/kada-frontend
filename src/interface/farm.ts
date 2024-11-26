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
  crops?: {
    id: string;
    name: string;
    description: string | null;
  }[];
  geoLocation: IGeoLocation;
  imagePath: string;
  isVerified: boolean;
  farmerId: string;
}

export interface IFarmGallery {
  id: string;
  description: string;
  imagePath: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
