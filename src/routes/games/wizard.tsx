import { createFileRoute, Outlet } from "@tanstack/react-router"
import { WizardStoreProvider } from "@/games/wizard/wizard-store-provider"

export const Route = createFileRoute("/games/wizard")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <WizardStoreProvider>
      <Outlet />
    </WizardStoreProvider>
  )
}
