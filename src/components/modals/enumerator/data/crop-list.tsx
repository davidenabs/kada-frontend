import { ICrop } from "@/interface/crop";
import React from "react";

const CropList = ({ crops }: { crops: ICrop[] }) => {
    return (
        <div className="crop-list">
            {crops?.map((crop, index) => (
                <span key={index} className="crop-item">
                    {crop.name}
                </span>
            ))}
        </div>
    );
};

export default CropList;
