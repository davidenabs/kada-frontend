import { IUser } from "./user";

export enum RequestType {
  FARMER_TO_COOPERATIVE = "FARMER_TO_COOPERATIVE",
  COOPERATIVE_TO_FARMER = "COOPERATIVE_TO_FARMER",
  VENDOR_LICENSE = "VENDOR_LICENSE",
}

export interface ICreateRequestPayload {
  farmerId?: number | null;
  cooperativeId?: number | null;
  vendorId?: number | null;
  requestType: RequestType;
}

export interface IUpdateRequestPayload {
  newStatus: "approved" | "rejected";
}

export interface IRequest {
  id: number;
  description: string | null;
  status: string;
  requestType: RequestType;
  meta: any | null;
  createdAt: string;
  updatedAt: string;
  farmer: IUser | null;
  cooperative: IUser | null;
  vendor: IUser | null; // Define the vendor type if available
}
