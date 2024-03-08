import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import {
  BarChartIcon,
  CornersIcon,
  DotIcon,
  DotsVerticalIcon,
  DoubleArrowUpIcon,
} from "@radix-ui/react-icons"
import { Category } from "./use-fake-data"

export const useColumns = () => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 150,
      cell: ({ getValue }) => <b className="line-clamp-1 break-all">{`#${getValue<string>()}`}</b>,
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Name",
      size: 250,
    },
    {
      accessorKey: "slug",
      cell: (info) => info.getValue(),
      header: "Handle",
      size: 100,
    },
    {
      accessorKey: "description",
      cell: (info) => info.getValue(),
      header: "Description",
      size: 200,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      filterFn: "isWithinDateRange",
      cell: (info) => info.getValue<Date>().toLocaleString(),
      size: 250,
    },
    {
      accessorKey: "updatedAt",
      header: "Created At",
      filterFn: "isWithinDateRange",
      cell: (info) => info.getValue<Date>().toLocaleString(),
      size: 250,
    },
    {
      accessorKey: "action",
      header: () => "",
      size: 50,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return columns
}
