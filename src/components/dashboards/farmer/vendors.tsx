import { useGetUsersQuery, useGetVendorsQuery } from "@/app/_api/user";
import Input from "@/components/form/input";
import useDebounce from "@/hooks/use-debounce";
import { SearchIcon } from "@/icons";
import { UserType } from "@/interface/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Empty } from "rizzui";

interface VendorProps {
  name: string;
  description: string;
  imageUrl: string;
  path: string;
}

const VendorSkeleton: React.FC = () => {
  return (
    <div className="flex gap-3 mt-8 animate-pulse">
      <div className="rounded-xl bg-gray-300 aspect-[1.29] w-[135px]" />
      <div className="flex flex-col my-auto text-sm leading-tight text-black">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="mt-1.5 h-3 w-40 bg-gray-200 rounded" />
        <div className="self-start mt-3.5 p-1 w-16 h-5 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

const Vendor: React.FC<VendorProps> = ({
  name,
  description,
  imageUrl,
  path,
}) => {
  return (
    <div className="flex gap-3 mt-8">
      <div className="w-[50px] h-[50px]">
        <img
          loading="lazy"
          src={imageUrl}
          alt={`${name} thumbnail`}
          className="object-contain rounded-xl w-[135px] h-[135px]"
        />
      </div>

      <div className="flex flex-col my-auto text-sm leading-tight text-black flex-1">
        <div className="flex flex-col max-md:mr-1">
          <div className="font-bold">{name}</div>
          <div className="mt-1.5 font-light line-clamp-3">{description}</div>
        </div>
        <div className="gap-2.5 self-start p-1 mt-3.5 font-light  text-sm whitespace-nowrap rounded bg-stone-50 border-[0.5px] border-zinc-400">
          <Link href={path}>Available</Link>
        </div>
      </div>
    </div>
  );
};

const VendorList: React.FC = () => {
  const pathname = usePathname();
  const [loaded, setLoaded] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(4);
  const [search, setSearch] = React.useState("");
  const debouncedSearchQuery = useDebounce(search);

  const { data, isFetching, isRefetching, isError } = useGetVendorsQuery({
    enabled: loaded,
    params: {
      page,
      limit,
      search: debouncedSearchQuery,
    },
  });

  React.useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <div className="flex overflow-hidden gap-3 py-9 px-3 w-full bg-white rounded-3xl border border-solid border-neutral-300 shadow-[0px_0px_30px_rgba(189,189,189,0.25)] max-md:pl-5 max-md:mt-5">
      <div className="flex flex-col grow shrink-0 items-start basis-0 w-full self-stretch">
        <h2 className="text-xl font-bold leading-tight text-green-800">
          Vendors
        </h2>

        <div className="w-full">
          <Input
            placeholder="Search for service provider"
            className="self-stretch w-full !py-3"
            suffix={<SearchIcon className="fill-black" />}
            onChange={(e) => setSearch(e.target.value)}
            clearable
            onClear={() => setSearch("")}
            value={search}
          />
        </div>

        <div className="w-full overflow-auto max-h-[552px]">
          {isFetching || isRefetching ? (
            <VendorSkeleton />
          ) : isError ? (
            <div className="text-center">Failed to fetch vendors</div>
          ) : data?.data?.total === 0 ? (
            <Empty text="No vendors found" />
          ) : (
            <div>
              {/* vendors.map((vendor, index) => <Vendor key={index} {...vendor} />) */}
              {data?.data?.users.map((vendor, index) => (
                <Vendor
                  key={index}
                  name={vendor.vendorProfile?.vendorName!}
                  description={vendor.vendorProfile?.about!}
                  imageUrl={vendor.imagePath ?? "/images/avatar.png"}
                  path={pathname + "/" + vendor.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center py-52 my-auto rounded bg-neutral-100 max-md:py-24">
        <div className="flex shrink-0 h-6 rounded bg-zinc-300" />
      </div>
    </div>
  );
};

export default VendorList;
