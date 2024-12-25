import React, { Fragment } from "react";
import { Table } from "rizzui";
import { EyeIcon } from "@heroicons/react/16/solid";

function MembersTableSkeleton() {
  return (
    <Fragment>
      <Table variant="elegant">
        <Table.Body>
          {[...Array(3)].map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <div className="flex gap-2 items-center">
                  <div className="relative w-[40px] h-[40px] rounded-full bg-gray-200 animate-pulse"></div>
                  <div>
                    <div className="w-20 h-4 bg-gray-200 animate-pulse rounded-md mb-1"></div>
                    <div className="w-16 h-3 bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="max-w-[100px]">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded-md"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse flex items-center justify-center"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export default MembersTableSkeleton;
