import { createRouter } from "@tanstack/react-router"
import TanstackQuery from "@/integrations/tanstack-query" // Create a new router instance
import { routeTree } from "@/routeTree.gen.ts"

export const router = createRouter({
  routeTree,
  context: {
    queryClient: TanstackQuery.getQueryClient(),
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
