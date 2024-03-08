export const eventDispatcher = <D>(event: string, data: D) => {
  document.dispatchEvent(
    new CustomEvent(event, {
      detail: data,
    })
  )
}

export const eventListener = <F extends (event: CustomEvent | Event) => void>(
  event: string,
  callback: F
) => {
  document.addEventListener(event, callback)
}

export const eventRemover = <F extends (event: CustomEvent | Event) => void>(
  event: string,
  callback: F
) => {
  document.removeEventListener(event, callback)
}
