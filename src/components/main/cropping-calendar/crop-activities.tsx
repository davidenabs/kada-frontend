import React from "react";
import { Activity } from "@/interface/crop";
import { Table } from "rizzui";

function CropActivities({
  activities,
}: {
  activities: Activity[] | undefined;
}) {
  return (
    <section className="">
      {activities?.map((activity, index) => (
        <div key={index} className="bg-[#F9FAFB] p-4 text-[#4D5358] rounded-lg">
          <h4 className="text-md font-semibold   ">{activity.name}</h4>

          <div className="mt-3">
            {/* <table className="min-w-full border-collapse ">
              <thead>
                <tr className="bg-[#E7ECE8] border-l-2 border-[#205B42] text-sm">
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {activity.details.map((detail, idx) => (
                  <tr key={idx} className="border-b border-gray-100 text-sm">
                    <td className="p-2">{detail.description}</td>
                    <td className="p-2">
                      {detail.quantity} {detail.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            <Table variant="minimal" className="rounded-lg">
              <Table.Header>
                <Table.Row>
                  <Table.Head className="w-8/12">Description</Table.Head>
                  <Table.Head className="">Quantity</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {activity.details.map((detail, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>{detail.description}</Table.Cell>
                    <Table.Cell>
                      {detail.quantity} {detail.unit}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CropActivities;
