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
import { cn, Switch } from "rizzui";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "@/components/form/input";
import DatePicker from "@/components/form/date-picker";
import { TagInput } from "./tag-input";
import { useCreateCmsPostMutation } from "@/app/_api/cms";
import { toast } from "sonner";
import { PostType } from "@/interface/cms";

type PostOpportunityModalProps = {
  close: () => void;
};

const defaultValues: OpportunitySchemaType = {
  title: "",
  content: "",
  shortDescription: "",
  cta: "",
  userType: "" as any,
  isPublished: false,
  type: PostType.opportunity,
  keywords: [],
  dueDate: "" as any,
  featuredImage: new File([], ""),
};

function PostOpportunityModal({ close }: PostOpportunityModalProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => fileInputRef.current?.click();
  const [file, setFile] = React.useState<File | null>(null);
  const [startDate, setStartDate] = React.useState<Date>();
  const { mutateAsync, isPending } = useCreateCmsPostMutation();

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
    const { keywords, dueDate, featuredImage, ...rest } = data;
    const newData = {
      ...rest,
      dueDate: dueDate.toISOString(),
      meta: {
        keywords,
      },
    };
    mutateAsync(
      { data: newData },
      {
        onSuccess: (response) => {
          console.log(response);
          if (response.success) {
            toast.success("Opportunity created successfully");
            reset(defaultValues);
            close();
          }
        },
        onError: (error) => {
          // toast.error("Failed to create opportunity");
        },
      }
    );
  };

  return (
    <Fragment>
      <form
        className="w-full bg-white rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9] rounded-t-xl">
          <h4 className="text-base font-semibold">Publish Opportunities</h4>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="h-[calc(80vh)] overflow-y-scroll">
          <div className="space-y-4 p-6">
            <Input
              label="Originating Organisation"
              {...register("title")}
              error={errors.title?.message}
            />

            <div className="">
              <Controller
                control={control}
                name="featuredImage"
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
                {errors?.featuredImage?.message}
              </p>
            </div>

            {/* dipaly uploaded file */}
            {file && (
              <div className="flex items-center gap-2">
                {/* image */}
                <img
                  src={URL.createObjectURL(file)}
                  alt="file"
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setValue("featuredImage", new File([], ""));
                  }}
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            <Input
              label="Short Description"
              {...register("shortDescription")}
              error={errors.shortDescription?.message}
            />

            {/* is published */}
            <div className="flex items-center gap-4">
              <Controller
                control={control}
                name="isPublished"
                render={({ field: { value, onChange } }) => (
                  <Switch
                    label="Publish"
                    checked={value}
                    onChange={onChange}
                    error={errors.isPublished?.message}
                  />
                )}
              />
            </div>

            <div className="">
              <label className="text-xs">Opportunity Descriptiion</label>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    className={cn(
                      "rounded-md h-[200px] mb-4",
                      errors.content && "border border-red-500"
                    )}
                  />
                )}
              />

              <p className="text-red-500 text-xs mt-1">
                {errors.content?.message}
              </p>
            </div>

            <Input
              label="Application Url"
              type="url"
              prefix={<LinkIcon className="w-4 h-4" />}
              {...register("cta")}
              error={errors.cta?.message}
              className="!mt-16"
              placeholder="https://"
            />

            <Controller
              control={control}
              name="userType"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Select
                  label="Publish to"
                  options={[
                    { label: "All", value: "ALL" },
                    { label: "Farmers", value: UserType.FARMER },
                    { label: "Vendors", value: UserType.VENDOR },
                    { label: "Cooperatives", value: UserType.COOPERATIVE },
                  ]}
                  value={value}
                  onChange={(v: any) => onChange(v.value)}
                  error={errors.userType?.message}
                />
              )}
            />

            {/* due date */}
            <div className="">
              <Controller
                control={control}
                name="dueDate"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => {
                      setStartDate(date);
                      onChange(date);
                    }}
                    placeholderText="Due Date"
                    // maxDate={new Date()}
                    minDate={new Date()}
                    wrapperClassName="w-full"
                    inputProps={{
                      inputClassName:
                        "!rounded-full border-primary border-[.5px]",
                      label: "Select Date",
                    }}
                  />
                )}
              />

              <p className="text-red-500 text-xs mt-1">
                {errors.dueDate?.message}
              </p>
            </div>

            {/* tags */}
            <div className="">
              <Controller
                control={control}
                name="keywords"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TagInput
                    placeholder="Add tags (e.g., technology, programming)"
                    maxTags={5}
                    error={!!error}
                    tags={value}
                    onTagChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <KadaButton
            type="submit"
            loading={isPending || isSubmitting}
            className="!w-full rounded-full"
          >
            Publish
          </KadaButton>
        </div>
      </form>
    </Fragment>
  );
}

export default PostOpportunityModal;
