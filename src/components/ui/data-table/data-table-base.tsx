/**
 * Based on @tanstack/react-table
 * This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
 * See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
 */

import { cn } from "@/utils/tailwind"
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import React, { ComponentProps, ElementRef, forwardRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table"
import { Person } from "./makeData"

export interface DataTableBaseProps<TData = any, TColumn = any> extends ComponentProps<"table"> {
  data: TData[]
  columns: ColumnDef<TColumn>[]
  debugTable?: boolean

  height?: number
}

export const DataTableBase = forwardRef<ElementRef<typeof Table>, DataTableBaseProps>(
  ({ className, data = [], columns = [], debugTable = false, height = 500, ...props }, ref) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable,
    })

    const { rows } = table.getRowModel()

    // The virtualizer needs to know the scrollable container element
    const tableContainerRef = React.useRef<HTMLDivElement>(null)

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
      getScrollElement: () => tableContainerRef.current,
      // measure dynamic row height, except in firefox because it measures table border height incorrectly
      measureElement:
        typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
          ? (element) => element?.getBoundingClientRect().height
          : undefined,
      overscan: 5,
    })

    return (
      <div className="h-auto w-full">
        <div
          ref={tableContainerRef}
          className="relative h-full overflow-auto rounded-md border border-border p-0"
          style={{
            height, // should be a fixed height
          }}
        >
          <Table
            ref={ref as any}
            {...props}
            className={cn("grid table-fixed border-collapse", className)}
          >
            <TableHeader className="sticky top-0 z-[1] grid bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="flex w-full">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="flex"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      <div
                        role="presentation"
                        className={cn(
                          "flex items-center space-x-1",
                          header.column.getCanSort() ? "cursor-pointer select-none" : "",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowUpIcon className="shrink-0" />,
                          desc: <ArrowDownIcon className="shrink-0" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              style={{
                // display: "grid",
                height: `${rowVirtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
                // position: "relative", // needed for absolute positioning of rows
              }}
              className="relative grid"
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<Person>
                return (
                  <TableRow
                    data-index={virtualRow.index} // needed for dynamic row height measurement
                    ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
                    key={row.id}
                    className="absolute flex w-full"
                    style={{
                      transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="flex py-2.5"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
)
