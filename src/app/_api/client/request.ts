import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { ICreateRequestPayload, IUpdateRequestPayload } from "@/interface/request";

const requestClient = {
    getRequests: (params: IParams): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.GET_REQUESTS, params),
    createRequest: (data: ICreateRequestPayload): Promise<any> => ApiClient.post(
        API_ENDPOINTS.CREATE_REQUEST,
        data
    ),
    updateRequest: (data: IUpdateRequestPayload, id: string): Promise<any> => ApiClient.put(
        API_ENDPOINTS.UPDATE_REQUEST.replace(":id", id),
        data
    ),
};

export default requestClient;
