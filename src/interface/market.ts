export interface ICreateMarketPayload {
  name: string;
  address: string;
  lga: string;
  ward: string | null;
  coordinates: string; // Alternatively, you could split this into latitude and longitude as numbers
  community: string;
  size: "Small" | "Medium" | "Large";
  openingDays: string; // Could also be an array of strings if individual days need to be accessed
  openingTime: string; // This could be a custom type if a structured time format is preferred
}

export interface IUploadProductsFromSheetPayload {
  file: File;
}

interface IZone {
  id: string;
  name: string;
  imagePath: string | null;
}

interface ILGA {
  id: string;
  name: string;
  zone: IZone;
}


export interface IMarket {
  id: number;
  name: string;
  address: string;
  lga: ILGA | null;
  zone: IZone | null;
  ward: string | null;
  coordinates: string;
  community: string;
  size: "Small" | "Medium" | "Large";
  openingDays: string;
  openingTime: string;
  marketCode: string;
  imagePath: string | null;
  createdAt: string;
  updatedAt: string;
  products: any[];
}
