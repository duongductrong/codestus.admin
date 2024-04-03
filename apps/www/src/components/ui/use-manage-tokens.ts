import { getCookie, setCookie } from "cookies-next"

export const tokenKeys = {
  authToken: "authToken",
}

export const useTokenKeys = () => tokenKeys

export const useManageAuthToken = () => {
  const { authToken } = useTokenKeys()

  const setToken = (token: string, expires?: string) => {
    setCookie(authToken, token, {
      expires: expires ? new Date(expires) : new Date(Date.now() + 1000 * 60 * 60 * 1),
    })
  }

  const getToken = () => {
    getCookie(authToken)
  }

  return {
    getToken,
    setToken,
  }
}
