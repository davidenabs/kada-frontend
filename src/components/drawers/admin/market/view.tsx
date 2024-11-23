import { CloseIcon } from "@/icons";
import React, { Fragment } from "react";
import { cn, Drawer, Table } from "rizzui";

type ViewMarketDrawerProps = {
  open: boolean;
  close: () => void;
  market: any | null;
};

function ViewMarketDrawer({ open, close, market }: ViewMarketDrawerProps) {
  return (
    <Fragment>
      <Drawer
        isOpen={open}
        onClose={() => {
          close();
        }}
        placement={"right"}
        size={"lg"}
        overlayClassName="bg-opacity-40 backdrop-blur-sm"
        containerClassName={cn(
          "bg-gray-100 rounded-l-xl !max-w-[calc(100%-380px)] !shadow-2xl"
        )}
        className="z-[9999]"
      >
        <section className="h-full bg-white space-y-4">
          <div className="bg-[#F9F9F9] flex justify-between items-center px-6 py-5 rounded-tl-2xl border-b border-[#F2F2F2]">
            <h4 className="font-bold text-lg font-inter">{market?.name}</h4>

            <button onClick={close}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 my-4">
              <div>
                <p>
                  <strong>Address:</strong> {market?.address}
                </p>
                <p>
                  <strong>Local Government Area:</strong>{" "}
                  {market?.localGovernmentArea}
                </p>
                <p>
                  <strong>Ward:</strong> {market?.ward}
                </p>
                <p>
                  <strong>Coordinates:</strong> {market?.coordinates}
                </p>
              </div>
              <div>
                <p>
                  <strong>Size:</strong> {market?.size}
                </p>
                <p>
                  <strong>Opening Days:</strong> {market?.openingDays}
                </p>
                <p>
                  <strong>Opening Time:</strong> {market?.openingTime}
                </p>
                <p>
                  <strong>Market Code:</strong> {market?.marketCode}
                </p>
              </div>
            </div>
            <h3 className="font-semibold mt-4 mb-2">Products</h3>
            <div className="w-full overflow-x-scroll">
              <Table variant="minimal" className="rounded-lg">
                <Table.Header>
                  <Table.Row>
                    {/* <Table.Head className="text-center"></Table.Head> */}
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Price</Table.Head>
                    <Table.Head>Quantity</Table.Head>
                    <Table.Head>Unit</Table.Head>
                    <Table.Head>Current Price Date</Table.Head>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {market?.products.map((product: any) => (
                    <Table.Row key={product.id}>
                      {/* <Table.Cell className="text-center">
                        <Checkbox />
                      </Table.Cell> */}
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>{product.price}</Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>{product.unit || "N/A"}</Table.Cell>
                      <Table.Cell>{product.currentPriceDate}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </section>
      </Drawer>
    </Fragment>
  );
}

export default ViewMarketDrawer;
