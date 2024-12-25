import { IUser, UserType } from "./user";


export interface IRegisterFarmerPayload {
    firstName?: string;
    lastName?: string;
    nin?: string;
    vendorName?: string;
    email: string;
    phoneNumber: string;
    password: string;
    userType: string;
}