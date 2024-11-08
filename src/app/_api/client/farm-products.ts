import { IParams, IResponse } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const farmProductsClient = {
  getFarmProducts: (params: IParams): Promise<IResponse<any>> =>
    ApiClient.get(API_ENDPOINTS.GET_FARM_PRODUCTS, params),
  createFarmProduct: (data: any): Promise<IResponse<any>> =>
    ApiClient.post(API_ENDPOINTS.CREATE_FARM_PRODUCT, data),
  updateFarmProduct: (data: any, id: string): Promise<IResponse<any>> =>
    ApiClient.put(
      API_ENDPOINTS.UPDATE_FARM_PRODUCT.replace(":productId", id),
      data
    ),
  deleteFarmProduct: (id: string): Promise<IResponse<any>> =>
    ApiClient.delete(
      API_ENDPOINTS.DELETE_FARM_PRODUCT.replace(":productId", id)
    ),
};

export default farmProductsClient;
