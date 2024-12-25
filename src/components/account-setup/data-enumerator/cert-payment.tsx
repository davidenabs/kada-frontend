"use client";
import { useInitiatePaymentMutation } from "@/app/_api/payment";
import { useUpdateUserMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { PaymentPurposeType } from "@/interface/payment";
import { userAtom } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const defaultValues = {
  vendorName: "",
  registrationNumber: "",
  dateEstablished: "",
  hasCAC: null as any,
};

const schema = z
  .object({
    vendorName: z.string().nonempty({ message: "Name is required" }),
    registrationNumber: z.string().optional(),
    dateEstablished: z
      .string()
      .nonempty({ message: "Date established is required" }),
    hasCAC: z.boolean({ message: "CAC status is required" }),
  })
  .refine((data) => !data.hasCAC || data.registrationNumber, {
    message: "Registration number is required",
    path: ["registrationNumber"],
  });

type schemaType = z.infer<typeof schema>;

export const SuccessPayment = () => {
  const route = "/dashboard/vendor";
  const router = useRouter();

  return (
    <section className="flex flex-col items-center font-bold rounded-none max-w-[467px] mx-auto">
      <h1 className="text-2xl leading-tight text-black">Payment Successful</h1>
      <p className="mt-3.5 text-lg font-medium leading-6 text-center text-zinc-700">
        Your payment for license was completed.
        <br />
        please proceed to dashboard
      </p>
      <img
        src="/images/payement-successful.png"
        alt="Payment success illustration"
        className="object-contain self-stretch mt-9 w-full aspect-[1.7]"
      />
      <Button
        className="!py-3 mt-14 !w-full min-h-[48px] !rounded-[60px]"
        handleClick={() => {
          router.push(route);
        }}
      >
        Go to Dashboard
      </Button>
    </section>
  );
};

const CertificationLicensePayment: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [option, setOption] = useState(null);
  const paymentMutation = useInitiatePaymentMutation();
  const updateMutation = useUpdateUserMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<schemaType>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchHasCAC = watch("hasCAC");

  React.useEffect(() => {
    if (user.user) {
      const userData = user.user;
      if (userData?.vendorProfile?.hasPaid) {
        setIsPaid(true);
      }
      reset({
        vendorName: userData?.vendorProfile?.vendorName || "",
        registrationNumber: userData?.vendorProfile?.registrationNumber || "",
        dateEstablished: userData?.vendorProfile?.dateEstablished || "",
        hasCAC: userData?.vendorProfile?.hasCAC || false,
      });
    }
  }, [user]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const onSubmit = (data: schemaType) => {
    const payload = {
      email: user.user!.email,
      amount: 50000,
      currency: "NGN",
      type: "debit",
      purpose: PaymentPurposeType.LICENSE,
      userId: user.user!.id,
      meta: {},
    };

    const newData = {
      vendorDateEstablished: data.dateEstablished,
      vendorHasCAC: data.hasCAC,
      vendorRegistrationNumber: data.registrationNumber,
      vendorName: data.vendorName,
    };

    updateMutation.mutateAsync(newData, {
      onSuccess: (response) => {
        setUser({ ...user, user: response.data });
        paymentMutation.mutateAsync(payload, {
          onSuccess: (res) => {
            toast.success("Payment initiated successfully, redirecting...");
            window.location.href = res.data.authorization_url;
            // setIsPaid(true);
          },
        });
      },
    });
  };

  if (isPaid) {
    return <SuccessPayment />;
  }

  return (
    <section className="flex flex-col md:items-start items-center w-full md:text-left text-center pb-10">
      <h2 className="text-lg font-medium leading-tight text-tertiary-800 md:text-teal-700 uppercase text-center md:text-left">
        CERTIFICATION & LICENSE
      </h2>
      <p className="mt-4 text-2xl font-bold leading-7 text-zinc-700 w[315px] md:w-[451px] max-md:max-w-full">
        Please complete the following
      </p>
      <div className="self-stretch md:mt-12 w-full max-md:mt-5 max-md:max-w-full">
        <div className="flex gap-5 flex-1 max-md:flex-col items-center">
          <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start py-10 px-6 mx-auto w-full text-sm font-medium leading-4 rounded-2xl border-[0.5px] bg-[#FCFCFC] border-[#D9D9D9] text-zinc-500 max-md:pr-5 max-md:mt-10 max-md:max-w-full"
            >
              <h3 className="text-lg font-bold leading-tight text-black">
                KADA Vendor License
              </h3>

              <h3 className="text-lg font-bold leading-tight text-primary-600 pt-3">
                N50,000.00
              </h3>

              <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                <Input
                  label="Name of Organization"
                  type="text"
                  id="phone"
                  placeholder="What is the name of your organization"
                  {...register("vendorName")}
                  error={errors.vendorName?.message}
                />
              </div>

              <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                <Input
                  label="When was it established"
                  type="date"
                  id=""
                  placeholder="What is the name of your organization"
                  {...register("dateEstablished")}
                  error={errors.dateEstablished?.message}
                />
              </div>

              <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                <Controller
                  control={control}
                  name="hasCAC"
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      label="Are you fully registered with CAC"
                      value={
                        option === null
                          ? {
                              label: value ? "Yes" : "No",
                              value: value ? "true" : "false",
                            }
                          : option
                      }
                      className={"border"}
                      options={[
                        { label: "Yes", value: "true" },
                        { label: "No", value: "false" },
                      ]}
                      onChange={(e: any) => {
                        setOption(e);
                        onChange(e.value === "true");
                      }}
                    />
                  )}
                />
              </div>

              {watchHasCAC && (
                <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
                  <Input
                    label="Registration Number"
                    type="text"
                    id="phone"
                    placeholder="What is the registration number"
                    {...register("registrationNumber")}
                    error={errors.registrationNumber?.message}
                  />
                </div>
              )}

              <Button
                loading={updateMutation.isPending || paymentMutation.isPending}
                type="submit"
                className="!py-3.5 mt-14 font-bold min-h-[48px] !rounded-[60px] max-md:px-5 max-md:mt-10 w-full"
              >
                Pay N50,000.00
              </Button>
            </form>
          </div>
          <div className="flex flex-col md:ml-5 w-[54%] max-md:ml-0 max-md:w-full">
            <img
              src="/images/vendor-cert.png"
              alt="Certification and License illustration"
              className="object-contain mt-4 w-full rounded-3xl aspect-[1.54] max-md:mt-8 max-md:max-w-full"
            />

            <div className="flex flex-col items-start mt-10 py-6 px-8 mx-auto w-full leading-5 text-[16px] rounded-3xl text-tertiary-700 font-thin max-md:pr-5 max-md:mt-10 max-md:max-w-full text-center bg-[#F7F7F7]">
              <p>
                Please note that license/certificate takes 24-48 hours for
                review and approval. Thank you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationLicensePayment;
