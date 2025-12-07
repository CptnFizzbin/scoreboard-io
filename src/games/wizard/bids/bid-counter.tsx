import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { setBid } from "@/games/wizard/wizard.actions"
import { selectPlayer } from "@/games/wizard/wizard.selectors"
import type { UUID } from "@/games/wizard/wizard.types"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/games/wizard/wizard-store"

interface BidCounterProps {
  playerId: UUID
}

export const BidCounter: FC<BidCounterProps> = ({ playerId }) => {
  const { bid } = useWizardSelector(selectPlayer(playerId))
  const dispatch = useWizardDispatch()

  return (
    <Counter
      label={"Bid"}
      value={bid}
      onPlusClick={() => dispatch(setBid({ playerId, bid: bid + 1 }))}
      onMinusClick={() => dispatch(setBid({ playerId, bid: bid - 1 }))}
    />
  )
}
