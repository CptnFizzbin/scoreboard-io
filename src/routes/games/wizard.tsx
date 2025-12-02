import { createFileRoute } from "@tanstack/react-router"
import { WizardGame } from "@/lib/games/wizard/wizard-game"

export const Route = createFileRoute("/games/wizard")({
  component: RouteComponent,
})

function RouteComponent() {
  return <WizardGame />
}
