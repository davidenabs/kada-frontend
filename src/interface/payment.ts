export interface PaymentPayload {
  amount: number;
  currency: string;
  type: string;
  purpose: string;
  userId: number;
  meta: Record<string, any>;
}
