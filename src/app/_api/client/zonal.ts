import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { IZonalReviewPayload } from "@/interface/zonal";

const zonalClient = {
  getVendorReview: async (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_VENDOR_REVIEWS, params),
  getZonalOfficerVendors: async (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_ZONAL_OFFICER_VENDORS, params),
  createVendorReview: async (data: IZonalReviewPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.GET_VENDOR_REVIEWS, data),
};

export default zonalClient;
