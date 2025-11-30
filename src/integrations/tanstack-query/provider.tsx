import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { FC, PropsWithChildren } from "react"

const queryClient = new QueryClient()

export function getQueryClient() {
  return queryClient
}

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
