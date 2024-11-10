"use client";
import { Fragment, useEffect, useState } from "react";
import { UserType } from "@/interface/user";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { FullPageLoader } from "../shared/loader";
import Unauthorized from "./unauthorized";

interface WithAuthProps {
  allowedUserTypes?: UserType[];
}

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  { allowedUserTypes }: WithAuthProps
) {
  return function WithAuth(props: T) {
    const router = useRouter();
    const user = useAtomValue(userAtom);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        // if (!loaded) return;
        if (!user.authenticated || !user.token) {
          router.push("/sign-in");
          return;
        }

        if (!allowedUserTypes) {
          setIsAuthorized(true);
          setLoaded(true);
          return;
        }

        const userType = user.user?.userType;
        if (!allowedUserTypes.includes(userType!)) {
          setIsAuthorized(false);
          setLoaded(true);
          return;
        }

        setIsAuthorized(true);
        setLoaded(true);
      };

      checkAuth();
    }, [router, loaded, user]);

    if (!loaded) {
      return <FullPageLoader />;
    }

    if (!isAuthorized) {
      return <Unauthorized />;
    }

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
}
