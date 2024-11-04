import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const userClient = {
  getUsers: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_USERS, params),
};

export default userClient;
