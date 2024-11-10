"use client";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Title } from "rizzui";
import { useForm } from "react-hook-form";
import LoginSchema, { LoginSchemaType } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/app/_api/auth";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/user";
import { UserType } from "@/interface/user";

const SignInForm: React.FC = () => {
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
          setUser({
            ...user,
            user: data.user,
            token: data.token,
            authenticated: true,
          });

          const userType = data.user.userType;

          switch (userType) {
            case UserType.FARMER:
              router.push("/dashboard/farmer");
              break;
            case UserType.COOPERATIVE:
              router.push("/dashboard/cooperative");
              break;
            default:
              break;
          }
          toast.dismiss();
          toast.success("Login successful");
        },
        onError: (error) => {
          toast.dismiss();
        },
      });
    });
  };

  return (
    <div className="my-auto bg-white md:px-12 px-1 py-10 rounded-lg self-center shadow-lg">
      <div className="flex flex-col items-center space-y-2">
        <Link href="/">
          <img src="/images/logo.svg" alt="" className="w-[66px]" />
        </Link>
        <Title as="h4">Welcome Back to KADA!</Title>
      </div>

      <form
        noValidate
        className="flex flex-col mx-auto -center mt-8 max-w-[90%] md:max-w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-xl font-bold text-green-800">Sign in</div>
        <div className="mt-1 text-sm font-thin text-black mb-4">
          Please enter your credentials to sign in
        </div>

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
        <Link
          href="/forgot-password"
          className="self-end mt-2 text-sm font-light text-black"
        >
          Forgot Password?
        </Link>
      </form>

      <div className="flex mt-10 max-w-full text-sm text-black mx-auto w-[332px]">
        <div className="grow shrink my-auto w-32 font-medium">
          Don't have an account?
        </div>
        <button
          onClick={() => router.push("/create-account")}
          className="px-5 py-2 font-bold bg-amber-300 rounded-xl max-md:pl-5"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
