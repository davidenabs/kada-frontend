import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import {
  ICreateSubscriptionPayload,
  ISubscription,
  IUpdateSubscriptionPayload,
} from "@/interface/subscription";
import subscriptionClient from "./client/subscribe";

export const useGetSubscriptionPlans = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<ISubscription, "items">>, Error>(
    {
      queryKey: [API_ENDPOINTS.GET_SUBSCRIPTION_PLANS, params],
      queryFn: () => subscriptionClient.getSubscriptionPlans(params),
      enabled: enabled,
    }
  );
};

export const useGetSubscriptionsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<ISubscription, "items">>, Error>(
    {
      queryKey: [API_ENDPOINTS.GET_SUBSCRIPTIONS, params],
      queryFn: () => subscriptionClient.getSubscriptions(params),
      enabled: enabled,
    }
  );
};

export const useCreateSubscriptionPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ICreateSubscriptionPayload }) =>
      subscriptionClient.createSubscriptionPlan(data),
    mutationKey: [API_ENDPOINTS.CREATE_SUBSCRIPTION_PLAN],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SUBSCRIPTION_PLANS],
      });
    },
  });
};

export const useUpdateSubscriptionPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: IUpdateSubscriptionPayload;
      id: string;
    }) => subscriptionClient.updateSubscriptionPlan(data, id),
    mutationKey: [API_ENDPOINTS.UPDATE_SUBSCRIPTION_PLAN],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SUBSCRIPTION_PLANS],
      });
    },
  });
};

export const useDeleteSubscriptionPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subscriptionClient.deleteSubscriptionPlan(id),
    mutationKey: [API_ENDPOINTS.DELETE_SUBSCRIPTION_PLAN],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SUBSCRIPTION_PLANS],
      });
    },
  });
};

export const useGetMySubscriptionPlan = (userType?: string) => {
  return useQuery<IResponse<ISubscription>, Error>({
    queryKey: [API_ENDPOINTS.GET_MY_SUBSCRIPTION_PLAN, userType],
    queryFn: () => subscriptionClient.getMySubscriptionPlan(userType),
  });
};
