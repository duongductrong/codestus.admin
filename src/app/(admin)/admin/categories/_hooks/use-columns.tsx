import { ColumnDef } from "@tanstack/react-table"
import { Category } from "./use-fake-data"

export const useColumns = () => {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 150,
      cell: ({ getValue }) => <b className="break-all line-clamp-1">{`#${getValue<string>()}`}</b>,
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Name",
      size: 100,
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
      size: 300,
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
  ]

  return columns
}
