import { PaymentPayload } from "@/interface/payment";
import { ApiClient } from ".";
import API_ENDPOINTS from "./endpoint";

const paymentClient = {
  initiatePayment: async (data: PaymentPayload): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.PAYMENT_INITIATE, data),
};

export default paymentClient;
