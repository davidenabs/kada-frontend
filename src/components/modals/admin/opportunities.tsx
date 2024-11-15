import Upload from "@/components/common/upload";
import { KadaButton } from "@/components/form/button";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { UserType } from "@/interface/user";
import { opportunitySchema, OpportunitySchemaType } from "@/schema/opportunity";
import { LinkIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "rizzui";

type PostOpportunityModalProps = {
  close: () => void;
};

const defaultValues: OpportunitySchemaType = {
  title: "",
  content: "",
  shortDescription: "",
  cta: "",
  userType: UserType.FARMER,
  hasComment: false,
  isPublished: false,
  isFeatured: false,
  type: "opportunity",
  categoryId: null,

  keywords: [],
  seoTitle: "",
  seoDescription: "",

  date: "",
  file: new File([], ""),
};

function PostOpportunityModal({ close }: PostOpportunityModalProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => fileInputRef.current?.click();
  const [file, setFile] = React.useState<File | null>(null);

  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(opportunitySchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const onSubmit = (data: OpportunitySchemaType) => {
    console.log(data);
  };

  return (
    <Fragment>
      <section className="w-full bg-white rounded-xl">
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9] rounded-t-xl">
          <h4 className="text-base font-semibold">Publish Opportunities</h4>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 p-6">
            <Input
              label="Originating Organisation"
              {...register("title")}
              error={errors.title?.message}
            />

            <div className="">
              <Controller
                control={control}
                name="file"
                render={({ field: { value, onChange } }) => (
                  <Upload
                    fileInputRef={fileInputRef}
                    handleClick={handleClick}
                    onChange={(e) => {
                      onChange((e.target as HTMLInputElement).files?.[0]);
                      handleFileChange(
                        e as React.ChangeEvent<HTMLInputElement>
                      );
                    }}
                  />
                )}
              />

              <p className="text-red-500 text-xs mt-1">
                {errors?.file?.message}
              </p>
            </div>

            <Input
              label="Opportunity Description"
              placeholder="Describe this opportunity"
              {...register("content")}
              error={errors.content?.message}
            />

            <Input
              label="Application Url"
              type="url"
              prefix={<LinkIcon className="w-4 h-4" />}
              {...register("cta")}
              error={errors.cta?.message}
            />

            <Select
              label="Publish to"
              options={[
                { label: "Farmers", value: UserType.FARMER },
                { label: "Vendors", value: UserType.VENDOR },
                { label: "Cooperatives", value: UserType.COOPERATIVE },
              ]}
              value={watch("userType")}
              {...register("userType")}
              error={errors.userType?.message}
            />

            <div className="">
              <KadaButton className="!w-full rounded-full">Publish</KadaButton>
            </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
}

export default PostOpportunityModal;
