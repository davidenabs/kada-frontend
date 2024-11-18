import { BuildingIcon, StorefrontIcon } from "@/icons";
import React from "react";
import { Table } from "rizzui";

function CertTable() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>
            <div className="flex items-center gap-2 capitalize">
              <StorefrontIcon className="w-5 h-5" />
              <span>Vendor Name</span>
            </div>
          </Table.Head>
          <Table.Head>
            <div className="flex items-center gap-2 capitalize">
              <BuildingIcon className="w-5 h-5 fill-black" />
              <span>Category</span>
            </div>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 border border-solid border-zinc-700 rounded-sm checked:bg-primary checked:border-primary focus:ring-0 text-primary"
              />

              <span>ABCD Agro Enterprise</span>
            </div>
          </Table.Cell>
          <Table.Cell>Fertilizer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default CertTable;
