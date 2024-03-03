/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

"use client"

import { cn } from "@/utils/tailwind"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import {
  IPaginationProps,
  NextButton,
  PageButton,
  Pagination as PaginationRoot,
  PrevButton,
} from "react-headless-pagination"
import { buttonVariants } from "./button"

export interface PaginationProps
  extends Omit<IPaginationProps, "edgePageCount" | "middlePagesSiblingCount" | "setCurrentPage">,
    Partial<Pick<IPaginationProps, "setCurrentPage">> {}

export const Pagination = ({
  currentPage,
  className,
  setCurrentPage,
  totalPages,
  ...props
}: PaginationProps) => {
  const handleCurrentPageCHange: IPaginationProps["setCurrentPage"] = (pageIndex) => {
    if (setCurrentPage) setCurrentPage(pageIndex)
  }

  return (
    <PaginationRoot
      {...props}
      currentPage={currentPage}
      totalPages={totalPages}
      edgePageCount={1}
      middlePagesSiblingCount={1}
      className={cn("flex items-center justify-start gap-2", className)}
      truncableClassName={buttonVariants({
        variant: "ghost",
        size: "icon",
      })}
      setCurrentPage={handleCurrentPageCHange}
    >
      <PrevButton
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
      >
        <ChevronLeftIcon className="text-neutral-grey-300 h-4 w-4" />
      </PrevButton>
      <div className="flex items-center justify-center gap-2 [&>li]:list-none">
        <PageButton
          activeClassName={buttonVariants({
            variant: "default",
            size: "icon",
            className: "hover:text-primary-foreground",
          })}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        />
      </div>
      <NextButton
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
      >
        <ChevronRightIcon className="text-neutral-grey-300 h-4 w-4" />
      </NextButton>
    </PaginationRoot>
  )
}
