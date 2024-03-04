"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { DataTableDateRangeFilter } from "@/components/ui/data-table/components/data-table-date-range-filter"
import {
  DataTableFacetedFilter,
  DataTableResetFilter,
  DataTableSearcher,
  DataTableStacked,
  DataTableToolbar,
} from "@/components/ui/data-table/data-table-filters"
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"
import { addDays } from "date-fns/addDays"
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
      filterFn: "isWithinDateRange",
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
            <DataTableDateRangeFilter
              column="createdAt"
              from={addDays(new Date(), -10).toISOString()}
              to={addDays(new Date(), 0).toISOString()}
            />
            <DataTableResetFilter />
          </DataTableStacked>
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
