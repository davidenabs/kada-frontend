import { useGetAdminOverviewQuery } from "@/app/_api/overview";
import React from "react";

interface OverviewItem {
  icon: any;
  count: number;
  label: string;
}

interface OverviewProps {
  stats: any;
}

const Overview: React.FC<OverviewProps> = ({ stats }) => {
  const [loaded, setLoaded] = React.useState(false);

  // "totalFarmersInCooperative": 5,
  //           "totalFarmers": 35,
  //           "totalCooperatives": 10,
  //           "totalVendors": 6,
  //           "totalEnumerators": 1,
  //           "totalAgricBusinesses": 0,
  //           "totalZonalHeads": 1,
  //           "totalPartner": 1,
  //           "totalStaff": 0

  const overviewItems: OverviewItem[] = React.useMemo(
    () => [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/103798cdebe2f62b5f727f2cfbf4b80c4a8859cebe42b8f89e5b1512d61390df?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalFarmers || 0,
        label: "Farmers",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac6d66e539e3736b4bf7d24f26853608959f3d1d9c61efa2599cadc9c2449c88?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalCooperatives || 0,
        label: "Cooperatives",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb49f3efcc65098aa838f09c330b2de7dd62ab707869844b8945413fd1928127?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalVendors || 0,
        label: "Vendors",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalEnumerators || 0,
        label: "Enumberators",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalZonalHeads || 0,
        label: "Zonal Heads",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalPartner || 0,
        label: "Partners",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalAgricBusinesses || 0,
        label: "Agric Businesses",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalStaff || 0,
        label: "Staff",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/83d62767185a837e667a85f2da59dd299385615bff3f6b843c813993d474eb8f?placeholderIfAbsent=true&apiKey=e3159558e3c24b7bb6f2db02f0873db3",
        count: stats?.totalFarmersInCooperative || 0,
        label: "Farmers in Cooperative",
      },
    ],
    [stats]
  );

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="mt-6 space-y-3">
      <h2 className="text-lg leading-tight text-black font-bold">Overview</h2>

      <div className="grid md:grid-cols-5 gap-5">
        {overviewItems.map((item, index) => (
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
