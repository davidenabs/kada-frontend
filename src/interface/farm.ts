export interface ICreateFarmGalleryPayload {
  description: string;
  file: File;
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
