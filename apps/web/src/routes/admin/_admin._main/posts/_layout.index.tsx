"use client"

import { Link, createFileRoute, useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { debounce } from "lodash"
import { CheckCircle2, Squircle, Trash } from "lucide-react"
import { ReactNode } from "react"
import { toast } from "sonner"
import { z } from "zod"
import CustomPageSection from "@/components/customs/custom-page-section"
import { DataTable, DataTableBasePagination } from "@/components/ui/data-table"
import { DataTableSearcher, DataTableToolbar } from "@/components/ui/data-table/data-table-filters"
import { useDataTablePagination } from "@/components/ui/data-table/use-data-table-pagination"
import { useDataTableSorting } from "@/components/ui/data-table/use-data-table-sorting"
import { Stack } from "@/components/ui/stack"
import { Tooltip } from "@/components/ui/tooltip"
import { usePrompt } from "@/components/ui/use-prompt"
import { PAGE_ROUTES } from "@/constants/routes"
import { getQueryClient } from "@/libs/query"
import { formatNumber } from "@/libs/utils/number"
import { useDeletePost } from "@/services/post/hooks/use-delete-post"
import { usePosts } from "@/services/post/hooks/use-get-posts"
import { Post } from "@/services/post/types"

export const Route = createFileRoute("/admin/_admin/_main/posts/_layout/")({
  validateSearch: z.object({
    q: z.string().nullish(),
  }),
  component: PostsTable,
})

function PostsTable() {
  const searchParams = Route.useSearch()
  const navigate = useNavigate()

  const { pageIndex, pageSize, setPageIndex, setPageSize } = useDataTablePagination({
    pageSize: 10,
  })
  const { firstSorting, sorting, setSorting } = useDataTableSorting()

  const confirm = usePrompt()

  const postResult = usePosts({
    variables: {
      search: searchParams.q,
      page: pageIndex,
      limit: pageSize,
      orderBy: firstSorting
        ? { field: firstSorting?.id, value: firstSorting?.desc ? "desc" : "asc" }
        : undefined,
    },
  })

  const data = postResult.data?.data ?? []
  const meta = postResult.data?.meta

  const { mutateAsync: deletePost } = useDeletePost({
    onSuccess(result) {
      getQueryClient.invalidateQueries({ queryKey: usePosts.getKey() })

      toast.success(result.message)
    },
    onError(error) {
      toast.error(error.response?.data.message, { position: "bottom-center" })
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
            to={PAGE_ROUTES.ADMIN.POST_EDIT.replace(":id", info.row.original.id.toString())}
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
      cell: ({ getValue }) => {
        const labels = {
          0: (
            <Stack direction="row" gap="sm">
              <Squircle className="h-4 w-4" />
              Draft
            </Stack>
          ),
          1: (
            <Stack direction="row" gap="xs">
              <CheckCircle2 className="h-4 w-4" /> Published
            </Stack>
          ),
        } as Record<string, ReactNode>
        return labels[getValue<string>()]
      },
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
      title: "Confirm Delete",
      description: "Are you sure you want to delete this post? This action is irreversible.",
    }).then((isConfirmed) => {
      if (isConfirmed) {
        deletePost({ id: Number(id) })
      }
    })
  }

  const handleGlobalFilteringChange = debounce((value: string) => {
    navigate({ search: { ...searchParams, q: value }, startTransition: true })
  }, 200)

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
        onGlobalFilteringChange={handleGlobalFilteringChange}
        onSortingChange={setSorting}
        sorting={sorting}
        manualSorting
        manualFiltering
      />
    </CustomPageSection>
  )
}
