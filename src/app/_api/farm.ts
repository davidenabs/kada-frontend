import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import farmClient from "./client/farm";
import processError from "@/utils/error";
import {
  ICreateFarmGalleryPayload,
  ICreateFarmPayload,
  IFarm,
  IFarmGallery,
} from "@/interface/farm";

export const useGetFarmsQuerry = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IFarm, "farms">>, Error>({
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, farmerId }: { data: any; farmerId: any }) =>
      farmClient.createFarm(data, farmerId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_FARMS],
      });
    },
    onError: (error: any) => {
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

export const useGetFarmGalleryQuery = ({
  enabled = true,
  params = {},
  farmId,
}: IQueryParams & { farmId: string }) => {
  return useQuery<IResponse<IFarmGallery[]>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARM_GALLERY],
    queryFn: () => farmClient.getFarmGallery(params, farmId),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateFarmGalleryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      farmId,
    }: {
      data: ICreateFarmGalleryPayload;
      farmId: string;
    }) => farmClient.createFarmGallery(data, farmId),
    onError: (error: any) => {
      processError(error);
    },
    mutationKey: [API_ENDPOINTS.CREATE_FARM_GALLERY],
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_FARM_GALLERY],
      });
    },
  });
};
