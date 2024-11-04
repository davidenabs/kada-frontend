import { ILoginPayload } from "@/interface/auth";
import processError from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import authClient from "./client/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginPayload) => authClient.login(data),
    onError: (error) => {
      console.error(error);
      processError(error);
    },
  });
};
