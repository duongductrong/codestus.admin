import { cn } from "@/utils/tailwind"
import { ComponentProps, ComponentPropsWithoutRef, ElementRef, forwardRef, useMemo } from "react"
import { Input } from "../../input"
import { useDataTableBase } from "../use-data-table-base"

export interface DataTableSearcherProps extends ComponentPropsWithoutRef<typeof Input> {
  column?: string

  isGlobal?: boolean
}

export const DataTableSearcher = forwardRef<ElementRef<typeof Input>, DataTableSearcherProps>(
  ({ children, className, column, isGlobal, ...props }, ref) => {
    if (!column && (isGlobal === null || isGlobal === undefined)) {
      throw new Error("The component should include either the `column` or the `isGlobal` property")
    }

    const { table } = useDataTableBase()

    const getGlobalFilterValue = () => table.getState().globalFilter as string
    const getColumnFilterValue = () => {
      if (!column) throw new Error("The component should include the `column` property")

      return table.getColumn(column)?.getFilterValue() as string
    }

    const handleInputChange: ComponentProps<typeof Input>["onChange"] = (e) => {
      const val = e.target.value

      if (isGlobal) {
        table.setGlobalFilter(val)
        return
      }

      if (!column) throw new Error("The component should include the `column` property")

      table.getColumn(column)?.setFilterValue(val)
    }

    const value = isGlobal ? getGlobalFilterValue() : getColumnFilterValue()

    return (
      <Input
        {...props}
        ref={ref}
        className={cn("w-full md:w-[300px]", className)}
        value={value ?? ""}
        onChange={handleInputChange}
      />
    )
  },
)
