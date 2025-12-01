import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { Header } from "@/components/ui/header"
import TanStackQuery from "@/integrations/tanstack-query"
import TanstackRouter from "@/integrations/tanstack-router"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{ position: "bottom-left" }}
        plugins={[TanstackRouter.Devtools, TanStackQuery.Devtools]}
      />
    </>
  ),
})
