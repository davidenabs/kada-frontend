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
