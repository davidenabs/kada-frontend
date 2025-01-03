import React, { useRef, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text } from "rizzui";
import Upload from "@/components/common/upload";
import { CreateCatalogSchemaType } from "@/schema";
import Input from "@/components/form/input";
import { KadaButton } from "@/components/form/button";
import { useGetCategories } from "@/app/_api/catalog";
import Select from "@/components/form/select";

function ProductForm({
  control,
  errors,
  register,
  setValue,
  type,
}: {
  control: Control<any>;
  errors: FieldErrors<CreateCatalogSchemaType>;
  register: any;
  setValue: any;
  type: "products" | "services";
}) {
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File | null>(null);
  const [selectValue, setSelectValue] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const [options, setOptions] = useState<
    { label: string; value: string; add_new?: boolean }[]
  >([]);
  const { data, isFetching, isRefetching, isError } = useGetCategories({
    enabled: loaded,
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFiles(file ?? null);
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (data?.data && !isFetching && !isRefetching && !isError) {
      const newOptions = data.data.items.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));

      const n = {
        add_new: true,
        label: "Add New",
        value: "",
      };

      newOptions.push(n);
      setOptions(newOptions);
    }
  }, [data, isFetching, isRefetching]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Input
          placeholder={`Enter ${
            type === "products" ? "product" : "service"
          } name`}
          label="Name of Product"
          {...register("name")}
          error={errors.name?.message}
        />

        <div className="">
          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <Select
                label={"Category"}
                options={options}
                value={selectValue}
                selectClassName="rounded-full"
                onChange={(value: any) => {
                  if (value.add_new) {
                    setIsNew(true);
                    setValue("isNew", true);
                    onChange("");
                  } else {
                    setValue("isNew", false);
                    setIsNew(false);
                    onChange(value.value);
                  }
                  setSelectValue(value);
                }}
                displayValue={(value: any) => renderDisplayValue(value)}
                getOptionDisplayValue={(option: any) =>
                  renderOptionDisplayValue(option)
                }
              />
            )}
          />
        </div>

        {isNew && (
          <div className="col-span-2">
            <Input
              placeholder={`Enter ${
                type === "products" ? "product" : "service"
              } category`}
              label="New Category"
              {...register("category")}
            />
          </div>
        )}

        <div className="col-span-2">
          <Input
            placeholder="Enter amount"
            label="Amount"
            {...register("amount")}
            error={errors?.amount?.message}
          />
        </div>

        <div className="col-span-2">
          <Input
            placeholder="Enter Description"
            label="Description"
            {...register("description")}
            error={errors?.description?.message}
          />
        </div>

        <div className="col-span-2">
          <Controller
            control={control}
            name="file"
            render={({ field: { value, onChange } }) => (
              <Upload
                fileInputRef={fileInputRef}
                handleClick={handleClick}
                onChange={(e) => {
                  onChange((e.target as HTMLInputElement).files?.[0]);
                  handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
                }}
              />
            )}
          />

          <p className="text-red-500 text-xs mt-1">{errors?.file?.message}</p>
        </div>
      </div>

      <div className="">
        <KadaButton type="submit" className="!w-full rounded-full">
          Submit
        </KadaButton>
      </div>
    </div>
  );
}

export default ProductForm;

function renderDisplayValue(value: any) {
  return (
    <span className="flex items-center gap-2">
      <Text>{value.add_new ? "Add New" : value.label}</Text>
    </span>
  );
}

function renderOptionDisplayValue(option: any) {
  return (
    <div className="flex items-center gap-3">
      {option.add_new ? (
        <Text fontWeight="medium">Add New</Text>
      ) : (
        <div>
          <Text fontWeight="medium">{option.label}</Text>
        </div>
      )}
    </div>
  );
}
