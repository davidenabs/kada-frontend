import { Column } from "@/components/common/table";
import { format } from "date-fns";

const columns: Column<any>[] = [
  {
    label: "Crop",
    key: "name",
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
    label: "No of Seasons",
    key: "activities",
    render: (item) => <div className="">{item.seasons.length}</div>,
  },
  // {
  //   label: "No of Seasons",
  //   key: "title",
  //   render: (item) => <div className="">{item.seasons.length}</div>,
  // },
];

export default columns;
