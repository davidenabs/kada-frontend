import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { IResponse } from "@/interface/client";
import { IRegisterFarmerPayload } from "@/interface/enumerator";

const enumeratorClient = {
    registerFarmer: async (data: IRegisterFarmerPayload): Promise<IResponse<any>> =>
        ApiClient.post(API_ENDPOINTS.REGISTER_FARM, data),

};

export default enumeratorClient;
