import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectCurrentRound = (state: WizardState) => state.round
