import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import { objectToFormData } from "@/utils/utils";
import { ICreateCategoryPayload, ICreateProductPayload } from "@/interface/catalog";


const headers = { "Content-Type": "multipart/form-data" };
const catalogClient = {
    // Products & Services
    getProducts: (params: IParams): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.CATALOG_GET_PRODUCTS, params),
    getProduct: (params: IParams, id: string): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.CATALOG_GET_PRODUCT.replace(":productId", id), params),
    createProduct: (data: ICreateProductPayload): Promise<any> => {
        const formData = objectToFormData(data);
        return ApiClient.post(
            API_ENDPOINTS.CATALOG_CREATE_PRODUCT,
            formData,
            { headers }
        );
    },
    updateProduct: (data: any, id: string): Promise<any> => {
        const formData = objectToFormData(data);
        return ApiClient.put(
            API_ENDPOINTS.CATALOG_UPDATE_PRODUCT.replace(":productId", id),
            formData,
            { headers }
        );
    },
    deleteProduct: (id: string): Promise<any> =>
        ApiClient.delete(API_ENDPOINTS.CATALOG_DELETE_PRODUCT.replace(":productId", id)),

    // Categories
    getCategories: (params: IParams): Promise<any> =>
        ApiClient.get(API_ENDPOINTS.CATALOG_GET_PRODUCT_CATEGORIES, params),
    // getCategory: (params: IParams, id: string): Promise<any> =>
    //     ApiClient.get(API_ENDPOINTS.CATALOG_GET_PRODUCT_CATEGORIES.replace(":categoryId", id), params),
    createCategory: (data: ICreateCategoryPayload): Promise<any> => ApiClient.post(
        API_ENDPOINTS.CATALOG_CREATE_PRODUCT_CATEGORIES,
        data
    ),
    updateCategory: (data: any, id: string): Promise<any> => ApiClient.put(
        API_ENDPOINTS.CATALOG_UPDATE_PRODUCT_CATEGORIES.replace(":categoryId", id),
        data
    ),
    deleteCategory: (id: string): Promise<any> =>
        ApiClient.delete(API_ENDPOINTS.CATALOG_DELETE_PRODUCT_CATEGORIES.replace(":categoryId", id)),
};

export default catalogClient;
