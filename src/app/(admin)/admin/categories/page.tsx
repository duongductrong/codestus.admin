"use client"

import { DataTable } from "@/components/ui/data-table"
import { DataTableDateRangeFilter } from "@/components/ui/data-table/components/data-table-date-range-filter"
import {
  DataTableResetFilter,
  DataTableSearcher,
  DataTableStacked,
  DataTableToolbar,
} from "@/components/ui/data-table/data-table-filters"
import { useColumns } from "./_hooks/use-columns"
import { useFakeData } from "./_hooks/use-fake-data"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const columns = useColumns()
  const data = useFakeData()

  return (
    <DataTable
      rowId="id"
      data={data}
      columns={columns}
      pagination={{
        pageIndex: 0,
        pageSize: 12,
      }}
      maxHeight={600}
      header={
        <DataTableToolbar>
          <DataTableStacked fullWidth>
            <DataTableSearcher placeholder="Search all columns" isGlobal />
            <DataTableDateRangeFilter
              column="createdAt"
              className="ml-auto"
              inputClassName="ml-auto"
            />
            <DataTableResetFilter />
          </DataTableStacked>
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
