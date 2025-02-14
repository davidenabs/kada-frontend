"use client";
import { useLoginMutation } from "@/app/_api/auth";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import { UserType } from "@/interface/user";
import LoginSchema, { LoginSchemaType } from "@/schema/auth";
import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { Fragment, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AdminAuthPage() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const loginMutation = useLoginMutation();
  const [loading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    toast.loading("Logging in...");

    const newData = {
      userId: data.email,
      password: data.password,
    };

    startTransition(() => {
      loginMutation.mutate(newData, {
        onSuccess: (response) => {
          const { data, message } = response;
          const userType = data.user.userType;
          toast.dismiss();

          switch (userType) {
            case UserType.SUPERADMIN:
              toast.success("Login successful");
              setUser({
                ...user,
                role: userType,
                user: data.user,
                token: data.token,
                authenticated: true,
              });
              router.push("/admin");
              break;
            default:
              toast.error("Unautorized");
              break;
          }
        },
        onError: (error) => {
          toast.dismiss();
        },
      });
    });
  };
  return (
    <Fragment>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <img src="/images/logo.svg" alt="" className="w-[100px]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Please enter your credentials to sign in
            </p>
          </div>

          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="text-xl font-bold text-green-800">Sign in</div>
            <div className="mt-1 text-sm font-thin text-black mb-4">
              Please enter your credentials to sign in
            </div> */}

            <Input
              label="Email/Phone"
              placeholder="Enter your email or phone number"
              inputClassName=""
              {...register("email")}
              error={errors.email?.message}
              disabled={loading}
            />

            <Password
              label="Password"
              placeholder="********"
              id="email"
              className="mt-4"
              {...register("password")}
              error={errors.password?.message}
              disabled={loading}
            />

            <Button
              type="submit"
              className="!py-3 mt-8 !rounded-full"
              loading={loading}
            >
              Sign in
            </Button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default AdminAuthPage;
