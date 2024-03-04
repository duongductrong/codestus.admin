import dynamic from "next/dynamic"
import { Skeleton } from "../skeleton"
import { DataTableBase, DataTableBaseProps } from "./data-table-base"
import { DataTableFooterProps } from "./data-table-footer"

export const DataTableFooter = dynamic(() => import("./data-table-footer"), {
  ssr: true,
  loading: () => <Skeleton className="h-[50px] w-full" />,
})

export * from "./data-table-base"

export interface DataTableProps<TData, TColumn>
  extends Omit<DataTableBaseProps<TData, TColumn>, "footer"> {
  footer?: Pick<DataTableFooterProps, "info">
}

export const DataTable = <TData, TColumn>({
  footer,
  coloredTableHead = true,
  ...props
}: DataTableProps<TData, TColumn>) => (
  <DataTableBase
    {...props}
    footer={<DataTableFooter {...footer} />}
    coloredTableHead={coloredTableHead}
  />
)
