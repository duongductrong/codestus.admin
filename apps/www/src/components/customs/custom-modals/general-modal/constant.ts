export const GM_EVENT_TYPE = {
  DISPATCHER: (name: string, type: "success" | "error", primaryKey?: string) => {
    switch (type) {
      case "success":
        return `GM_RECEIVER_SUCCESS.${name}${primaryKey ? `.${primaryKey}` : ""}`
      case "error":
        return `GM_RECEIVER_ERROR.${name}${primaryKey ? `.${primaryKey}` : ""}`
      default:
        return "null"
    }
  },
  RECEIVER_SUCCESS: (name: string, primaryKey?: string) =>
    `GM_RECEIVER_SUCCESS.${name}${primaryKey ? `.${primaryKey}` : ""}`,
  RECEIVER_ERROR: (name: string, primaryKey?: string) =>
    `GM_RECEIVER_ERROR.${name}${primaryKey ? `.${primaryKey}` : ""}`,
}
