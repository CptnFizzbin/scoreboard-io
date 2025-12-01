import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectTricks = (playerId: string) => {
  return (state: WizardState) => {
    return state.tricks[playerId] || 0
  }
}
