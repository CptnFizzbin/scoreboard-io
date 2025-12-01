import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { bidsReducer } from "@/lib/games/wizard/bids/bids.reducer"
import { playersReducer } from "@/lib/games/wizard/players/players.reducer.ts"
import { roundReducer } from "@/lib/games/wizard/round/round.reducer"
import { scoreReducer } from "@/lib/games/wizard/score/score.reducer"
import { tricksReducer } from "@/lib/games/wizard/tricks/tricks.reducer"

export function createWizardStore() {
  return configureStore({
    reducer: {
      players: playersReducer,
      round: roundReducer,
      bids: bidsReducer,
      tricks: tricksReducer,
      score: scoreReducer,
    },
  })
}

export type WizardStore = ReturnType<typeof createWizardStore>
export type WizardState = ReturnType<WizardStore["getState"]>
export type WizardDispatch = WizardStore["dispatch"]

export const useWizardDispatch = useDispatch.withTypes<WizardDispatch>()
export const useWizardSelector = useSelector.withTypes<WizardState>()
