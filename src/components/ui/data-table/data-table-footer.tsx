import { cn } from "@/utils/tailwind"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { useDataTableBase } from "./use-data-table-base"
import { Pagination } from "../pagination-z"

export interface DataTableFooterProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * {page}: current page
   * {totalRecords}: total records
   * {totalPages}: total pages
   * {from}: from entry
   * {to}: to entry
   */
  info?: string
}

const DataTableFooter = forwardRef<ElementRef<"div">, DataTableFooterProps>(
  ({ className, info = "Showing {from}-{to} of {totalRecords} entries", ...props }, ref) => {
    const offsetPage = 1

    const { pagination, table } = useDataTableBase()

    const infoContent = info
      .replace(/{from}/, ((pagination.page - 1) * pagination.pageSize + 1).toString() ?? "")
      .replace(/{to}/, (pagination.page * pagination.pageSize).toString() ?? "")
      .replace(/{totalPages}/, pagination.totalPages.toString() ?? "")
      .replace(/{totalRecords}/, pagination.totalRecords.toString() ?? "")
      .replace(/{page}/, pagination.page.toString() ?? "")

    return (
      <div ref={ref} {...props} className={cn("mt-4 flex items-center", className)}>
        <div className="flex items-center">{infoContent}</div>
        <Pagination
          currentPage={Number(pagination?.page)}
          totalPages={Math.floor(Number(pagination?.totalRecords) / Number(pagination?.pageSize))}
          setCurrentPage={(page) => table?.setPageIndex(page - offsetPage)}
          offsetPage={offsetPage}
          className="ml-auto"
        />
      </div>
    )
  },
)

export default DataTableFooter
