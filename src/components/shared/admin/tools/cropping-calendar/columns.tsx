import { Column } from "@/components/common/table";
import { format } from "date-fns";

const columns: Column<any>[] = [
  {
    label: "Crop",
    key: "date",
    render: (item) => <div className="">{item.name}</div>,
  },
  {
    label: "Date Added",
    key: "date",
    render: (item) => (
      <div className="">{format(item.createdAt, "dd/mm/yy")}</div>
    ),
  },
  {
    label: "No of Stages/Ranges",
    key: "title",
    render: (item) => <div className="">3</div>,
  },
];

export default columns;
