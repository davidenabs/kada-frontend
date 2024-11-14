import { IQueryParams, IResponse } from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import marketClient from "./client/market";
import {
  ICreateMarketPayload,
  IUploadProductsFromSheetPayload,
} from "@/interface/market";

export const useGetMarkets = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_MARKETS],
    queryFn: () => marketClient.getMarkets(params),
    enabled: enabled !== undefined ? enabled : true,
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
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useCreateMarketMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ICreateMarketPayload }) =>
      marketClient.createMarket(data),
    mutationKey: [API_ENDPOINTS.CREATE_MARKET],
  });
};

export const useUpdateMarketMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      marketClient.updateMarket(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_MARKET],
  });
};

export const useDeleteMarketMutation = () => {
  return useMutation({
    mutationFn: (id: string) => marketClient.deleteMarket(id),
    mutationKey: [API_ENDPOINTS.DELETE_MARKET],
  });
};

export const useGetMarketProducts = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_MARKET_PRODUCTS],
    queryFn: () => marketClient.getMarketProducts(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetMarketTemplate = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.GET_PRODUCT_TEMPLATE],
    queryFn: () => marketClient.getProductTemplate(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useUploadProductFromSheetMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: IUploadProductsFromSheetPayload }) =>
      marketClient.uploadProductsFromSheet(data),
    mutationKey: [API_ENDPOINTS.UPLOAD_PRODUCTS_FROM_SHEETS],
  });
};
