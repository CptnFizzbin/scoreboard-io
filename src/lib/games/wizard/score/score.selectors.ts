import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectScore = (playerId: string) => {
  return (state: WizardState) => {
    return state.score[playerId] || 0
  }
}
