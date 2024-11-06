export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  imagePath: string | null;
  password: string;
  userType: UserType;
  verified: boolean;
  verificationMethod: "EMAIL" | "SMS" | "BOTH";
  otp: string;
  otpCreatedAt: string | null;
}

export enum UserType {
  FARMER = "FARMER",
  ADMIN = "ADMIN",
  USER = "USER",
}
