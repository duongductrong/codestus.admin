import { useContext } from "react"
import { DataTableBaseContext } from "./data-table-base-provider"

export const useDataTableBase = () => useContext(DataTableBaseContext)
