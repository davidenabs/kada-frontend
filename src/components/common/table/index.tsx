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
  onLimitChange?: (limit: number) => void;
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
 * @param {(limit: number) => void} [props.onLimitChange] - The function to call when the items per page changes.
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
  onLimitChange,
}: KadaTableProps<T>) {
  const [jumpPage, setJumpPage] = useState<string>("");
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Fragment>
      <div className="overflow-x-scroll rounded-xl border border-[#ECF2F6]">
        <Table variant="elegant" className="rounded-xl">
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
        <div className="flex max-md:flex-col justify-between items-center mt-4 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
              {totalItems} entries
            </p>
            {onLimitChange && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    onLimitChange(Number(e.target.value));
                    onPageChange(1); // Reset to page 1 on limit change
                  }}
                  className="border-gray-300 rounded-md text-sm py-1 pl-2 pr-8 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
            
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
              <span className="text-sm text-gray-500">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && jumpPage) {
                    const p = Math.max(1, Math.min(totalPages, Number(jumpPage)));
                    onPageChange(p);
                    setJumpPage("");
                  }
                }}
                className="border-gray-300 rounded-md text-sm w-16 py-1 px-2 focus:ring-primary-500 focus:border-primary-500 text-center outline-none"
                placeholder={page.toString()}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default KadaTable;
