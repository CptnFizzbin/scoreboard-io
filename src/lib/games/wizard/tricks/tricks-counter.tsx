import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { setTricks } from "@/lib/games/wizard/wizard.actions"
import { selectPlayer } from "@/lib/games/wizard/wizard.selectors"
import type { UUID } from "@/lib/games/wizard/wizard.types"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"

interface TricksCounterProps {
  playerId: UUID
}

export const TricksCounter: FC<TricksCounterProps> = ({ playerId }) => {
  const { tricks } = useWizardSelector(selectPlayer(playerId))
  const dispatch = useWizardDispatch()

  return (
    <Counter
      label={"Tricks"}
      value={tricks}
      onPlusClick={() => dispatch(setTricks({ playerId, tricks: tricks + 1 }))}
      onMinusClick={() => dispatch(setTricks({ playerId, tricks: tricks - 1 }))}
    />
  )
}
