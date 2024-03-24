import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"
import { Category } from "./use-fake-data"

export const useColumns = () => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 150,
      cell: ({ getValue }) => <b className="line-clamp-1 break-all">{`${getValue<string>()}`}</b>,
    },
    {
      accessorKey: "name",
      cell: (info) => (
        <button className="underline-offset-2 hover:underline" type="button">
          {info.getValue<string>()}
        </button>
      ),
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
      accessorKey: "createdAt",
      header: "Created At",
      filterFn: "isWithinDateRange",
      cell: (info) => dayjs(info.getValue<string>()).format("DD/MM/YYYY HH:mm:ss A"),
      size: 250,
    },
    {
      accessorKey: "updatedAt",
      header: "Created At",
      filterFn: "isWithinDateRange",
      cell: (info) => dayjs(info.getValue<string>()).format("DD/MM/YYYY HH:mm:ss A"),
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
