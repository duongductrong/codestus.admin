import _get from "lodash/get"
import isNil from "lodash/isNil"
import omit from "lodash/omit"
import omitBy from "lodash/omitBy"
import { usePathname, useSearchParams } from "next/navigation"
import { NextRouter, useRouter } from "next/router"
import qs from "querystring"
import { useCallback } from "react"
import { flattenObject, parseToPrimitiveObject } from "../libs/utils/object"
import { useDeepCompareMemoize } from "./use-deep-compare-memoize"

export const useSharedSearchParams = <TSearchParams extends Record<string, any>>() => {
  const router = useRouter()
  const pathname = usePathname()
  const _searchParams = useSearchParams()
  const searchParams = parseToPrimitiveObject(qs.parse(_searchParams.toString())) as TSearchParams

  const append = useCallback(
    <TKey extends keyof TSearchParams>(
      name: TKey,
      value: any,
      options: Parameters<NextRouter["push"]>[2] = {},
    ) => {
      router.push(
        `${pathname}?${qs.stringify(omitBy({ ...searchParams, [name]: value }, isNil))}`,
        undefined,
        options,
      )
    },
    useDeepCompareMemoize([pathname, searchParams]),
  )

  const put = useCallback(
    <TKey extends keyof TSearchParams>(
      queries: Record<TKey, any>,
      options: Parameters<NextRouter["push"]>[2] = {},
    ) => {
      const flattenQueries = flattenObject(omitBy({ ...searchParams, ...queries }, isNil))
      const stringifiedValues = qs.stringify(flattenQueries)

      router.push(`${pathname}?${stringifiedValues}`, undefined, options)
    },
    useDeepCompareMemoize([pathname, searchParams]),
  )

  const remove = useCallback(
    <TKey extends keyof TSearchParams>(
      name: TKey | TKey[],
      options: Parameters<NextRouter["push"]>[2] = {},
    ) => {
      router.push(
        `${pathname}?${qs.stringify(
          omit({ ...searchParams }, Array.isArray(name) ? name : [name]),
        )}`,
        undefined,
        options,
      )
    },
    useDeepCompareMemoize([pathname, searchParams]),
  )

  const get = useCallback(
    <TKey extends keyof TSearchParams, TResult = TSearchParams[TKey]>(name: TKey): TResult =>
      _get(searchParams, name),
    useDeepCompareMemoize([pathname, searchParams]),
  )

  return {
    search: searchParams,
    get,
    remove,
    append,
    put,
  }
}
