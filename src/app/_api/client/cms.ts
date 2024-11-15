import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const cmsClient = {
  getPosts: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.CMS_GET_POSTS, params),
};

export default cmsClient;
