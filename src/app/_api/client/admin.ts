import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const adminClient = {
  adminAddUser: (data: any) =>
    ApiClient.post(API_ENDPOINTS.ADMIN_ADD_USER, data),
};

export default adminClient;
