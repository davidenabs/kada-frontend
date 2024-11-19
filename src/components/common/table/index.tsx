import React, { Fragment, useState } from "react";
import { Empty, Table } from "rizzui";
import { Pagination } from "./pagination";

export interface Column<T> {
  label: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface KadaTableProps<T> {
  data: T[];
  columns: Column<T>[];
  renderActions?: (item: T) => React.ReactNode;
  renderTitle?: React.ReactNode | string;
  itemsPerPage?: number;
  totalItems: number;
  page: number;
  onPageChange: (page: number) => void;
}

/**
 * A generic table component for displaying data with pagination.
 *
 * @template T - The type of the data records.
 * @param {KadaTableProps<T>} props - The properties for the KadaTable component.
 * @param {T[]} props.data - The data to be displayed in the table.
 * @param {Array<{ key: keyof T; label: string; render?: (item: T) => React.ReactNode }>} props.columns - The columns configuration for the table.
 * @param {(item: T) => React.ReactNode} [props.renderActions] - Optional function to render actions for each row.
 * @param {number} [props.itemsPerPage=10] - The number of items to display per page.
 * @param {number} props.totalItems - The total number of items.
 * @param {number} props.page - The current page number.
 * @param {(page: number) => void} props.onPageChange - The function to call when the page changes.
 * @returns {JSX.Element} The rendered table component.
 */
function KadaTable<T extends Record<string, any>>({
  data,
  columns,
  renderActions,
  renderTitle,
  itemsPerPage = 10,
  totalItems,
  page,
  onPageChange,
}: KadaTableProps<T>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Fragment>
      <div className="overflow-x-scroll">
        <Table variant="minimal" className="rounded-lg">
          <Table.Header>
            <Table.Row>
              {columns.map((col) => (
                <Table.Head
                  className="text-center"
                  key={`header-${String(col.key)}`}
                >
                  {col.label}
                </Table.Head>
              ))}
              {renderActions && (
                <Table.Head>{renderTitle || "Actions"}</Table.Head>
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length + 1}
                  className="text-center"
                >
                  <Empty text="No data found" />
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, idx) => (
                <Table.Row key={`row-${String(idx)}`}>
                  {columns.map((col) => (
                    <Table.Cell key={`cell-${String(col.key)}`}>
                      {col.render ? col.render(item) : item[col.key]}
                    </Table.Cell>
                  ))}
                  {renderActions && (
                    <Table.Cell>{renderActions(item)}</Table.Cell>
                  )}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex max-md:flex-col justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </p>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </Fragment>
  );
}

export default KadaTable;
