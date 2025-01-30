import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import zonalClient from "./client/zonal";
import { IZonalReviewPayload } from "@/interface/zonal";

export const useGetVendorReviewsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_VENDOR_REVIEWS, params],
    queryFn: () => zonalClient.getVendorReview(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetZonalOfficerVendorsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_ZONAL_OFFICER_VENDORS, params],
    queryFn: () => zonalClient.getZonalOfficerVendors(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateVendorReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IZonalReviewPayload) =>
      zonalClient.createVendorReview(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_VENDOR_REVIEWS],
      });
    },
  });
};
