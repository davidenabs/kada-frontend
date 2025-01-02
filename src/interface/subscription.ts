import { IUser, UserType } from "./user";

export interface ICreateSubscriptionPayload {
  name: string;
  price: number;
  durationInYears: number;
  userType: string;
}

export interface IUpdateSubscriptionPayload {
  name: string | null;
  price: number | null;
  durationInYears: number | null;
  isActive?: boolean | null;
}

export interface ISubscription {
  id: string;
  name: string;
  price: number;
  durationInYears: number;
  userType: UserType;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
