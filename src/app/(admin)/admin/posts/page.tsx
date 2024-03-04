"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { DataTableSearcher, DataTableToolbar } from "@/components/ui/data-table/data-table-filters"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColumnDef } from "@tanstack/react-table"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 250,
      cell: ({ getValue }) => <b className="break-all">{`#${getValue<string>()}`}</b>,
    },
    {
      accessorKey: "firstName",
      cell: (info) => info.getValue(),
      header: "First name",
    },
    {
      accessorFn: (row) => row.lastName,
      id: "lastName",
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    },
    {
      accessorKey: "age",
      header: () => "Age",
      size: 50,
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => info.getValue<Date>().toLocaleString(),
      size: 250,
    },
  ]

  return (
    <DataTable
      rowId="id"
      data={Array(100)
        .fill(1)
        .map((_, index) => ({
          age: index,
          createdAt: new Date().toISOString(),
          firstName: `${index}`,
          id: `${Math.random()}`,
          lastName: `${index}`,
          progress: `${index}`,
          status: `${index}`,
          visits: index,
        }))}
      columns={columns}
      pagination={{
        pageIndex: 0,
        pageSize: 12,
      }}
      header={
        <DataTableToolbar>
          <DataTableSearcher column="firstName" placeholder="search first name" />
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
