"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  DataTableBasePagination
} from "@/components/ui/data-table"
import { DataTableSearcher, DataTableToolbar } from "@/components/ui/data-table/data-table-filters"
import { useDataTablePagination } from "@/components/ui/data-table/use-data-table-pagination"
import { useDataTableSorting } from "@/components/ui/data-table/use-data-table-sorting"
import { Tooltip } from "@/components/ui/tooltip"
import { formatNumber } from "@/libs/utils/number"
import { useSuspensePosts } from "@/services/post/hooks/use-get-posts"
import { Post } from "@/services/post/types"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const { pageIndex, pageSize, setPageIndex, setPageSize } = useDataTablePagination({
    pageSize: 10,
  })
  const { firstSorting, sorting, setSorting } = useDataTableSorting()

  const {
    data: { result: data, meta },
  } = useSuspensePosts({
    variables: {
      page: pageIndex,
      limit: pageSize,
      orderBy: firstSorting
        ? { field: firstSorting?.id, value: firstSorting?.desc ? "desc" : "asc" }
        : undefined,
    },
  })

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 100,
      cell: ({ getValue }) => <b className="break-all">{`#${getValue<string>()}`}</b>,
    },
    {
      accessorKey: "title",
      cell: (info) => (
        <Tooltip triggerProps={{ asChild: true }} content={info.getValue<string>()}>
          <p className="line-clamp-1">{info.getValue<string>()}</p>
        </Tooltip>
      ),
      size: 300,
      header: "Title",
    },
    {
      accessorKey: "description",
      cell: (info) => <p className="line-clamp-1">{info.getValue<string>()}</p>,
      size: 300,
      header: "Description",
    },
    {
      accessorKey: "views",
      header: () => "Visits",
      size: 100,
      cell: (info) => formatNumber(info.getValue<number>())
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => info.getValue<Date>().toLocaleString(),
      size: 250,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (info) => info.getValue<Date>().toLocaleString(),
      size: 250,
    },
  ]

  const handlePaginationChange: DataTableBasePagination["onPaginationChange"] = (state) => {
    setPageIndex(state.pageIndex)
    setPageSize(state.pageSize)
  }

  return (
    <DataTable
      rowId="id"
      header={
        <DataTableToolbar>
          <DataTableSearcher placeholder="Search..." isGlobal />
        </DataTableToolbar>
      }
      data={data}
      columns={columns}
      pagination={{
        pageIndex,
        pageSize,
        totalRecords: Number(meta?.total),
      }}
      onPaginationChange={handlePaginationChange}
      onSortingChange={setSorting}
      sorting={sorting}
      manualSorting
      manualFiltering
    />
  )
}

export default PostsList
