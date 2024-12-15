import React from "react";
import { Activity } from "@/interface/crop";

function CropActivities({ activities }: { activities: Activity[] | undefined }) {
    return (
        <section className="">
            {activities?.map((activity, index) => (
                <div key={index} className="bg-[#F9FAFB] p-4 text-[#4D5358] ">
                    <h4 className="text-md font-semibold   ">{activity.name}</h4>

                    <div className="mt-3">
                        <table className="min-w-full border-collapse ">
                            <thead>
                                <tr className="bg-[#E7ECE8] border-l-2 border-[#205B42]  text-sm">
                                    <th className=" text-left p-2">Description</th>
                                    <th className=" text-left p-2">Quantity</th>
                                    <th className=" text-left p-2">Unit Cost</th>
                                    <th className=" text-left p-2">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activity.details.map((detail, idx) => (
                                    <tr key={idx} className="border-b border-gray-100  text-sm">
                                        <td className=" p-2">{detail.description}</td>
                                        <td className=" p-2">
                                            {detail.quantity} {detail.unit}
                                        </td>
                                        <td className=" p-2">
                                            &#8358;{detail.unit_cost.toLocaleString()}
                                        </td>
                                        <td className=" p-2">
                                            &#8358;{detail.total_cost.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {activity?.subtotal && activity?.subtotal > 0 && (<div className="text-sm font-bold text-right">
                        Sub-Total  = &#8358;{activity?.subtotal}
                    </div>)}
                </div>
            ))
            }
        </section >
    );
}

export default CropActivities;
