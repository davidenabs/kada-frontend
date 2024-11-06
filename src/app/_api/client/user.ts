import { IParams, IResponse } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { IVerifyNinPayload } from "@/interface/user";

const userClient = {
  verifyNin: (data: IVerifyNinPayload): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.VERIFY_NIN, data),
  getUsers: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_USERS, params),
};

export default userClient;
