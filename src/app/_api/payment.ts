import { useMutation } from "@tanstack/react-query";
import paymentClient from "./client/payment";
import API_ENDPOINTS from "./client/endpoint";
import { PaymentPayload } from "@/interface/payment";

export const useInitiatePaymentMutation = () => {
  return useMutation({
    mutationFn: (data: PaymentPayload) => paymentClient.initiatePayment(data),
    mutationKey: [API_ENDPOINTS.PAYMENT_INITIATE],
  });
};
