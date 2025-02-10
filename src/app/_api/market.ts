import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import marketClient from "./client/market";
import {
  ICreateMarketPayload,
  IMarket,
  IUploadProductsFromSheetPayload,
} from "@/interface/market";

export const useGetMarketsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IMarket, "markets">>, Error>({
    queryKey: [API_ENDPOINTS.GET_MARKETS, params],
    queryFn: () => marketClient.getMarkets(params),
    enabled: enabled,
  });
};

export const useGetProductsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_PRODUCTS, params],
    queryFn: () => marketClient.getProducts(params),
    enabled: enabled,
    refetchOnMount: true,
  });
};

export const useGetMarket = ({
  enabled = true,
  params = {},
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_MARKET],
    queryFn: () => marketClient.getMarket(params, id),
    enabled: enabled,
  });
};

export const useCreateMarketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateMarketPayload }) =>
      marketClient.createMarket(data),
    mutationKey: [API_ENDPOINTS.CREATE_MARKET],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_MARKETS] });
    },
  });
};

export const useUpdateMarketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      marketClient.updateMarket(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_MARKET],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_MARKETS] });
    },
  });
};

export const useDeleteMarketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => marketClient.deleteMarket(id),
    mutationKey: [API_ENDPOINTS.DELETE_MARKET],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_MARKETS] });
    },
  });
};

export const useGetMarketProductsQuery = ({
  enabled = true,
  params = {},
  marketId,
}: IQueryParams & { marketId: string }) => {
  return useQuery<IResponse<IPaginatedResponse<any, "products">>, Error>({
    queryKey: [API_ENDPOINTS.GET_MARKET_PRODUCTS],
    queryFn: () => marketClient.getMarketProducts(params, marketId),
    enabled: enabled,
  });
};

export const useGetMarketTemplate = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_PRODUCT_TEMPLATE],
    queryFn: () => marketClient.getProductTemplate(params),
    enabled: enabled,
  });
};

export const useUploadProductFromSheetMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: FormData }) =>
      marketClient.uploadProductsFromSheet(data),
    mutationKey: [API_ENDPOINTS.UPLOAD_PRODUCTS_FROM_SHEETS],
  });
};
