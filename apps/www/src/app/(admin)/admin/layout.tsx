"use server"

import { tokenKeys } from "@/components/ui/use-manage-tokens"
import { PAGE_ROUTES } from "@/constants/routes"
import { getQueryClient } from "@/libs/query"
import { useMe } from "@/services/auth/hooks/use-me"
import { LayoutProps } from "@/types/utilities"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface AdminRootLayoutProps extends LayoutProps {}

// export const revalidate = false

const AdminRootLayout = async ({ children }: AdminRootLayoutProps) => {
  const token = cookies().get(tokenKeys.authToken)

  if (!token) redirect(PAGE_ROUTES.AUTH.SIGN_IN)

  try {
    const data = await getQueryClient().fetchQuery(useMe.getFetchOptions({ token: token.value }))

    return <>{children}</>
  } catch (e) {
    return "Unauthorized"
  }
}

export default AdminRootLayout
