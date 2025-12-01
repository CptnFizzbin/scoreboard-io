import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { selectPlayerStats } from "@/lib/games/wizard/players/player.selectors"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

interface ScoreCounterProps {
  playerId: string
}

export const ScoreCounter: FC<ScoreCounterProps> = ({ playerId }) => {
  const { score } = useWizardSelector(selectPlayerStats(playerId))
  return <Counter label={"Score"} value={score} readonly />
}
