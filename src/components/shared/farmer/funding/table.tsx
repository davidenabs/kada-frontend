import React, { Fragment } from "react";
import { Badge, Table } from "rizzui";

function FundingTable() {
  return (
    <Fragment>
      <Table variant="elegant">
        <Table.Header>
          <Table.Row>
            <Table.Head>Date</Table.Head>
            <Table.Head>Source</Table.Head>
            <Table.Head>Amount</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Purpose</Table.Head>
            <Table.Head>Funding</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>22/01/24</Table.Cell>
            <Table.Cell className="max-w-[100px]">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Table.Cell>
            <Table.Cell>
              <p>NGN 200,000.00</p>
            </Table.Cell>
            <Table.Cell>Grant</Table.Cell>
            <Table.Cell>Relief fund</Table.Cell>
            <Table.Cell>
              <Badge variant="outline">Received</Badge>
            </Table.Cell>
            <Table.Cell>
              <Badge variant="outline">Received</Badge>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export default FundingTable;
