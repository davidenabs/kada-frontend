import { IQueryParams, IResponse } from "@/interface/client";
import { useQuery } from "@tanstack/react-query";
import userClient from "./client/user";
import { IUser } from "@/interface/user";

export const useUserQuery = ({ enabled = true, params = {} }: IQueryParams) => {
  return useQuery<IResponse<IUser>, Error>({
    queryKey: [API_ENDPOINTS.GET_USERS],
    queryFn: () => userClient.getUsers(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};
