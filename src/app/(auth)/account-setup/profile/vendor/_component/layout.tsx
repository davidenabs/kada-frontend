"use client";
import { useGetProfileQuery } from "@/app/_api/user";
import { withAuth } from "@/components/common/auth";
import { FullPageLoader } from "@/components/shared/loader";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import React, { Fragment, Suspense } from "react";

function Layout({ children }: React.PropsWithChildren<{}>) {
  const [domLoaded, setDomLoaded] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [user, setUser] = useAtom(userAtom);
  const { isFetching, isRefetching, data } = useGetProfileQuery({
    enabled: load,
  });

  // React.useEffect(() => {
  //   if (!user.user) setLoad(true);
  // }, [user]);

  React.useEffect(() => {
    setLoad(true);
  }, []);

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setUser((prevUser) => ({ ...prevUser, user: data.data }));
    }
  }, [data, isFetching, isRefetching, setUser]);

  return (
    <Fragment>
      <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
    </Fragment>
  );
}

export default withAuth(Layout, {
  allowedUserTypes: [UserType.VENDOR],
});
