import { useUpdateRequestMutation } from "@/app/_api/request";
import { KadaButton } from "@/components/form/button";
import ConfirmModal from "@/components/modals/confim-modal";
import { ArrowRightIcon, UserAddIcon } from "@/icons";
import { IRequest } from "@/interface/request";
import { format } from "date-fns";
import Image from "next/image";
import React, { Fragment } from "react";
import { cn } from "rizzui";
import { toast } from "sonner";

type RequestMemberProps = {
  request: IRequest;
  onClick: () => void;
  selected: boolean;
  setRequesting: React.Dispatch<React.SetStateAction<boolean>>;
  requesting: boolean;
  setSelectedRequest: React.Dispatch<React.SetStateAction<IRequest | null>>;
};

function RequestMember({
  request,
  onClick,
  selected,
  setRequesting,
  requesting,
  setSelectedRequest,
}: RequestMemberProps) {
  const { mutateAsync, isPending } = useUpdateRequestMutation();
  const [confirm, setConfirm] = React.useState(false);
  const [status, setStatus] = React.useState<"approved" | "rejected" | null>(
    null
  );

  const handleAccept = (status: "approved" | "rejected" | null) => {
    if (isPending || requesting || status === null) return;

    const data = {
      data: {
        newStatus: status,
      },
      id: String(request.id),
    };
    setRequesting(true);
    mutateAsync(data, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(`Request has been successfully ${status}`);
          setSelectedRequest(null);
        }
      },
      onError: (error) => {},
      onSettled: () => {
        setConfirm(false);
        setStatus(null);
        setRequesting(false);
      },
    });
  };

  return (
    <Fragment>
      {confirm && (
        <ConfirmModal
          open={confirm}
          close={() => setConfirm(false)}
          loading={isPending}
          onConfirm={() => {
            handleAccept(status);
          }}
        />
      )}
      <div
        className={cn(
          "flex justify-between items-center px-4 py-3 rounded-md transition-all duration-300 ease-in-out group hover:bg-gray-300 cursor-pointer",
          selected && "bg-gray-300"
        )}
        onClick={onClick}
      >
        <div className="flex gap-2 items-center">
          <div className="relative w-[40px] h-[40px]">
            <Image
              src={request.farmer?.imagePath || "/images/avatar.png"}
              alt="avatar"
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div>
            <p className="font-medium text-sm">
              {request.farmer?.firstName} {request.farmer?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              Joined:{" "}
              {format(request!.farmer!.createdAt || new Date(), "dd/MM/yy")}
            </p>
          </div>
        </div>

        <div className="">
          {selected ? (
            <>
              <div className="flex gap-1">
                <KadaButton
                  className="rounded-full !bg-[#00A551] h-[25px] px-2"
                  rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatus("approved");
                    setConfirm(true);
                  }}
                  disabled={isPending || requesting}
                >
                  Accept
                </KadaButton>
                <KadaButton
                  className="rounded-full !bg-[#E7413E] h-[25px] px-2"
                  rightIcon={<ArrowRightIcon className="w-4 h-4 fill-white" />}
                  // onClick={(e) => handleAccept(e, "rejected")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatus("rejected");
                    setConfirm(true);
                  }}
                  disabled={isPending || requesting}
                >
                  Reject
                </KadaButton>
              </div>
            </>
          ) : (
            <UserAddIcon className="w-6 h-6" />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default RequestMember;
