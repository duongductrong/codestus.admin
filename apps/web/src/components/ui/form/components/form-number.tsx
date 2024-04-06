/* eslint-disable jsx-a11y/control-has-associated-label */

"use client"

import { forwardRef } from "react"
import isNil from "lodash/isNil"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/libs/utils/tailwind"
import { Input, InputProps } from "../../input"

import "./form-number.scss"

export interface FormNumberProps extends InputProps {
  variant: "NUMBER"
  toFixed?: number
  hasError?: boolean
}

const FormNumber = forwardRef<HTMLInputElement, FormNumberProps>(
  ({ toFixed = 0, hasError, ...props }, ref) => {
    const { onChange, step = 1, value = 0, min, max } = props
    const handleUp = () => {
      if (onChange) {
        const newValue = !isNil(max)
          ? // less than equal max or equal max
            Number(value) + Number(step) <= Number(max)
            ? Number(value) + Number(step)
            : Number(max)
          : // continue minus value
            Number(value) + Number(step)
        const fixedValue = Number(newValue.toFixed(toFixed || 0))
        onChange(fixedValue as any)
      }
    }

    const handleDown = () => {
      if (onChange) {
        const newValue = !isNil(min)
          ? // greater than equal min or equal min
            Number(value) - Number(step) >= Number(min)
            ? Number(value) - Number(step)
            : Number(min)
          : // continue minus value
            Number(value) - Number(step)
        const fixedValue = Number(newValue.toFixed(toFixed || 0))
        onChange(fixedValue as any)
      }
    }

    return (
      <div className="group relative">
        <Input
          {...props}
          ref={ref}
          type="number"
          className={cn(props.className, "form-number")}
          // hasError={hasError}
        />
        <div
          className={cn(
            "w-8",
            "flex flex-col items-center justify-center",
            "absolute right-[1px] top-1/2 h-[calc(100%-2px)] -translate-y-1/2 transform",
          )}
        >
          <button
            type="button"
            className={cn(
              "flex w-full flex-1 items-center justify-center",
              "border border-b-0 border-r-0 border-t-0 border-solid border-input",
              "cursor-pointer rounded-tr-[7px]",
              "hover:bg-accent",
              hasError
                ? "border-destructive group-focus-within:border-destructive"
                : "group-focus-within:border-primary",
            )}
            onClick={handleUp}
          >
            <ChevronUp className="h-3 w-3 hover:text-primary" />
          </button>
          <button
            type="button"
            className={cn(
              "flex w-full flex-1 items-center justify-center",
              "border border-b-0 border-r-0 border-solid border-input",
              "cursor-pointer rounded-br-[7px]",
              "hover:bg-accent",
              hasError
                ? "border-destructive group-focus-within:border-destructive"
                : "group-focus-within:border-primary",
            )}
            onClick={handleDown}
          >
            <ChevronDown className="h-3 w-3 hover:text-primary" />
          </button>
        </div>
      </div>
    )
  },
)

FormNumber.displayName = "FormNumber"

export default FormNumber
