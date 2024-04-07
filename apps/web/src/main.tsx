import { RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "sonner"
import GeneralModaler from "./components/customs/custom-modals/general-modal"
import PreferredTheme from "./components/ui/theme/preferred-theme"
import { Prompter } from "./components/ui/use-prompt"
import "./globals.css"
import { QueryProvider } from "./libs/query/query"
import { router } from "./router"
import AuthProvider, { AuthState } from "./services/auth/contexts/auth-provider"
import { useAuth } from "./services/auth/hooks/use-auth"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth: auth as AuthState }} />
}

// Render the app
const rootElement = document.getElementById("root")!

if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryProvider>
        <PreferredTheme>
          <AuthProvider>
            <InnerApp />
            <GeneralModaler />
          </AuthProvider>
          <Prompter />
          <Toaster duration={2000} closeButton />
        </PreferredTheme>
      </QueryProvider>
    </StrictMode>,
  )
}
