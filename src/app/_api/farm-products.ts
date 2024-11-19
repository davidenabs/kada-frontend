import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import farmProductsClient from "./client/farm-products";
import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import API_ENDPOINTS from "./client/endpoint";
import { IRequest } from "@/interface/request";

export const useGetFarmProductsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IRequest, "items">>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARM_PRODUCTS, params],
    queryFn: () => farmProductsClient.getFarmProducts(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateFarmProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => farmProductsClient.createFarmProduct(data),
    mutationKey: [API_ENDPOINTS.CREATE_FARM_PRODUCT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_FARM_PRODUCTS],
      });
    },
  });
};

export const useUpdateFarmProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      farmProductsClient.updateFarmProduct(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_FARM_PRODUCT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_FARM_PRODUCTS],
      });
    },
  });
};

export const useDeleteFarmProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => farmProductsClient.deleteFarmProduct(id),
    mutationKey: [API_ENDPOINTS.DELETE_FARM_PRODUCT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_FARM_PRODUCTS],
      });
    },
  });
};
