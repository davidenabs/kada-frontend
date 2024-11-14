"use client";
import { useGetUsersQuery } from "@/app/_api/user";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon, SearchIcon } from "@/icons";
import { IUser, UserType } from "@/interface/user";
import React, { useState } from "react";

type AddMemberModalProps = {
  close: () => void;
};

function AddMemberModal({ close }: AddMemberModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [farmers, setFarmers] = React.useState<
    { label: string; value: string }[]
  >([]);

  const { data, isFetching, isRefetching } = useGetUsersQuery({
    enabled: debouncedSearch.length > 0 && loaded,
    params: {
      userType: UserType.FARMER,
      search: debouncedSearch,
    },
  });

  // * debounce search
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  // * Set farmers when data is fetched
  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setFarmers(
        data.data.users.map((farmer: IUser) => ({
          label:
            farmer.firstName +
            " " +
            farmer.lastName +
            "(" +
            farmer.phoneNumber +
            ")",
          value: String(farmer.id),
        }))
      );
    }
  }, [data, isFetching, isRefetching]);

  React.useEffect(() => {
    if (debouncedSearch) {
      setLoaded(true);
    }
  }, [debouncedSearch]);

  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Add member</h4>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className=" bg-white p-6">
        <div className="space-y-6">
          {/* <Select
            label="Select"
            options={options}
            value={value}
            onChange={setValue}
            clearable={value !== null}
            onClear={() => setValue(null)}
          /> */}
          <Input
            placeholder="Search here..."
            inputClassName="!rounded-[10px] !h-[40px]"
            className="!w-full"
            prefix={<SearchIcon />}
            type="search"
            clearable
            label="Search for a registered member"
          />

          <Input
            placeholder="Enter member’s name"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Name"
          />

          <Input
            placeholder="08012345678"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Phone Number"
          />

          <Input
            placeholder="Enter Your email"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Email"
          />

          <Input
            placeholder="Enter or select categories"
            inputClassName="!rounded-[10px] !h-[40px]"
            type="text"
            label="Categories"
          />

          <KadaButton className="!w-full rounded-full" onClick={close}>
            Add Member
          </KadaButton>
        </div>
      </div>
    </section>
  );
}

export default AddMemberModal;
