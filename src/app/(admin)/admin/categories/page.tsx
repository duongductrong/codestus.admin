"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import {
  DataTableFacetedFilter,
  DataTableResetFilter,
  DataTableSearcher,
  DataTableStacked,
  DataTableToolbar,
} from "@/components/ui/data-table/data-table-filters"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"
import { useMemo, useState } from "react"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const [filters, setFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 100,
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
      data={useMemo(
        () =>
          Array(500)
            .fill(1)
            .map((_, index) => ({
              age: index,
              createdAt: new Date().toISOString(),
              firstName: `${index}`,
              id: `${index}`,
              lastName: `${index}`,
              progress: `${index}`,
              status: `${index}`,
              visits: index,
            })),
        [],
      )}
      columns={columns}
      pagination={{
        pageIndex: 0,
        pageSize: 12,
      }}
      maxHeight={600}
      // columnFilters={filters}
      // onColumnFilteringChange={setFilters}
      // manualFiltering
      header={
        <DataTableToolbar>
          <DataTableStacked>
            <DataTableSearcher placeholder="Search all columns" isGlobal />
            <DataTableSearcher column="lastName" placeholder="Search a last name" />

            <DataTableFacetedFilter
              column="age"
              label="Visits"
              options={[
                { label: "1000", value: "1000" },
                { label: "100", value: "100" },
              ]}
            />
            <DataTableResetFilter />
          </DataTableStacked>
          <DataTableStacked>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </DataTableStacked>
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
