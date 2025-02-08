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
import {
  lgaOptionsByZone,
  wardOptionsByLga,
  zoneOptions,
} from "@/lib/lga-data";

type PostOpportunityModalProps = {
  close: () => void;
};

const defaultValues: OpportunitySchemaType = {
  title: "",
  content: "",
  shortDescription: "",
  // cta: "",
  userType: "" as any,
  // applicationLimit: "" as number,
  type: PostType.opportunity,
  keywords: [],
  applicationDate: "" as any,
  closingDate: "" as any,
  zone: "",
  lga: "",
  ward: "",
  image: new File([], ""),
};

function PostOpportunityModal({ close }: PostOpportunityModalProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => fileInputRef.current?.click();
  const [file, setFile] = React.useState<File | null>(null);
  const [appDate, setApplicationDate] = React.useState<Date>();
  const [closeDate, setClosingDate] = React.useState<Date>();
  const { mutateAsync, isPending } = useCreateCmsPostMutation();
  const [zoneOption, setZoneOption] = React.useState<any>(null);
  const [option, setOption] = React.useState<any>(null);
  const [wardOption, setWardOption] = React.useState<any>(null);

  const lgaOptions = React.useMemo(() => {
    if (zoneOption) {
      return lgaOptionsByZone(zoneOption.value);
    }
    return [];
  }, [zoneOption]);

  const wardOptions = React.useMemo(() => {
    if (option) {
      return wardOptionsByLga(option.value);
    }
    return [];
  }, [option]);

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
    const { keywords, applicationDate, closingDate, ...rest } = data;
    const newData = {
      ...rest,
      applicationDate: applicationDate?.toISOString(),
      closingDate: closingDate?.toISOString(),
      meta: {
        // keywords,
      },
    };
    console.log(newData);

    // return;
    mutateAsync(
      { data: newData },
      {
        onSuccess: (response) => {
          console.log(response);
          if (response.success) {
            toast.success("Created successfully");
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
  console.log(errors);

  return (
    <Fragment>
      <form
        className="w-full bg-white rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9] rounded-t-xl">
          <h4 className="text-base font-semibold">
            Publish Opportunities, Interventions or Programs
          </h4>

          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="h-[calc(80vh)] overflow-y-scroll">
          <div className="space-y-4 p-6">
            <div className="pt10mt-4">
              <Controller
                control={control}
                name="type"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    label="Publication type"
                    options={[
                      { label: "Opportunity", value: PostType.opportunity },
                      { label: "Intervention", value: PostType.interventions },
                      { label: "Program", value: PostType.program },
                    ]}
                    value={value}
                    onChange={(v: any) => onChange(v.value)}
                    error={errors.type?.message}
                  />
                )}
              />
            </div>

            <Input
              label="Title"
              {...register("title")}
              error={errors.title?.message}
            />

            <div className="">
              <Controller
                control={control}
                name="image"
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
                {errors?.image?.message}
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
                    setValue("image", new File([], ""));
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
            {/* <div className="flex items-center gap-4">
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
            </div> */}

            <div className="">
              <label className="text-xs">Content</label>
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

            <div className="pt-10 mt-4">
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
            </div>

            {/* due date */}
            <div className="flex gap-2 items-center w-full">
              <div className="">
                <Controller
                  control={control}
                  name="applicationDate"
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={appDate}
                      onChange={(date: Date) => {
                        setApplicationDate(date);
                        onChange(date);
                      }}
                      placeholderText="Application Date"
                      // maxDate={new Date()}
                      minDate={new Date()}
                      wrapperClassName="w-full"
                      inputProps={{
                        inputClassName:
                          "!rounded-full border-primary border-[.5px]",
                        label: "Select Application Date",
                      }}
                    />
                  )}
                />

                <p className="text-red-500 text-xs mt-1">
                  {errors.applicationDate?.message}
                </p>
              </div>

              <div className="">
                <Controller
                  control={control}
                  name="closingDate"
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={closeDate}
                      onChange={(date: Date) => {
                        setClosingDate(date);
                        onChange(date);
                      }}
                      placeholderText="Closing Date"
                      // maxDate={new Date()}
                      minDate={new Date()}
                      wrapperClassName="w-full"
                      inputProps={{
                        inputClassName:
                          "!rounded-full border-primary border-[.5px]",
                        label: "Select Closing Date",
                      }}
                    />
                  )}
                />

                <p className="text-red-500 text-xs mt-1">
                  {errors.closingDate?.message}
                </p>
              </div>
            </div>

            <Controller
              name="zone"
              control={control}
              render={({ field: { name, onChange } }) => (
                <Select
                  label="Zone"
                  id="zone"
                  options={zoneOptions}
                  onChange={(e: any) => {
                    setZoneOption(e);
                    onChange(e.value);
                  }}
                  value={zoneOption}
                  error={errors.zone?.message}
                />
              )}
            />

            <Controller
              name="lga"
              control={control}
              render={({ field: { name, onChange } }) => (
                <Select
                  label="Local Government Area (LGA)"
                  id="lga"
                  options={lgaOptions}
                  onChange={(e: any) => {
                    setOption(e);
                    onChange(e.value);
                  }}
                  value={option}
                  error={errors.lga?.message}
                />
              )}
            />

            <Controller
              name="ward"
              control={control}
              render={({ field: { name, onChange } }) => (
                <Select
                  label="Ward"
                  id="ward"
                  options={wardOptions}
                  onChange={(e: any) => {
                    setWardOption(e);
                    onChange(e.value);
                  }}
                  error={errors.ward?.message}
                  value={wardOption}
                />
              )}
            />

            <Input
              label="Application limit"
              {...register("applicationLimit")}
              error={errors.applicationLimit?.message}
              placeholder="e.g: 100,200 ... "
              type="number"
            />
            <span className="text-[12px] text-gray-500">
              Leave empty is number of applicants are not restricted
            </span>

            {/* tags */}
            {/* <div className="">
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
            </div> */}
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
