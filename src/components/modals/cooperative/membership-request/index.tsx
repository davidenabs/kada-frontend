"use client";
import React from "react";
import { CloseIcon, UserAddIcon } from "@/icons";
import { useGetRequests } from "@/app/_api/request";
import { IRequest } from "@/interface/request";
import RequestMemberSkeleton from "@/components/skeletons/request-member";
import RequestMember from "@/components/common/ui/request-member";
import RequestMemberDetail from "@/components/common/ui/request-member-detail";

type MembershipRequestModalProps = {
  close: () => void;
};

function MembershipRequestModal({ close }: MembershipRequestModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [requesting, setRequesting] = React.useState(false);
  const [requests, setRequests] = React.useState<IRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = React.useState<IRequest | null>(
    null
  );

  const { data, isFetching, isRefetching } = useGetRequests({
    enabled: loaded, // *Enable the query when the component is loaded
    params: {
      filter: "pending",
    },
  });

  // *Set requests when data is fetched
  React.useEffect(() => {
    if (data?.data && data.success && !isFetching && !isRefetching) {
      setRequests(data.data.requests);
    }
  }, [data, isFetching, isRefetching]);

  // *Set loaded to true when component mounts
  React.useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <section className="flex overflow-hidden flex-col w-full rounded-[10px] max-md:max-w-full bg-white font-inter">
      <header className="flex items-center justify-between border-b px-6 py-2">
        <h4 className="text-base font-semibold">Membership Requests</h4>

        <button onClick={close}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </header>

      <div className="flex bg-[#F7F7F7] h-[600px]">
        <div className="w-[300px] md:w-[400px] lg:w-[500px] bg-white space-y-1 overflow-y-scroll pt-1">
          {isFetching || isRefetching ? (
            Array.from({ length: 3 }).map((_, i) => (
              <RequestMemberSkeleton key={i} />
            ))
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <RequestMember
                key={request.id + "member request"}
                request={request}
                onClick={() => {
                  if (requesting) return;
                  setSelectedRequest(request);
                }}
                selected={selectedRequest?.id === request.id}
                setRequesting={setRequesting}
                requesting={requesting}
              />
            ))
          ) : (
            <>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <UserAddIcon className="w-6 h-6" />
                <p className="text-sm text-[#878D96]">No membership requests</p>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-scroll">
          {selectedRequest && <RequestMemberDetail request={selectedRequest} />}
        </div>
      </div>
    </section>
  );
}

export default MembershipRequestModal;
