import {
  IPaginatedResponse,
  IQueryParams,
  IResponse,
} from "@/interface/client";
import { useQuery } from "@tanstack/react-query";
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
