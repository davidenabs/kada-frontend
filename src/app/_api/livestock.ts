import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import livestockClient from "./client/livestock";

export const useGetLivestocksQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_LIVESTOCKS, params],
    queryFn: () => livestockClient.getLivestocks(params),
    enabled: enabled,
  });
};

export const useGetLivestockQuery = ({
  enabled = true,
  params = {},
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_LIVESTOCK],
    queryFn: () => livestockClient.getLivestock(params, id),
    enabled: enabled,
  });
};

export const useCreateLivestockMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      livestockClient.createLivestock(data),
    mutationKey: [API_ENDPOINTS.GET_LIVESTOCKS],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_LIVESTOCKS],
      });
    },
  });
};
