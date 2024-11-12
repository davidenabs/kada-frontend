import { IParams, IResponse } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { IVerifyNinPayload } from "@/interface/user";

const userClient = {
  verifyNin: (data: IVerifyNinPayload): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.VERIFY_NIN, data),
  getUsers: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_USERS, params),
  forceUpdate: (data: any): Promise<IResponse<any>> =>
    ApiClient.put(API_ENDPOINTS.FORCE_UPDATE, data),
  getProfile: (): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_PROFILE),
  updateUser: (data: any): Promise<IResponse<any>> =>
    ApiClient.put(API_ENDPOINTS.UPDATE_USER, data),
};

export default userClient;
