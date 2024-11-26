import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import {
  ICreateMarketPayload,
  IUploadProductsFromSheetPayload,
} from "@/interface/market";
import { objectToFormData } from "@/utils/utils";

const marketClient = {
  getMarkets: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_MARKETS, params),
  getMarket: (params: IParams, id: string): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_MARKET.replace(":id", id), params),
  createMarket: (data: ICreateMarketPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CREATE_MARKET, data),
  updateMarket: (data: any, id: string): Promise<any> =>
    ApiClient.put(API_ENDPOINTS.UPDATE_MARKET.replace(":id", id), data),
  deleteMarket: (id: string): Promise<any> =>
    ApiClient.delete(API_ENDPOINTS.DELETE_MARKET.replace(":id", id)),
  getMarketProducts: (params: IParams, marketId: string): Promise<any> =>
    ApiClient.get(
      API_ENDPOINTS.GET_MARKET_PRODUCTS.replace(":marketId", marketId),
      params
    ),
  getProducts: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_PRODUCTS, params),
  getProductTemplate: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_PRODUCT_TEMPLATE, params),
  uploadProductsFromSheet: (data: FormData): Promise<any> => {
    return ApiClient.post(API_ENDPOINTS.UPLOAD_PRODUCTS_FROM_SHEETS, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default marketClient;
