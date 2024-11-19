"use client";
import React, { Fragment } from "react";

function AccountSetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="w-full min-h-screen">
        <header className="w-full px-12 py-6 max-md:px-5">
          <img
            src="/images/logo.svg"
            alt=""
            className="object-contain aspect-square w-[50px]"
          />
        </header>
        <div className="w-full min-h-[80vh] flex items-center">{children}</div>
      </div>
    </Fragment>
  );
}

export default AccountSetupLayout;
