import { useMutation, useQueryClient } from "@tanstack/react-query";
import enumeratorClient from "./client/enumerator";
import { IRegisterFarmerPayload } from "@/interface/enumerator";
import API_ENDPOINTS from "./client/endpoint";

export const useRegisterFarmerMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IRegisterFarmerPayload) => enumeratorClient.registerFarmer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [API_ENDPOINTS.GET_FARMERS],
            });
          },
    });
};
