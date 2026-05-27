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
  deletePost: (id: any): Promise<any> =>
    ApiClient.delete(API_ENDPOINTS.CMS_DELETE_POST.replace(":postId", id)),
  applyToPost: (postId: any): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CMS_APPLY_POST, { postId }),
  getPostApplicants: (postId: any): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.CMS_GET_POST_APPLICANTS.replace(":postId", postId)),
  assignUsers: (data: { userIds: any[], postIds: any[] }): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CMS_ASSIGN_USERS, data),
};

export default cmsClient;
