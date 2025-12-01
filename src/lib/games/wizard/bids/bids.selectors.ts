import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectBid = (playerId: string) => {
  return (state: WizardState) => {
    return state.bids[playerId] || 0
  }
}
