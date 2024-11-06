import { IUser } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseCheckUserFieldParams {
  field: string;
  condition: (value: any) => boolean;
  redirectTo: string;
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function useCheckUserFields(conditions: UseCheckUserFieldParams[]) {
  const router = useRouter();
  const { user } = useAtomValue(userAtom);

  useEffect(() => {
    if (!user) return;
    for (const { field, condition, redirectTo } of conditions) {
      const fieldValue = getNestedValue(user, field);
      if (fieldValue === undefined) return;
      if (condition(fieldValue)) {
        router.push(redirectTo);
        break;
      }
    }
  }, [user, conditions, router]);
}

export default useCheckUserFields;
