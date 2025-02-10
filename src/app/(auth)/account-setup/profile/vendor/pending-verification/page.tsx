"use client";
import { defaultUser, userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import { Metadata } from "next";
import React, { startTransition } from "react";
import Button from "@/components/form/button";
import { toast } from "sonner";

// export const metadata: Metadata = {
//   title: "Vendor",
// };

export default function Page() {
  const [user, setUser] = useAtom(userAtom);
  //   const pathname = usePathname();

  const handleLogout = () => {
    toast.success("Logging out...");
    startTransition(() => {
      setUser(defaultUser);
    });
  };

  return (
    <>
      <section className="flex flex-col items-center font-bold rounded-none max-w-[467px] mx-auto">
        <h1 className="text-2xl leading-tight text-black">Under Review</h1>
        <p className="mt-3.5 text-lg font-medium leading-6 text-center text-zinc-700">
          Your account in under review by your Zonal Officer
          <br />
          please kindly be patient, it may take few hours
        </p>
        <img
          src="/images/payement-successful.png"
          alt="Payment success illustration"
          className="object-contain self-stretch mt-9 w-full aspect-[1.7]"
        />
        <Button
          className="!py-3 mt-14 !w-full min-h-[48px] !rounded-[60px]"
          handleClick={handleLogout}
        >
          Log out
        </Button>
      </section>
    </>
  );
}
