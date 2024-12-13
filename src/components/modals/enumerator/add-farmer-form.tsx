import { useRegisterMutation } from "@/app/_api/auth";
import Button, { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import Password from "@/components/form/password";
import { EnumeratorRegisterFarmerSchemaType } from "@/schema/auth";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

type AddFarmerFormProps = {
    errors: FieldErrors<EnumeratorRegisterFarmerSchemaType>,
    register: any,
    loading: boolean,
}

function AddFarmerForm(
    {
        errors,
        register,
        loading,
    }: AddFarmerFormProps
) {

    return (
        <div
            className="flex flex-col items-start w-full"
        >
            <div className="space-y-4 w-full mt-">
                <Input
                    label="Phone Number"
                    prefix={"+234"}
                    type="tel"
                    id="phone"
                    placeholder="08012345678"
                    className=""
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                />

                <Input
                    label="Email"
                    placeholder="Enter email"
                    className=""
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Input
                    label="NIN"
                    placeholder="Enter NIN"
                    className=""
                    {...register("nin")}
                    error={errors.nin?.message}
                />

                <Input
                    label="First Name"
                    id="firstName"
                    placeholder="Enter first name"
                    className=""
                    {...register("firstName")}
                    error={errors.firstName?.message}
                />

                <Input
                    label="Last Name"
                    id="lastName"
                    placeholder="Enter last name"
                    className=""
                    {...register("lastName")}
                    error={errors.lastName?.message}
                />

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
            </div>

            <div className="flex flex-col mt-9 self-stretch">
                <div className="">
                    <div className="flex gap-1.5 items-center text-sm font-light text-zinc-700">
                        <input
                            {...register("acceptTerms")}
                            type="checkbox"
                            id="terms"
                            className="w-3 h-3 border border-solid border-zinc-700 rounded-sm checked:bg-primary checked:border-primary focus:ring-0 text-primary"
                        />
                        <label htmlFor="terms" className="self-stretch my-auto">
                            <span className="font-medium">
                                I agree with the terms and conditions of this application
                            </span>
                        </label>
                    </div>
                    <p className="text-red-500 text-xs mt-1">
                        {errors.acceptTerms?.message}
                    </p>
                </div>

                <KadaButton
                    className="!rounded-full !py-4 mt-3.5 w-full"
                    type="submit"
                    loading={loading}
                //   loading={isSubmitting || isPending}
                >
                    Create Account
                </KadaButton>
            </div>
        </div>
    );
};

export default AddFarmerForm;
