import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import requestClient from "./client/request";
import {
  ICreateRequestPayload,
  IUpdateRequestPayload,
} from "@/interface/request";

export const useGetRequests = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_REQUESTS],
    queryFn: () => requestClient.getRequests(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateRequestMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ICreateRequestPayload }) =>
      requestClient.createRequest(data),
    mutationKey: [API_ENDPOINTS.CREATE_REQUEST],
  });
};

export const useUpdateRequestMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: IUpdateRequestPayload; id: string }) =>
      requestClient.updateRequest(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_REQUEST],
  });
};
