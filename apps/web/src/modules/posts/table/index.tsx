"use client"

import CustomPageSection from "@/components/customs/custom-page-section"
import { Badge } from "@/components/ui/badge"
import { DataTable, DataTableBasePagination } from "@/components/ui/data-table"
import { DataTableSearcher, DataTableToolbar } from "@/components/ui/data-table/data-table-filters"
import { useDataTablePagination } from "@/components/ui/data-table/use-data-table-pagination"
import { useDataTableSorting } from "@/components/ui/data-table/use-data-table-sorting"
import { Stack } from "@/components/ui/stack"
import { Tooltip } from "@/components/ui/tooltip"
import { usePrompt } from "@/components/ui/use-prompt"
import { PAGE_ROUTES } from "@/constants/routes"
import { formatNumber } from "@/libs/utils/number"
import { useSuspensePosts } from "@/services/post/hooks/use-get-posts"
import { Post } from "@/services/post/types"
import { Link } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

export interface PostsTableProps {}

const PostsTable = (props: PostsTableProps) => {
  const { pageIndex, pageSize, setPageIndex, setPageSize } = useDataTablePagination({
    pageSize: 10,
  })
  const { firstSorting, sorting, setSorting } = useDataTableSorting()

  const confirm = usePrompt()

  const {
    data: { data, meta },
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
          <Link
            className="line-clamp-1"
            href={PAGE_ROUTES.ADMIN.POST_EDIT.replace(":id", info.row.original.id.toString())}
          >
            {info.getValue<string>()}
          </Link>
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
      cell: (info) => formatNumber(info.getValue<number>()),
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
    {
      accessorKey: "id",
      header: "Actions",
      cell: (info) => (
        <Stack direction="row">
          <Trash
            className="h-4 w-4 cursor-pointer"
            onClick={() => handleDeletePost(info.row.original.id)}
          />
        </Stack>
      ),
    },
  ]

  const handlePaginationChange: DataTableBasePagination["onPaginationChange"] = (state) => {
    setPageIndex(state.pageIndex)
    setPageSize(state.pageSize)
  }

  const handleDeletePost = (id: string | number) => {
    confirm({
      title: "Are you sure?",
      description: "This action is irreversible",
    })
  }

  return (
    <CustomPageSection title="Posts" description="All posts published over there">
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
    </CustomPageSection>
  )
}

export default PostsTable
