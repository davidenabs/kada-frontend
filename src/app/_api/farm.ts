import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import farmClient from "./client/farm";
import processError from "@/utils/error";
import {
  ICreateFarmGalleryPayload,
  ICreateFarmPayload,
} from "@/interface/farm";

export const useGetFarmsQuerry = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARMS],
    queryFn: () => farmClient.getFarms(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetFarmQuery = ({
  enabled = true,
  params = {},
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARM],
    queryFn: () => farmClient.getFarm(params, id),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateFarmMutation = () => {
  return useMutation({
    mutationFn: ({
      data,
      farmerId,
    }: {
      data: ICreateFarmPayload;
      farmerId: string;
    }) => farmClient.createFarm(data, farmerId),
    onError: (error: any) => {
      console.error(error);
      processError(error);
    },
    mutationKey: [API_ENDPOINTS.CREATE_FARM],
  });
};

export const useUpdateFarmMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      farmClient.updateFarm(data, id),
    onError: (error: any) => {
      console.error(error);
      processError(error);
    },
    mutationKey: [API_ENDPOINTS.UPDATE_FARM],
  });
};

export const useDeleteFarmMutation = () => {
  return useMutation({
    mutationFn: (id: string) => farmClient.deleteFarm(id),
    onError: (error: any) => {
      console.error(error);
      processError(error);
    },
    mutationKey: [API_ENDPOINTS.DELETE_FARM],
  });
};

export const useGetFarmGallery = ({
  enabled = true,
  params = {},
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARM_GALLERY],
    queryFn: () => farmClient.getFarmGallery(params, id),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateFarmGalleryMutation = () => {
  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: ICreateFarmGalleryPayload;
      id: string;
    }) => farmClient.createFarmGallery(data, id),
    onError: (error: any) => {
      console.error(error);
      processError(error);
    },
    mutationKey: [API_ENDPOINTS.CREATE_FARM_GALLERY],
  });
};
