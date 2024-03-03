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
    const { pagination, table } = useDataTableBase()

    const infoContent = info
      .replace(/{from}/, (pagination.pageIndex * pagination.pageSize + 1).toString() ?? "")
      .replace(/{to}/, ((pagination.pageIndex + 1) * pagination.pageSize).toString() ?? "")
      .replace(/{totalPages}/, pagination.totalPages.toString() ?? "")
      .replace(/{totalRecords}/, pagination.totalRecords.toString() ?? "")
      .replace(/{page}/, (pagination.pageIndex + 1).toString() ?? "")

    return (
      <div ref={ref} {...props} className={cn("mt-4 flex items-center", className)}>
        <div className="flex items-center">{infoContent}</div>
        <Pagination
          currentPage={Number(pagination?.pageIndex)}
          totalPages={Math.ceil(Number(pagination?.totalRecords) / Number(pagination?.pageSize))}
          setCurrentPage={(page) => table?.setPageIndex(page)}
          className="ml-auto"
        />
      </div>
    )
  },
)

export default DataTableFooter
