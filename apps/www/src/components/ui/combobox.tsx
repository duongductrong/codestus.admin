"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/libs/utils/tailwind"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export interface ComboboxOption<TValue = string> {
  label: string
  value: TValue
}

export interface ComboboxProps {
  options?: ComboboxOption[]
  value?: string
  emptyLabel?: string
  placeholder?: string
}

export const Combobox = React.forwardRef<React.ElementRef<typeof Button>, ComboboxProps>(
  ({ placeholder, emptyLabel, options, value: defaultValue }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue ?? "")

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? frameworks.find((framework) => framework.value === value)?.label : placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            <CommandEmpty>{emptyLabel ?? "No option found."}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
