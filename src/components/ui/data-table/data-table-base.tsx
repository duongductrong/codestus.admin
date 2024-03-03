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
  SortingState,
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
  useMemo,
  useState,
} from "react"
import { Checkbox } from "../checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table"
import { DataTableBaseProvider } from "./data-table-base-provider"

export interface DataTableBaseExposeRef {
  table: Nullable<ElementRef<typeof Table>>
  tableContainer: Nullable<ElementRef<"div">>
}

export interface DataTableBasePaginationState extends PaginationState {
  // pageIndex: number
  // pageSize: number
  /**
   * If you need manual pagination, let's set value for `totalRecords` property,
   * that will trigger `manualPagination=false` & remove `getPaginationRowModel`,
   */
  totalRecords?: number
}

export interface DataTableBasePagination {
  pagination?: DataTableBasePaginationState
  onPaginationChange?: (state: DataTableBasePaginationState) => void
}

export interface DataTableBaseSelection<TColumn> {
  rowId?: keyof TColumn
  rowSelection?: RowSelectionState
  rowSelectionEnable?: (row: Row<TColumn>) => boolean
  onRowSelectionChange?: (state: RowSelectionState) => void
}

export interface DataTableBaseSorting {
  sorting?: SortingState
  onSortingChange?: (state: SortingState) => void
  manualSorting?: boolean
}

export interface DataTableBaseProps<TData = any, TColumn = any>
  extends ComponentProps<"table">,
    DataTableBaseSelection<TColumn>,
    DataTableBasePagination,
    DataTableBaseSorting {
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
  pagination: manualPagination = { pageIndex: 0, pageSize: 10 },
  onPaginationChange,
  rowId,
  rowSelection = {},
  rowSelectionEnable,
  onRowSelectionChange,
  sorting: manualSorting_ = [],
  manualSorting = false,
  onSortingChange,
  coloredTableHead,
  emptyText = "There are no data.",
  ...props
}: DataTableBaseProps<TData, TColumn>) => {
  const [selfPagination, setSelfPagination] = useState<PaginationState>({
    pageIndex: manualPagination.pageIndex,
    pageSize: manualPagination.pageSize,
  })

  const [selfRowSelection, setSelfRowSelection] = useState<RowSelectionState>(rowSelection ?? {})

  const [selfSorting, setSelfSorting] = useState<SortingState>(manualSorting_ || [])

  const isManualPagination = !!manualPagination.totalRecords
  const isManualSorting = manualSorting

  const preColumns = [
    {
      accessorKey: "__selection__",
      id: "__selection__",
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
      pagination: isManualPagination ? manualPagination : selfPagination,
      sorting: isManualSorting ? manualSorting_ : selfSorting,
      rowSelection: selfRowSelection,
    },
    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: isManualSorting ? undefined : getSortedRowModel(),
    onSortingChange: isManualSorting
      ? (sFn: any) => onSortingChange?.(sFn(manualSorting_))
      : setSelfSorting,
    manualSorting: isManualSorting,

    getPaginationRowModel: isManualPagination ? undefined : getPaginationRowModel(),
    onPaginationChange: isManualPagination
      ? (pFn: any) => onPaginationChange?.(pFn?.(manualPagination))
      : setSelfPagination,
    manualPagination: isManualPagination,

    enableRowSelection: rowSelectionEnable || !!rowId,
    onRowSelectionChange: (updaterOrValue) => setSelfRowSelection(updaterOrValue),
    getRowId: (row, index) => (rowId ? row?.[rowId as keyof typeof row] : index) as string,

    debugTable,
  })

  useEffect(() => onRowSelectionChange?.(selfRowSelection), [selfRowSelection])
  useEffect(
    () =>
      onPaginationChange?.({
        pageIndex: selfPagination.pageIndex,
        pageSize: manualPagination.pageSize,
      }),
    [selfPagination],
  )
  useEffect(() => onSortingChange?.(selfSorting), [selfSorting])

  const totalRecords = isManualPagination ? Number(manualPagination.totalRecords) : data.length
  const totalPages = isManualPagination
    ? Math.floor(totalRecords / selfPagination.pageSize)
    : table.getPageCount()

  const pagination = {
    pageIndex: isManualPagination ? manualPagination.pageIndex : selfPagination.pageIndex,
    pageSize: isManualPagination ? manualPagination.pageSize : selfPagination.pageSize,
    totalPages,
    totalRecords,
  }

  const setPagination = isManualPagination ? onPaginationChange : setSelfPagination

  const tableContainerHeight = !data.length ? 200 : height || selfPagination.pageSize * 50

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

  if (!setPagination) throw new Error("The table is missing `setPagination` function.")

  return (
    <DataTableBaseProvider table={table} pagination={pagination} setPagination={setPagination}>
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
                          headerItem.column.id !== "__selection__"
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
                    data-state={row.getIsSelected() ? "selected" : undefined}
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
