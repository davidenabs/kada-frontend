import React, { Fragment } from "react";
import { Badge, Popover, Table } from "rizzui";
import { KadaButton } from "@/components/form/button";
import { EyeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { sampleMembers } from "../../cooperative/members/data";
import { IUser, UserType } from "@/interface/user";
import { format } from "date-fns";

type Props = {
  users: IUser[];
  type: string;
};

function UsersTable({ users, type }: Props) {
  return (
    <Fragment>
      <Table variant="elegant">
        <Table.Header>
          <Table.Row>
            <Table.Head>{type}’s Name</Table.Head>
            <Table.Head>Phone Number</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Location</Table.Head>
            <Table.Head>Category</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <Table.Row>
              <Table.Cell>
                <div className="flex gap-2 items-center">
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={user.imagePath || "/images/avatar.png"}
                      alt="avatar"
                      fill
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(user?.createdAt || new Date(), "dd MMM, yyyy")}
                    </p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="max-w-[100px]">
                <p>{user?.phoneNumber}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{user?.userType}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{user?.address}</p>
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

export default UsersTable;
