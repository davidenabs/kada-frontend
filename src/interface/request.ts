export enum RequestType {
    FARMER_TO_COOPERATIVE = 'FARMER_TO_COOPERATIVE',
    COOPERATIVE_TO_FARMER = 'COOPERATIVE_TO_FARMER',
    VENDOR_LICENSE = 'VENDOR_LICENSE',
}

export interface ICreateRequestPayload {
    farmerId: number | null;
    cooperativeId: number | null;
    vendorId: number | null;
    requestType: RequestType;
}

export interface IUpdateRequestPayload {
    newStatus: 'approved' | 'rejected';
}