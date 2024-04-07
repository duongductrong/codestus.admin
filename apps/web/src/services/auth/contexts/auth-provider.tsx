import { Loader2 } from "lucide-react"
import React, { createContext, useMemo } from "react"
import { useDeepCompareMemoize } from "@/components/ui/use-deep-compare-memoize"
import { User } from "@/services/user/types/user"
import { useSuspenseMe } from "../hooks/use-me"

export interface AuthState {
  profile: Omit<User, "password" | "providerId"> | undefined
  isAuthenticated?: boolean
}

export const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthLoading = () => (
  <div className="fixed left-0 top-0 flex h-lvh w-full items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isFetching } = useSuspenseMe()
  const user = data?.data
  const loading = isLoading || isFetching

  const values = useMemo<AuthState>(
    () => ({ profile: user, isAuthenticated: !!user }),
    useDeepCompareMemoize([user]),
  )

  return (
    <AuthContext.Provider value={values}>
      {loading ? <AuthLoading /> : null}
      {children}
    </AuthContext.Provider>
  )
}
