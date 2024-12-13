import { useMutation } from "@tanstack/react-query";
import enumeratorClient from "./client/enumerator";
import { IRegisterFarmerPayload } from "@/interface/enumerator";

export const useRegisterFarmerMutation = () => {
    return useMutation({
        mutationFn: (data: IRegisterFarmerPayload) => enumeratorClient.registerFarmer(data),
    });
};


