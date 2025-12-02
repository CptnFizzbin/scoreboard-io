import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectTricks = (playerId: string) => {
  return (state: WizardState) => {
    return state.tricks[playerId] || 0
  }
}

export const selectTotalTricks = (state: WizardState) => {
  return Object.values(state.tricks).reduce((sum, tricks) => sum + tricks, 0)
}
