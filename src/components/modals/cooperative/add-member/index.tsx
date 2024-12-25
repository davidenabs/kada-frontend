"use client";
import {
  useAddFarmerMutation,
  useGetFarmersQuery,
  useGetUsersQuery,
} from "@/app/_api/user";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import useDebounce from "@/hooks/use-debounce";
import { CloseIcon, SearchIcon } from "@/icons";
import { IUser, UserType } from "@/interface/user";
import React, { useState } from "react";
import { toast } from "sonner";

type AddMemberModalProps = {
  close: () => void;
};

function AddMemberModal({ close }: AddMemberModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);
  const [value, setValue] = React.useState(null);
  const [farmers, setFarmers] = React.useState<
    { label: string; value: string }[]
  >([]);

  const { data, isFetching, isRefetching } = useGetFarmersQuery({
    enabled: debouncedSearchQuery.length > 0 && loaded,
    params: {
      // page,
      // limit,
      search: debouncedSearchQuery,
    },
  });

  const mutation = useAddFarmerMutation();

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
          value: String(farmer.phoneNumber),
        }))
      );
    }
  }, [data, isFetching, isRefetching]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAddMember = () => {
    if (!value) {
      return toast.error("Please select a member to add");
    }

    mutation.mutateAsync(
      {
        farmerId: (value as any).value,
      },
      {
        onSuccess: (response) => {
          console.log(response);
          if (response.success) {
            toast.success("Member added successfully");
            close();
          }
        },
      }
    );
  };

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
          <Select
            label="Search for a registered member"
            searchable={true}
            options={farmers}
            value={value}
            onChange={(e: any) => {
              setValue(e);
            }}
            clearable={value !== null}
            onClear={() => {
              setValue(null);
              setSearch("");
            }}
            onSearchChange={(e) => {
              setSearch(e);
            }}
            disableDefaultFilter
            searchPlaceHolder="Search here..."
            searchPrefix={<SearchIcon className="fill-black" />}
          />

          <KadaButton
            className="!w-full rounded-full"
            onClick={handleAddMember}
            loading={mutation.isPending}
          >
            Add Member
          </KadaButton>
        </div>
      </div>
    </section>
  );
}

export default AddMemberModal;
