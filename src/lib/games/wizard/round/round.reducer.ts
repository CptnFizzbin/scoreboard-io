import { createReducer } from "@reduxjs/toolkit"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"
import { startNewGame } from "@/lib/games/wizard/wizard.actions"

export const roundReducer = createReducer(1, ({ addCase }) => {
  addCase(startNewRound, (state) => state + 1)
  addCase(startNewGame, () => 1)
})
