import { useGetVendorOverviewQuery } from "@/app/_api/overview";
import OverviewSkeleton from "@/components/skeletons/overview";
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import Link from "next/link";
import React, { Fragment } from "react";

interface OverviewItem {
  icon: any;
  count: number;
  label: string;
}

const Overview: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const { data, isFetching, isRefetching, error, isError } =
    useGetVendorOverviewQuery({
      enabled: loaded,
    });
  const { user } = useAtomValue(userAtom);
console.log( data);

  const overviewItems: OverviewItem[] = React.useMemo(
    () => [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/103798cdebe2f62b5f727f2cfbf4b80c4a8859cebe42b8f89e5b1512d61390df?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: data?.data?.productsAndServices.totalProducts || 0,
        label: "Registered Products",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6d66e539e3736b4bf7d24f26853608959f3d1d9c61efa2599cadc9c2449c88?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: data?.data?.productsAndServices.totalServices || 0,
        label: "Registered Service",
      },
      // {
      //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb49f3efcc65098aa838f09c330b2de7dd62ab707869844b8945413fd1928127?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
      //   count: 6,
      //   label: "Opportunities",
      // },
      // {
      //   icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
      //   count: 6,
      //   label: "Verified",
      // },
    ],
    [data]
  );

  React.useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <section className="mt-6 space-y-3">
      <h2 className="text-lg leading-tight text-black font-bold">Overview</h2>

      <div className="grid md:grid-cols-4 gap-5">
        {isFetching || isRefetching ? (
          Array.from({ length: 3 }).map((_, i) => (
            <OverviewSkeleton key={i + "vendor overview skeleton"} />
          ))
        ) : (
          <Fragment>
            {overviewItems.map((item, index) => (
              <>
                <div
                  key={index + "overview item"}
                  className={`flex flex-col items-center px-9 py-7 rounded-md h-[178px] max-md:px-5 border border-[#ECF2F6] bg-white`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="object-contain aspect-[1.14] w-[33px]"
                  />

                  <div className="mt-5 text-2xl font-bold leading-tight">
                    {isError ? "Error" : item.count}
                  </div>
                  <div className="font-medium leading-5 text-sm text-center">
                    {item.label}
                  </div>
                </div>
              </>
            ))}

            <div
              className={`flex flex-col items-center px-9 py-7 rounded-md h-[178px] max-md:px-5 border border-[#ECF2F6] bg-white`}
            >
              <div className="mt-5 text-2xl font-bold leading-tight">
                {user?.vendorProfile?.isVerified ? "Verified" : "Not Verified"}
              </div>
              <div className="font-medium leading-5 text-sm text-center">
                {user?.vendorProfile?.isVerified && (
                  <span className="underline">
                    <Link
                      href="/dashboard/vendor/license"
                      className="text-teal-700"
                    >
                      See License
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Overview;
