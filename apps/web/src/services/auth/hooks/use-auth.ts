import { useContext } from "react"
import { AuthContext } from "../contexts/auth-provider"

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  return authContext
}
