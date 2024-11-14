import React, { Fragment } from "react";
import { Badge, Popover, Table } from "rizzui";
import { KadaButton } from "@/components/form/button";
import { EyeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { sampleMembers } from "../../cooperative/members/data";

function RequestTable() {
  return (
    <Fragment>
      <Table variant="elegant">
        <Table.Header>
          <Table.Row>
            <Table.Head>Vendor name</Table.Head>
            <Table.Head>Date Requested</Table.Head>
            <Table.Head>Amount Paid</Table.Head>
            <Table.Head>Description</Table.Head>
            <Table.Head>Action</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sampleMembers.map((member) => (
            <Table.Row>
              <Table.Cell>
                <div className="flex gap-2 items-center">
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={member.avatar}
                      alt="avatar"
                      fill
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.date_joined}
                    </p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="max-w-[100px]">
                <p>{member.phone}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{member.type}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{member.location}</p>
              </Table.Cell>
              <Table.Cell>
                <Badge variant="outline">Received</Badge>
              </Table.Cell>
              <Table.Cell>
                <Popover shadow="sm" placement="bottom-end">
                  <Popover.Trigger>
                    <KadaButton className="" variant="outline">
                      <EyeIcon className="w-5 h-5" />
                    </KadaButton>
                  </Popover.Trigger>

                  <Popover.Content className="z-0">
                    <>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4">Action</div>
                      </div>
                    </>
                  </Popover.Content>
                </Popover>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export default RequestTable;
