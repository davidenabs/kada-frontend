export enum PaymentPurposeType {
  LICENSE = 'LICENSE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  COOPERATIVE_JOIN_REQUEST = 'COOPERATIVE_JOIN_REQUEST',
}

export interface PaymentPayload {
  amount: number;
  currency: string;
  type: string;
  purpose: PaymentPurposeType;
  userId: number;
  meta: Record<string, any>;
}