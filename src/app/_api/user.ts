import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import userClient from "./client/user";
import { IUser, IVerifyNinPayload } from "@/interface/user";
import API_ENDPOINTS from "./client/endpoint";
import processError from "@/utils/error";

export const useVerifyNinMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyNinPayload) => userClient.verifyNin(data),
    onError: (error: any) => {
      console.log(error + "Failed to verify NIN");
      processError(error);
    },
  });
};

export const useUserQuery = ({ enabled = true, params = {} }: IQueryParams) => {
  return useQuery<IResponse<IUser>, Error>({
    queryKey: [API_ENDPOINTS.GET_USERS],
    queryFn: () => userClient.getUsers(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};
