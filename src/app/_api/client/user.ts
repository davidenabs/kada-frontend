import { IParams, IResponse } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { IVerifyNinPayload } from "@/interface/user";

const userClient = {
  verifyNin: (data: IVerifyNinPayload): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.VERIFY_NIN, data),
  getUsers: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_USERS, params),
  getUser: (id: string): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_USER.replace(":id", id)),
  getVendors: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_VENDORS, params),
  getFarmers: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_FARMERS, params),
  getCooperatives: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_COOPERATIVES, params),
  getCooperativeFarmers: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_COOPERATIVE_FARMERS, params),
  forceUpdate: (data: any): Promise<IResponse<any>> =>
    ApiClient.put(API_ENDPOINTS.FORCE_UPDATE, data),
  getProfile: (): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_PROFILE),
  updateUser: (data: any): Promise<IResponse<any>> =>
    ApiClient.put(API_ENDPOINTS.UPDATE_USER, data),
  addFarmersFromCsv: (data: FormData): Promise<IResponse<any>> => {
    return ApiClient.post(API_ENDPOINTS.ADD_FARMERS_FROM_CSV, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  addFarmer: (data: { farmerId: string }): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.ADD_FARMER, data),
  inviteUser: (data: any): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.INVITE_USER, data),
  sendContactMail: (data: any): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.SEDN_CONTACT_MAIL, data),
};

export default userClient;
