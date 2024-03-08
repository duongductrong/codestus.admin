import { Dictionary } from "lodash"
import isEmpty from "lodash/isEmpty"
import isNil from "lodash/isNil"
import keyBy from "lodash/keyBy"
import omitBy from "lodash/omitBy"

type FlattenObject<T> = T extends object
  ? { [K in keyof T]: T[K] extends object ? FlattenObject<T[K]> : T[K] }
  : T

export const positiveOmit = <T>(object: Dictionary<T>) => omitBy(omitBy(object, isNil), isEmpty)

/**
 * Transform the array to object by key and value pair
 * @param array
 * 
 * @param by
 * @returns
 */
export function arrayToObject<T>(array: T[], by: { key: keyof T }) {
  return keyBy(array, by.key)
}

export const flattenObject = <T extends Record<string, any>>(
  obj: T,
  parentKey = ""
): FlattenObject<T> =>
  Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}[${key}]` : key
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], newKey))
    } else {
      ;(acc as any)[newKey] = obj[key]
    }
    return acc
  }, {} as FlattenObject<T>)

export const parseToPrimitiveObject = <T extends Record<string, unknown>>(inputObject: T) => {
  const result = {} as any

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in inputObject) {
    const parts = key.split("[")
    let currentLevel = result

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1
      const innerKey = part.replace("]", "")

      currentLevel[innerKey] = currentLevel?.[innerKey] || {}

      if (isLastPart) {
        currentLevel[innerKey] = inputObject?.[key]
      } else {
        currentLevel = currentLevel?.[innerKey]
      }
    })
  }

  return result
}
