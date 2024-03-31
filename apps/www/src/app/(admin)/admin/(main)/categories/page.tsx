"use client"

import { useQueryClient } from "@tanstack/react-query"
import { PlusIcon, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  TagFormErrorValues,
  TagFormSuccessValues,
  TagFormValues,
} from "@/components/customs/custom-modals/general-modal/components/tag-form"
import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DataTableDateRangeFilter } from "@/components/ui/data-table/components/data-table-date-range-filter"
import {
  DataTableResetFilter,
  DataTableSearcher,
  DataTableSelectionImpact,
  DataTableStacked,
  DataTableToolbar,
} from "@/components/ui/data-table/data-table-filters"
import { useDataTableRowsSelection } from "@/components/ui/data-table/use-data-table-selection"
import { usePrompt } from "@/components/ui/use-prompt"
import { takeErrorMessage, takeValidationErrors } from "@/libs/fetch/fetcher-utils"
import { useBulkDeleteTags } from "@/services/tag/hooks/use-bulk-delete-tags"
import { useCreateTag } from "@/services/tag/hooks/use-create-tag"
import { useSuspenseTags, useTags } from "@/services/tag/hooks/use-get-tags"
import { useUpdateTag } from "@/services/tag/hooks/use-update-tag"
import { useColumns } from "./_hooks/use-columns"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const ql = useQueryClient()
  const openModaler = useGeneralModal(useModalOpenSelector)
  const prompt = usePrompt()
  const { rowsSelection, setRowsSelection } = useDataTableRowsSelection()

  const { data: response } = useSuspenseTags({ variables: { limit: 999 } })

  const records = response.data

  const { mutateAsync: bulkDeleteTags } = useBulkDeleteTags()

  const { mutateAsync: updateTagFn } = useUpdateTag({
    onSuccess(data) {
      toast.success(data.message)

      ql.invalidateQueries({
        queryKey: useSuspenseTags.getKey(),
      })
    },
    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const { mutateAsync: createTagFn } = useCreateTag({
    onSuccess(data) {
      toast.success(data.message)

      ql.invalidateQueries({
        queryKey: useSuspenseTags.getKey(),
      })
    },
    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const columns = useColumns({
    onVisitItem(tag) {
      openModaler<TagFormValues, TagFormSuccessValues, TagFormErrorValues>("TagForm", {
        type: "drawer",
        title: "Tag details",
        defaultValues: {
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
        },
        onSubmit(data, make) {
          const promise = updateTagFn({
            id: tag.id,
            name: data.name,
            slug: data.slug,
            description: data.description,
          })
          return make(promise, takeValidationErrors)
        },
      })
    },
  })

  const handleCreateNewTag = () => {
    openModaler<any, TagFormSuccessValues, TagFormErrorValues>("TagForm", {
      type: "drawer",
      title: "Create new tag",
      onSubmit(data, make) {
        const promise = createTagFn(data)
        return make(promise, takeValidationErrors)
      },
    })
  }

  const handleBulkDeleteTags = () => {
    prompt({ title: "Are you sure?", description: "This deletion action cannot be undone." }).then(
      (confirmed) => {
        if (!confirmed) return

        toast.promise(bulkDeleteTags({ ids: Object.keys(rowsSelection ?? {}) }), {
          loading: "Bulk deleting....",
          success(data) {
            return `${data.message}`
          },
          error(e) {
            const msg = takeErrorMessage(e)
            return msg
          },
          finally() {
            ql.invalidateQueries({
              queryKey: useTags.getKey(),
            })
          },
        })
      },
    )
  }

  return (
    <DataTable
      rowId="id"
      data={records}
      columns={columns}
      pagination={{
        pageIndex: 0,
        pageSize: 12,
      }}
      rowSelection={rowsSelection}
      onRowSelectionChange={setRowsSelection}
      maxHeight={600}
      header={
        <DataTableToolbar>
          <DataTableStacked fullWidth>
            <DataTableSearcher placeholder="Search all columns" isGlobal />
            <DataTableSelectionImpact>
              <Button variant="default" size="sm" onClick={handleBulkDeleteTags}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </DataTableSelectionImpact>
            <DataTableDateRangeFilter
              column="createdAt"
              className="ml-auto"
              inputClassName="ml-auto"
            />
            <DataTableResetFilter />
            <Button onClick={handleCreateNewTag}>
              <PlusIcon className="mr-2 h-4.5 w-4.5" />
              New tag
            </Button>
          </DataTableStacked>
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
