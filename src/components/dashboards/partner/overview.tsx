import { useGetCooperativeOverviewQuery } from "@/app/_api/overview";
import { userAtom } from "@/stores/user";
import { useAtom } from "jotai";
import React from "react";

interface OverviewItem {
  icon: string;
  count: number;
  label: string;
  bgColor: string;
}

const Overview: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [stats, setStats] = React.useState<any>({});
  const { data, isFetching, isRefetching } = useGetCooperativeOverviewQuery({
    enabled: loaded,
  });
   const [user] = useAtom(userAtom); 

   const items = React.useMemo(
    () => [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/103798cdebe2f62b5f727f2cfbf4b80c4a8859cebe42b8f89e5b1512d61390df?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count:user?.user?.cooperativeProfile?.totalMembers|| 0,
        label: "Registered Members",
        bgColor: "bg-emerald-50",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6d66e539e3736b4bf7d24f26853608959f3d1d9c61efa2599cadc9c2449c88?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.postsCount || 0,
        label: "Opportunities",
        bgColor: "bg-green-100",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb49f3efcc65098aa838f09c330b2de7dd62ab707869844b8945413fd1928127?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.userStatistics?.totalVendors || 0,
        label: "Vendors",
        bgColor: "bg-lime-100",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.memberRequest || 0,
        label: "Membership Requests",
        bgColor: "bg-yellow-100",
      },
    ],
    [stats, user]
  );

  React.useEffect(() => {
    if (data?.data && data.success && !isFetching) {
      const stats = data.data as unknown as any;
      setStats(stats);
    }
  }, [data, isFetching]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="mt-6 space-y-3">
      <h2 className="text-lg leading-tight text-black font-bold">Overview</h2>

      <div className="grid md:grid-cols-4 gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center px-9 py-7 rounded-md h-[178px] max-md:px-5 border border-[#ECF2F6] bg-white`}
          >
            <img
              src={item.icon}
              alt=""
              className="object-contain aspect-[1.14] w-[33px]"
            />
            <div className="mt-5 text-2xl font-bold leading-tight">
              {item.count}
            </div>
            <div className="font-medium leading-5 text-sm text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
