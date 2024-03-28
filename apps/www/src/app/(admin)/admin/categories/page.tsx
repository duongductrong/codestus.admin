"use client"

import { useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
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
  DataTableStacked,
  DataTableToolbar,
} from "@/components/ui/data-table/data-table-filters"
import { takeValidationErrors } from "@/libs/fetch/fetcher-utils"
import { useCreateTag } from "@/services/tag/hooks/use-create-tag"
import { useSuspenseTags } from "@/services/tag/hooks/use-get-tags"
import { useUpdateTag } from "@/services/tag/hooks/use-update-tag"
import { useColumns } from "./_hooks/use-columns"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const ql = useQueryClient()
  const openModaler = useGeneralModal(useModalOpenSelector)

  const { data: response } = useSuspenseTags({ variables: { limit: 999 } })

  const records = response.data

  const { mutateAsync: updateTagFn } = useUpdateTag({
    onSuccess(data) {
      toast.success(data.message)

      ql.invalidateQueries({
        queryKey: useSuspenseTags.getKey(),
      })
    },
  })

  const { mutateAsync: createTagFn } = useCreateTag({
    onSuccess(data) {
      toast.success(data.message)

      ql.invalidateQueries({
        queryKey: useSuspenseTags.getKey(),
      })
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

  return (
    <DataTable
      rowId="id"
      data={records}
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
            {/* <DataTableSelectionImpact>
              <Button
                variant="secondary"
                onClick={() =>
                  prompt({
                    title: "Are you absolutely sure?",
                    description:
                      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                  }).then((isConfirmed) => {
                    console.log(isConfirmed)
                  })
                }
              >
                Bulk delete
              </Button>
              <GeneralModalTrigger
                loader="TagForm"
                details={{
                  type: "modal",
                  title: "Create category",
                  size: "md",
                  description: "Create the category for your posts.",
                }}
              >
                <Button variant="secondary">Modal</Button>
              </GeneralModalTrigger>
            </DataTableSelectionImpact> */}
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
