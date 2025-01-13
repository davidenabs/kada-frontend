import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import {
  CreateFarmCroppingPayload,
  ICreateFarmGalleryPayload,
  ICreateFarmPayload,
} from "@/interface/farm";
import { objectToFormData } from "@/utils/utils";

const farmClient = {
  getFarms: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_FARMS, params),
  getFarm: (params: IParams, id: string): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_FARM.replace(":id", id), params),
  createFarm: (data: any, farmerId: string): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CREATE_FARM.replace(":farmerId", ""), data),
  updateFarm: (data: any, id: string): Promise<any> =>
    ApiClient.put(API_ENDPOINTS.UPDATE_FARM.replace(":farmId", id), data),
  deleteFarm: (id: string): Promise<any> =>
    ApiClient.delete(API_ENDPOINTS.DELETE_FARM.replace(":farmId", id)),
  getFarmGallery: (params: IParams, farmId: string): Promise<any> =>
    ApiClient.get(
      API_ENDPOINTS.GET_FARM_GALLERY.replace(":farmId", farmId),
      params
    ),
  createFarmGallery: (
    data: ICreateFarmGalleryPayload,
    id: string
  ): Promise<any> => {
    const formData = objectToFormData(data);
    return ApiClient.post(
      API_ENDPOINTS.CREATE_FARM_GALLERY.replace(":farmId", id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  createFarmCropping: (data: CreateFarmCroppingPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CREATE_FARM_CROPPING, data),
  getFarmCroppingNotification: (farmId: string): Promise<any> =>
    ApiClient.get(
      API_ENDPOINTS.GET_FARM_CROPPING_NOTIFICATION.replace(":farmId", farmId)
    ),
  updateFarmActivityLog: (data: any): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.UPDATE_FARM_ACTIVITY_LOG, data),
  verifyFarm: (data: any, id: string, farmerId: any): Promise<any> =>
    ApiClient.put(
      API_ENDPOINTS.VERIFY_FARM.replace(":farmId", id).replace(
        ":farmerId",
        farmerId
      ),
      data
    ),
  personalizeCropping: (data: any): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.PERSONALIZED_CROPPING_CALENDAR, data),
  getPersonalizedCropping: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.PERSONALIZED_CROPPING_CALENDAR, params),
  applyCroppingStage: (data: any): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.PERSONALIZED_CROPPING_CALENDAR_STAGE_APP, data),
};

export default farmClient;
