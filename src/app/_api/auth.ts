import {
  ILoginPayload,
  IRegisterPayload,
  ISendOtpPayload,
  IVerifyOtpPayload,
} from "@/interface/auth";
import processError from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import authClient from "./client/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginPayload) => authClient.login(data),
    onError: (error: any) => {
      processError(error);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: IRegisterPayload) => authClient.register(data),
    onError: (error: any) => {
      processError(error);
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyOtpPayload) => authClient.verifyOtp(data),
    onError: (error: any) => {
      processError(error);
    },
  });
};

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (data: ISendOtpPayload) => authClient.sendOtp(data),
    onError: (error: any) => {
      processError(error);
    },
  });
};
