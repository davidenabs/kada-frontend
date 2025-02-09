import { CloseIcon } from "@/icons";
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Modal } from "rizzui";

type EditReviewModalProps = {
  open: boolean;
  close: () => void;
  vendor: any | null;
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-5 h-5 text-gray-500">{icon}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">{value || "N/A"}</p>
      </div>
    </div>
  );
}

function ViewVendor({ open, close, vendor }: EditReviewModalProps) {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        onClose={close}
        size={"lg"}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100"
        className="z-[9999] [&_.pointer-events-none]:overflow-visible"
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b px-6 py-1 bg-[#F9F9F9] rounded-t-xl">
            <h4 className="text-base font-semibold">Vendor</h4>

            <button onClick={close} type="button">
              <CloseIcon className="w-3 h-3" />
            </button>
          </header>

          <div className="mt-4 max-h-[60vh] px-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem
                  icon={<UserIcon />}
                  label="Public ID"
                  value={vendor.publicId}
                />
                <InfoItem
                  icon={<EnvelopeIcon />}
                  label="Email"
                  value={vendor.email}
                />
                <InfoItem
                  icon={<PhoneIcon />}
                  label="Phone"
                  value={vendor.phoneNumber}
                />
                <InfoItem
                  icon={<MapPinIcon />}
                  label="Community"
                  value={vendor.community}
                />
                <InfoItem
                  icon={<BuildingLibraryIcon />}
                  label="Ward"
                  value={vendor.ward}
                />
                <InfoItem
                  icon={<MapPinIcon />}
                  label="Zone"
                  value={vendor.zone}
                />
                <InfoItem
                  icon={<MapPinIcon />}
                  label="LGA"
                  value={vendor.lga}
                />
                <InfoItem
                  icon={<UsersIcon />}
                  label="User Type"
                  value={vendor.userType}
                />
                <InfoItem
                  icon={<CheckCircleIcon />}
                  label="Verified"
                  value={vendor.verified ? "Yes" : "No"}
                />
                <InfoItem
                  icon={<EnvelopeIcon />}
                  label="Verification Method"
                  value={vendor.verificationMethod}
                />
                <InfoItem
                  icon={<CreditCardIcon />}
                  label="Subscribed"
                  value={vendor.isSubscribed ? "Yes" : "No"}
                />
                <InfoItem
                  icon={<CalendarDaysIcon />}
                  label="Created At"
                  value={new Date(vendor.createdAt).toLocaleString()}
                />
                <InfoItem
                  icon={<CalendarDaysIcon />}
                  label="Updated At"
                  value={new Date(vendor.updatedAt).toLocaleString()}
                />
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Vendor Profile
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoItem
                  icon={<BriefcaseIcon />}
                  label="Vendor Name"
                  value={vendor.vendorProfile.vendorName}
                />
                <InfoItem
                  icon={<DocumentCheckIcon />}
                  label="Registration Number"
                  value={vendor.vendorProfile.registrationNumber}
                />
                <InfoItem
                  icon={<CheckCircleIcon />}
                  label="Has CAC"
                  value={vendor.vendorProfile.hasCAC ? "Yes" : "No"}
                />
                <InfoItem
                  icon={<CalendarDaysIcon />}
                  label="Date Established"
                  value={new Date(
                    vendor.vendorProfile.dateEstablished
                  ).toLocaleDateString()}
                />
                <InfoItem
                  icon={<CreditCardIcon />}
                  label="Has Paid"
                  value={vendor.vendorProfile.hasPaid ? "Yes" : "No"}
                />
                <InfoItem
                  icon={<CheckCircleIcon />}
                  label="Is Verified"
                  value={vendor.vendorProfile.isVerified ? "Yes" : "No"}
                />
                <InfoItem
                  icon={<DocumentCheckIcon />}
                  label="Approval Status"
                  value={vendor.vendorProfile.approvalStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ViewVendor;
