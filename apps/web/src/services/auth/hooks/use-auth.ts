import { useContext } from "react"
import { useManageAuthToken } from "@/components/ui/use-manage-tokens"
import { AuthContext } from "../contexts/auth-provider"

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  const { removeToken } = useManageAuthToken()

  const logout = () => {
    removeToken()
  }

  return {
    ...authContext,
    logout,
  }
}
