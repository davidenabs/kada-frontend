import { IParams } from "@/interface/client";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";
import {
  ICreateSubscriptionPayload,
  IUpdateSubscriptionPayload,
} from "@/interface/subscription";

const subscriptionClient = {
  getSubscriptionPlans: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_SUBSCRIPTION_PLANS, params),
  getSubscriptions: (params: IParams): Promise<any> =>
    ApiClient.get(API_ENDPOINTS.GET_SUBSCRIPTIONS, params),
  createSubscriptionPlan: (data: ICreateSubscriptionPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.CREATE_SUBSCRIPTION_PLAN, data),
  updateSubscriptionPlan: (
    data: IUpdateSubscriptionPayload,
    id: string
  ): Promise<any> =>
    ApiClient.put(
      API_ENDPOINTS.UPDATE_SUBSCRIPTION_PLAN.replace(":id", id),
      data
    ),

  deleteSubscriptionPlan: (id: string): Promise<any> =>
    ApiClient.delete(API_ENDPOINTS.DELETE_SUBSCRIPTION_PLAN.replace(":id", id)),

  getMySubscriptionPlan: (userType?: string): Promise<any> => {
    const endpoint = userType
      ? `${API_ENDPOINTS.GET_MY_SUBSCRIPTION_PLAN}/${userType}`
      : API_ENDPOINTS.GET_MY_SUBSCRIPTION_PLAN;
    return ApiClient.get(endpoint);
  },
};

export default subscriptionClient;
