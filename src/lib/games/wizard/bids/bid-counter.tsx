import type { FC } from "react"
import { Counter } from "@/components/ui/counters/Counter"
import { setBid } from "@/lib/games/wizard/bids/bids.actions"
import { selectPlayerStats } from "@/lib/games/wizard/players/player.selectors"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"

interface BidCounterProps {
  playerId: string
}

export const BidCounter: FC<BidCounterProps> = ({ playerId }) => {
  const { bid } = useWizardSelector(selectPlayerStats(playerId))
  const dispatch = useWizardDispatch()

  return (
    <Counter
      label={"Bid"}
      value={bid}
      onPlusClick={() => dispatch(setBid(playerId, bid + 1))}
      onMinusClick={() => dispatch(setBid(playerId, bid - 1))}
    />
  )
}
