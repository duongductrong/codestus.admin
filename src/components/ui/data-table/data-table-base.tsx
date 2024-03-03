"use client"

/**
 * Based on @tanstack/react-table
 * This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
 * See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
 */

import { Nullable } from "@/types/utilities"
import { cn } from "@/utils/tailwind"
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import React, {
  ComponentProps,
  ElementRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table"
import { DataTableBaseProvider } from "./data-table-base-provider"
import { Checkbox } from "../checkbox"

export interface DataTableBaseExposeRef {
  table: Nullable<ElementRef<typeof Table>>
  tableContainer: Nullable<ElementRef<"div">>
}

export interface DataTableBasePaginationState {
  page: number
  pageSize: number
  /**
   * If you need pagination on server, let's set value for `totalRecords` property,
   * that will trigger `manualPagination=false` & remove `getPaginationRowModel`,
   */
  totalRecords?: number
}

export interface DataTableBasePagination {
  pagination?: DataTableBasePaginationState
  onPaginationChange?: (paginate: DataTableBasePaginationState) => void
}

export interface DataTableBaseSelection<TColumn> {
  rowId?: keyof TColumn
  rowSelectionDefaultValues?: RowSelectionState
  rowSelectionEnable?: (row: Row<TColumn>) => boolean
  onRowSelectionChange?: (selection: RowSelectionState) => void
}

export interface DataTableBaseProps<TData = any, TColumn = any>
  extends ComponentProps<"table">,
    DataTableBaseSelection<TColumn>,
    DataTableBasePagination {
  data: Record<keyof TColumn, unknown>[]

  columns: ColumnDef<TColumn>[]

  debugTable?: boolean

  height?: number

  header?: ReactNode

  footer?: ReactNode

  coloredTableHead?: boolean

  emptyText?: ReactNode | string

  forwardRef?: Ref<DataTableBaseExposeRef>
}

export const DataTableBase = <TData, TColumn>({
  forwardRef,
  className,
  header,
  footer,
  data = [],
  columns = [],
  debugTable = false,
  height = -1,
  pagination: paginate = { page: 1, pageSize: 10 },
  onPaginationChange,
  rowId,
  rowSelectionDefaultValues = {},
  rowSelectionEnable,
  onRowSelectionChange,
  coloredTableHead,
  emptyText = "There are no data.",
  ...props
}: DataTableBaseProps<TData, TColumn>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: paginate.page - 1,
    pageSize: paginate.pageSize,
  })

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    rowSelectionDefaultValues ?? {},
  )

  const isManualPagination = !!paginate.totalRecords
  const tableContainerHeight = !data.length ? 200 : height || pagination.pageSize * 50

  const preColumns = [
    {
      accessorKey: "__selection",
      id: "__selection",
      size: 50,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        />
      ),
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
        />
      ),
    } as ColumnDef<any>,
    ...columns,
  ]

  const table = useReactTable({
    columns: preColumns,
    data: data as any[],
    state: {
      pagination,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: paginate.totalRecords ? undefined : getPaginationRowModel(),
    onPaginationChange: setPagination,

    enableRowSelection: rowSelectionEnable || !!rowId,
    onRowSelectionChange: (updaterOrValue) => setRowSelection(updaterOrValue),
    getRowId: (row, index) => (rowId ? row?.[rowId as keyof typeof row] : index) as string,

    manualPagination: isManualPagination,
    debugTable,
  })

  useEffect(() => onRowSelectionChange?.(rowSelection), [rowSelection])
  useEffect(
    () =>
      onPaginationChange?.({
        page: pagination.pageIndex + 1,
        pageSize: paginate.pageSize,
        totalRecords,
      }),
    [pagination],
  )

  const totalRecords = isManualPagination ? Number(paginate.totalRecords) : data.length
  const totalPages = isManualPagination
    ? Math.floor(totalRecords / pagination.pageSize)
    : table.getPageCount()

  const { rows } = table.getRowModel()

  // The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const tableRef = React.useRef<ElementRef<typeof Table>>(null)
  const tableHeaderRef = React.useRef<ElementRef<typeof TableHeader>>(null)

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

  useImperativeHandle(
    forwardRef,
    () => ({
      table: tableRef.current,
      tableContainer: tableRef.current,
    }),
    [tableRef.current, tableContainerRef.current],
  )

  return (
    <DataTableBaseProvider
      table={table}
      pagination={{
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        totalPages,
        totalRecords,
      }}
      setPagination={setPagination}
    >
      <div className="relative h-auto w-full">
        {header}
        <div
          ref={tableContainerRef}
          className="relative h-full overflow-auto rounded-md border border-border p-0"
          style={{
            height: tableContainerHeight, // should be a fixed height
          }}
        >
          <Table
            {...props}
            ref={tableRef}
            className={cn("grid table-fixed border-collapse", className)}
          >
            <TableHeader
              ref={tableHeaderRef}
              className="sticky top-0 z-[1] grid bg-background"
              colored={coloredTableHead}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="flex w-full">
                  {headerGroup.headers.map((headerItem) => (
                    <TableHead
                      key={headerItem.id}
                      className="flex"
                      style={{
                        width: headerItem.getSize(),
                      }}
                    >
                      <div
                        role="presentation"
                        className={cn(
                          "flex items-center space-x-1",
                          headerItem.column.getCanSort() ? "cursor-pointer select-none" : "",
                        )}
                        onClick={
                          headerItem.column.id !== "__selection"
                            ? headerItem.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(headerItem.column.columnDef.header, headerItem.getContext())}
                        {{
                          asc: <ArrowUpIcon className="shrink-0" />,
                          desc: <ArrowDownIcon className="shrink-0" />,
                        }[headerItem.column.getIsSorted() as string] ?? null}
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
                const row = rows[virtualRow.index] as Row<unknown>
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
              {!data.length ? (
                <tr aria-colspan={999}>
                  <td
                    className="flex items-center justify-center"
                    colSpan={columns.length + 999}
                    style={{ height: tableContainerHeight - 50 }}
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : null}
            </TableBody>
          </Table>
        </div>
        {footer}
      </div>
    </DataTableBaseProvider>
  )
}
