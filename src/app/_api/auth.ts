import {
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  ISendOtpPayload,
  IVerifyOtpPayload,
} from "@/interface/auth";
import { useMutation } from "@tanstack/react-query";
import authClient from "./client/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILoginPayload) => authClient.login(data),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: IRegisterPayload) => authClient.register(data),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: IResetPasswordPayload) => authClient.resetPassword(data),
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: (data: IVerifyOtpPayload) => authClient.verifyOtp(data),
  });
};

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (data: ISendOtpPayload) => authClient.sendOtp(data),
  });
};
