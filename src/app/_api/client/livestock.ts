import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const livestockClient = {
  getLivestocks: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_LIVESTOCKS, params),
  getLivestock: (params: IParams, id: string): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_LIVESTOCK.replace(":id", id), params),
  createLivestock: (data: any): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.GET_LIVESTOCKS, data),
  updateLivestock: (data: any, id: string): Promise<any> =>
    ApiClient.put(API_ENDPOINTS.GET_LIVESTOCK.replace(":id", id), data),
};

export default livestockClient;
