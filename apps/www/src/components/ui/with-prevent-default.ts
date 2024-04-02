export const withPreventDefault =
  (callback: (e: React.SyntheticEvent) => void) => (e: React.SyntheticEvent) => {
    e?.preventDefault()
    callback(e)
  }
