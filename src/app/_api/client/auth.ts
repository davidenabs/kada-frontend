import { ApiClient } from ".";
import { ILoginPayload, ILoginResponse } from "@/interface/auth";
import API_ENDPOINTS from "./endpoint";

const authClient = {
  login: async (data: ILoginPayload): Promise<ILoginResponse> =>
    ApiClient.post<ILoginResponse>(API_ENDPOINTS.LOGIN, data),
};

export default authClient;
