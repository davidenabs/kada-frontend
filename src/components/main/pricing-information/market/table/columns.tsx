import { Column } from "@/components/common/table";
import { PriceHighIcon, PriceLowIcon } from "@/icons";
import { format } from "date-fns";

const columns: Column<any>[] = [
  {
    label: "Product",
    key: "product",
    render: (item) => <div className="text-left text-xs">{item.name}</div>,
  },
  {
    label: "Price",
    key: "price",
    render: (item) => <div className="text-left text-xs">{item.price}</div>,
  },
  {
    label: "Quantity",
    key: "quantity",
    render: (item) => <div className="text-left text-xs">{item.quantity}</div>,
  },
  {
    label: "Date",
    key: "date",
    render: (item) => (
      <div className="text-left text-xs">
        {format(new Date(item.priceDate), "PP")}
      </div>
    ),
  },
  {
    label: "Trend",
    key: "trend",
    render: (item) => (
      <div className="text-left flex text-sm">
        <span className="self-stretch my-auto text-black">
          {item.priceTrend.percentageChange}%{/* {item.priceTrend.trend}  */}
        </span>
        {item.priceTrend.trend == "increase" ? (
          <PriceLowIcon className="w-[18px] h-[18px]" />
        ) : item.priceTrend.trend == "increase" ? (
          <PriceHighIcon className="w-[18px] h-[18px]" />
        ) : (
          ""
        )}
      </div>
    ),
  },
];

export default columns;
