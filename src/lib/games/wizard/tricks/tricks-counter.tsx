import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { selectPlayerStats } from "@/lib/games/wizard/players/player.selectors"
import { setTricks } from "@/lib/games/wizard/tricks/tricks.actions"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"

interface TricksCounterProps {
  playerId: string
}

export const TricksCounter: FC<TricksCounterProps> = ({ playerId }) => {
  const { tricks } = useWizardSelector(selectPlayerStats(playerId))
  const dispatch = useWizardDispatch()

  return (
    <Counter
      label={"Tricks"}
      value={tricks}
      onPlusClick={() => dispatch(setTricks(playerId, tricks + 1))}
      onMinusClick={() => dispatch(setTricks(playerId, tricks - 1))}
    />
  )
}
