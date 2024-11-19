"use client";
import { useGetCategories } from "@/app/_api/catalog";
import { useUpdateUserMutation } from "@/app/_api/user";
import Button from "@/components/form/button";
import Select from "@/components/form/select";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const KeyValueArea: React.FC = () => {
  const router = useRouter();
  const [loaded, setLoaded] = React.useState(false);
  const [options, setOptions] = React.useState<
    { label: string; value: string; add_new?: boolean }[]
  >([]);
  const [selectValue, setSelectValue] = React.useState<any>(null);
  const { mutateAsync, isPending } = useUpdateUserMutation();

  const { data, isFetching, isRefetching, isError } = useGetCategories({
    enabled: loaded,
  });

  React.useEffect(() => {
    if (data?.data && !isFetching && !isRefetching && !isError) {
      const newOptions = data.data.items.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));
      setOptions(newOptions);
    }
  }, [data, isFetching, isRefetching]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectValue) {
      toast.error("Please select a category");
      return;
    }

    mutateAsync(
      {
        vendorProductService: selectValue.value,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            router.push("/account-setup/profile/vendor/welcome");
          }
        },
      }
    );
  };

  return (
    <section className="rounded-lg max-w-[624px] mx-auto">
      <div className="flex overflow-hidden flex-col items-center w-full bg-white rounded-lg border-zinc-400 border-[0.5px] border-opacity-50 max-md:max-w-full">
        <div className="flex self-stretch">
          <img
            src={"/images/de-key-header.png"}
            alt=""
            className="object-contain shrink-0 max-w-full aspect[1.14] w-full"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-zinc-700 max-md:mt-10">
          Key Value Area
        </h2>

        <form
          className="p-12 self-stretch flex flex-col items-center"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col mt-5 self-stretch  whitespace-nowrap">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-zinc-700"
            >
              Product/Service Category
            </label>

            <Select
              options={options}
              value={selectValue}
              className="!py-4"
              onChange={setSelectValue}
            />
          </div>

          {/* <Link href={"/account-setup/profile/data-enumerator/welcome"}> */}
          <Button
            type="submit"
            className="!px-10 !py-3 mt-10 text-sm font-bold !w-fit !rounded-full"
            loading={isPending}
          >
            Continue
          </Button>
          {/* </Link> */}
        </form>
      </div>
    </section>
  );
};

export default KeyValueArea;
