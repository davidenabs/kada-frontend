"use client";
import { useVerifyOnboardingTokenMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Password from "@/components/form/password";
import {
  verifyOnboardingSchema,
  verifyOnboardingSchemaType,
} from "@/schema/user";
import { userAtom } from "@/stores/user";
import { KeyIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  token: "",
  password: "",
  confirmPassword: "",
};

function OnboardingSharedPage() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const params = useSearchParams();
  const [token, setToken] = React.useState<string | null>(null);
  const verifyMutation = useVerifyOnboardingTokenMutation();

  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(verifyOnboardingSchema),
  });

  React.useEffect(() => {
    if (params.has("token")) {
      const token = params.get("token");
      setToken(token);
      setValue("token", token as string);
    }
  }, [params]);

  const onSubmit = (data: verifyOnboardingSchemaType) => {
    const { confirmPassword, ...rest } = data;

    verifyMutation.mutate(rest, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Account created successfully");
          console.log(response);
          router.push("/sign-in");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {token ? (
          <>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  {/* <KeyRound className="w-8 h-8 text-indigo-600" /> */}
                  <KeyIcon className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Set Your Password
              </h1>
              <p className="text-gray-600">
                Please create a secure password for your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Password
                label="Create Password"
                id="password"
                placeholder={"*******"}
                className=""
                {...register("password")}
                error={errors.password?.message}
              />

              <Password
                label="Confirm Password"
                id="confirmPassword"
                placeholder={"*******"}
                className=""
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button
                className="!rounded-full !py-4 mt-3.5 w-full"
                type="submit"
                loading={verifyMutation.isPending}
              >
                Create Account
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center mb-8"></div>
        )}
      </div>
    </div>
  );
}

export default OnboardingSharedPage;
