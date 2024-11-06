import { IUser } from "./user";

export interface ILoginPayload {
  userId: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IVerifyOtpPayload {
  userId: string;
  otp: string;
}

export interface ISendOtpPayload {
  userId: string;
  method: string;
}
