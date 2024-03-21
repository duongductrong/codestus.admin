export const arrayFromComma = (val?: string) => {
  if (!val) return []

  return val.split(",").map((i) => i.trim())
}
