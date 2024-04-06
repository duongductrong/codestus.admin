import React, { createContext, useMemo } from "react"
import { Loader2 } from "lucide-react"
import { User } from "@/services/user/types/user"
import { useMe } from "../hooks/use-me"

export interface AuthState {
  profile?: Omit<User, "password" | "providerId">
  isAuthenticated?: boolean
}

export const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthLoading = () => (
    <div className="fixed left-0 top-0 flex h-lvh w-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isFetching } = useMe()
  const user = data?.data
  const loading = isLoading || isFetching

  const values = useMemo<AuthState>(() => ({ profile: user, isAuthenticated: !!user }), [user])

  return (
    <AuthContext.Provider value={values}>
      {loading ? <AuthLoading /> : children}
    </AuthContext.Provider>
  )
}
