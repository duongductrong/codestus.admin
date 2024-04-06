import { DevTool } from "@hookform/devtools"
import { FieldValues, UseFormReturn } from "react-hook-form"

export interface FormDevtoolsProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>
}

const FormDevtools = ({ methods }: FormDevtoolsProps) =>
  process.env.NODE_ENV === "development" && methods ? (
    <DevTool control={methods?.control} placement="bottom-left" />
  ) : null

export default FormDevtools
