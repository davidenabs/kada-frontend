import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import requestClient from "./client/request";
import {
  ICreateRequestPayload,
  IRequest,
  IUpdateRequestPayload,
} from "@/interface/request";

export const useGetRequests = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IRequest, "requests">>, Error>({
    queryKey: [API_ENDPOINTS.GET_REQUESTS, params],
    queryFn: () => requestClient.getRequests(params),
    enabled: enabled,
  });
};

export const useCreateRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateRequestPayload }) =>
      requestClient.createRequest(data),
    mutationKey: [API_ENDPOINTS.CREATE_REQUEST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_REQUESTS],
      });
    },
  });
};

export const useUpdateRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: IUpdateRequestPayload; id: string }) =>
      requestClient.updateRequest(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_REQUEST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_REQUESTS],
      });
    },
  });
};
