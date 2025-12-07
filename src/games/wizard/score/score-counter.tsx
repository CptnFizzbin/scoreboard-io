import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { selectPlayer } from "@/games/wizard/wizard.selectors"
import type { UUID } from "@/games/wizard/wizard.types"
import { useWizardSelector } from "@/games/wizard/wizard-store"

interface ScoreCounterProps {
  playerId: UUID
}

export const ScoreCounter: FC<ScoreCounterProps> = ({ playerId }) => {
  const { score } = useWizardSelector(selectPlayer(playerId))
  return <Counter label={"Score"} value={score} readonly />
}
