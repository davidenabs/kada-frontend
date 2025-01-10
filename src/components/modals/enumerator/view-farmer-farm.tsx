"use client";
import { IFarm } from "@/interface/farm";
import { IUser } from "@/interface/user";
import React from "react";
import FarmerData from "./data/farmer";
import FarmData from "./data/farm";
import { CloseIcon } from "@/icons";


type ViewFarmerFarmModalProps = {
    close: () => void;
    item: IUser | IFarm;
    activeTab: "Farmers" | "Farms";
};

const ViewFarmerFarmModal = ({ close, item, activeTab }: ViewFarmerFarmModalProps) => {
    return (

        <div
        className="flex overflow-hidden flex-col w-full rounded-[10px] bg-white font-inter"
    >
        <header className="flex items-center justify-between border-b px-6 py-4 bg-[#F9F9F9]">
            <div className="flex flex-col">
                <h4 className="text-base font-semibold">{activeTab == "Farmers" ? "Farmers" : "Farms"} Details</h4>
            </div>

            <button onClick={close}>
                <CloseIcon className="w-4 h-4" />
            </button>
        </header>

        {/* Modal Body */}
        <div className="bg-white p-6 divide-y">
        {activeTab === "Farmers" ? (
                <FarmerData profile={item as IUser} close={close} />
            ) : (
                <FarmData farm={item as IFarm} close={close} />
            )}
        </div>
    </div>

        // <div className="modal-container">
        //     <button onClick={close} className="close-button">Close</button>
           
        // </div>
    );
};

export default ViewFarmerFarmModal;
