import { createReducer } from "@reduxjs/toolkit"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"

export const roundReducer = createReducer(0, ({ addCase }) => {
  addCase(startNewRound, (state) => state + 1)
})
