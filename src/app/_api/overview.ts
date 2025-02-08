import { IQueryParams, IResponse } from "@/interface/client";
import { useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import overviewClient from "./client/overview";

export const useGetAdminOverviewQuery = ({ enabled = true }: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_ADMIN_OVERVIEW],
    queryFn: () => overviewClient.getAdminOverview(),
    enabled: enabled,
  });
};

export const useGetCooperativeOverviewQuery = ({
  enabled = true,
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_COOPERATIVE_OVERVIEW],
    queryFn: () => overviewClient.getCooperativeOverview(),
    enabled: enabled,
  });
};

export const useGetVendorOverviewQuery = ({ enabled = true }: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_VENDOR_OVERVIEW],
    queryFn: () => overviewClient.getVendorOverview(),
    enabled: enabled,
  });
};

export const useGetEnumeratorOverviewQuery = ({ enabled = true }: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_ENUMERATOR_OVERVIEW],
    queryFn: () => overviewClient.getEnumeratorOverview(),
    enabled: enabled,
  });
};

export const useGetPartnerPostOverviewQuery = ({
  enabled = true,
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.CMS_USER_POST_OVERVIEW],
    queryFn: () => overviewClient.getPartnerPostOverview(),
    enabled: enabled,
  });
};

