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
  verificationMethod: "EMAIL" | "PHONE" | "BOTH";
  otp: string;
  otpCreatedAt: string | null;
  farmerProfile: IFarmerProfile | null;
  cooperativeProfile: ICooperativeProfile | null;
  vendorProfile: any | null;
}

export enum UserType {
  SUPERADMIN = "SUPERADMIN",
  FARMER = "FARMER",
  COOPERATIVE = "COOPERATIVE",
  ENUMERATOR = "ENUMERATOR",
  VENDOR = "VENDOR",
}

export interface IVerifyNinPayload {
  nin: string;
}

export interface IFarmerProfile {
  id: number;
  nationalIdentificationNumber: string;
  ninData: any;
  isNinVerified: boolean;
  dob: string;
}

export interface ICooperativeProfile {
  id: number;
  cooperativeName: string | null;
  about: string | null;
  eligibility: string | null;
  registrationNumber: string | null;
  isVerified: boolean;
}
