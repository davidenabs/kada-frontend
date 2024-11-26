import { useGetFarmCroppingNotificationQuery } from "@/app/_api/farm";
import { CloseIcon } from "@/icons";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";
import { Badge, cn } from "rizzui";

type NotifyModalProps = {
  close: () => void;
};

function NotificationsModal({ close }: NotifyModalProps) {
  const { farmId } = useParams();
  const [loaded, setLoaded] = React.useState(false);

  const { isFetching, isRefetching, data } =
    useGetFarmCroppingNotificationQuery({
      farmId: farmId as string,
      enabled: true,
    });

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  if (isFetching || !loaded) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <div className="w-full rounded-[10px] max-md:max-w-full bg-white">
        <header className="flex justify-between bg-[#FFFFFF] border-b border-[#ECF2F6] px-4 py-2 rounded-t-[10px]">
          <h1 className="self-start text-lg font-bold">Notifications</h1>
          <button onClick={close}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </header>

        <div className="w-full max-h-[70vh] overflow-y-scroll p-4">
          <div className="grid grid-cols-2 gap-3">
            {data?.data?.items.map((notification: any) => (
              <>
                <div className="border p-2 rounded-lg">
                  <p className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {format(new Date(notification.scheduledDate), "PPP")}
                    </span>
                  </p>
                  <p className="mb-2">
                    Farm: {notification.farmCrop.farm.name}
                  </p>
                  <p className="mb-2">
                    Crop: {notification.farmCrop.crop.name}
                  </p>
                  <Badge
                    className={cn(
                      notification.sent ? "bg-green-500" : "bg-gray-500",
                      "font-light text-white"
                    )}
                  >
                    {notification.sent ? "Sent" : "Not Sent"}
                  </Badge>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NotificationsModal;
