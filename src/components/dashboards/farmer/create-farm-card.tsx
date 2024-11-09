"use client";
import { useGetFarmsQuerry } from "@/app/_api/farm";
import FarmCard from "@/components/common/cards/farm-caard";
import CreateFarmModal from "@/components/modals/create-farm";
import { useModal } from "@/hooks/use-modal";
import { IFarm } from "@/interface/farm";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React from "react";
import { Loader } from "rizzui";

interface FarmListProps {
  farms: IFarm[];
}

const FarmList: React.FC<FarmListProps> = ({ farms }) => {
  const router = useRouter();
  const newFarms = farms.slice(0, 3);
  return (
    <section className="flex flex-col rounded-none max-w-full">
      <div className="flex flex-col px-8 pt-9 pb-16 w-full bg-white rounded-3xl border border-solid border-teal-700 border-opacity-30 max-md:px-5 max-md:max-w-full ">
        <header className="flex flex-wrap gap-5 justify-between w-full font-bold text-black max-md:max-w-full">
          <h2 className="flex gap-2 items-start text-lg leading-none">
            Your farms <span>({farms.length})</span>
          </h2>
          <button
            className="text-sm leading-tight"
            onClick={() => router.push("/dashboard/farmer/farms")}
          >
            See all
          </button>
        </header>

        <div className="mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {newFarms.map((farm, index) => (
              <div
                key={index}
                className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              >
                <FarmCard {...farm} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function CreateFarmCard() {
  const { openModal, closeModal } = useModal();
  const [loaded, setLoaded] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleOpenModal = () => {
    openModal({
      customSize: "654px",
      view: <CreateFarmModal close={closeModal} />,
    });
  };

  const { data, isLoading } = useGetFarmsQuerry({
    enabled: loaded,
    params: {
      page,
      limit,
    },
  });

  if (isLoading)
    return (
      <section className="flex items-center justify-center order border border-teal-700 border-opacity-30 bg-white rounded-3xl py-10">
        <Loader size="lg" variant="spinner" />
      </section>
    );

  if (data?.data?.total && data?.data?.total > 0)
    return <FarmList farms={data?.data.farms} />;

  return (
    <div className="flex flex-col grow justify-center items-center px-20 py-48 w-full bg-white rounded-3xl border border-solid border-teal-700 border-opacity-30 max-md:px-5 max-md:py-24 max-md:mt-5 max-md:max-w-full">
      <div className="flex flex-col items-center max-w-full w-[291px]">
        <div className="flex flex-col items-center bg-green-100 rounded-full h-[76px] w-[76px]">
          <img
            loading="lazy"
            src="/images/vector-moon.svg"
            alt="Create Farm Icon"
            className="object-contain w-full aspect-square"
          />
        </div>
        <div className="flex flex-col justify-center items-center self-stretch mt-4 leading-none text-black">
          <h3 className="text-xl font-bold">You are yet to create a farm</h3>
          <p className="mt-2 text-sm font-light">
            Farm information will appear here once created
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex gap-0.5 items-start mt-5 text-sm leading-none text-green-800"
        >
          <span>Create Farm</span>
          <ArrowRightIcon className="w-4 h-4 fill-green-800" />
        </button>
      </div>
    </div>
  );
}

export default CreateFarmCard;
