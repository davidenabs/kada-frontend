import { useMutation, useQuery } from "@tanstack/react-query";
import farmProductsClient from "./client/farm-products";
import { IQueryParams } from "@/interface/client";
import API_ENDPOINTS from "./client/endpoint";

export const useGetFarmProductsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.GET_FARM_PRODUCTS],
    queryFn: () => farmProductsClient.getFarmProducts(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateFarmProductMutation = () => {
  return useMutation({
    mutationFn: (data: any) => farmProductsClient.createFarmProduct(data),
    onError: (error: any) => {
      console.error(error);
    },
    mutationKey: [API_ENDPOINTS.CREATE_FARM_PRODUCT],
  });
};

export const useUpdateFarmProductMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      farmProductsClient.updateFarmProduct(data, id),
    onError: (error: any) => {
      console.error(error);
    },
    mutationKey: [API_ENDPOINTS.UPDATE_FARM_PRODUCT],
  });
};

export const useDeleteFarmProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => farmProductsClient.deleteFarmProduct(id),
    onError: (error: any) => {
      console.error(error);
    },
    mutationKey: [API_ENDPOINTS.DELETE_FARM_PRODUCT],
  });
};
