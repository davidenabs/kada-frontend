"use client";
import { withAuth } from "@/components/common/auth";
import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import SubscribeModal from "@/components/modals/subscribe-modal";
import useDashboardTitle from "@/hooks/use-dashboard-tite";
import { useModal } from "@/hooks/use-modal";
import { Lock, VerifiedIcon } from "@/icons";
import { UserType } from "@/interface/user";
import { userAtom } from "@/stores/user";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import Button from "@/components/form/button";
import ProfileModal from "@/components/modals/farmer/profile";
import IDCard from "@/components/modals/farmer/id-card";
import { useSocket } from "@/provider/socket";

function FarmerProfileSharedPage() {
  useDashboardTitle("Profile");
  const { user } = useAtomValue(userAtom);
  const [loaded, setLoaded] = React.useState(false);
  const { openModal, closeModal } = useModal();
  const [confirm, setConfirm] = React.useState(false);
  const { socket } = useSocket();
  const [paymentStatus, setPaymentStatus] = React.useState<
    "completed" | "failed" | null
  >(null);
  // const { mutateAsync, isPending } = useUpdateRequestMutation();

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!socket) return;

    const event_name = `payment_verified_${user?.id}`;

    socket.on(event_name, (data: any) => {
      const { status, transactionId } = data;
      console.log("event_name", data);
      setPaymentStatus(status);
    });

    return () => {
      socket.off(event_name);
    };
  });

  if (!loaded) return null;

  const handleOpenModal = () => {
    openModal({
      customSize: "654px",
      view: (
        <SubscribeModal
          close={() => setConfirm(false)}
          open={confirm}
          onSubscribe={() => {}}
          loading={false}
        />
      ),
    });
  };

  const isValidValue = (value: any) =>
    value !== null && value !== undefined && value !== "";

  let profileImagePath = "/images/avatar.png";

  if (isValidValue(user?.farmerProfile?.ninData?.photo)) {
    profileImagePath = `data:image/jpeg;base64,${user?.farmerProfile?.ninData?.photo}`;
  } else if (user?.imagePath) {
    profileImagePath = user?.imagePath;
  }

  const userData = {
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.email,
    phone: user?.phoneNumber,
    publicId: user?.publicId,
    address: isValidValue(user?.farmerProfile?.ninData?.address)
      ? user?.farmerProfile?.ninData?.address
      : "",
    profileImage: profileImagePath,
  };

  return (
    <div className="flex justify-stretch items-stretch gap-8">
      <div className="flex-1 space-y-6">
        <div className="border border-[#ECF2F6] bg-white rounded-2xl h-[224px] flex items-center px-[50px] bg-[url('/images/profile-pattern.png')] bg-no-repeat bg-cover w-full">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-[99px] h-[99px]">
                <Image
                  src={profileImagePath}
                  alt={user?.firstName + "Profile Picture"}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              {/* {isValidValue(profile?.photo) && (
                            <div className="mb-4">
                                <img
                                    src={`data: image / jpeg; base64, ${ profile?.photo } `}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                        )} */}

              <div className="">
                <h4 className="text-[18px] font-bold">
                  {user?.firstName} {user?.lastName}
                </h4>
                {user?.isSubscribed || paymentStatus !== "completed" ? (
                  <div className="flex items-center space-x-2">
                    <VerifiedIcon className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-800">
                    <VerifiedIcon className="w-4 h-4 fill-red-300" />
                    <span>Not verified</span>
                  </div>
                )}
              </div>
            </div>
            {!user?.isSubscribed && (
              <Button
                handleClick={() => handleOpenModal()}
                className="!w-fit !rounded-full !py-3 !px-3 !shadow-none !bg-red-800 !text-white self-center z-10 flex gap-2"
              >
                <span>Subscribe</span>
              </Button>
            )}
          </div>
        </div>

        <div className="border border-[#ECF2F6] space-y-2 bg-white p-4 rounded-2xl">
          <div className="flex justify-between">
            <span className="text-[#00A551] text-lg">Bio</span>

            <button>
              <PencilIcon className="w-4 h-4 fill-[#00A551]" />
            </button>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Joined</span>

            <div className="flex">
              <span className="text-[#878D96]">20 Dec, 2023</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Email</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.email || "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Phone</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.phoneNumber || "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">ID</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.publicId || "Not available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Address</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.address ?? "Not Available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">LGA</span>

            <div className="flex">
              <span className="text-[#878D96]">
                {user?.lga ?? "Not Available"}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">State of Residence</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Funding History</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg">Cooperative</span>

            <div className="flex">
              <span className="text-[#878D96]">Kaduna</span>
            </div>
          </div>

          <div className="mx-aut self-center flex gap-2">
            <KadaButton
              className="!rounded-full h-[30px] !bg-slate-300 !text-black"
              onClick={() =>
                openModal({
                  view: (
                    <ProfileModal
                      close={closeModal}
                      profile={user?.farmerProfile?.ninData}
                    />
                  ),
                })
              }
            >
              View full profile
            </KadaButton>

            <KadaButton
              className="!rounded-full h-[30px] !bg-slate-300 !text-black"
              onClick={() =>
                openModal({
                  view: <IDCard userData={userData} />,
                  outSideClickClose: true,
                })
              }
            >
              ID card
            </KadaButton>
          </div>
        </div>
      </div>

      <div className="w-[366px] bg-[url('/images/bdo.png')] bg-cover bg-center bg-no-repeat rounded-3xl h-auto flex items-end">
        <div className="bg-white rounded-2xl p-8 flex flex-col justify-center w-full space-y-3">
          <div className="">
            <h4 className="text-2xl text-center font-bold text-[#0D5D34]">
              Having a great <br /> time here?
            </h4>
            <p className="text-center">Invite a Friend</p>
          </div>

          <Input placeholder="Enter email" label="What’s their email?" />

          <KadaButton className="!bg-black text-sm rounded-full">
            Send Invite
          </KadaButton>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfileSharedPage;
