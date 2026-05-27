import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "./client/endpoint";
import cmsClient from "./client/cms";
import { IPost } from "@/interface/cms";

export const useGetCmsPostsQuery = ({
  enabled = true,
  params = {},
}: IQueryParams) => {
  return useQuery<IResponse<IPaginatedResponse<IPost, "posts">>, Error>({
    queryKey: [API_ENDPOINTS.CMS_GET_POSTS, params],
    queryFn: () => cmsClient.getPosts(params),
    enabled: enabled,
  });
};

export const useCreateCmsPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => cmsClient.createPost(data),
    mutationKey: [API_ENDPOINTS.CMS_CREATE_POST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.CMS_GET_POSTS],
      });
    },
  });
};

export const useUpdateCmsPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any, id: any }) => cmsClient.updatePost(data, id),
    mutationKey: [API_ENDPOINTS.CMS_UPDATE_POST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.CMS_GET_POSTS],
      });
    },
  });
};

export const useDeleteCmsPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: any) => cmsClient.deletePost(id),
    mutationKey: [API_ENDPOINTS.CMS_DELETE_POST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.CMS_GET_POSTS],
      });
    },
  });
};

export const useApplyToPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: any) => cmsClient.applyToPost(postId),
    mutationKey: [API_ENDPOINTS.CMS_APPLY_POST],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.CMS_GET_POSTS],
      });
    },
  });
};

export const useGetPostApplicantsQuery = (postId: any, enabled = true) => {
  return useQuery<IResponse<any[]>, Error>({
    queryKey: [API_ENDPOINTS.CMS_GET_POST_APPLICANTS, postId],
    queryFn: () => cmsClient.getPostApplicants(postId),
    enabled: enabled && !!postId,
  });
};

export const useAssignUsersMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userIds: any[], postIds: any[] }) => cmsClient.assignUsers(data),
    mutationKey: [API_ENDPOINTS.CMS_ASSIGN_USERS],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.CMS_GET_POSTS],
      });
    },
  });
};
