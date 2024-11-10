"use client";
import ProfileTypeSelector from "@/components/auth/create-account/profile-selector";
import useScreenSize from "@/hooks/use-screen-size";
import useUserType from "@/hooks/use-user-type";
import { cn } from "rizzui";
import Link from "next/link";
import React, { Fragment } from "react";

function CreateAccountLayout({ children }: { children: React.ReactNode }) {
  const { userType } = useUserType();
  const { width } = useScreenSize();

  return (
    <Fragment>
      {width < 992 ? (
        <main className="flex overflow-hidden flex-col px-6 py-7 mx-auto w-full bg-white max-w-[480px]">
          <div className="flex gap-5 justify-between text-base leading-tight text-black">
            <img
              src="/images/logo.svg"
              className="object-contain shrink-0 aspect-square w-[50px]"
              alt=""
            />
            <Link
              href={"/sign-in"}
              className="my-auto hover:opacity-80 underline"
            >
              Login here
            </Link>
          </div>
          <section className="flex flex-col self-start mt-9 leading-tight">
            <h1 className="text-2xl font-bold text-zinc-700">
              Create an account
            </h1>
            <p className="mt-3 text-base font-medium text-neutral-500">
              Select a profile type
            </p>
          </section>
          <ProfileTypeSelector />
          {children}
        </main>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-3 items-start bg-white max-h-screen h-screen overflow-hidden">
          <div className="flex flex-col max-md:mt-10 px-20 pt-10 w-full border-r self-stretch">
            <img
              src="/images/logo.svg"
              alt="Company logo"
              className="object-contain aspect-square w-[50px]"
            />
            <ProfileTypeSelector />
          </div>
          <div className="mt-24 w-full leading-tight max-md:mt-10 self-stretch overflow-y-scroll pb-10">
            <div className="flex gap-2 px-8 pb-10 self-start text-base">
              <Link
                href="/sign-in"
                className="text-black underline font-oxygen"
              >
                Login here
              </Link>
              <span className="basis-auto text-[#A4A4A4]">
                if you already have an account
              </span>
            </div>
            {children}
          </div>
          <div
            className={cn(
              "flex flex-col ml-5 w-full self-stretch max-md:ml-0 max-md:w-full bg-[url('/images/auth-farm-bg.png')] bg-no-repeat bg-center bg-cover",
              userType == "farmer" && "bg-[url('/images/auth-farm-bg.png')]",
              userType == "cooperative" &&
                "bg-[url('/images/auth-coop-bg.png')]",
              userType == "dataEnumerator" &&
                "bg-[url('/images/auth-data-bg.png')]",
              userType == "guest" && "bg-[url('/images/auth-guest-bg.png')]",
              userType == "guest" && "bg-[url('/images/auth-guest-bg.png')]"
            )}
          />
        </section>
      )}
    </Fragment>
  );
}

export default CreateAccountLayout;
