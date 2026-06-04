import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import userClient from "./client/user";
import { ApiClient } from "./client";
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
    placeholderData: keepPreviousData,
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

export const useGetVendorCertificateQuery = ({
  enabled = true,
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<IUser>, Error>({
    queryKey: [API_ENDPOINTS.GET_VENDOR_CERTIFICATE, id],
    queryFn: () => userClient.getVendorCertificate(id),
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
    placeholderData: keepPreviousData,
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
    placeholderData: keepPreviousData,
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
    placeholderData: keepPreviousData,
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
    placeholderData: keepPreviousData,
    enabled,
  });
};

export const useForceUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userClient.forceUpdate(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_USER],
      });
    },
  });
};

export const useGetProfileQuery = ({ id, enabled = true }: IQueryParams & { id?: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_USER, id],
    queryFn: () => userClient.getProfile(id || "self"),
    enabled,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userClient.updateUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_USERS],
      });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userClient.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_USERS],
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

export const useBulkUploadUsersMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => userClient.bulkUploadUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_USERS],
      });
    },
  });
};

export const useGetBulkUploadJobQuery = (jobId: string, enabled: boolean = true) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_BULK_UPLOAD_JOB, jobId],
    queryFn: () => userClient.getBulkUploadJob(jobId),
    enabled: enabled && !!jobId,
    refetchInterval: (query: any) => {
       // Poll every 5 seconds if job is processing or pending
       const status = query?.state?.data?.data?.status;
       if (status === 'PENDING' || status === 'PROCESSING') return 5000;
       return false;
    }
  });
};


export const useExportDataMutation = () => {
  return useMutation({
    mutationFn: (data: { exportType: string; filters?: any; fields: string[] }) =>
      ApiClient.post('/users/export', data),
  });
};

export const useGetExportJobQuery = ({
  params,
  enabled,
}: {
  params: { jobId: string };
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['exportJob', params.jobId],
    queryFn: () => ApiClient.get(`/users/export/job/${params.jobId}`),
    enabled,
    refetchInterval: (query: any) => {
      // Poll every 3 seconds if status is PENDING or PROCESSING
      const status = query?.state?.data?.data?.status;
      if (status === 'PENDING' || status === 'PROCESSING') {
        return 3000;
      }
      return false;
    },
  });
};

export const useGetCooperativesListQuery = ({
  params,
  enabled,
}: {
  params: any;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['cooperatives-list', params],
    queryFn: () => userClient.getCooperativesList(params),
    enabled,
  });
};
