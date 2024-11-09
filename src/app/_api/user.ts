import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import userClient from "./client/user";
import { IUser, IVerifyNinPayload } from "@/interface/user";
import API_ENDPOINTS from "./client/endpoint";
import processError from "@/utils/error";

export const useVerifyNinMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyNinPayload) => userClient.verifyNin(data),
    onError: (error: any) => {
      processError(error);
    },
  });
};

export const useGetUsersQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_USERS],
    queryFn: () => userClient.getUsers(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};
