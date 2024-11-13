import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const overviewClient = {
  getAdminOverview: (): Promise<any> => {
    return ApiClient.get(API_ENDPOINTS.GET_ADMIN_OVERVIEW);
  },
  getCooperativeOverview: (): Promise<any> => {
    return ApiClient.get(API_ENDPOINTS.GET_COOPERATIVE_OVERVIEW);
  },
  getVendorOverview: (): Promise<any> => {
    return ApiClient.get(API_ENDPOINTS.GET_VENDOR_OVERVIEW);
  },
};

export default overviewClient;
