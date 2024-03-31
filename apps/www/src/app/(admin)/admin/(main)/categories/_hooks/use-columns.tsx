import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { Tag } from "@/services/tag/types"

export interface UseColumnsVariables {
  onVisitItem?: (tag: Tag) => void
}

export const useColumns = ({ onVisitItem }: UseColumnsVariables = {}) => {
  const columns: ColumnDef<Tag>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 150,
      cell: ({ getValue }) => <p className="line-clamp-1 break-all">{`${getValue<string>()}`}</p>,
    },
    {
      accessorKey: "name",
      cell: (info) => (
        <button
          className="font-semibold underline-offset-2 hover:underline"
          type="button"
          onClick={() => onVisitItem?.(info.row.original)}
        >
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
      header: "Updated At",
      filterFn: "isWithinDateRange",
      cell: (info) => dayjs(info.getValue<string>()).format("DD/MM/YYYY HH:mm:ss A"),
      size: 250,
    },
  ]

  return columns
}
