import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { objectToFormData } from "@/utils/utils";

const cmsClient = {
  getPosts: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.CMS_GET_POSTS, params),
  createPost: (data: any): Promise<any> => {
    const formData = objectToFormData(data);
    return ApiClient.post(API_ENDPOINTS.CMS_CREATE_POST, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return ApiClient.post(API_ENDPOINTS.CMS_CREATE_POST, data);
  },
  updatePost: (data: any, id: any): Promise<any> => {
    const formData = objectToFormData(data);
    return ApiClient.put(API_ENDPOINTS.CMS_UPDATE_POST.replace(":postId", id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default cmsClient;
