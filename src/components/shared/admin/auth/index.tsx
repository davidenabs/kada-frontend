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
import React, { useTransition } from "react";
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
    <section className="container h-screen flex justify-center items-center">
      <div className="">
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
        </form>
      </div>
    </section>
  );
}

export default AdminAuthPage;
