export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  imagePath: string | null;
  password: string;
  userType: UserType;
  verified: boolean;
  isSubscribed: boolean;
  createdBy: string;
  lga: string;
  verificationMethod: "EMAIL" | "PHONE" | "BOTH";
  otp: string;
  otpCreatedAt: string | null;
  farmerProfile: IFarmerProfile | null;
  cooperativeProfile: ICooperativeProfile | null;
  vendorProfile: IVendorProfile | null;
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
  phoneNumber?: string;
  userId?: string;
  dob?: string;
}

export interface IFarmerProfile {
  id: number;
  nationalIdentificationNumber: string;
  ninData: any;
  isNinVerified: boolean;
  dob: string;
  cooperative: ICooperativeProfile;
}

export interface ICooperativeProfile {
  id: number;
  cooperativeName: string | null;
  about: string | null;
  eligibility: string | null;
  registrationNumber: string | null;
  isVerified: boolean;
  bankName: string | null;
  accountNumber: string | null;
  accountName: string | null;
  bankAddress: string | null;
  joinAmount: number | null;
  totalMembers: number | null;
}

export interface IVendorProfile {
  id: number;
  vendorName: string | null;
  about: string | null;
  productService: string | null;
  registrationNumber: string | null;
  hasCAC: boolean;
  dateEstablished: string | null;
  hasPaid: boolean;
  isVerified: boolean;
  verificationStatusUpdatedAt: string | null;
}

export interface ISendContactMailPayload {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export interface ISendInvitationPayload {
  email: string;
  registerLink: string;
}
