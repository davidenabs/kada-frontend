"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { UserType } from "@/interface/user";
import { FullPageLoader } from "../shared/loader";

function Unauthorized() {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user && user.authenticated && user.user) {
      const userType = user.user.userType;
      let path = "/sign-in";

      switch (userType) {
        case UserType.FARMER:
          path = "/dashboard/farmer";
          break;
        case UserType.COOPERATIVE:
          path = "/dashboard/cooperative";
          break;
        case UserType.VENDOR:
          path = "/dashboard/vendor";
          break;
        case UserType.ENUMERATOR:
          path = "/dashboard/enumerator";
          break;
        case UserType.ZONAL:
          path = "/dashboard/zonal";
          break;
        case UserType.PARTNER:
          path = "/dashboard/partner";
          break;
        case UserType.SUPERADMIN:
          path = "/admin/dashboard";
          break;
        default:
          path = "/sign-in";
          break;
      }
      router.replace(path);
    } else {
      router.replace("/sign-in");
    }
  }, [router, user]);

  return <FullPageLoader />;
}

export default Unauthorized;
