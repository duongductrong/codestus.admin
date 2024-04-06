import GeneralModaler from "@/components/customs/custom-modals/general-modal"
import PreferredTheme from "@/components/ui/theme/preferred-theme"
import { Prompter } from "@/components/ui/use-prompt"
import { QueryProvider } from "@/libs/query/query"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Toaster } from "sonner"

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryProvider>
        <PreferredTheme>
          <Outlet />
          <Prompter />
          <Toaster duration={2000} closeButton />
          <GeneralModaler />
        </PreferredTheme>
      </QueryProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
