import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { selectPlayer } from "@/lib/games/wizard/wizard.selectors"
import type { UUID } from "@/lib/games/wizard/wizard.types"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

interface ScoreCounterProps {
  playerId: UUID
}

export const ScoreCounter: FC<ScoreCounterProps> = ({ playerId }) => {
  const { score } = useWizardSelector(selectPlayer(playerId))
  return <Counter label={"Score"} value={score} readonly />
}
