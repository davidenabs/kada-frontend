import { useMutation } from "@tanstack/react-query";
import adminClient from "./client/admin";

export const useAdminAddUserMutation = () => {
  return useMutation({
    mutationFn: (data: any) => adminClient.adminAddUser(data),
  });
};
