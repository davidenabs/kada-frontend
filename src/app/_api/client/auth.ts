import { ApiClient } from ".";
import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  ISendOtpPayload,
  IVerifyOtpPayload,
} from "@/interface/auth";
import API_ENDPOINTS from "./endpoint";
import { IResponse } from "@/interface/client";

const authClient = {
  login: async (data: ILoginPayload): Promise<IResponse<ILoginResponse>> =>
    ApiClient.post(API_ENDPOINTS.LOGIN, data),
  register: async (data: IRegisterPayload): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.REGISTER, data),
  verifyOtp: async (data: IVerifyOtpPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.VERIFY_OTP, data),
  sendOtp: async (data: ISendOtpPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.SEND_OTP, data),
};

export default authClient;
