"use client"

/**
 * Based on @tanstack/react-table
 * This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
 * See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
 */

import { useDeepCompareMemoize } from "@/hooks/use-deep-compare-memoize"
import { Nullable } from "@/types/utilities"
import { cn } from "@/utils/tailwind"
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  FiltersTableState,
  PaginationState,
  Table as ReactTable,
  Row,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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
import { isWithinDateRange } from "./filter-fns"

declare module "@tanstack/table-core" {
  interface FilterFns {
    isWithinDateRange: FilterFn<unknown>
  }
  interface FilterMeta {}
}

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

export interface DataTableBaseFiltering {
  manualFiltering?: boolean
  columnFilters?: ColumnFiltersState
  onColumnFilteringChange?: (state: ColumnFiltersState) => void
  globalFilter?: FiltersTableState["globalFilter"]
  onGlobalFilteringChange?: (state: FiltersTableState["globalFilter"]) => void
}

export interface DataTableBaseProps<TData = any, TColumn = any>
  extends ComponentProps<"table">,
    DataTableBaseSelection<TColumn>,
    DataTableBasePagination,
    DataTableBaseSorting,
    DataTableBaseFiltering {
  data: any[]

  columns: ColumnDef<TColumn>[]

  columnSize?: number

  debugTable?: boolean

  maxHeight?: number

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
  columnSize = 46.5,
  debugTable = true,
  maxHeight = 650,
  pagination: manualPagination = { pageIndex: 0, pageSize: 10 },
  onPaginationChange,
  rowId,
  rowSelection = {},
  rowSelectionEnable,
  onRowSelectionChange,
  sorting: manualSorting_ = [],
  manualSorting = false,
  onSortingChange,
  manualFiltering,
  columnFilters = [],
  onColumnFilteringChange,
  globalFilter,
  onGlobalFilteringChange,
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

  const [selfColumnFilters, setSelfColumnFilters] = useState<ColumnFiltersState>(columnFilters)

  const [selfGlobalFilter, setSelfGlobalFilter] = useState<string>(globalFilter)

  const isManualPagination = !!manualPagination.totalRecords
  const isManualSorting = manualSorting
  const isManualFiltering = manualFiltering

  const rootColumns = [
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

  const rootState = {
    pagination: isManualPagination ? manualPagination : selfPagination,
    sorting: isManualSorting ? manualSorting_ : selfSorting,
    rowSelection: selfRowSelection,
    columnFilters: selfColumnFilters,
    globalFilter: selfGlobalFilter,
  } as ReactTable<any>["initialState"]

  const table = useReactTable({
    state: rootState,
    columns: rootColumns,
    data,
    filterFns: {
      isWithinDateRange,
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
    onRowSelectionChange: setSelfRowSelection,
    getRowId: (row, index) => (rowId ? row?.[rowId as keyof typeof row] : index) as string,

    getFacetedRowModel: isManualFiltering ? undefined : getFacetedRowModel(),
    getFacetedUniqueValues: isManualFiltering ? undefined : getFacetedUniqueValues(),
    getFacetedMinMaxValues: isManualFiltering ? undefined : getFacetedMinMaxValues(),
    getFilteredRowModel: isManualFiltering ? undefined : getFilteredRowModel(),
    onColumnFiltersChange: setSelfColumnFilters,
    onGlobalFilterChange: setSelfGlobalFilter,
    manualFiltering: isManualFiltering,

    debugTable,
  })

  // Row selection
  useEffect(
    () => {
      if (selfRowSelection) setSelfRowSelection(selfRowSelection)
    },
    useDeepCompareMemoize([rowSelection]),
  )
  useEffect(() => onRowSelectionChange?.(selfRowSelection), [selfRowSelection])
  // Row selection

  // Pagination
  useEffect(() => {
    if (!isManualPagination)
      onPaginationChange?.({
        pageIndex: selfPagination.pageIndex,
        pageSize: manualPagination.pageSize,
      })
  }, [selfPagination, isManualPagination])
  // Pagination

  // Sorting
  useEffect(() => {
    if (!isManualSorting) onSortingChange?.(selfSorting)
  }, [selfSorting, isManualSorting])
  // Sorting

  // column filters
  useEffect(
    () => {
      if (isManualFiltering && columnFilters) setSelfColumnFilters(columnFilters)
    },
    useDeepCompareMemoize([columnFilters, isManualFiltering]),
  )
  useEffect(() => onColumnFilteringChange?.(selfColumnFilters), [selfColumnFilters])
  // column filters

  // global filters
  useEffect(
    () => {
      if (isManualFiltering && globalFilter) setSelfGlobalFilter?.(globalFilter)
    },
    useDeepCompareMemoize([globalFilter, isManualFiltering]),
  )
  useEffect(() => onGlobalFilteringChange?.(selfGlobalFilter), [selfGlobalFilter])
  // global filters

  const totalRecords = isManualPagination ? Number(manualPagination.totalRecords) : data.length
  const totalPages = isManualPagination
    ? Math.floor(totalRecords / selfPagination.pageSize)
    : table?.getPageCount?.() ?? 0

  const pagination = {
    pageIndex: isManualPagination ? manualPagination.pageIndex : selfPagination.pageIndex,
    pageSize: isManualPagination ? manualPagination.pageSize : selfPagination.pageSize,
    totalPages,
    totalRecords,
  }

  const setPagination = isManualPagination ? onPaginationChange : setSelfPagination

  const { rows } = table.getRowModel()

  // The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const tableRef = React.useRef<ElementRef<typeof Table>>(null)
  const tableHeaderRef = React.useRef<ElementRef<typeof TableHeader>>(null)
  const tableBodyRef = React.useRef<ElementRef<typeof TableBody>>(null)

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

  const hasNoData = isManualPagination ? !data.length : !rowVirtualizer.getVirtualItems().length
  const tableContainerHeight = useMemo(() => {
    const estimateColumnsHeight = rootState.pagination.pageSize * columnSize
    return hasNoData ? 200 : estimateColumnsHeight < maxHeight ? -1 : maxHeight
  }, [hasNoData, maxHeight, rootState.pagination.pageSize, tableBodyRef.current])

  return (
    <DataTableBaseProvider table={table} pagination={pagination} setPagination={setPagination}>
      <div className="relative h-auto w-full max-w-full">
        {header}
        <div
          key={tableContainerHeight}
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
              ref={tableBodyRef}
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
              {hasNoData ? (
                <tr aria-colspan={999}>
                  <td
                    className="flex items-center justify-center"
                    colSpan={columns.length + 999}
                    style={{ height: 200 - 50 }}
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
