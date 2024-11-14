import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import catalogClient from "./client/catalog";
import {
  ICatalog,
  ICreateCategoryPayload,
  ICreateProductPayload,
} from "@/interface/catalog";

// products & services
export const useGetProducts = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<ICatalog, "products">>, Error>({
    queryKey: [API_ENDPOINTS.CATALOG_GET_PRODUCTS, params],
    queryFn: () => catalogClient.getProducts(params),
    enabled: enabled,
  });
};

export const useGetProduct = ({
  enabled = true,
  params = {},
  id,
}: IQueryParams & { id: string }) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.CATALOG_GET_PRODUCT, params, id],
    queryFn: () => catalogClient.getProduct(params, id),
    enabled: enabled,
  });
};

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ICreateProductPayload }) =>
      catalogClient.createProduct(data),
    mutationKey: [API_ENDPOINTS.CATALOG_CREATE_PRODUCT],
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      catalogClient.updateProduct(data, id),
    mutationKey: [API_ENDPOINTS.CATALOG_UPDATE_PRODUCT],
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => catalogClient.deleteProduct(id),
    mutationKey: [API_ENDPOINTS.CATALOG_DELETE_PRODUCT],
  });
};

// category

export const useGetCategories = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<any>, Error>({
    queryKey: [API_ENDPOINTS.CATALOG_GET_PRODUCT_CATEGORIES, params],
    queryFn: () => catalogClient.getCategories(params),
    enabled: enabled,
  });
};

// export const useGetCategory = ({
//     enabled = true,
//     params = {},
//     id,
// }: IQueryParams & { id: string }) => {
//     return useQuery<IResponse<any>, Error>({
//         queryKey: [API_ENDPOINTS.CATALOG_GET_PRODUCT],
//         queryFn: () => catalogClient.getCategory(params, id),
//         enabled: enabled !== undefined ? enabled : true,
//     });
// };

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ICreateCategoryPayload }) =>
      catalogClient.createCategory(data),
    mutationKey: [API_ENDPOINTS.CATALOG_CREATE_PRODUCT_CATEGORIES],
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      catalogClient.updateCategory(data, id),
    mutationKey: [API_ENDPOINTS.CATALOG_UPDATE_PRODUCT_CATEGORIES],
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: (id: string) => catalogClient.deleteCategory(id),
    mutationKey: [API_ENDPOINTS.CATALOG_DELETE_PRODUCT_CATEGORIES],
  });
};
