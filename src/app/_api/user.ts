import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userClient from "./client/user";
import {
  ISendContactMailPayload,
  ISendInvitationPayload,
  IUser,
  IVerifyNinPayload,
} from "@/interface/user";
import API_ENDPOINTS from "./client/endpoint";

export const useVerifyNinMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyNinPayload) => userClient.verifyNin(data),
  });
};

export const useGetUsersQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_USERS, params],
    queryFn: () => userClient.getUsers(params),
    enabled,
  });
};

export const useGetUserQuery = ({
  enabled = true,
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<IUser>, Error>({
    queryKey: [API_ENDPOINTS.GET_USER, id],
    queryFn: () => userClient.getUser(id),
    enabled,
  });
};

export const useGetVendorsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_VENDORS, params],
    queryFn: () => userClient.getVendors(params),
    enabled,
  });
};

export const useGetFarmersQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_FARMERS, params],
    queryFn: () => userClient.getFarmers(params),
    enabled,
  });
};

export const useGetCooperativesQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_COOPERATIVES, params],
    queryFn: () => userClient.getCooperatives(params),
    enabled,
  });
};

export const useGetCooperativeFarmersQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IUser, "users">>, Error>({
    queryKey: [API_ENDPOINTS.GET_COOPERATIVE_FARMERS, params],
    queryFn: () => userClient.getCooperativeFarmers(params),
    enabled,
  });
};

export const useForceUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userClient.forceUpdate(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_PROFILE],
      });
    },
  });
};

export const useGetProfileQuery = ({ enabled = true }: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_PROFILE],
    queryFn: userClient.getProfile,
    enabled,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userClient.updateUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_PROFILE],
      });
    },
  });
};

export const useAddFarmersFromCsvMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => userClient.addFarmersFromCsv(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_COOPERATIVE_FARMERS],
      });
    },
  });
};

export const useAddFarmerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { farmerId: string }) => userClient.addFarmer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_COOPERATIVE_FARMERS],
      });
    },
  });
};

export const useInviteUserMutation = () => {
  return useMutation({
    mutationFn: (data: ISendInvitationPayload) => userClient.inviteUser(data),
  });
};

export const useSendContactMailMutation = () => {
  return useMutation({
    mutationFn: (data: ISendContactMailPayload) =>
      userClient.sendContactMail(data),
  });
};
