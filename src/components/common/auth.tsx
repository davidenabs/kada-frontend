"use client";
import { Fragment, useEffect, useState, startTransition } from "react";
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
        if (!user) return;

        // *if user is not authenticated or token is not set, redirect to sign-in page
        if (!user.authenticated || !user.token) {
          setLoaded(false);
          router.push("/sign-in");
          return;
        }

        // *if no allowed user types are set, allow all user types
        if (!allowedUserTypes) {
          startTransition(() => {
            setIsAuthorized(true);
            setLoaded(true);
          });
          return;
        }

        const userType = user.user?.userType;
        // *if user type is not allowed, show to unauthorized page
        if (!allowedUserTypes.includes(userType!)) {
          startTransition(() => {
            setIsAuthorized(false);
            setLoaded(true);
          });
          return;
        }

        // *if user type is allowed, show the component
        startTransition(() => {
          setIsAuthorized(true);
          setLoaded(true);
        });
      };

      checkAuth();
    }, [router, user, allowedUserTypes]);

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
